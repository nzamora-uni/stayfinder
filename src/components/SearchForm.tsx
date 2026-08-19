export function SearchForm() {
  return (
    <section className="mx-auto -mt-8 max-w-5xl px-6">
      <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg md:grid-cols-4">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-semibold">Destino</span>

          <input
            type="search"
            name="destino"
            placeholder="¿A dónde quieres ir?"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-rose-500"
          />
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold">Huéspedes</span>

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
  );
}
