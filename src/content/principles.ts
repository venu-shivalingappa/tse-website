import type { Principle } from "./types";

/** Quality · Ownership · Ethics (handoff §2, §9.1) — LOCKED. */
export const principles: Principle[] = [
  {
    title: "Quality",
    body: "Engineering choices should continue to make sense after the implementation is complete.",
  },
  {
    title: "Ownership",
    body: "When TSE takes responsibility, we stay accountable for the technology outcome.",
  },
  {
    title: "Ethics",
    body: "We recommend what the business needs, not what is easiest to sell.",
  },
];

export const lifecycle = ["Understand", "Strategise", "Architect", "Build", "Secure", "Operate", "Scale"] as const;

export const accountabilityBenefits = [
  "Clearer accountability",
  "Less technology waste",
  "Better scalability",
  "Reduced operational disruption",
  "Stronger security",
  "Better visibility for business leaders",
];

/** How We Work — seven steps (handoff §13). */
export const methodology = [
  { title: "Understand the Business", body: "Vision, model, customers, people, operations and dependencies." },
  { title: "Understand the Future", body: "Where does the business need to be in the next 3–5 years?" },
  { title: "Assess the Technology", body: "What exists today? What works? What creates cost, risk or friction?" },
  { title: "Design the Architecture", body: "Create the technology foundation around business priorities and growth." },
  { title: "Engineer & Implement", body: "Build with quality, operational discipline and future maintainability." },
  { title: "Secure & Govern", body: "Integrate security, controls and accountability into the environment." },
  { title: "Operate & Evolve", body: "Keep technology aligned as the business changes." },
];

/** What We Build — four integrated layers (handoff §11). */
export const layers = [
  {
    name: "Strategy",
    summary: "Decide what should be built, and why.",
    items: ["Technology advisory", "Technology roadmap", "Architecture planning", "Scalability planning", "Technology assessments"],
  },
  {
    name: "Build",
    summary: "Engineer the foundation the business runs on.",
    items: ["Infrastructure", "Networking", "Cloud", "Microsoft ecosystem", "Identity", "Automation", "DevOps"],
  },
  {
    name: "Protect",
    summary: "Design security and governance in, not on.",
    items: ["Cybersecurity", "OS hardening", "Governance", "Risk", "Information security", "Compliance alignment"],
  },
  {
    name: "Operate",
    summary: "Keep it stable, visible and improving.",
    items: ["Monitoring", "Support", "Managed operations", "Lifecycle management", "Continuous optimisation"],
  },
];
