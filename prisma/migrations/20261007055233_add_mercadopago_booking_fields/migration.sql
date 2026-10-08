-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('stripe', 'mercadopago');

-- AlterTable: existing bookings are all Stripe, so backfill metodoPago to
-- 'stripe' via the column default instead of leaving it null.
ALTER TABLE "Booking" ADD COLUMN     "metodoPago" "MetodoPago" NOT NULL DEFAULT 'stripe';

-- AlterTable: stripeSessionId is no longer required -- a Mercado Pago
-- booking has mercadopagoPreferenceId instead, and leaves this null.
ALTER TABLE "Booking" ALTER COLUMN "stripeSessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "mercadopagoPreferenceId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_mercadopagoPreferenceId_key" ON "Booking"("mercadopagoPreferenceId");
