import type { Alojamiento } from "@/data/alojamientos";
import { AlojamientoCard } from "@/components/AlojamientoCard";

export function AlojamientosCatalogo({
  alojamientos
}: {
  alojamientos: Alojamiento[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Alojamientos recomendados</h2>

          <p className="mt-2 text-slate-600">
            {alojamientos.length} alojamientos encontrados
          </p>
        </div>

        <select
          aria-label="Ordenar alojamientos"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 sm:w-auto"
        >
          <option>Recomendados</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
          <option>Mejor calificación</option>
        </select>
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {alojamientos.map((alojamiento) => (
          <AlojamientoCard key={alojamiento.id} alojamiento={alojamiento} />
        ))}
      </div>
    </section>
  );
}
