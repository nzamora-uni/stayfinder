import { MercadoPagoConfig } from "mercadopago";

const globalForMercadoPago = globalThis as unknown as {
  mercadoPagoConfig: MercadoPagoConfig | undefined;
};

function createMercadoPagoClient() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN no está configurada");
  }

  return new MercadoPagoConfig({ accessToken });
}

// Lazy on purpose, same reason as getStripe() in stripe.ts -- constructing
// (and validating) this eagerly at module load broke `next build` on Vercel:
// "Collecting page data" imports every route module just to inspect it,
// which doesn't need MERCADOPAGO_ACCESS_TOKEN to be set, but importing this
// file used to construct the client (and throw) immediately regardless.
//
// IMPORTANT: this reads process.env.MERCADOPAGO_ACCESS_TOKEN -- a server-only
// secret, never prefixed NEXT_PUBLIC_. Only ever import this from a Server
// Action, Route Handler, or Server Component. Never pass the resulting
// MercadoPagoConfig (or the token itself) as a prop into a "use client"
// component, render it into HTML, or log it -- same rule as getStripe().
export function getMercadoPagoConfig(): MercadoPagoConfig {
  const config = globalForMercadoPago.mercadoPagoConfig ?? createMercadoPagoClient();

  if (process.env.NODE_ENV !== "production") {
    globalForMercadoPago.mercadoPagoConfig = config;
  }

  return config;
}
