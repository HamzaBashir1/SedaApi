import Reveal from "@/components/shared/Reveal";
import { Container, SectionHead } from "@/components/shared/ui";
import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-28">
      <Container>
        <Reveal><SectionHead eyebrow="FAQ" title="Questions before you order." /></Reveal>
        <Reveal className="mx-auto grid max-w-3xl gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-ink-100 bg-white transition open:border-brand-100 open:shadow-[0_20px_40px_-28px_rgb(168_120_24/.45)]">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-bold">
                {f.q}
                <span className="faq-icon grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-xl transition">+</span>
              </summary>
              <p className="px-6 pb-6 text-ink-500">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
