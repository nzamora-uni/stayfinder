"use server";

import { redirect } from "next/navigation";
import { Preference } from "mercadopago";
import prisma from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { getMercadoPagoConfig } from "@/lib/mercadopago";

// Compartido por ambas pasarelas: resuelve y valida el alojamiento, y lee
// NEXT_PUBLIC_APP_URL (la misma variable que ya usaba Stripe para
// success_url/cancel_url) para construir las URLs de retorno.
async function resolvePropertyAndAppUrl(formData: FormData) {
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

  return { property, appUrl };
}

// Pasarela de pagos sencilla: una sesión de Stripe Checkout (hospedada por
// Stripe, no un formulario de tarjeta propio) por reserva. No requiere la
// publishable key ni Stripe.js en el cliente -- el botón "Reservar y pagar"
// es un <form> normal que llama a esta Server Action, que crea la sesión y
// redirige directo a la página de pago de Stripe.
export async function createCheckoutSessionAction(formData: FormData) {
  const { property, appUrl } = await resolvePropertyAndAppUrl(formData);

  const session = await getStripe().checkout.sessions.create({
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

// Misma idea que createCheckoutSessionAction, pero con Mercado Pago Checkout
// Pro: una Preference (hospedada por Mercado Pago) por reserva, en vez de
// un formulario de tarjeta propio. El botón "Pagar con Mercado Pago" es
// otro <form> normal que llama a esta Server Action -- coexiste con Stripe,
// no lo reemplaza; el usuario elige cuál botón usar.
export async function createMercadoPagoPreferenceAction(formData: FormData) {
  const { property, appUrl } = await resolvePropertyAndAppUrl(formData);

  // auto_return falla si las back_urls no son https (p.ej. localhost en
  // dev) -- se omite en ese caso en vez de que Mercado Pago rechace la
  // creación de la preference completa.
  const isHttps = appUrl.startsWith("https://");

  const preference = await new Preference(getMercadoPagoConfig()).create({
    body: {
      items: [
        {
          id: String(property.id),
          title: property.titulo,
          description: property.ubicacion,
          picture_url: property.imagen,
          quantity: 1,
          currency_id: "MXN",
          unit_price: property.precio,
        },
      ],
      back_urls: {
        success: `${appUrl}/reserva/exito-mercadopago`,
        pending: `${appUrl}/reserva/exito-mercadopago`,
        failure: `${appUrl}/alojamientos/${property.id}`,
      },
      ...(isHttps ? { auto_return: "approved" as const } : {}),
    },
  });

  if (!preference.init_point) {
    throw new Error("Mercado Pago no devolvió una URL de pago");
  }

  // Misma idea que el Booking de Stripe: se crea "pendiente" ANTES de
  // redirigir, para que quede un registro aunque el usuario abandone el
  // pago. /reserva/exito-mercadopago la marca "pagada" al confirmar el
  // estado real del pago con la API de Mercado Pago (nunca confiando en los
  // query params de la URL de retorno por sí solos).
  await prisma.booking.create({
    data: {
      propertyId: property.id,
      metodoPago: "mercadopago",
      mercadopagoPreferenceId: preference.id,
      monto: property.precio,
    },
  });

  redirect(preference.init_point);
}
