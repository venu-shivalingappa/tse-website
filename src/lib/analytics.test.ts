import { nextMilestones, SCROLL_MILESTONES, trackEvent } from "./analytics";

type W = Window & { dataLayer?: Record<string, unknown>[] };

describe("analytics", () => {
  afterEach(() => {
    delete (window as W).dataLayer;
  });

  it("creates the dataLayer and pushes events", () => {
    trackEvent({ name: "cta_click", label: "hero", href: "/contact" });
    expect((window as W).dataLayer).toEqual([{ event: "cta_click", label: "hero", href: "/contact" }]);
  });

  it("appends to an existing dataLayer", () => {
    (window as W).dataLayer = [{ event: "existing" }];
    trackEvent({ name: "nav_open" });
    expect((window as W).dataLayer).toHaveLength(2);
  });

  it("returns unreported milestones only", () => {
    expect(SCROLL_MILESTONES).toEqual([25, 50, 75, 100]);
    expect(nextMilestones(60, new Set([25]))).toEqual([50]);
    expect(nextMilestones(10, new Set())).toEqual([]);
  });
});
