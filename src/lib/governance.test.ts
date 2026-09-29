import { isPublishable, publishable, showPendingClaims } from "./governance";
import { withPreview } from "@/test-utils/env";

describe("governance", () => {
  const approved = { approval: "approved" as const, id: 1 };
  const pending = { approval: "pending" as const, id: 2 };

  it("reads the preview flag from the environment", () => {
    const restore = withPreview(true);
    expect(showPendingClaims()).toBe(true);
    process.env.NEXT_PUBLIC_SHOW_PENDING_CLAIMS = "false";
    expect(showPendingClaims()).toBe(false);
    restore();
  });

  it("always publishes approved items and pending items only in preview", () => {
    expect(isPublishable(approved, false)).toBe(true);
    expect(isPublishable(pending, false)).toBe(false);
    expect(isPublishable(pending, true)).toBe(true);
  });

  it("defaults to the environment flag", () => {
    const restore = withPreview(false);
    expect(isPublishable(pending)).toBe(false);
    expect(publishable([approved, pending])).toEqual([approved]);
    restore();
    const restore2 = withPreview(true);
    expect(publishable([approved, pending])).toEqual([approved, pending]);
    restore2();
  });
});
