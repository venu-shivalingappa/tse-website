import type { Governed } from "@/lib/governance";

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Capability {
  slug: string;
  title: string;
  /** Card outcome line (1–2 lines). */
  outcome: string;
  /** Page: business relevance paragraph. */
  businessRelevance: string;
  considerations: string[];
  capabilities: string[];
  approach: string[];
  outcomes: string[];
  caseStudies: string[];
  seo: { title: string; description: string };
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy extends Governed {
  slug: string;
  title: string;
  summary: string;
  sector: string;
  context: string;
  challenge: string;
  questioned: string;
  approach: string;
  architecture: string;
  implementation: string;
  outcome: string;
  enabled: string;
  metric?: CaseStudyMetric;
  relatedCapabilities: string[];
  /** Reviewer note shown only in preview builds. */
  verificationNote?: string;
}

export interface TrustMetric extends Governed {
  value: string;
  label: string;
  evidenceOwner: string;
  reviewDate: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface InsightBlock {
  type: "p" | "h2";
  text: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  date: string;
  readingMinutes: number;
  body: InsightBlock[];
  relatedCapabilities: string[];
}

export interface AccreditationStatus extends Governed {
  status: string;
  approvedWording: string;
  legalOwner: string;
  reviewDate: string;
}
