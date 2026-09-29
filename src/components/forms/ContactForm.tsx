"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { focusElement } from "@/lib/focus";
import {
  BUSINESS_STAGES,
  EMPTY_ENQUIRY,
  validateEnquiry,
  type Enquiry,
  type EnquiryField,
  type FieldErrors,
} from "@/lib/contact";
import { Button } from "@/components/ui/Button";
import { Field } from "./Field";
import fieldStyles from "./Field.module.css";
import styles from "./ContactForm.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const TEXT_FIELDS: { name: EnquiryField; label: string; type: string; autoComplete: string; optional?: boolean }[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "organisation", label: "Organisation", type: "text", autoComplete: "organization" },
  { name: "role", label: "Role", type: "text", autoComplete: "organization-title", optional: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", optional: true },
];

/** Contact form (handoff §18.3). Short, thumb-friendly, errors linked to fields. */
export function ContactForm({ endpoint = "/api/contact" }: { endpoint?: string }) {
  const [values, setValues] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Move focus after React has committed the new UI (refs are null until then).
  useEffect(() => focusElement(summaryRef.current), [failedAttempts]);
  useEffect(() => focusElement(successRef.current), [status]);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFailedAttempts((n) => n + 1);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; errors?: FieldErrors };
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setFailedAttempts((n) => n + 1);
        throw new Error("Rejected");
      }
      setStatus("success");
      trackEvent({ name: "contact_submit", status: "success" });
    } catch {
      setStatus("error");
      trackEvent({ name: "contact_submit", status: "error" });
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className={styles.success} role="status">
        <h2 className={styles.successTitle}>Thank you — we have your message.</h2>
        <p>
          Your enquiry has reached the TSE team. Someone who understands both the business and the engineering will be
          in touch to continue the conversation.
        </p>
      </div>
    );
  }

  const errorEntries = Object.entries(errors) as [EnquiryField, string][];

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby="form-intro">
      <p id="form-intro" className={styles.intro}>
        All fields are required unless marked optional.
      </p>

      {errorEntries.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert">
          <h2 className={styles.summaryTitle}>Please check {errorEntries.length === 1 ? "one field" : `${errorEntries.length} fields`}</h2>
          <ul>
            {errorEntries.map(([field, message]) => (
              <li key={field}>
                <a href={`#field-${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "error" && (
        <p className={styles.serverError} role="alert">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}

      <div className={styles.grid}>
        {TEXT_FIELDS.map((f) => (
          <Field key={f.name} id={`field-${f.name}`} label={f.label} error={errors[f.name]} optional={f.optional}>
            {(describedBy) => (
              <input
                id={`field-${f.name}`}
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                className={fieldStyles.control}
                value={values[f.name]}
                onChange={update}
                aria-invalid={Boolean(errors[f.name])}
                aria-describedby={describedBy}
                required={!f.optional}
              />
            )}
          </Field>
        ))}

        <Field id="field-stage" label="Business stage" error={errors.stage}>
          {(describedBy) => (
            <select
              id="field-stage"
              name="stage"
              className={fieldStyles.control}
              value={values.stage}
              onChange={update}
              aria-invalid={Boolean(errors.stage)}
              aria-describedby={describedBy}
              required
            >
              <option value="">Choose a stage</option>
              {BUSINESS_STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field
        id="field-message"
        label="What are you trying to achieve?"
        hint="Tell us what your business does, where it is going and what concerns you."
        error={errors.message}
      >
        {(describedBy) => (
          <textarea
            id="field-message"
            name="message"
            rows={6}
            className={fieldStyles.control}
            value={values.message}
            onChange={update}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy}
            required
          />
        )}
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="field-website">Website</label>
        <input id="field-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
      </div>

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="lg" withArrow disabled={status === "submitting"} trackLabel="contact-submit">
          {status === "submitting" ? "Sending…" : "Start the Conversation"}
        </Button>
        <p className={styles.privacy}>
          We use your details only to respond to your enquiry. See our <a href="/privacy">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
