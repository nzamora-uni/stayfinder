import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { SearchForm } from "@/components/SearchForm";
import { CategoryFilters } from "@/components/CategoryFilters";
import { AlojamientosCatalogo } from "@/components/AlojamientosCatalogo";
import { HostInviteSection } from "@/components/HostInviteSection";
import { SiteFooter } from "@/components/SiteFooter";
import { alojamientos } from "@/data/alojamientos";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <SiteHeader />

      <main>
        <HeroSection />
        <SearchForm />
        <CategoryFilters />
        <AlojamientosCatalogo alojamientos={alojamientos} />
        <HostInviteSection />
      </main>

      <SiteFooter />
    </div>
  );
}
