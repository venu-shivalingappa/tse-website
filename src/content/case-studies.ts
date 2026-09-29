import { publishable } from "@/lib/governance";
import type { CaseStudy } from "./types";

/**
 * Case studies (handoff §8.3, §16). All anonymised. Every item stays "pending" until the
 * figures and wording have an evidence owner and written approval (handoff §25).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "scaling-from-day-1-to-400-employees",
    title: "Scaling from Day 1 to 400+ Employees",
    summary:
      "Built and evolved the technology foundation supporting a fast-growing business from its early stage to more than 400 employees.",
    sector: "Fast-growing services business",
    context:
      "A new business engaged TSE at its earliest stage, when the team was small and the growth plan was ambitious.",
    challenge:
      "Technology had to support rapid hiring, new locations and rising security expectations without repeated rebuilding at every stage of growth.",
    questioned:
      "Rather than buying for the current headcount, we asked what the business would need to look like at several times its size — and which decisions would be expensive to reverse later.",
    approach:
      "Understand the business plan first, then design a foundation that could grow in steps: identity, network, collaboration, security and operations engineered as one system.",
    architecture:
      "A standardised, identity-centred environment with repeatable onboarding, scalable networking and security controls designed in from the start.",
    implementation:
      "Delivered in phases aligned to the business's growth milestones, with TSE retaining operational ownership as the organisation scaled.",
    outcome:
      "The same foundation evolved alongside the business from its early stage to more than 400 employees.",
    enabled:
      "Leadership could focus on growth, knowing that each new hire, team and location would be supported without a technology reset.",
    metric: { value: "400+", label: "Employees supported" },
    relatedCapabilities: ["technology-strategy-advisory", "managed-technology-operations"],
    approval: "pending",
    verificationNote: "Anonymise unless written client approval exists; confirm employee count.",
  },
  {
    slug: "infrastructure-requirement-re-engineered",
    title: "₹18L Requirement Re-Engineered to ~₹2.5L",
    summary:
      "Challenged a traditional infrastructure approach and redesigned the solution around the actual business requirement.",
    sector: "Mid-sized organisation",
    context: "An organisation had received a traditional infrastructure proposal of approximately ₹18L.",
    challenge: "The proposal addressed a generic requirement rather than what the business actually needed to operate.",
    questioned:
      "What problem was the investment really meant to solve — and how much of the proposed infrastructure would the business ever use?",
    approach:
      "Re-establish the business requirement, then engineer the smallest resilient solution that meets it with room to grow.",
    architecture: "A right-sized design built around the actual workload, availability and growth expectations.",
    implementation: "Delivered and documented so the environment remains manageable over time.",
    outcome: "The business requirement was met with a solution of approximately ₹2.5L.",
    enabled: "Capital was redirected to priorities that directly supported growth.",
    metric: { value: "~₹2.5L", label: "vs. ~₹18L proposed" },
    relatedCapabilities: ["technology-strategy-advisory", "infrastructure-networking"],
    approval: "pending",
    verificationNote: "Finance to validate both figures before publication.",
  },
  {
    slug: "eliminating-hidden-productivity-loss",
    title: "Eliminating Hidden Productivity Loss",
    summary:
      "Re-engineered enterprise wireless infrastructure where poor performance was creating measurable productivity cost.",
    sector: "Enterprise office environment",
    context: "Employees depended on wireless connectivity for most of their working day.",
    challenge:
      "Poor wireless performance had become normal operating behaviour, quietly costing productive time across the organisation.",
    questioned: "Was the problem really coverage — or the way the wireless environment had been designed and configured?",
    approach: "Measure the real experience, identify root causes, then re-engineer the wireless design rather than add more hardware.",
    architecture: "An enterprise wireless design engineered for the building, device density and working patterns.",
    implementation: "Re-engineered with minimal disruption to day-to-day operations.",
    outcome: "The productivity loss caused by poor wireless performance was eliminated.",
    enabled: "Teams could work without connectivity interruptions becoming part of their day.",
    relatedCapabilities: ["infrastructure-networking"],
    approval: "pending",
    verificationNote: "Confirm productivity figures and measurement method before adding a metric.",
  },
  {
    slug: "email-security-optimisation",
    title: "Email Security Cost and Operational Optimisation",
    summary:
      "Rationalised email security to reduce cost and operational overhead while strengthening protection.",
    sector: "Growing organisation",
    context: "Email security had grown through several overlapping tools and subscriptions.",
    challenge: "Overlapping products increased cost and operational effort without a clear improvement in protection.",
    questioned: "Which controls were actually providing protection — and which were duplicating capabilities already owned?",
    approach: "Map controls to real threats, remove duplication and engineer protection into the existing platform.",
    architecture: "A consolidated email security design aligned with the organisation's identity and collaboration platform.",
    implementation: "Transitioned in stages so protection was maintained throughout.",
    outcome: "Lower email security cost and reduced operational effort, with protection maintained.",
    enabled: "Security spend and attention could move to higher-priority risks.",
    relatedCapabilities: ["cybersecurity", "cloud-engineering"],
    approval: "pending",
    verificationNote: "Confirm savings figures before adding a metric.",
  },
  {
    slug: "industrial-automation-os-hardening",
    title: "Industrial Automation OS Hardening",
    summary:
      "Designed a Windows 11 Enterprise LTSC hardening approach for an industrial automation engineering environment.",
    sector: "Industrial automation engineering",
    context: "An industrial automation engineering environment required a secure, stable operating system baseline.",
    challenge:
      "The platform had to be hardened without compromising the stability and compatibility that industrial operations depend on.",
    questioned: "Which hardening controls were appropriate for a specialised operational environment rather than a standard office desktop?",
    approach: "Understand the operational use case, harden to recognised baselines and validate against real workloads.",
    architecture: "A Windows 11 Enterprise LTSC hardened baseline designed for the industrial automation use case.",
    implementation: "Documented, repeatable builds suitable for controlled deployment.",
    outcome: "The hardening approach was accepted by the principal project organisation.",
    enabled: "A secure, repeatable platform for specialised industrial operations.",
    relatedCapabilities: ["os-platform-hardening", "cybersecurity"],
    approval: "pending",
    verificationNote: "No client, principal organisation or integrator names without written approval.",
  },
];

/** Case studies surfaced as the homepage proof preview (handoff §8.3). */
export const featuredCaseStudySlugs = [
  "scaling-from-day-1-to-400-employees",
  "infrastructure-requirement-re-engineered",
  "eliminating-hidden-productivity-loss",
  "industrial-automation-os-hardening",
];

export function publishedCaseStudies(preview?: boolean): CaseStudy[] {
  return publishable(caseStudies, preview);
}

export function getCaseStudy(slug: string, preview?: boolean): CaseStudy | undefined {
  return publishedCaseStudies(preview).find((c) => c.slug === slug);
}

export function caseStudiesBySlugs(slugs: readonly string[], preview?: boolean): CaseStudy[] {
  const published = publishedCaseStudies(preview);
  return slugs.map((s) => published.find((c) => c.slug === s)).filter((c): c is CaseStudy => Boolean(c));
}
