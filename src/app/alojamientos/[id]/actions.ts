"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";

// Pasarela de pagos sencilla: una sesión de Stripe Checkout (hospedada por
// Stripe, no un formulario de tarjeta propio) por reserva. No requiere la
// publishable key ni Stripe.js en el cliente -- el botón "Reservar y pagar"
// es un <form> normal que llama a esta Server Action, que crea la sesión y
// redirige directo a la página de pago de Stripe.
export async function createCheckoutSessionAction(formData: FormData) {
  const propertyId = Number(formData.get("propertyId"));
  if (!Number.isInteger(propertyId)) {
    throw new Error("Alojamiento inválido");
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });
  if (!property) {
    throw new Error("Alojamiento no encontrado");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL no está configurada");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: property.titulo,
            description: property.ubicacion,
            images: [property.imagen],
          },
          // Property.precio se guarda en pesos enteros; Stripe espera la
          // unidad mínima de la moneda (centavos para MXN).
          unit_amount: property.precio * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/reserva/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/alojamientos/${property.id}`,
  });

  if (!session.url) {
    throw new Error("Stripe no devolvió una URL de pago");
  }

  // Se crea "pendiente" ANTES de redirigir a Stripe -- así queda un
  // registro aunque el usuario abandone el pago. /reserva/exito la marca
  // "pagada" al confirmar con Stripe (no hay webhook en esta versión
  // sencilla, ver el comentario del modelo en schema.prisma).
  await prisma.booking.create({
    data: {
      propertyId: property.id,
      stripeSessionId: session.id,
      monto: property.precio,
    },
  });

  redirect(session.url);
}
