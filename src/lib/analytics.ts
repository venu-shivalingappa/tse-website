/**
 * Privacy-respecting analytics (handoff §23/§24).
 * Events are pushed to a first-party `dataLayer`; no third-party script is loaded here.
 * Any tag manager added later must honour consent before reading it.
 */
export type AnalyticsEvent =
  | { name: "cta_click"; label: string; href?: string }
  | { name: "scroll_depth"; percent: number }
  | { name: "contact_submit"; status: "success" | "error" }
  | { name: "nav_open" };

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  const { name, ...params } = event;
  w.dataLayer.push({ event: name, ...params });
}

export const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

/** Returns milestones reached by `percent` that have not been reported yet. */
export function nextMilestones(percent: number, reported: ReadonlySet<number>): number[] {
  return SCROLL_MILESTONES.filter((m) => percent >= m && !reported.has(m));
}
