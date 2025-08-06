import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

export const getStripeAmount = (price: number) => {
  // Stripe expects amounts in cents/smallest currency unit
  return Math.round(price * 100);
};
