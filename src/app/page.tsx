import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { SearchForm } from "@/components/SearchForm";
import { CategoryFilters } from "@/components/CategoryFilters";
import { AlojamientosCatalogo } from "@/components/AlojamientosCatalogo";
import { HostInviteSection } from "@/components/HostInviteSection";
import { SiteFooter } from "@/components/SiteFooter";
// import { alojamientos } from "@/data/alojamientos";
import prisma from "@/lib/prisma";


export default async function Home() {
  const alojamientos = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main>
        <HeroSection />
        <SearchForm />
        <CategoryFilters />

        {/* <AlojamientosCatalogo alojamientos={alojamientos} /> */}
        <AlojamientosCatalogo alojamientos={alojamientos} />

        <HostInviteSection />
      </main>

      <SiteFooter />
    </div>
  );
}
