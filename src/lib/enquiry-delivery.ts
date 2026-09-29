import type { Enquiry } from "./contact";

/**
 * Routes a validated enquiry to TSE's internal mailbox / CRM (handoff §24).
 * Configure CONTACT_WEBHOOK_URL (server-only) to forward enquiries; without it
 * the enquiry is logged server-side so nothing is silently lost in development.
 */
export async function deliverEnquiry(enquiry: Enquiry, fetchImpl: typeof fetch = fetch): Promise<void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const { website: _honeypot, ...payload } = enquiry;
  void _honeypot;
  const record = { ...payload, receivedAt: new Date().toISOString(), source: "website-contact" };

  if (!webhook) {
    console.info("[contact] enquiry received (no CONTACT_WEBHOOK_URL configured)", {
      organisation: record.organisation,
      stage: record.stage,
    });
    return;
  }

  const res = await fetchImpl(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  });
  if (!res.ok) throw new Error(`Enquiry webhook responded ${res.status}`);
}
