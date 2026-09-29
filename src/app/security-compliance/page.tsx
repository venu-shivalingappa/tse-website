import type { Metadata } from "next";
import { complianceRecord, nabcbStatus } from "@/content/metrics";
import { isPublishable, showPendingClaims } from "@/lib/governance";
import { pageMetadata } from "@/lib/metadata";
import { CheckList } from "@/components/ui/CheckList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComplianceNotice } from "@/components/sections/ComplianceNotice";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import shared from "@/styles/shared.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Security & Compliance",
  description:
    "Security designed into the business: architecture, identity, configuration, governance and operations working together, with ISO/IEC 27001 readiness.",
  path: "/security-compliance",
});

const areas = [
  "Security architecture",
  "Identity and access",
  "Infrastructure security",
  "Endpoint security",
  "OS hardening",
  "Governance",
  "Risk",
  "ISO/IEC 27001 readiness / alignment",
  "Operational controls",
];

export default function SecurityCompliancePage() {
  const preview = showPendingClaims();
  const showRecord = isPublishable(complianceRecord, preview);
  const showNabcb = isPublishable(nabcbStatus, preview);

  return (
    <>
      <PageHero
        eyebrow="Security & compliance"
        title="Security Should Be Designed Into the Business."
        crumbs={[{ name: "Security & Compliance", href: "/security-compliance" }]}
        lead={
          <p>
            Security is not a firewall, product or annual audit. It is the outcome of architecture, configuration, identity,
            governance, operations and disciplined engineering working together.
          </p>
        }
      />

      <Section labelledBy="areas-title">
        <SectionHeading
          id="areas-title"
          eyebrow="Advisory, readiness & engineering"
          title="Core capability areas."
          lead={<p>What TSE designs, engineers and operates for your organisation.</p>}
        />
        <CheckList items={areas} columns={3} />
        {showRecord && (
          <div className={shared.more}>
            <ComplianceNotice
              title="Compliance record"
              status="Track record"
              wording={complianceRecord.text}
              pending={complianceRecord.approval === "pending"}
            />
          </div>
        )}
      </Section>

      {showNabcb && (
        <Section tone="warm" labelledBy="assurance-title">
          <SectionHeading
            id="assurance-title"
            eyebrow="A distinct assurance journey"
            title="Certification-body activities are separate from our consulting."
            lead={
              <p>
                TSE&apos;s advisory, readiness and engineering services are not certification services. Any certification
                activity is a separate journey with its own independence and impartiality requirements.
              </p>
            }
          />
          <ComplianceNotice
            title="NABCB accreditation — ISO/IEC 27001"
            status={nabcbStatus.status}
            wording={nabcbStatus.approvedWording}
            disclaimer="Certification services are not currently offered. This statement will be updated only after the accreditation outcome is confirmed."
            pending={nabcbStatus.approval === "pending"}
          />
        </Section>
      )}

      <CtaBand title="Is security designed into your business?" body="Tell us what you need to protect and what concerns you. We will start there." />
    </>
  );
}
