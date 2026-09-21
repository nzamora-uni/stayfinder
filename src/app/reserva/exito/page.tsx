import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";

type ExitoPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function ReservaExitoPage({ searchParams }: ExitoPageProps) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) {
    notFound();
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const pagada = session.payment_status === "paid";
  const item = session.line_items?.data[0];
  const titulo = item?.description ?? "tu reserva";
  const total = session.amount_total
    ? (session.amount_total / 100).toLocaleString("es-MX")
    : null;

  // Marca la reserva creada en createCheckoutSessionAction como "pagada".
  // updateMany (no update) porque no debe tronar si por algún motivo no
  // existe una Booking para este session_id -- y es seguro llamarlo dos
  // veces si el usuario recarga esta página.
  if (pagada) {
    await prisma.booking.updateMany({
      where: { stripeSessionId: sessionId, status: "pendiente" },
      data: {
        status: "pagada",
        guestEmail: session.customer_details?.email ?? undefined,
      },
    });
  }

  const booking = await prisma.booking.findUnique({
    where: { stripeSessionId: sessionId },
  });

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
