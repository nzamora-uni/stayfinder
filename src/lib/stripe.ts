import Stripe from "stripe";

const globalForStripe = globalThis as unknown as {
  stripe: Stripe | undefined;
};

function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY no está configurada");
  }

  return new Stripe(secretKey);
}

// Lazy on purpose -- creating (and validating) this eagerly at module load
// broke `next build` on Vercel: "Collecting page data" imports every route
// module just to inspect it, which doesn't need STRIPE_SECRET_KEY to be
// set, but importing this file used to construct the client (and throw)
// immediately regardless. Only the first actual call -- a real request --
// needs the env var to exist.
export function getStripe(): Stripe {
  const stripe = globalForStripe.stripe ?? createStripeClient();

  if (process.env.NODE_ENV !== "production") {
    globalForStripe.stripe = stripe;
  }

  return stripe;
}
