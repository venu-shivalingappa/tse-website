import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Section } from "@/components/ui/Section";
import { Split } from "@/components/ui/Split";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about the business first. You do not need to know what technology you need before contacting Tech Solve Engine.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell Us About the Business First."
        crumbs={[{ name: "Contact", href: "/contact" }]}
        lead={
          <p>
            You do not need to know what technology solution you need before contacting us. Tell us what your business does,
            where it is going, what you are trying to solve and what concerns you. We will start there.
          </p>
        }
      />
      <Section labelledBy="contact-form-title">
        <Split
          aside={
            <div className={shared.stack}>
              <h2 id="contact-form-title" className={shared.statement}>
                Start the conversation.
              </h2>
              <p className={shared.largeCopy}>
                Prefer email? Write to{" "}
                <a className={shared.accent} href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
                .
              </p>
            </div>
          }
        >
          <ContactForm />
        </Split>
      </Section>
    </>
  );
}
