import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page has moved or no longer exists." lead={<p>Let us get you back on course.</p>}>
      <Button href="/" variant="hero" size="lg">
        Back to home
      </Button>
      <Button href="/contact" variant="onDark" size="lg">
        Talk to TSE
      </Button>
    </PageHero>
  );
}
