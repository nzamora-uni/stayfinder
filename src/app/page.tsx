import Image from "next/image";
import Link from "next/link";

const alojamientos = [
  {
    id: 1,
    titulo: "Cabaña frente al lago",
    ubicacion: "Pátzcuaro, Michoacán",
    tipo: "Cabaña",
    precio: 1250,
    calificacion: 4.8,
    huespedes: 4,
    imagen:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
  },
  {
    id: 2,
    titulo: "Departamento en el centro",
    ubicacion: "Morelia, Michoacán",
    tipo: "Departamento",
    precio: 900,
    calificacion: 4.5,
    huespedes: 2,
    imagen:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    id: 3,
    titulo: "Casa con alberca",
    ubicacion: "Cuernavaca, Morelos",
    tipo: "Casa",
    precio: 2400,
    calificacion: 4.9,
    huespedes: 8,
    imagen:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
  },
  {
    id: 4,
    titulo: "Loft moderno",
    ubicacion: "Ciudad de México",
    tipo: "Loft",
    precio: 1650,
    calificacion: 4.7,
    huespedes: 3,
    imagen:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: 5,
    titulo: "Casa colonial",
    ubicacion: "San Miguel de Allende, Guanajuato",
    tipo: "Casa",
    precio: 2100,
    calificacion: 4.9,
    huespedes: 6,
    imagen:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    id: 6,
    titulo: "Departamento cerca de la playa",
    ubicacion: "Cancún, Quintana Roo",
    tipo: "Departamento",
    precio: 1800,
    calificacion: 4.6,
    huespedes: 4,
    imagen:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Encabezado - dividir en componentes */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-rose-600">
            StayFinder
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="font-medium hover:text-rose-600">
              Alojamientos
            </Link>

            <Link
              href="/favoritos"
              className="font-medium hover:text-rose-600"
            >
              Favoritos
            </Link>

            <Link
              href="/acerca"
              className="font-medium hover:text-rose-600"
            >
              Acerca de
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Presentación */}
        <section className="bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-400">
              Hospedajes aquí en México
            </p>

            <h1 className="max-w-3xl text-4xl font-bold md:text-6xl">
              Encuentra un lugar especial para tu próximo viaje
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              Explora casas, departamentos, lofts y cabañas en diferentes
              destinos del país.
            </p>
          </div>
        </section>

        {/* Formulario de búsqueda */}
        <section className="mx-auto -mt-8 max-w-5xl px-6">
          <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:grid-cols-4">
            <label className="md:col-span-2">
              <span className="mb-2 block text-sm font-semibold">
                Destino
              </span>

              <input
                type="search"
                name="destino"
                placeholder="¿A dónde quieres ir?"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-rose-500"
              />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">
                Huéspedes
              </span>

              <select
                name="huespedes"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-rose-500"
              >
                <option value="">Cualquiera</option>
                <option value="1">1 huésped</option>
                <option value="2">2 huéspedes</option>
                <option value="4">4 huéspedes</option>
                <option value="6">6 huéspedes</option>
              </select>
            </label>

            <button
              type="submit"
              className="self-end rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Buscar
            </button>
          </form>
        </section>

        {/* Categorías */}
        <section className="mx-auto max-w-7xl px-6 pt-16">
          <h2 className="text-2xl font-bold">Tipos de alojamiento</h2>

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-slate-900 px-5 py-2 text-white">
              Todos
            </button>

            <button className="rounded-full border border-slate-300 px-5 py-2 hover:border-slate-900">
              Casas
            </button>

            <button className="rounded-full border border-slate-300 px-5 py-2 hover:border-slate-900">
              Departamentos
            </button>

            <button className="rounded-full border border-slate-300 px-5 py-2 hover:border-slate-900">
              Cabañas
            </button>

            <button className="rounded-full border border-slate-300 px-5 py-2 hover:border-slate-900">
              Lofts
            </button>
          </div>
        </section>

        {/* Catálogo */}
        <section className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">
                Alojamientos recomendados
              </h2>

              <p className="mt-2 text-slate-600">
                {alojamientos.length} alojamientos encontrados
              </p>
            </div>

            <select
              aria-label="Ordenar alojamientos"
              className="rounded-lg border border-slate-300 px-4 py-2"
            >
              <option>Recomendados</option>
              <option>Menor precio</option>
              <option>Mayor precio</option>
              <option>Mejor calificación</option>
            </select>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {alojamientos.map((alojamiento) => (
              <article
                key={alojamiento.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
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
                      <h3 className="text-xl font-bold">
                        {alojamiento.titulo}
                      </h3>

                      <p className="mt-1 text-slate-600">
                        {alojamiento.ubicacion}
                      </p>
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
                      $
                      {alojamiento.precio.toLocaleString("es-MX")}
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
            ))}
          </div>
        </section>

        {/* Invitación */}
        <section className="bg-rose-50 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold">
              ¿Tienes una propiedad?
            </h2>

            <p className="mt-3 text-slate-600">
              Próximamente podrás registrar tus alojamientos en StayFinder.
            </p>

            <button className="mt-6 rounded-lg bg-rose-600 px-6 py-3 font-semibold text-white hover:bg-rose-700">
              Más información
            </button>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-lg font-bold text-white">StayFinder</p>
            <p className="mt-1 text-sm">
              Proyecto educativo desarrollado con Next.js.
            </p>
          </div>

          <p className="text-sm">
            © 2026 StayFinder. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}