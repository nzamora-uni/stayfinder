export function SiteFooter() {
  return (
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
  );
}
