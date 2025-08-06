import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    image: v.optional(v.string()),
    tokenIdentifier: v.string(),
    role: v.optional(v.union(v.literal("customer"), v.literal("provider"), v.literal("admin"))),
  }).index("by_token", ["tokenIdentifier"]),

  services: defineTable({
    name: v.string(),
    description: v.string(),
    duration: v.number(), // in minutes
    price: v.number(),
    category: v.string(),
    active: v.boolean(),
    providerId: v.optional(v.id("users")), // Optional link to specific provider
  })
    .index("by_category", ["category"])
    .index("by_provider", ["providerId"]),

  providers: defineTable({
    userId: v.id("users"),
    services: v.array(v.id("services")),
    availability: v.object({
      monday: v.optional(v.object({ start: v.string(), end: v.string() })),
      tuesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      wednesday: v.optional(v.object({ start: v.string(), end: v.string() })),
      thursday: v.optional(v.object({ start: v.string(), end: v.string() })),
      friday: v.optional(v.object({ start: v.string(), end: v.string() })),
      saturday: v.optional(v.object({ start: v.string(), end: v.string() })),
      sunday: v.optional(v.object({ start: v.string(), end: v.string() })),
    }),
    active: v.boolean(),
  }).index("by_user", ["userId"]),

  appointments: defineTable({
    serviceId: v.id("services"),
    providerId: v.id("users"),
    customerId: v.id("users"),
    date: v.string(), // YYYY-MM-DD format
    time: v.string(), // HH:mm format
    status: v.union(
      v.literal("pending"),
      v.literal("pending_payment"),
      v.literal("payment_failed"),
      v.literal("confirmed"),
      v.literal("cancelled"),
      v.literal("completed")
    ),
    _creationTime: v.number(),
    paymentIntentId: v.optional(v.string()),
    paymentStatus: v.optional(v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("failed"),
      v.literal("refunded")
    )),
    refundId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    notes: v.optional(v.string()),
  })
    .index("by_customer", ["customerId"])
    .index("by_provider", ["providerId"])
    .index("by_date", ["date"]),

  subscriptions: defineTable({
    userId: v.optional(v.string()),
    polarId: v.optional(v.string()),
    polarPriceId: v.optional(v.string()),
    currency: v.optional(v.string()),
    interval: v.optional(v.string()),
    status: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    amount: v.optional(v.number()),
    startedAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    customerCancellationReason: v.optional(v.string()),
    customerCancellationComment: v.optional(v.string()),
    metadata: v.optional(v.any()),
    customFieldData: v.optional(v.any()),
    customerId: v.optional(v.string()),
  })
    .index("userId", ["userId"])
    .index("polarId", ["polarId"]),

  webhookEvents: defineTable({
    type: v.string(),
    polarEventId: v.string(),
    createdAt: v.string(),
    modifiedAt: v.string(),
    data: v.any(),
  })
    .index("type", ["type"])
    .index("polarEventId", ["polarEventId"]),
});
