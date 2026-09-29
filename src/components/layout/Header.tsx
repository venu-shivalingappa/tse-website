"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { trackEvent } from "@/lib/analytics";
import { focusElement } from "@/lib/focus";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";
import styles from "./Header.module.css";

export const SCROLL_THRESHOLD = 24;

/** Figma node 12:27 — transparent over the hero, sticky with a solid surface after scroll. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    setOpen(true);
    trackEvent({ name: "nav_open" });
  };

  const closeMenu = useCallback(() => {
    setOpen(false);
    focusElement(menuButton.current);
  }, []);

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)} data-scrolled={scrolled}>
      <div className={styles.inner}>
        <Logo />
        <div className={styles.actions}>
          <Button
            href={site.primaryCta.href}
            variant="hero"
            className={cx(styles.cta, scrolled && styles.ctaVisible)}
            trackLabel="header-talk-to-tse"
          >
            {site.primaryCta.label}
          </Button>
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={openMenu}
          >
            <span className={styles.menuIcon}>
              <Image src="/figma/menu.svg" alt="" width={24} height={24} unoptimized />
            </span>
            <span className="visually-hidden">Open menu</span>
          </button>
        </div>
      </div>
      <NavMenu id="site-menu" open={open} onClose={closeMenu} />
    </header>
  );
}
