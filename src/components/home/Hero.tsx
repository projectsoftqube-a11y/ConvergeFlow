"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { useMotion } from "@/components/motion/useMotion";
import { getLenis } from "@/components/motion/SmoothScroll";
import { gsap } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { HOME_HERO, HOME_HERO_POINTS } from "@/content/site/home";
import { Icon } from "@/components/site/Icon";
import { Aurora } from "@/components/fx/Aurora";
import styles from "./Hero.module.css";

/**
 * Homepage hero: green and blue light roaming the whole hero and leaning
 * toward the pointer, a dot-grid spotlight under the pointer and a fine grain;
 * the headline tracks in from blur and a band of light sweeps across it.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Pointer spotlight position, set on the spotlight layer only (smoothed there by a CSS
  // transition) so a pointer move never restyles the rest of the hero.
  useEffect(() => {
    const el = ref.current;
    const spot = el?.querySelector<HTMLElement>("[data-spot]");
    if (!el || !spot) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      spot.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      spot.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  useMotion(ref, ({ motion }) => {
    const root = ref.current!;
    gsap.set(root.querySelectorAll("[data-intro]"), { opacity: 1 });
    if (!motion) return;
    // Paused until the loading screen lifts.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(root.querySelector("[data-aurora]"), { opacity: 0, scale: 1.15, duration: 2.6 }, 0)
      .from(root.querySelector("[data-pill]"), { opacity: 0, y: -14, filter: "blur(8px)", duration: 1.1, clearProps: "filter,transform" }, 0.15)
      .from(
        root.querySelectorAll("[data-line]"),
        { opacity: 0, yPercent: 35, filter: "blur(18px)", letterSpacing: "0.04em", duration: 1.7, stagger: 0.16, ease: "expo.out", clearProps: "filter,letterSpacing,transform" },
        0.3,
      )
      .from(root.querySelectorAll("[data-rise]"), { opacity: 0, y: 26, filter: "blur(10px)", duration: 1.2, stagger: 0.1, clearProps: "filter,transform" }, 1.0)
      // Keep inline opacity on intro targets: clearing it would let `.js [data-intro]` hide them again.
      .from(root.querySelector("[data-rail]"), { opacity: 0, y: 30, duration: 1.3, clearProps: "transform" }, 1.3);

    gsap.to(root.querySelector("[data-copy]"), {
      yPercent: -12,
      opacity: 0.1,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
    });
    return onSiteReady(() => tl.play());
  });

  // "Scroll to explore": glide to the content just below the hero, clear of the fixed header.
  const scrollPastHero = () => {
    const hero = ref.current;
    if (!hero) return;
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;
    const top = hero.getBoundingClientRect().bottom + window.scrollY - header;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(top, { duration: 1.4 });
    else window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="home-title">
      <div className={styles.bg} aria-hidden="true">
        {/* Green at half strength; the light roams the whole hero */}
        <span className={styles.aurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={styles.grid} />
        <span className={styles.spot} data-spot />
        <span className={styles.vignette} />
      </div>
      <span className={styles.grain} aria-hidden="true" />

      <div className={`container ${styles.copy}`} data-copy>
        <SmartLink href="/services/" className={styles.pill} data-intro data-pill>
          <span className={styles.pillMark} aria-hidden="true" />
          <span>{HOME_HERO.eyebrow}</span>
          <span className={styles.pillSep} aria-hidden="true" />
          <span className={styles.pillDim}>Dental &amp; medical</span>
          <span className={styles.pillGo} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" />
            </svg>
          </span>
        </SmartLink>

        <h1 id="home-title" className={styles.title} data-intro>
          <span className={styles.line} data-line>
            {HOME_HERO.title}
          </span>{" "}
          <span className={`${styles.line} ${styles.lineAccent}`} data-line>
            {HOME_HERO.accent}
          </span>
        </h1>

        <p className={styles.lead} data-intro data-rise>
          {HOME_HERO.lead}
        </p>

        <div className={styles.actions} data-intro data-rise>
          {HOME_HERO.actions.map((a, i) => (
            <ButtonLink key={a.href} href={a.href} variant={i === 0 ? "primary" : "secondary"}>
              {a.label}
            </ButtonLink>
          ))}
        </div>

        <ul className={styles.points} data-intro data-rise>
          {HOME_HERO_POINTS.map((p) => (
            <li key={p}>
              <span className={styles.pointIcon}>
                <Icon name="check" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.bar}`} data-intro data-rail>
        <p className={styles.metaLeft}>
          <span className={styles.liveDot} aria-hidden="true" />
          Starting with OpenDental
        </p>
        <button type="button" className={styles.metaRight} onClick={scrollPastHero}>
          Scroll <span>to explore</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 3v9.5M4 9l4 4 4-4" />
          </svg>
        </button>
      </div>
    </section>
  );
}
