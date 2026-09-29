"use client";

import { useEffect } from "react";
import { nextMilestones, trackEvent } from "@/lib/analytics";

/**
 * Site-wide analytics hooks (handoff §23): CTA clicks via `data-track`
 * attributes and scroll-depth milestones. Renders nothing.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const reported = new Set<number>();

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-track]");
      if (!el) return;
      trackEvent({ name: "cta_click", label: el.dataset.track as string, href: el.getAttribute("href") ?? undefined });
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100;
      nextMilestones(percent, reported).forEach((m) => {
        reported.add(m);
        trackEvent({ name: "scroll_depth", percent: m });
      });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
