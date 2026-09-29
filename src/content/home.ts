export interface HeroPillar {
  label: string;
  icon: string;
  /** Figma clip-path mask, where the design uses one. */
  mask?: string;
  variant: "quality" | "ownership" | "ethics";
}

export interface HeroContent {
  title: string;
  subtitle: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  pillars: HeroPillar[];
  video: { poster: string; sources: { src: string; type: string; media?: string }[] };
}

/** Homepage copy (handoff §7–§9). Hero copy follows the approved Figma hero (node 12:11). */
export const homeHero: HeroContent = {
  title: "Build Your Business",
  subtitle: "We'll take ownership of the technology.",
  body: "From your first technology decision to complex systems already in place, TSE helps you plan, build, secure, operate and scale around what your business actually needs.",
  primaryCta: { label: "Talk to TSE", href: "/contact" },
  secondaryCta: { label: "See How We Work", href: "/how-we-work" },
  pillars: [
    { label: "Quality", icon: "/figma/quality.svg", mask: "/figma/quality-mask.svg", variant: "quality" },
    { label: "Ownership", icon: "/figma/ownership.svg", variant: "ownership" },
    { label: "Ethics", icon: "/figma/ethics.svg", mask: "/figma/ethics-mask.svg", variant: "ethics" },
  ],
  video: {
    poster: "/media/hero-poster.jpg",
    sources: [
      { src: "/media/hero-720.mp4", type: "video/mp4", media: "(max-width: 767px)" },
      { src: "/media/hero-1080.webm", type: "video/webm" },
      { src: "/media/hero-1080.mp4", type: "video/mp4" },
    ],
  },
};

export const entryPoints = {
  title: "The Right Time to Build Your Technology Foundation? Day 1.",
  lead: "When technology decisions are made early and aligned with the business plan, organisations can avoid unnecessary rebuilding, hidden costs, productivity losses, security gaps and scaling problems later.",
  cards: [
    {
      label: "Starting a Business",
      title: "Build correctly from the beginning.",
      body: "Starting a company? Bring us in from Day 1.",
      href: "/contact",
      cta: "Start on Day 1",
    },
    {
      label: "Scaling an Existing Business",
      title: "Assess. Correct. Modernise. Scale.",
      body: "Already running one? We will understand where you are going, assess what you have today and engineer what needs to change.",
      href: "/how-we-work",
      cta: "See how we assess",
    },
  ],
};

export const businessFirst = {
  title: "We Don't Start With Technology. We Start With Your Business.",
  body: "Before recommending infrastructure, cloud, cybersecurity or any other technology, we first understand your vision, business plan, current stage, growth expectations, operational risks and what technology must enable. Only then do we design the architecture.",
  considerations: ["Vision", "Business plan", "Current stage", "Growth expectations", "Operational risks", "What technology must enable"],
};

export const businessImpact = {
  title: "Technology Problems Become Business Problems.",
  body: "Poor technology decisions rarely appear on a balance sheet as “bad IT.” They appear as lost productivity, employee downtime, unnecessary capital expenditure, duplicate subscriptions, security exposure, poor scalability, delayed projects and management distraction.",
  close: "Our role is to reduce those hidden costs before they become normal operating behaviour.",
  costs: [
    "Lost productivity",
    "Employee downtime",
    "Unnecessary capital expenditure",
    "Duplicate subscriptions",
    "Security exposure",
    "Poor scalability",
    "Delayed projects",
    "Management distraction",
  ],
};

export const safeHands = {
  title: "Your Technology Should Be One Less Thing to Worry About.",
  body: "Business leaders have enough to focus on. Technology should not continuously demand management attention because of instability, poor planning or avoidable risk.",
  close: "Our goal is simple: give you the confidence that your technology is in safe hands.",
};

export const finalCta = {
  title: "Where Is Your Business Going Next?",
  body: "Tell us what you are building, where you want to go and what is getting in the way. We will start there.",
};
