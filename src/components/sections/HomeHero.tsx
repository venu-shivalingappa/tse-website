import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { homeHero, type HeroContent } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "./HeroBackground";
import styles from "./HomeHero.module.css";

interface HomeHeroProps {
  /** id of the section the "continue" button scrolls to. */
  nextId: string;
  content?: HeroContent;
}

/** Figma node 12:11 — "#HeroSection". */
export function HomeHero({ nextId, content = homeHero }: HomeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <HeroBackground poster={content.video.poster} sources={content.video.sources} />
      </div>
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Figma node 12:15 — Title */}
        <div className={styles.title}>
          <div className={styles.headline}>
            <h1 id="hero-title" className={styles.h1}>
              <span className={styles.h1Main}>{content.title}</span>
              <span className={styles.h1Sub}>{content.subtitle}</span>
            </h1>
            <p className={styles.body}>{content.body}</p>
          </div>
          {/* Figma node 24:8 */}
          <div className={styles.ctas}>
            <Button href={content.primaryCta.href} variant="hero" size="lg" trackLabel="hero-talk-to-tse">
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="text" size="lg" className={styles.secondary} trackLabel="hero-how-we-work">
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Figma node 15:158 — Quality / Ownership / Ethics */}
        <ul className={styles.pillars} aria-label="Built on">
          {content.pillars.map((p) => (
            <li key={p.label}>
              <Link href="#principles" className={styles.pillar}>
                <span>{p.label}</span>
                <span className={styles.pillarIcon} aria-hidden="true">
                  <span
                    className={cx(styles.pillarGlyph, styles[p.variant])}
                    style={p.mask ? { maskImage: `url("${p.mask}")`, WebkitMaskImage: `url("${p.mask}")` } : undefined}
                  >
                    <Image src={p.icon} alt="" fill unoptimized />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Figma node 12:13 — "Button continue" */}
      <a href={`#${nextId}`} className={styles.continue}>
        <Image src="/figma/arrow-down.svg" alt="" width={24} height={24} unoptimized />
        <span className="visually-hidden">Continue to next section</span>
      </a>
    </section>
  );
}
