import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    serviceId: v.id("services"),
    providerId: v.id("users"),
    customerId: v.id("users"),
    date: v.string(),
    time: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Verify that the service exists
    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    // Verify that the provider exists and is active
    const provider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.providerId))
      .first();
    if (!provider || !provider.active) {
      throw new Error("Provider not found or inactive");
    }

    // Check if the provider offers this service
    if (!provider.services.includes(args.serviceId)) {
      throw new Error("Provider does not offer this service");
    }

    // Check provider availability for the given date/time
    const dayOfWeek = new Date(args.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const availability = provider.availability[dayOfWeek as keyof typeof provider.availability];
    if (!availability) {
      throw new Error("Provider is not available on this day");
    }

    // Check if the time slot is within provider's availability
    if (args.time < availability.start || args.time > availability.end) {
      throw new Error("Selected time is outside provider's availability");
    }

    // Check for existing appointments at the same time
    const existingAppointment = await ctx.db
      .query("appointments")
      .filter((q) => 
        q.and(
          q.eq(q.field("providerId"), args.providerId),
          q.eq(q.field("date"), args.date),
          q.eq(q.field("time"), args.time),
          q.neq(q.field("status"), "cancelled")
        )
      )
      .first();

    if (existingAppointment) {
      throw new Error("Time slot is already booked");
    }

    // Create the appointment
    const appointment = await ctx.db.insert("appointments", {
      serviceId: args.serviceId,
      providerId: args.providerId,
      customerId: args.customerId,
      date: args.date,
      time: args.time,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      notes: args.notes,
    });

    return appointment;
  },
});
