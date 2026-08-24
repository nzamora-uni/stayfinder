-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "calificacion" DOUBLE PRECISION NOT NULL,
    "huespedes" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,
    "descripcion" TEXT,
    "amenidades" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
