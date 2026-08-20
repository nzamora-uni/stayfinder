import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function Acerca() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-4xl px-6 py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-600">
            Acerca de nosotros
          </p>

          <h1 className="text-4xl font-bold">Sobre StayFinder</h1>

          <p className="mt-5 text-lg text-slate-600">
            StayFinder es un proyecto educativo desarrollado con Next.js que
            busca conectar viajeros con alojamientos únicos en distintos
            destinos de México, desde cabañas junto al lago hasta casas
            coloniales y departamentos en el centro de la ciudad.
          </p>

          <p className="mt-5 text-lg text-slate-600">
            Nuestro objetivo es ofrecer una experiencia sencilla para
            encontrar el lugar ideal para tu próximo viaje, mientras
            exploramos y practicamos el desarrollo con tecnologías modernas
            de la web.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
