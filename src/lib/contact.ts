/**
 * Contact enquiry model + validation (handoff §18.3, §24).
 * Shared by the client form (instant feedback) and the API route (authoritative server-side check).
 */
export const BUSINESS_STAGES = ["Starting", "Growing", "Established", "Expanding", "Transforming"] as const;
export type BusinessStage = (typeof BUSINESS_STAGES)[number];

export interface Enquiry {
  name: string;
  organisation: string;
  role: string;
  email: string;
  phone: string;
  stage: string;
  message: string;
  /** Honeypot — must stay empty. */
  website?: string;
}

export type EnquiryField = Exclude<keyof Enquiry, "website">;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export const EMPTY_ENQUIRY: Enquiry = {
  name: "",
  organisation: "",
  role: "",
  email: "",
  phone: "",
  stage: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

const LIMITS: Record<EnquiryField, number> = {
  name: 100,
  organisation: 150,
  role: 100,
  email: 200,
  phone: 20,
  stage: 20,
  message: 3000,
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Coerces unknown input (e.g. a JSON body) into a trimmed Enquiry. */
export function normaliseEnquiry(input: unknown): Enquiry {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    name: str(src.name),
    organisation: str(src.organisation),
    role: str(src.role),
    email: str(src.email),
    phone: str(src.phone),
    stage: str(src.stage),
    message: str(src.message),
    website: str(src.website),
  };
}

export function validateEnquiry(e: Enquiry): FieldErrors {
  const errors: FieldErrors = {};
  if (!e.name) errors.name = "Please tell us your name.";
  if (!e.organisation) errors.organisation = "Please tell us your organisation.";
  if (!e.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(e.email)) errors.email = "Please enter a valid email address, like name@company.com.";
  if (e.phone && !PHONE_RE.test(e.phone)) errors.phone = "Please enter a valid phone number.";
  if (!e.stage) errors.stage = "Please choose the stage that best describes your business.";
  else if (!(BUSINESS_STAGES as readonly string[]).includes(e.stage)) errors.stage = "Please choose one of the listed stages.";
  if (!e.message) errors.message = "Tell us briefly what you are trying to achieve.";
  else if (e.message.length < 10) errors.message = "Please add a little more detail (at least 10 characters).";

  (Object.keys(LIMITS) as EnquiryField[]).forEach((field) => {
    if (!errors[field] && e[field].length > LIMITS[field]) {
      errors[field] = `Please keep this under ${LIMITS[field]} characters.`;
    }
  });
  return errors;
}

export function isSpam(e: Enquiry): boolean {
  return Boolean(e.website);
}
