import Hero from "@/components/home/Hero";
import PartnerStrip from "@/components/home/PartnerStrip";
import Services from "@/components/home/Services";
import HowToOrder from "@/components/home/HowToOrder";
import WorkModels from "@/components/home/WorkModels";
import Industries from "@/components/home/Industries";
import PartnersPreview from "@/components/home/PartnersPreview";
import WhyUs from "@/components/home/WhyUs";
import Faq from "@/components/home/Faq";
import { CtaBand } from "@/components/shared/ui";

export const instant = true;

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerStrip />
      <Services />
      <HowToOrder />
      <WorkModels />
      <Industries />
      <PartnersPreview />
      <WhyUs />
      <Faq />
      <CtaBand />
    </>
  );
}
