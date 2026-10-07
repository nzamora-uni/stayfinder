import Link from "next/link";
import { notFound } from "next/navigation";
import { Payment } from "mercadopago";
import prisma from "@/lib/prisma";
import { getMercadoPagoConfig } from "@/lib/mercadopago";

// Mercado Pago agrega payment_id/status/preference_id a la back_url cuando
// auto_return está activo (ver createMercadoPagoPreferenceAction) -- status
// aquí es solo lo que el navegador trae en la URL, nunca se usa para decidir
// "pagada": siempre se reconfirma con Payment.get() más abajo, mismo
// principio que /reserva/exito con Stripe.
type ExitoMercadoPagoPageProps = {
  searchParams: Promise<{ payment_id?: string; preference_id?: string }>;
};

export default async function ReservaExitoMercadoPagoPage({
  searchParams,
}: ExitoMercadoPagoPageProps) {
  const { payment_id: paymentId, preference_id: preferenceId } = await searchParams;
  if (!paymentId) {
    notFound();
  }

  const payment = await new Payment(getMercadoPagoConfig()).get({ id: paymentId });

  const pagada = payment.status === "approved";
  const titulo = payment.additional_info?.items?.[0]?.title ?? "tu reserva";
  const total = payment.transaction_amount?.toLocaleString("es-MX");

  // Marca la reserva creada en createMercadoPagoPreferenceAction como
  // "pagada". updateMany (no update) por la misma razón que /reserva/exito:
  // no debe tronar si no existe un Booking para este preference_id, y es
  // seguro llamarlo dos veces si el usuario recarga esta página.
  if (pagada && preferenceId) {
    await prisma.booking.updateMany({
      where: { mercadopagoPreferenceId: preferenceId, status: "pendiente" },
      data: {
        status: "pagada",
        guestEmail: payment.payer?.email ?? undefined,
      },
    });
  }

  const booking = preferenceId
    ? await prisma.booking.findUnique({
        where: { mercadopagoPreferenceId: preferenceId },
      })
    : null;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      {pagada ? (
        <>
          <h1 className="text-3xl font-bold text-emerald-600">¡Pago confirmado!</h1>
          <p className="mt-4 text-slate-600">
            Tu reserva de <strong>{titulo}</strong> quedó registrada.
            {total && <> Se cobraron ${total} MXN.</>}
          </p>
          {booking && (
            <p className="mt-2 text-sm text-slate-400">
              Número de reserva: #{booking.id}
            </p>
          )}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-amber-600">Pago pendiente</h1>
          <p className="mt-4 text-slate-600">
            No pudimos confirmar el pago de <strong>{titulo}</strong> todavía. Si ya pagaste,
            espera un momento y vuelve a intentar.
          </p>
        </>
      )}

      <Link href="/" className="mt-8 font-semibold text-rose-600">
        ← Regresar al catálogo
      </Link>
    </main>
  );
}
