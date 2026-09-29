import type { Insight } from "./types";

/** TSE Insights categories (handoff §18.1). */
export const insightCategories = [
  "Business & Technology",
  "Architecture",
  "Infrastructure",
  "Cloud",
  "Cybersecurity",
  "Engineering",
  "Compliance",
  "Scaling Technology",
  "Technology Leadership",
];

/**
 * Launch articles. Market education and brand authority — not lead generation.
 * Replace / extend from the CMS once connected (Insight content model, handoff §22).
 */
export const insights: Insight[] = [
  {
    slug: "the-right-time-to-build-your-technology-foundation",
    title: "The Right Time to Build Your Technology Foundation Is Day 1",
    category: "Scaling Technology",
    summary:
      "Technology decisions made before growth are cheaper than technology decisions made because of growth. Here is why founders should involve engineering thinking early.",
    author: "Tech Solve Engine",
    date: "2026-08-18",
    readingMinutes: 4,
    relatedCapabilities: ["technology-strategy-advisory"],
    body: [
      {
        type: "p",
        text: "Most early-stage businesses make their first technology decisions quickly: a few laptops, a collaboration suite, an internet connection and whatever gets the team working this week. None of those decisions is wrong on its own. The problem is that each one quietly becomes a foundation.",
      },
      { type: "h2", text: "Decisions that are cheap now and expensive later" },
      {
        type: "p",
        text: "Identity, network design, data ownership and security baselines are easy to get right when a business has ten people and very expensive to correct when it has two hundred. Rebuilding them later means disruption, duplicated spend and management attention that should be going into growth.",
      },
      { type: "h2", text: "Design for the business plan, not the current headcount" },
      {
        type: "p",
        text: "Engineering for Day 1 does not mean over-investing. It means understanding where the business expects to be in three to five years and making the early choices that will still make sense when it gets there — while allowing individual components and subscriptions to evolve.",
      },
      {
        type: "p",
        text: "If you are starting a business, the most valuable technology conversation is not about products. It is about where the business is going.",
      },
    ],
  },
  {
    slug: "technology-problems-become-business-problems",
    title: "Technology Problems Become Business Problems",
    category: "Business & Technology",
    summary:
      "Poor technology decisions rarely appear on a balance sheet as “bad IT”. They appear as lost productivity, duplicate spend and management distraction.",
    author: "Tech Solve Engine",
    date: "2026-08-25",
    readingMinutes: 5,
    relatedCapabilities: ["managed-technology-operations", "infrastructure-networking"],
    body: [
      {
        type: "p",
        text: "Ask a leadership team what poor technology costs them and the answer is usually vague. That is because the cost rarely arrives as a single line item. It is spread across the organisation as small, normalised frictions.",
      },
      { type: "h2", text: "Where hidden technology cost shows up" },
      {
        type: "p",
        text: "Employee downtime, slow systems, unnecessary capital expenditure, overlapping subscriptions, security exposure, delayed projects and the time leaders spend escalating technology issues. Each is tolerable alone. Together they become operating behaviour.",
      },
      { type: "h2", text: "Reduce the cost before it becomes normal" },
      {
        type: "p",
        text: "The discipline is to look at technology through business consequences: what is this costing in time, risk and focus? Once that is visible, engineering decisions become business decisions — and the right investment is usually clearer and smaller than expected.",
      },
    ],
  },
  {
    slug: "security-should-be-designed-in",
    title: "Security Should Be Designed Into the Business",
    category: "Cybersecurity",
    summary:
      "Security is not a firewall, a product or an annual audit. It is the outcome of architecture, identity, configuration and disciplined operations working together.",
    author: "Tech Solve Engine",
    date: "2026-09-08",
    readingMinutes: 4,
    relatedCapabilities: ["cybersecurity", "information-security-governance"],
    body: [
      {
        type: "p",
        text: "Many organisations approach security as a shopping list: a firewall here, an endpoint agent there, another subscription after the next incident. The result is a collection of products that do not add up to a secure environment.",
      },
      { type: "h2", text: "Security as an engineering outcome" },
      {
        type: "p",
        text: "Real protection comes from how the environment is designed: who can access what, how systems are configured, how changes are controlled and how the environment is monitored. Products support that design; they cannot replace it.",
      },
      { type: "h2", text: "Start with business risk" },
      {
        type: "p",
        text: "The right controls depend on what the business cannot afford to lose, expose or interrupt. Starting there keeps security proportionate, operable and aligned with frameworks such as ISO/IEC 27001 — without turning it into a checklist exercise.",
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
