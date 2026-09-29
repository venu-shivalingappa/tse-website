import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms governing the use of the Tech Solve Engine website.",
  path: "/terms",
});

// DRAFT — requires legal review before launch (handoff §26 quality gate).
export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" crumbs={[{ name: "Terms of Use", href: "/terms" }]} />
      <Section container="narrow" labelledBy="page-title">
        <Prose>
          <p>By using this website you agree to these terms.</p>
          <h2>Content</h2>
          <p>
            Content on this website is provided for general information about {site.name} and its services. It does not
            constitute professional advice for any specific situation.
          </p>
          <h2>Certification services</h2>
          <p>
            Nothing on this website should be read as an offer of certification services. TSE&apos;s advisory, readiness and
            engineering services are separate from any certification-body activity.
          </p>
          <h2>Intellectual property</h2>
          <p>The TSE name, logo and website content are the property of {site.name} and may not be reused without permission.</p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </Prose>
      </Section>
    </>
  );
}
