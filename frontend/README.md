# SEDAAPI website

Phase 1 company website: services, partners and an order form. Built with Next.js 16 (App Router) and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```

## Where things are

| What | File |
| --- | --- |
| All text (services, partners, FAQ, form options) | `lib/content.js` |
| Colours, fonts, animations | `app/globals.css` (`@theme` block) |
| Pages (each one just lists its sections) | `app/page.js`, `app/services`, `app/partners`, `app/order` |
| Home page sections | `components/home/` (Hero, PartnerStrip, Services, HowToOrder, WorkModels, Industries, PartnersPreview, WhyUs, Faq) |
| Services page sections | `components/services/` (ServicesHero, ServiceList) |
| Partners page sections | `components/partners/` (PartnersHero, PartnerDirectory, PartnerGrid, BecomePartner) |
| Order page sections | `components/order/` (OrderIntro, OrderFormCard, OrderForm) |
| Header and footer | `components/layout/` |
| Shared building blocks (buttons, headings, icons, scroll reveal) | `components/shared/` |
| Order API (receives the form) | `app/api/order/route.js` |

To change text, edit `lib/content.js` only. Partners marked `status: "partner"` show a green **Partner** badge, so only use it for confirmed partnerships.

## Receiving orders

Copy `.env.example` to `.env.local` (and add the same values in Vercel → Project → Settings → Environment Variables):

- `RESEND_API_KEY` + `ORDER_TO_EMAIL` – every order is emailed to you (free account at resend.com), or
- `ORDER_WEBHOOK_URL` – every order is posted as JSON (Slack, Zapier, Make or your backend).

Without either, orders are printed in the dev server log; in production the form asks the visitor to email the request instead, so nothing is lost silently.

## Speed

Every page is pre-rendered as static HTML. Only the header, scroll reveal, partner filter and order form ship JavaScript. Links are prefetched, so moving between pages is instant. Fonts are self-hosted through `next/font`.

## Before launch

- Confirm which partners are real partnerships (`lib/content.js`).
- Confirm the FAQ answers and budget ranges with management.
- Replace the placeholder Privacy and Terms pages.
