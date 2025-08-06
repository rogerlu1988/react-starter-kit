import type { Id } from "../../convex/_generated/dataModel";

export interface Service {
  _id: Id<"services">;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  active: boolean;
  providerId?: Id<"users">;
}

export interface ServiceProvider {
  _id: Id<"providers">;
  userId: Id<"users">;
  services: Id<"services">[]; // service IDs
  availability: {
    [key: string]: { // day of week (0-6)
      start: string; // HH:mm format
      end: string;
    };
  };
  image?: string;
}

export interface Appointment {
  _id: Id<"appointments">;
  serviceId: Id<"services">;
  providerId: Id<"users">;
  customerId: Id<"users">;
  date: string; // ISO date string
  time: string; // HH:mm format
  status: 'pending' | 'pending_payment' | 'payment_failed' | 'confirmed' | 'cancelled' | 'completed';
  paymentIntentId?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded';
  refundId?: string;
}

export interface Customer {
  _id: Id<"users">;
  name?: string;
  email?: string;
  image?: string;
  tokenIdentifier: string;
  role?: 'customer' | 'provider' | 'admin';
}
