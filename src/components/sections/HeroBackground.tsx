"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./HeroBackground.module.css";

export interface VideoSource {
  src: string;
  type: string;
  media?: string;
}

interface HeroBackgroundProps {
  poster: string;
  sources: readonly VideoSource[];
}

/**
 * Decorative looping hero video. Pauses automatically for users who prefer reduced
 * motion and exposes a pause/play control (WCAG 2.2.2).
 */
export function HeroBackground({ poster, sources }: HeroBackgroundProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      (video.current as HTMLVideoElement).pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const el = video.current as HTMLVideoElement;
    if (playing) {
      el.pause();
    } else {
      void el.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <video
        ref={video}
        className={styles.video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        data-testid="hero-video"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} media={s.media} />
        ))}
      </video>
      <button type="button" className={styles.toggle} onClick={toggle} aria-pressed={!playing}>
        <Icon name={playing ? "pause" : "play"} size={16} />
        <span className="visually-hidden">{playing ? "Pause background video" : "Play background video"}</span>
      </button>
    </>
  );
}
