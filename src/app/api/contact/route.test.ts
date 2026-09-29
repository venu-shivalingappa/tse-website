/**
 * @jest-environment node
 */
import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { POST } from "./route";

jest.mock("@/lib/enquiry-delivery", () => ({ deliverEnquiry: jest.fn() }));
const deliver = deliverEnquiry as jest.MockedFunction<typeof deliverEnquiry>;

const valid = {
  name: "Asha",
  organisation: "Acme",
  role: "CEO",
  email: "asha@acme.com",
  phone: "",
  stage: "Growing",
  message: "Opening a second office.",
};

let ipCounter = 0;
function request(body: unknown, ip: string | null = `10.0.0.${++ipCounter}`, raw?: string) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (ip) headers["x-forwarded-for"] = `${ip}, 172.16.0.1`;
  return new Request("http://localhost/api/contact", { method: "POST", headers, body: raw ?? JSON.stringify(body) });
}

describe("POST /api/contact", () => {
  beforeEach(() => deliver.mockReset().mockResolvedValue(undefined));

  it("accepts a valid enquiry and delivers it", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(deliver).toHaveBeenCalledWith(expect.objectContaining({ organisation: "Acme" }));
  });

  it("rejects malformed JSON", async () => {
    const res = await POST(request(null, undefined, "{not json"));
    expect(res.status).toBe(400);
  });

  it("returns field errors from server-side validation", async () => {
    const res = await POST(request({ ...valid, email: "bad" }));
    expect(res.status).toBe(422);
    expect((await res.json()).errors.email).toMatch(/valid email/);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const res = await POST(request({ ...valid, website: "spam" }));
    expect(res.status).toBe(200);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("reports delivery failures", async () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    deliver.mockRejectedValue(new Error("down"));
    const res = await POST(request(valid));
    expect(res.status).toBe(500);
    error.mockRestore();
  });

  it("rate-limits repeated requests from one client, including unknown IPs", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await POST(request(valid, null))).status);
    expect(statuses.slice(0, 5)).toEqual([200, 200, 200, 200, 200]);
    expect(statuses[5]).toBe(429);
  });
});
