interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Structured data (Organisation, Article, Breadcrumb — handoff §23). */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
