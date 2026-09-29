import { NextResponse } from "next/server";
import { isSpam, normaliseEnquiry, validateEnquiry } from "@/lib/contact";
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { createRateLimiter } from "@/lib/rate-limit";

const allow = createRateLimiter(5, 10 * 60 * 1000);

/** Contact enquiries — authoritative server-side validation and routing (handoff §24). */
export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!allow(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const enquiry = normaliseEnquiry(body);

  // Bots filling the honeypot get a normal-looking success and nothing is delivered.
  if (isSpam(enquiry)) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await deliverEnquiry(enquiry);
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return NextResponse.json({ ok: false, error: "We could not send your message." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
