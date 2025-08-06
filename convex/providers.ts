import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProviderByUserId = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const provider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();
    return provider;
  },
});

export const getProviderAppointments = query({
  args: { providerId: v.id("users") },
  handler: async (ctx, args) => {
    const appointments = await ctx.db
      .query("appointments")
      .filter((q) => q.eq(q.field("providerId"), args.providerId))
      .order("desc")
      .collect();

    // Get services for each appointment
    const services = await Promise.all(
      appointments.map((appointment) =>
        ctx.db.get(appointment.serviceId)
      )
    );

    // Get customers for each appointment
    const customers = await Promise.all(
      appointments.map((appointment) =>
        ctx.db.get(appointment.customerId)
      )
    );

    // Combine appointment data with service and customer info
    return appointments.map((appointment, i) => ({
      ...appointment,
      service: services[i],
      customer: customers[i],
    }));
  },
});

export const getProviderServices = query({
  args: { providerId: v.id("users") },
  handler: async (ctx, args) => {
    const provider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.providerId))
      .first();

    if (!provider) {
      return [];
    }

    // Get all services for this provider
    const services = await Promise.all(
      provider.services.map((serviceId) => ctx.db.get(serviceId))
    );

    return services.filter((service): service is NonNullable<typeof service> => service !== null);
  },
});

export const createProvider = mutation({
  args: {
    userId: v.id("users"),
    availability: v.object({
      monday: v.optional(v.object({ start: v.string(), end: v.string() })),
      tuesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      wednesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      thursday: v.optional(v.object({ start: v.string(), end: v.string() })),
      friday: v.optional(v.object({ start: v.string(), end: v.string() })),
      saturday: v.optional(v.object({ start: v.string(), end: v.string() })),
      sunday: v.optional(v.object({ start: v.string(), end: v.string() })),
    }),
  },
  handler: async (ctx, args) => {
    // Check if provider already exists
    const existingProvider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (existingProvider) {
      throw new Error("Provider already exists");
    }

    // Create provider
    const providerId = await ctx.db.insert("providers", {
      userId: args.userId,
      services: [],
      availability: args.availability,
      active: true,
    });

    // Update user role
    await ctx.db.patch(args.userId, { role: "provider" });

    return providerId;
  },
});

export const updateAvailability = mutation({
  args: {
    providerId: v.id("users"),
    availability: v.object({
      monday: v.optional(v.object({ start: v.string(), end: v.string() })),
      tuesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      wednesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      thursday: v.optional(v.object({ start: v.string(), end: v.string() })),
      friday: v.optional(v.object({ start: v.string(), end: v.string() })),
      saturday: v.optional(v.object({ start: v.string(), end: v.string() })),
      sunday: v.optional(v.object({ start: v.string(), end: v.string() })),
    }),
  },
  handler: async (ctx, args) => {
    // Find the provider record
    const provider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.providerId))
      .first();

    if (!provider) {
      throw new Error("Provider not found");
    }

    // Update availability
    await ctx.db.patch(provider._id, {
      availability: args.availability,
    });

    return provider._id;
  },
});
