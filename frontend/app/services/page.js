import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import { CtaBand } from "@/components/shared/ui";

export const instant = true;

export const metadata = {
  title: "Services",
  description: "Full stack development, video management, signal processing, AI automation, edge and IoT, cloud and operations. Order any service with a free scope and quote.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceList />
      <CtaBand />
    </>
  );
}
