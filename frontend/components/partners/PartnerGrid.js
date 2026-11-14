"use client";

import { useState } from "react";
import { partners } from "@/lib/content";

const filters = [
  { id: "all", label: "All" },
  { id: "compute", label: "AI and compute" },
  { id: "cloud", label: "Cloud" },
  { id: "models", label: "AI models" },
];

export default function PartnerGrid() {
  const [active, setActive] = useState("all");
  const shown = partners.filter((p) => active === "all" || p.cat === active);

  return (
    <div>
      <div role="group" aria-label="Filter partners" className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={active === f.id} onClick={() => setActive(f.id)}
            className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition ${
              active === f.id ? "border-brand-600 bg-brand-600 text-white" : "border-ink-100 bg-white text-ink-700 hover:border-brand-600 hover:text-brand-700"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <article key={`${active}-${p.name}`} style={{ animation: `rise .5s ${i * 50}ms cubic-bezier(.2,.7,.2,1) both` }}
            className={`relative grid content-start gap-3 rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${
              p.featured && active === "all"
                ? "overflow-hidden border-brand-100 bg-gradient-to-br from-brand-50 via-white to-surface-2 sm:col-span-2"
                : "border-ink-100 bg-white hover:shadow-[0_20px_50px_-28px_rgb(42_34_22/.25)]"}`}>
            {p.featured && active === "all" && (
              <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-aqua-400/20 blur-3xl" />
            )}
            <div className="relative flex items-start justify-between gap-3">
              <span className={`text-xs font-extrabold uppercase tracking-[.12em] ${p.featured && active === "all" ? "text-brand-600" : "text-ink-500"}`}>{p.catLabel}</span>
              <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${
                p.status === "partner" ? "bg-mint-500/15 text-mint-500" : "bg-surface-2 text-ink-700"}`}>
                {p.status === "partner" ? "Partner" : "We build on"}
              </span>
            </div>
            <h3 className={`relative font-display font-extrabold tracking-tight ${p.featured && active === "all" ? "text-4xl text-ink-900" : "text-2xl text-ink-900"}`}>
              {p.name}
            </h3>
            <p className={`relative ${p.featured && active === "all" ? "max-w-xl text-ink-700" : "text-ink-500"}`}>{p.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
