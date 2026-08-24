import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({
  params
}: PropertyPageProps) {
  const { id } = await params;

  const alojamiento = await prisma.property.findUnique({
    where: {
      id: Number(id)
    }
  });

  if (!alojamiento) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <Link href="/" className="font-semibold text-rose-600">
        ← Regresar al catálogo
      </Link>

      <div className="relative mt-8 h-96 overflow-hidden rounded-2xl">
        <Image
          src={alojamiento.imagen}
          alt={alojamiento.titulo}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="mt-8 text-4xl font-bold">
        {alojamiento.titulo}
      </h1>

      <p className="mt-2 text-xl text-slate-600">
        {alojamiento.ubicacion}
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-bold">
            Descripción
          </h2>

          <p className="mt-3 text-slate-600">
            {alojamiento.descripcion}
          </p>

          <h2 className="mt-8 text-2xl font-bold">
            Amenidades
          </h2>

          <ul className="mt-3 list-inside list-disc">
            {alojamiento.amenidades.map((amenidad) => (
              <li key={amenidad}>{amenidad}</li>
            ))}
          </ul>
        </section>

        <aside className="rounded-2xl border p-6">
          <p>Tipo: {alojamiento.tipo}</p>
          <p>Capacidad: {alojamiento.huespedes} huéspedes</p>
          <p>Calificación: ★ {alojamiento.calificacion}</p>

          <p className="mt-6 text-2xl font-bold">
            ${alojamiento.precio.toLocaleString("es-MX")} MXN
          </p>

          <p className="text-slate-600">por noche</p>
        </aside>
      </div>
    </main>
  );
}