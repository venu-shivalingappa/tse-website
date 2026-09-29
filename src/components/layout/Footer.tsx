import Link from "next/link";
import { footerNav, legalNav, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import styles from "./Footer.module.css";

export function Footer({ year = new Date().getFullYear() }: { year?: number }) {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo />
            <p className={styles.positioning}>{site.positioning}</p>
            <a className={styles.email} href={`mailto:${site.contact.email}`}>
              <Icon name="mail" size={18} />
              {site.contact.email}
            </a>
          </div>
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className={styles.group}>
              <h2 className={styles.heading}>{group.heading}</h2>
              <ul className={styles.links}>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.bottom}>
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className={styles.legal}>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
