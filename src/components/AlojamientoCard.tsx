import Image from "next/image";
import Link from "next/link";
import type { Alojamiento } from "@/data/alojamientos";

export function AlojamientoCard({
  alojamiento
}: {
  alojamiento: Alojamiento;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-64">
        <Image
          src={alojamiento.imagen}
          alt={alojamiento.titulo}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
        />

        <button
          type="button"
          aria-label={`Agregar ${alojamiento.titulo} a favoritos`}
          className="absolute right-4 top-4 rounded-full bg-white p-2 text-xl shadow"
        >
          ♡
        </button>

        <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-sm font-semibold">
          {alojamiento.tipo}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold">{alojamiento.titulo}</h3>

            <p className="mt-1 text-slate-600">{alojamiento.ubicacion}</p>
          </div>

          <span className="whitespace-nowrap font-semibold">
            ★ {alojamiento.calificacion}
          </span>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Hasta {alojamiento.huespedes} huéspedes
        </p>

        <p className="mt-4">
          <span className="text-xl font-bold">
            ${alojamiento.precio.toLocaleString("es-MX")}
          </span>{" "}
          MXN por noche
        </p>

        <Link
          href={`/alojamientos/${alojamiento.id}`}
          className="mt-5 block rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-rose-600"
        >
          Ver alojamiento
        </Link>
      </div>
    </article>
  );
}
