"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { focusElement } from "@/lib/focus";
import { primaryNav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./NavMenu.module.css";

interface NavMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

/**
 * Full-height menu (handoff §5): primary CTA visible without nesting, simple
 * disclosure for "What We Build", no mega-menu. Escape and backdrop close it.
 */
export function NavMenu({ id, open, onClose }: NavMenuProps) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!open) return;
    focusElement(closeButton.current);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={cx(styles.overlay, open && styles.open)} hidden={!open}>
      <div className={styles.backdrop} onClick={onClose} data-testid="menu-backdrop" />
      <div id={id} role="dialog" aria-modal="true" aria-label="Site menu" className={styles.panel}>
        <div className={styles.top}>
          <Button href={site.primaryCta.href} variant="hero" trackLabel="menu-talk-to-tse">
            {site.primaryCta.label}
          </Button>
          <button ref={closeButton} type="button" className={styles.close} onClick={onClose}>
            <Icon name="close" size={24} />
            <span className="visually-hidden">Close menu</span>
          </button>
        </div>

        <nav aria-label="Primary">
          <ul className={styles.list}>
            {primaryNav.map((item) => (
              <li key={item.href} className={styles.item}>
                {item.children ? (
                  <>
                    <div className={styles.row}>
                      <Link href={item.href} className={styles.link} onClick={onClose}>
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className={styles.toggle}
                        aria-expanded={expanded}
                        aria-controls={`${id}-sub`}
                        onClick={() => setExpanded((v) => !v)}
                      >
                        <Icon name="chevronDown" size={22} className={cx(styles.chevron, expanded && styles.rotated)} />
                        <span className="visually-hidden">{`${expanded ? "Hide" : "Show"} ${item.label} capabilities`}</span>
                      </button>
                    </div>
                    <ul id={`${id}-sub`} className={styles.sub} hidden={!expanded}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.subLink} onClick={onClose}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={item.href} className={styles.link} onClick={onClose}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.footnote}>{site.positioning}</p>
      </div>
    </div>
  );
}
