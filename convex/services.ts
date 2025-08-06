import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const services = await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();
    return services;
  },
});

export const getByCategory = query({
  handler: async (ctx) => {
    const services = await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    // Group services by category
    const servicesByCategory = services.reduce((acc, service) => {
      const category = service.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {} as Record<string, typeof services>);

    return servicesByCategory;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    duration: v.number(),
    price: v.number(),
    category: v.string(),
    active: v.boolean(),
    providerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Verify that the provider exists
    const provider = await ctx.db
      .query("providers")
      .filter((q) => q.eq(q.field("userId"), args.providerId))
      .first();

    if (!provider) {
      throw new Error("Provider not found");
    }

    // Create the service
    const serviceId = await ctx.db.insert("services", args);

    // Add the service to the provider's services array
    await ctx.db.patch(provider._id, {
      services: [...provider.services, serviceId],
    });

    return serviceId;
  },
});

export const update = mutation({
  args: {
    serviceId: v.id("services"),
    name: v.string(),
    description: v.string(),
    duration: v.number(),
    price: v.number(),
    category: v.string(),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { serviceId, ...updates } = args;
    
    // Verify that the service exists
    const service = await ctx.db.get(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    // Update the service
    await ctx.db.patch(serviceId, updates);

    return serviceId;
  },
});

export const toggleActive = mutation({
  args: {
    serviceId: v.id("services"),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { serviceId, active } = args;

    // Verify that the service exists
    const service = await ctx.db.get(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    // Update the service's active status
    await ctx.db.patch(serviceId, { active });

    return serviceId;
  },
});
