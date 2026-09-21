-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pendiente', 'pagada');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "stripeSessionId" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pendiente',
    "guestEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_stripeSessionId_key" ON "Booking"("stripeSessionId");

-- CreateIndex
CREATE INDEX "Booking_propertyId_idx" ON "Booking"("propertyId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
