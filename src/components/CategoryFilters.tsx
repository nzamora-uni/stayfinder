const categorias = ["Casas", "Departamentos", "Cabañas", "Lofts"];

export function CategoryFilters() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16">
      <h2 className="text-2xl font-bold">Tipos de alojamiento</h2>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-slate-900 px-5 py-2 text-white">
          Todos
        </button>

        {categorias.map((categoria) => (
          <button
            key={categoria}
            className="rounded-full border border-slate-300 px-5 py-2 hover:border-slate-900"
          >
            {categoria}
          </button>
        ))}
      </div>
    </section>
  );
}
