"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { liveHref } from "@/content/navigation";
import type { Hero, Section, SitePage } from "@/content/site/types";
import { Aurora } from "@/components/fx/Aurora";
import { FloodLayer } from "@/components/fx/FloodLayer";
import { setFloodOrigin } from "@/components/fx/flood";
import { Icon } from "@/components/site/Icon";
import { SectionHead } from "@/components/site/Title";
import { ProcessRail } from "./ProcessRail";
import { StageStack } from "./StageStack";
import { pad } from "./stageMeta";
import styles from "./ServicesHub.module.css";

type Journey = Extract<Section, { kind: "journey" }>;
type Split = Extract<Section, { kind: "split" }>;
type Cards = Extract<Section, { kind: "cards" }>;

/** Props that make a card turn light on hover (with <FloodLayer /> inside it). */
const flood = { "data-flood": "", "data-glow": "", onPointerEnter: setFloodOrigin, onPointerLeave: setFloodOrigin };

/* ------------------------------------------------------------------ hero */

/** Home-style hero over drifting green and blue light; the white stage panel rises over its bottom edge. */
function HubHero({ hero }: { hero: Hero }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ motion }) => {
    const root = ref.current!;
    gsap.set(root.querySelectorAll("[data-intro]"), { opacity: 1 });
    if (!motion) return;
    // Paused until the loading screen lifts.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(root.querySelector("[data-aurora]"), { opacity: 0, scale: 1.15, duration: 2.4 }, 0)
      .from(root.querySelector("[data-eyebrow]"), { opacity: 0, y: -12, filter: "blur(8px)", duration: 1, clearProps: "filter,transform" }, 0.15)
      .from(root.querySelectorAll("[data-line]"), { opacity: 0, yPercent: 35, filter: "blur(18px)", duration: 1.6, stagger: 0.16, ease: "expo.out", clearProps: "filter,transform" }, 0.3)
      .from(root.querySelectorAll("[data-rise]"), { opacity: 0, y: 26, filter: "blur(10px)", duration: 1.2, stagger: 0.1, clearProps: "filter,transform" }, 0.95);
    return onSiteReady(() => tl.play());
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroAurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={styles.heroGrid} />
        <span className={styles.heroVignette} />
      </div>

      <div className={`container ${styles.heroCopy}`}>
        <p className="eyebrow" data-intro data-eyebrow>
          {hero.eyebrow}
        </p>
        <h1 id="page-title" className={styles.heroTitle} data-intro>
          <span className={styles.line} data-line>
            {hero.title}
          </span>{" "}
          {hero.accent && (
            <span className={`${styles.line} ${styles.lineAccent}`} data-line>
              {hero.accent}
            </span>
          )}
        </h1>
        <p className={styles.heroLead} data-intro data-rise>
          {hero.lead}
        </p>
        <div className={styles.heroActions} data-intro data-rise>
          {hero.actions
            .filter((a) => liveHref(a.href) || a.href.startsWith("#"))
            .map((a, i) => (
              <ButtonLink key={a.href} href={a.href} variant={i === 0 ? "primary" : "secondary"}>
                {a.label}
              </ButtonLink>
            ))}
        </div>
        {hero.facts && (
          <ul className={styles.heroFacts} data-intro data-rise>
            {hero.facts.map((f) => (
              <li key={f}>
                <span className={styles.factIcon} aria-hidden="true">
                  <Icon name="check" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- who does what */

export function WhoDoesWhat({ section }: { section: Split }) {
  return (
    <section className={`section ${styles.split}`} aria-labelledby="split-title">
      <div className="container">
        <SectionHead id="split-title" eyebrow={section.eyebrow} title={section.title} accent={section.accent} intro={section.intro} align="center" />
        <div className={styles.splitGrid} data-cards>
          <article className={`${styles.card} ${styles.panel}`} data-card {...flood}>
            <FloodLayer />
            <header className={styles.panelHead}>
              <span className={styles.cardIcon} aria-hidden="true">
                <Icon name="building" />
              </span>
              <h3 className={styles.panelTitle}>{section.practice.title}</h3>
            </header>
            <ul className={styles.panelList}>
              {section.practice.items.map((it) => (
                <li key={it}>
                  <span className={styles.tick} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </article>

          <div className={styles.handoff} aria-hidden="true">
            <span className={styles.handoffLine}>
              <i />
            </span>
            <span className={styles.handoffLabel}>Handoff</span>
          </div>

          <article className={`${styles.card} ${styles.panel} ${styles.panelTeam}`} data-card {...flood}>
            <FloodLayer />
            <header className={styles.panelHead}>
              <span className={`${styles.cardIcon} ${styles.markIcon}`} aria-hidden="true" />
              <h3 className={styles.panelTitle}>{section.team.title}</h3>
            </header>
            <ul className={styles.panelList}>
              {section.team.items.map((it) => (
                <li key={it}>
                  <span className={`${styles.tick} ${styles.tickOn}`} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  {it}
                </li>
              ))}
            </ul>
          </article>
        </div>
        {section.note && (
          <p className={styles.splitNote} data-anim="fade">
            <span aria-hidden="true" />
            {section.note}
          </p>
        )}
      </div>
    </section>
  );
}

/* ----------------------------------------------- with every service */

function EveryService({ section }: { section: Cards }) {
  return (
    <section className={`section ${styles.promise}`} aria-labelledby="promise-title">
      <Aurora green={0.5} className={styles.promiseAurora} />
      <div className="container">
        <SectionHead id="promise-title" eyebrow={section.eyebrow} title={section.title} accent={section.accent} intro={section.intro} align="center" />
        <ul className={styles.promiseGrid} data-cards>
          {section.items.map((it, i) => (
            <li key={it.title} className={`${styles.card} ${styles.promiseCard}`} data-card {...flood}>
              <FloodLayer />
              <div className={styles.cardTop}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon name={it.icon ?? "check"} />
                </span>
                <span className={styles.cardNum}>{pad(i + 1)}</span>
              </div>
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/**
 * The Services hub, laid out in the home page's language: the hero; the eight
 * stages on a white panel rising out of it; the three phases as stacking
 * cards; who does what; and what comes with every service. Cards turn light
 * (white, dark text, teal accents) on hover, flooding from the pointer.
 */
export function ServicesHub({ page }: { page: SitePage }) {
  const ref = useRef<HTMLDivElement>(null);
  const journey = page.sections.find((s): s is Journey => s.kind === "journey");
  const split = page.sections.find((s): s is Split => s.kind === "split");
  const cards = page.sections.find((s): s is Cards => s.kind === "cards");

  // Cards rise into place in sequence as each grid scrolls into view.
  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    gsap.utils.toArray<HTMLElement>("[data-cards]", ref.current).forEach((grid) => {
      gsap.from(grid.querySelectorAll("[data-card]"), {
        opacity: 0,
        y: 70,
        rotateX: 14,
        filter: "blur(8px)",
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        clearProps: "opacity,transform,filter",
        scrollTrigger: { trigger: grid, start: "top 85%", once: true },
      });
    });
  });

  return (
    <div ref={ref}>
      <HubHero hero={page.hero} />
      {journey && <ProcessRail groups={journey.groups} />}
      {journey && <StageStack section={journey} />}
      {split && <WhoDoesWhat section={split} />}
      {cards && <EveryService section={cards} />}
    </div>
  );
}
