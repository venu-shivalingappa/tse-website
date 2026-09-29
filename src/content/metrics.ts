import type { AccreditationStatus, TrustMetric } from "./types";

/** Trust metrics (handoff §4, §9.3). Only "approved" metrics render in production. */
export const trustMetrics: TrustMetric[] = [
  {
    value: "20+ Years",
    label: "Engineering Experience",
    evidenceOwner: "Founder",
    reviewDate: "2027-03-31",
    approval: "approved",
  },
  {
    value: "35+",
    label: "Active Customers",
    evidenceOwner: "Account Management",
    reviewDate: "2027-03-31",
    approval: "approved",
  },
  {
    value: "10+ Years",
    label: "Long-Term Customer Relationships",
    evidenceOwner: "Account Management",
    reviewDate: "2027-03-31",
    approval: "pending",
  },
  {
    value: "0",
    label: "Reported compliance issues across client environments supported through our approach",
    evidenceOwner: "Compliance",
    reviewDate: "2027-03-31",
    approval: "pending",
  },
];

/** NABCB / ISO/IEC 27001 — LEGAL REVIEW REQUIRED before approval. */
export const nabcbStatus: AccreditationStatus = {
  status: "Accreditation applied for",
  approvedWording:
    "Tech Solve Engine has applied for NABCB accreditation relating to ISO/IEC 27001 certification activities in India. Certification services will be offered only after successful accreditation and in accordance with applicable independence and impartiality requirements.",
  legalOwner: "Legal & Compliance",
  reviewDate: "2027-03-31",
  approval: "pending",
};

export const complianceRecord = {
  approval: "pending" as const,
  text: "Our approach has supported client environments with no reported compliance issues during the applicable periods of engagement.",
};
