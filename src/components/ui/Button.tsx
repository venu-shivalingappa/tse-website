import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Icon } from "./Icon";
import styles from "./Button.module.css";

export type ButtonVariant = "hero" | "primary" | "secondary" | "onDark" | "text";

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "lg";
  withArrow?: boolean;
  /** Analytics label — emitted as a `cta_click` event (handoff §23). */
  trackLabel?: string;
  className?: string;
}

interface LinkProps extends CommonProps {
  href: string;
}

interface NativeButtonProps extends CommonProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export type ButtonProps = LinkProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", withArrow = false, trackLabel, className } = props;
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <Icon name="arrowRight" size={18} className={styles.arrow} />}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={classes} data-track={trackLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
      data-track={trackLabel}
    >
      {content}
    </button>
  );
}
