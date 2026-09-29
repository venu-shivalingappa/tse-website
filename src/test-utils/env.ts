/** Sets NEXT_PUBLIC_SHOW_PENDING_CLAIMS for the duration of a test. */
export function withPreview(value: boolean): () => void {
  const previous = process.env.NEXT_PUBLIC_SHOW_PENDING_CLAIMS;
  process.env.NEXT_PUBLIC_SHOW_PENDING_CLAIMS = String(value);
  return () => {
    process.env.NEXT_PUBLIC_SHOW_PENDING_CLAIMS = previous;
  };
}
