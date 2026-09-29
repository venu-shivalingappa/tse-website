import type { Capability } from "./types";

/**
 * Primary capability taxonomy (handoff §5, §8.1, §12).
 * Every capability page follows the same structure: business relevance → considerations →
 * core capabilities → approach → outcomes → case study → CTA.
 */
export const capabilities: Capability[] = [
  {
    slug: "technology-strategy-advisory",
    title: "Technology Strategy & Advisory",
    outcome: "Translate business vision into a practical technology roadmap.",
    businessRelevance:
      "Translate business vision into a technology roadmap that supports the organisation's next stage of growth. TSE starts with the business model, growth plan, operational dependencies and risk before defining priorities, architecture and investment sequencing.",
    considerations: [
      "Where the business is going in the next 3–5 years",
      "Which operations depend on technology today — and which will tomorrow",
      "Where current technology creates cost, risk or friction",
      "What must be decided now, and what can safely wait",
    ],
    capabilities: [
      "Technology roadmaps aligned to the business plan",
      "Architecture planning and target-state design",
      "Technology and risk assessments",
      "Scalability planning",
      "Investment sequencing and prioritisation",
    ],
    approach: [
      "Start with the business model, not a product list.",
      "Assess what exists before recommending what to add.",
      "Sequence investment so each step supports the next stage of growth.",
    ],
    outcomes: [
      "A roadmap leadership can act on",
      "Fewer rebuilds and avoidable spend",
      "Technology decisions tied to business outcomes",
    ],
    caseStudies: ["infrastructure-requirement-re-engineered", "scaling-from-day-1-to-400-employees"],
    seo: {
      title: "Technology Strategy & IT Architecture Consulting",
      description:
        "Technology strategy and IT architecture consulting that starts with your business plan and turns it into a practical, sequenced technology roadmap.",
    },
  },
  {
    slug: "infrastructure-networking",
    title: "Infrastructure & Networking",
    outcome: "Build reliable, resilient environments for people, systems and locations.",
    businessRelevance:
      "Design resilient, scalable environments that connect people, locations, devices and critical systems without making the business dependent on fragile infrastructure decisions.",
    considerations: [
      "How people, sites and systems actually work together",
      "Which failures would stop the business, and for how long",
      "Expected growth in people, locations and workloads",
      "Total cost of ownership over the life of the environment",
    ],
    capabilities: [
      "Enterprise network design (LAN, WAN, SD-WAN)",
      "Enterprise wireless engineering",
      "Server, storage and virtualisation",
      "Resilience, backup and recovery design",
      "Multi-site and branch connectivity",
    ],
    approach: [
      "Design around the business requirement, not the biggest proposal.",
      "Engineer for resilience and manageability from the start.",
      "Document everything so the environment remains operable.",
    ],
    outcomes: [
      "Stable, predictable performance",
      "Right-sized infrastructure investment",
      "Environments that scale without re-architecture",
    ],
    caseStudies: ["eliminating-hidden-productivity-loss", "infrastructure-requirement-re-engineered"],
    seo: {
      title: "Enterprise Infrastructure & Networking",
      description:
        "Enterprise infrastructure and networking engineered for resilience, scalability and the way your business actually operates.",
    },
  },
  {
    slug: "cloud-engineering",
    title: "Cloud Engineering",
    outcome: "Design cloud architecture around scalability, security and operational needs.",
    businessRelevance:
      "Design cloud and hybrid environments around business requirements, security, operating model, cost discipline and scalability — not around a cloud-first slogan.",
    considerations: [
      "Which workloads genuinely benefit from cloud",
      "Security, identity and data-residency requirements",
      "Operating model and in-house capability",
      "Predictable cost as usage grows",
    ],
    capabilities: [
      "Cloud and hybrid architecture",
      "Microsoft 365 and Azure engineering",
      "Identity and access foundations",
      "Migration planning and execution",
      "Cost governance and optimisation",
    ],
    approach: [
      "Choose cloud, hybrid or on-premises per workload.",
      "Build identity and security into the landing zone.",
      "Put cost visibility in place before usage scales.",
    ],
    outcomes: ["Scalable, secure platforms", "Controlled and visible cloud spend", "Faster, safer change"],
    caseStudies: ["email-security-optimisation"],
    seo: {
      title: "Cloud Architecture & Engineering",
      description:
        "Cloud and hybrid architecture designed around your business requirements, security, operating model and cost discipline.",
    },
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    outcome: "Build security into the environment instead of applying it after implementation.",
    businessRelevance:
      "Build security into architecture, identity, configuration, endpoints, networks, operations and governance so protection becomes part of the environment rather than a separate product layer.",
    considerations: [
      "What the business cannot afford to lose or expose",
      "Where identity, endpoints and networks create exposure",
      "Regulatory and customer security expectations",
      "How security will be operated day to day",
    ],
    capabilities: [
      "Security architecture",
      "Identity and access management",
      "Endpoint and email security",
      "Network and infrastructure security",
      "Security operations and monitoring",
    ],
    approach: [
      "Design security in at the architecture stage.",
      "Reduce exposure through configuration before adding products.",
      "Make security operable and measurable.",
    ],
    outcomes: ["Reduced security exposure", "Fewer overlapping security tools", "Confidence for customers and auditors"],
    caseStudies: ["email-security-optimisation", "industrial-automation-os-hardening"],
    seo: {
      title: "Cybersecurity & Information Security",
      description:
        "Cybersecurity engineered into architecture, identity, endpoints, networks and operations — not bolted on after implementation.",
    },
  },
  {
    slug: "devops-automation",
    title: "DevOps & Automation",
    outcome: "Improve repeatability, deployment efficiency and engineering consistency.",
    businessRelevance:
      "Improve consistency, repeatability and delivery reliability through automation, deployment engineering and operational discipline.",
    considerations: [
      "Where manual work creates delay or error",
      "How changes are built, tested and released today",
      "Environment consistency across teams and stages",
      "Operational ownership of automated systems",
    ],
    capabilities: [
      "Infrastructure as code",
      "CI/CD pipeline engineering",
      "Configuration and patch automation",
      "Environment standardisation",
      "Operational runbooks and tooling",
    ],
    approach: [
      "Automate what is repeatable and high-risk first.",
      "Standardise environments before scaling them.",
      "Keep automation documented and owned.",
    ],
    outcomes: ["Faster, safer releases", "Consistent environments", "Less manual operational effort"],
    caseStudies: [],
    seo: {
      title: "DevOps & Infrastructure Automation",
      description:
        "DevOps and automation that improve consistency, repeatability and delivery reliability across your environments.",
    },
  },
  {
    slug: "managed-technology-operations",
    title: "Managed Technology Operations",
    outcome: "Operate, monitor and continuously improve business-critical environments.",
    businessRelevance:
      "Keep business-critical technology stable, visible and continuously improved through accountable operational ownership.",
    considerations: [
      "Which systems are business-critical",
      "What leadership needs visibility of",
      "How incidents, changes and lifecycles are managed today",
      "Where operations consume management attention",
    ],
    capabilities: [
      "Monitoring and alerting",
      "Operational support",
      "Patch, change and lifecycle management",
      "Reporting for business leaders",
      "Continuous optimisation",
    ],
    approach: [
      "Own the outcome, not only the ticket.",
      "Prevent recurring issues instead of repeatedly fixing them.",
      "Report in business terms, not only technical metrics.",
    ],
    outcomes: ["Stable, predictable operations", "Less management distraction", "Continuously improving environments"],
    caseStudies: ["scaling-from-day-1-to-400-employees"],
    seo: {
      title: "Managed Technology Operations",
      description:
        "Accountable managed technology operations that keep business-critical environments stable, visible and continuously improving.",
    },
  },
  {
    slug: "information-security-governance",
    title: "Information Security & Governance",
    outcome: "Align controls, governance and operational practices with business and compliance requirements.",
    businessRelevance:
      "Help organisations structure information security controls, governance and operational practices around business risk and recognised frameworks.",
    considerations: [
      "Business risk appetite and obligations",
      "Applicable frameworks such as ISO/IEC 27001",
      "Current controls, gaps and evidence",
      "Who owns each control in practice",
    ],
    capabilities: [
      "ISO/IEC 27001 readiness and alignment",
      "Risk assessment and treatment",
      "Policy and control design",
      "Operational control implementation",
      "Audit readiness support",
    ],
    approach: [
      "Start from business risk, not a checklist.",
      "Design controls that teams can realistically operate.",
      "Keep advisory and readiness work separate from certification activities.",
    ],
    outcomes: ["Clear, owned controls", "Audit-ready evidence", "Governance aligned with the business"],
    caseStudies: [],
    seo: {
      title: "Information Security & Governance",
      description:
        "Information security governance and ISO/IEC 27001 readiness structured around business risk and controls your teams can operate.",
    },
  },
  {
    slug: "os-platform-hardening",
    title: "OS & Platform Hardening",
    outcome: "Engineer hardened environments for enterprise and specialised operational use cases.",
    businessRelevance:
      "Engineer hardened operating system and platform configurations for enterprise and specialised environments where security, repeatability and operational stability are critical.",
    considerations: [
      "Operational constraints of the environment",
      "Security baselines and benchmarks that apply",
      "Application compatibility and vendor requirements",
      "How the hardened build will be maintained",
    ],
    capabilities: [
      "Secure configuration baselines",
      "Windows Enterprise and LTSC hardening",
      "Golden image engineering",
      "Specialised and industrial environments",
      "Validation and documentation",
    ],
    approach: [
      "Understand the operational use case first.",
      "Harden to recognised baselines, then validate against real workloads.",
      "Make builds repeatable and documented.",
    ],
    outcomes: ["Reduced attack surface", "Repeatable, stable builds", "Environments accepted by stakeholders"],
    caseStudies: ["industrial-automation-os-hardening"],
    seo: {
      title: "OS Hardening & Secure Configuration",
      description:
        "Hardened operating system and platform configurations for enterprise and specialised environments where stability and security are critical.",
    },
  },
];

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((c) => c.slug === slug);
}
