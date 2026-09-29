import { EMPTY_ENQUIRY, isSpam, normaliseEnquiry, validateEnquiry, type Enquiry } from "./contact";

const valid: Enquiry = {
  name: "Asha",
  organisation: "Acme",
  role: "CEO",
  email: "asha@acme.com",
  phone: "+91 98765 43210",
  stage: "Growing",
  message: "We are opening a second office.",
  website: "",
};

describe("normaliseEnquiry", () => {
  it("trims strings and drops non-string values", () => {
    expect(normaliseEnquiry({ name: "  Asha ", email: 42 })).toMatchObject({ name: "Asha", email: "" });
  });

  it("handles non-object input", () => {
    expect(normaliseEnquiry(null)).toEqual(EMPTY_ENQUIRY);
    expect(normaliseEnquiry("nope")).toEqual(EMPTY_ENQUIRY);
  });
});

describe("validateEnquiry", () => {
  it("accepts a valid enquiry", () => {
    expect(validateEnquiry(valid)).toEqual({});
    expect(validateEnquiry({ ...valid, phone: "" })).toEqual({});
  });

  it("requires the mandatory fields", () => {
    expect(Object.keys(validateEnquiry(EMPTY_ENQUIRY)).sort()).toEqual(["email", "message", "name", "organisation", "stage"]);
  });

  it("validates formats", () => {
    const errors = validateEnquiry({ ...valid, email: "nope", phone: "abc", stage: "Unknown", message: "short" });
    expect(errors.email).toMatch(/valid email/);
    expect(errors.phone).toMatch(/valid phone/);
    expect(errors.stage).toMatch(/listed stages/);
    expect(errors.message).toMatch(/at least 10/);
  });

  it("enforces length limits", () => {
    expect(validateEnquiry({ ...valid, name: "x".repeat(101) }).name).toMatch(/under 100/);
    expect(validateEnquiry({ ...valid, message: "x".repeat(3001) }).message).toMatch(/under 3000/);
  });
});

it("flags honeypot submissions as spam", () => {
  expect(isSpam(valid)).toBe(false);
  expect(isSpam({ ...valid, website: "http://spam" })).toBe(true);
});
