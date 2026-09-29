import type { NavItem } from "./types";

export const site = {
  name: "Tech Solve Engine",
  shortName: "TSE",
  tagline: "Ignite Innovations",
  positioning: "Engineering the Technology Backbone for Business Growth",
  promise: "We take accountability for your technology so you can focus on growing your business.",
  philosophy: "Understand the business first. Engineer the technology second.",
  northStar:
    "TSE understands where the business wants to go, then engineers and takes accountability for the technology foundation required to get there.",
  // TODO(TSE): confirm the public enquiry mailbox before launch.
  contact: {
    email: "hello@techsolveengine.com",
  },
  primaryCta: { label: "Talk to TSE", href: "/contact" },
  conversationCta: { label: "Start a Business Conversation", href: "/contact" },
} as const;

export const capabilityNav: NavItem[] = [
  { label: "Technology Strategy & Advisory", href: "/what-we-build/technology-strategy-advisory" },
  { label: "Infrastructure & Networking", href: "/what-we-build/infrastructure-networking" },
  { label: "Cloud Engineering", href: "/what-we-build/cloud-engineering" },
  { label: "Cybersecurity", href: "/what-we-build/cybersecurity" },
  { label: "DevOps & Automation", href: "/what-we-build/devops-automation" },
  { label: "Managed Technology Operations", href: "/what-we-build/managed-technology-operations" },
  { label: "Information Security & Governance", href: "/what-we-build/information-security-governance" },
  { label: "OS & Platform Hardening", href: "/what-we-build/os-platform-hardening" },
];

/** Primary navigation (handoff §5). */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Why TSE", href: "/why-tse" },
  { label: "What We Build", href: "/what-we-build", children: capabilityNav },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Security & Compliance", href: "/security-compliance" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Global Expansion", href: "/global-expansion" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Company",
    items: [
      { label: "Why TSE", href: "/why-tse" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { heading: "What We Build", items: capabilityNav },
  {
    heading: "Explore",
    items: [
      { label: "Security & Compliance", href: "/security-compliance" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Global Expansion", href: "/global-expansion" },
      { label: "Insights", href: "/insights" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
