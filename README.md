# Tech Solve Engine — Website V3

Corporate website built from the **TSE Website V3 UX/Dev Handoff** and the Figma hero (`TSE - WEBSITE - REVAMP`, node `12:11`).

**Stack:** Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules + design tokens · Roboto (display) + Inter (body) via `next/font` · Jest + Testing Library (100% coverage enforced).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server (previews content still pending approval) |
| `npm test` / `npm run test:coverage` | Unit tests / tests with the 100% coverage gate |
| `npm run verify` | Lint → typecheck → coverage → production build |
| `npm run media:hero -- <file.mov>` | Re-encode a hero video to WebM/MP4 + poster |

## Structure

```
src/
  app/                 routes (one H1, unique metadata + canonical per page), API, sitemap, robots
  components/
    ui/                Button, Container, Section, SectionHeading, CheckList, Split, Icon, VerifyBadge, Prose
    layout/            Header, NavMenu, Logo (Figma layers), Footer, Breadcrumbs, SkipLink
    sections/          HomeHero (Figma), PageHero, BusinessStateCard, CapabilityCard, CaseStudyCard,
                       PrincipleCard, MetricCard/MetricsBar, InsightCard, LifecycleFlow, LayerStack,
                       ProcessSteps, CtaBand, ComplianceNotice, StatementBlock …
    forms/             ContactForm, Field
  content/             Structured content (CMS-ready models from handoff §22)
  lib/                 governance, analytics, contact validation, SEO/schema helpers
```

## Claim governance (handoff §4, §25)

Every metric, case study and compliance statement has `approval: "approved" | "pending"`.

- `.env.production` → `NEXT_PUBLIC_SHOW_PENDING_CLAIMS=false`: pending items are **not rendered or pre-rendered** (and are left out of the sitemap).
- `.env.development` → `true`: pending items show with a *Pending verification* badge for review.

To publish a claim, set its `approval` to `"approved"` in `src/content/*` once it has an evidence owner and a sign-off.

## Contact form

Validated in the browser and again on the server (`/api/contact`), with a honeypot field and per-IP rate limiting. Set `CONTACT_WEBHOOK_URL` (server-only, see `.env.example`) to forward enquiries to a CRM or mail relay. Without it, enquiries are only logged on the server.

## Before launch

- Confirm the domain (`NEXT_PUBLIC_SITE_URL`) and the public enquiry mailbox (`src/content/site.ts`).
- Get approval for every pending claim, including legal review of the NABCB wording.
- Get legal review of `/privacy` and `/terms` (these are drafts).
- Configure `CONTACT_WEBHOOK_URL`.
