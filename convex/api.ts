import { query, mutation } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

interface QueryArgs {
  providerId?: string;
  serviceId?: string;
  customerId?: string;
  date?: string;
  time?: string;
  notes?: string;
}

interface Service {
  _id: Id<"services">;
  name: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
}

interface Appointment {
  _id: Id<"appointments">;
  serviceId: Id<"services">;
  providerId: Id<"users">;
  customerId: Id<"users">;
  date: string;
  time: string;
  status: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

// Services API
export const services = {
  list: async (ctx: any) => {
    const services = await ctx.db
      .query("services")
      .filter((q: any) => q.eq(q.field("active"), true))
      .collect();
    return services;
  },
};

// Providers API
export const providers = {
  getProviderAppointments: async (ctx: any, args: QueryArgs) => {
    if (!args.providerId) return [];
    const appointments = await ctx.db
      .query("appointments")
      .filter((q: any) => q.eq(q.field("providerId"), args.providerId))
      .collect();
    return appointments;
  },
};

// Appointments API
export const appointments = {
  create: async (ctx: any, args: QueryArgs) => {
    if (!args.serviceId || !args.providerId || !args.customerId || !args.date || !args.time) {
      throw new Error("Missing required fields");
    }
    const appointmentId = await ctx.db.insert("appointments", {
      serviceId: args.serviceId as Id<"services">,
      providerId: args.providerId as Id<"users">,
      customerId: args.customerId as Id<"users">,
      date: args.date,
      time: args.time,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      notes: args.notes,
    });
    return appointmentId;
  },
};
