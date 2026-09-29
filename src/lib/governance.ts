/**
 * Claim governance (handoff §4 and §25).
 * Every metric, case study or claim carries an approval state. Anything still
 * "pending" is hidden on the public site unless a review build opts in.
 */
export type ApprovalStatus = "approved" | "pending";

export interface Governed {
  approval: ApprovalStatus;
}

export function showPendingClaims(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_PENDING_CLAIMS === "true";
}

export function isPublishable(item: Governed, preview: boolean = showPendingClaims()): boolean {
  return item.approval === "approved" || preview;
}

export function publishable<T extends Governed>(items: readonly T[], preview?: boolean): T[] {
  return items.filter((item) => isPublishable(item, preview));
}
