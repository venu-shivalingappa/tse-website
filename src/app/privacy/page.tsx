import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Tech Solve Engine collects, uses and protects personal information shared through this website.",
  path: "/privacy",
});

// DRAFT — requires legal review before launch (handoff §26 quality gate).
export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" crumbs={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <Section container="narrow" labelledBy="page-title">
        <Prose>
          <p>
            This policy explains how {site.name} (“TSE”, “we”) handles personal information shared with us through this
            website.
          </p>
          <h2>Information we collect</h2>
          <p>
            When you contact us, we collect the details you choose to provide: your name, organisation, role, email address,
            phone number, business stage and your message.
          </p>
          <h2>How we use it</h2>
          <p>
            We use this information only to respond to your enquiry and continue the conversation you started. We do not
            sell personal information.
          </p>
          <h2>Analytics</h2>
          <p>
            We measure aggregate website usage — such as page engagement and scroll depth — in a privacy-respecting way to
            improve the site. We do not use this information to identify you.
          </p>
          <h2>Retention and your rights</h2>
          <p>
            We keep enquiry information only as long as needed for the purpose it was shared. You may ask us to access,
            correct or delete your information at any time by writing to{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
