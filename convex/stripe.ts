import { v } from "convex/values";
import { mutation } from "./_generated/server";
import Stripe from "stripe";

// Get environment variables from Convex configuration
const { STRIPE_SECRET_KEY } = process.env;

if (!STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export const createPaymentIntent = mutation({
  args: {
    amount: v.number(),
    serviceId: v.id("services"),
    appointmentId: v.id("appointments"),
  },
  handler: async (ctx, args) => {
    // Get the service to verify the amount
    const service = await ctx.db.get(args.serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    // Verify that the amount matches the service price
    const expectedAmount = Math.round(service.price * 100); // Convert to cents
    if (args.amount !== expectedAmount) {
      throw new Error("Invalid payment amount");
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: args.amount,
      currency: "usd",
      metadata: {
        serviceId: args.serviceId,
        appointmentId: args.appointmentId,
      },
    });

    // Update the appointment with the payment intent ID
    await ctx.db.patch(args.appointmentId, {
      paymentIntentId: paymentIntent.id,
      status: "pending_payment",
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  },
});

export const handlePaymentSuccess = mutation({
  args: {
    appointmentId: v.id("appointments"),
    paymentIntentId: v.string(),
  },
  handler: async (ctx, args) => {
    // Verify the payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(args.paymentIntentId);
    
    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment has not succeeded");
    }

    // Update the appointment status
    await ctx.db.patch(args.appointmentId, {
      status: "confirmed",
      paymentStatus: "paid",
    });

    return true;
  },
});

export const handlePaymentFailure = mutation({
  args: {
    appointmentId: v.id("appointments"),
    paymentIntentId: v.string(),
  },
  handler: async (ctx, args) => {
    // Update the appointment status
    await ctx.db.patch(args.appointmentId, {
      status: "payment_failed",
      paymentStatus: "failed",
    });

    return true;
  },
});

export const initiateRefund = mutation({
  args: {
    appointmentId: v.id("appointments"),
    amount: v.optional(v.number()), // Optional for partial refunds
  },
  handler: async (ctx, args) => {
    const appointment = await ctx.db.get(args.appointmentId);
    if (!appointment) {
      throw new Error("Appointment not found");
    }

    if (!appointment.paymentIntentId) {
      throw new Error("No payment found for this appointment");
    }

    // Create the refund
    const refund = await stripe.refunds.create({
      payment_intent: appointment.paymentIntentId,
      amount: args.amount, // If not provided, will refund the full amount
    });

    // Update the appointment
    await ctx.db.patch(args.appointmentId, {
      status: "cancelled",
      paymentStatus: "refunded",
      refundId: refund.id,
    });

    return true;
  },
});
