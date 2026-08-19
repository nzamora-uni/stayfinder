import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-rose-600">
          StayFinder
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-rose-600">
            Alojamientos
          </Link>

          <Link href="/favoritos" className="font-medium hover:text-rose-600">
            Favoritos
          </Link>

          <Link href="/acerca" className="font-medium hover:text-rose-600">
            Acerca de
          </Link>
        </nav>
      </div>
    </header>
  );
}
