"use client";

import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PageHero eyebrow="Something went wrong" title="We could not load this page." lead={<p>Please try again in a moment.</p>}>
      <Button onClick={reset} variant="hero" size="lg">
        Try again
      </Button>
      <Button href="/" variant="onDark" size="lg">
        Back to home
      </Button>
    </PageHero>
  );
}
