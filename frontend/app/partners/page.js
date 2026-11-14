import PartnersHero from "@/components/partners/PartnersHero";
import PartnerDirectory from "@/components/partners/PartnerDirectory";
import BecomePartner from "@/components/partners/BecomePartner";
import { CtaBand } from "@/components/shared/ui";

export const instant = true;

export const metadata = {
  title: "Partners",
  description: "SEDAAPI works with leading AI, compute and cloud providers including NVIDIA, Microsoft Azure, AWS, Google Cloud, OpenAI, Anthropic and Meta Llama.",
};

export default function PartnersPage() {
  return (
    <>
      <PartnersHero />
      <PartnerDirectory />
      <BecomePartner />
      <CtaBand />
    </>
  );
}
