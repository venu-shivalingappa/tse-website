import { deliverEnquiry } from "./enquiry-delivery";
import type { Enquiry } from "./contact";

const enquiry: Enquiry = {
  name: "Asha",
  organisation: "Acme",
  role: "",
  email: "asha@acme.com",
  phone: "",
  stage: "Growing",
  message: "Scaling to a new site.",
  website: "",
};

describe("deliverEnquiry", () => {
  const original = process.env.CONTACT_WEBHOOK_URL;
  afterEach(() => {
    process.env.CONTACT_WEBHOOK_URL = original;
    jest.restoreAllMocks();
  });

  it("logs when no webhook is configured", async () => {
    delete process.env.CONTACT_WEBHOOK_URL;
    const info = jest.spyOn(console, "info").mockImplementation(() => {});
    const fetchImpl = jest.fn();
    await deliverEnquiry(enquiry, fetchImpl);
    expect(info).toHaveBeenCalled();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("posts to the webhook without the honeypot field", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://hooks.example.com/tse";
    const fetchImpl = jest.fn().mockResolvedValue({ ok: true });
    await deliverEnquiry(enquiry, fetchImpl);
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://hooks.example.com/tse");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ organisation: "Acme", source: "website-contact" });
    expect(body).not.toHaveProperty("website");
  });

  it("uses global fetch by default and throws on failure", async () => {
    process.env.CONTACT_WEBHOOK_URL = "https://hooks.example.com/tse";
    const fetchSpy = jest.fn().mockResolvedValue({ ok: false, status: 502 });
    global.fetch = fetchSpy as unknown as typeof fetch;
    await expect(deliverEnquiry(enquiry)).rejects.toThrow("502");
  });
});
