import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/cx";
import { site } from "@/content/site";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Show the "Ignite Innovations" tagline (Figma node 13:115). */
  withTagline?: boolean;
  className?: string;
}

/**
 * TSE wordmark, composed exactly as in Figma node 13:80 ("Asset 1 2"):
 * the mark plus the TECH / SOLVE / ENGINE layers positioned by percentage insets.
 */
export function Logo({ withTagline = true, className }: LogoProps) {
  return (
    <Link href="/" className={cx(styles.logo, className)} aria-label={`${site.name} — home`}>
      <span className={styles.mark} aria-hidden="true">
        <span className={cx(styles.layer, styles.engine)}>
          <Image src="/figma/logo-g1.svg" alt="" fill unoptimized priority />
        </span>
        <span className={cx(styles.layer, styles.solve)}>
          <Image src="/figma/logo-g2.svg" alt="" fill unoptimized priority />
        </span>
        <span className={cx(styles.layer, styles.tech)}>
          <Image src="/figma/logo-g3.svg" alt="" fill unoptimized priority />
        </span>
        <span className={cx(styles.layer, styles.symbol)}>
          <Image src="/figma/logo-mark.svg" alt="" fill unoptimized priority />
        </span>
      </span>
      {withTagline && (
        <span className={styles.tagline} aria-hidden="true">
          {site.tagline}
        </span>
      )}
    </Link>
  );
}
