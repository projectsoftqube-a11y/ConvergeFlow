"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { liveHref } from "@/content/navigation";
import { JOURNEY, STAGES } from "@/content/site/services";
import { STAGE_PHOTOS } from "@/content/site/stagePhotos";
import type { Section, SitePage } from "@/content/site/types";
import { Rich } from "@/components/content/Rich";
import { Aurora } from "@/components/fx/Aurora";
import { FloodLayer } from "@/components/fx/FloodLayer";
import { setFloodOrigin } from "@/components/fx/flood";
import { Icon } from "@/components/site/Icon";
import { PaperDoc } from "@/components/site/Paper";
import { SiteSection } from "@/components/site/Sections";
import { SectionHead } from "@/components/site/Title";
import { WhoDoesWhat } from "./ServicesHub";
import { AnatomyShowcase, BalanceShowcase, CadenceShowcase, StageStatement } from "./StageFeatures";
import { STAGE_ICONS, pad } from "./stageMeta";
import styles from "./StagePage.module.css";

type Of<K extends Section["kind"]> = Extract<Section, { kind: K }>;

/** Props that make a card turn light on hover (with <FloodLayer /> inside it). */
const flood = { "data-flood": "", "data-glow": "", onPointerEnter: setFloodOrigin, onPointerLeave: setFloodOrigin };
const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ hero */

/**
 * Stage hero: the stage number, huge and outlined, as a watermark behind the
 * headline (it draws in, then a light runs through its outline); on the right
 * the stage's photo with the eight stages along its foot, a slowly turning
 * seal at its corner, and its illustrative document docked over its lower
 * left; the group leans toward the pointer. Drifting green and blue light behind.
 */
function StageHero({ page, i }: { page: SitePage; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const hero = page.hero;
  const photo = STAGE_PHOTOS[i];
  const doc = hero.visual.kind === "document" ? hero.visual.doc : null;
  const num = pad(i + 1);

  useMotion(ref, ({ motion, desktop }) => {
    const root = ref.current!;
    gsap.set(root.querySelectorAll("[data-intro]"), { opacity: 1 });
    if (!motion) return;
    // Paused until the loading screen lifts.
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, paused: true });
    tl.from(root.querySelector("[data-aurora]"), { opacity: 0, scale: 1.15, duration: 2.4 }, 0)
      .from(root.querySelectorAll("[data-digit]"), { opacity: 0, yPercent: 30, scale: 0.85, filter: "blur(20px)", duration: 1.8, stagger: 0.14, ease: "expo.out", clearProps: "filter,transform" }, 0.1)
      .from(root.querySelectorAll("[data-chip]"), { opacity: 0, y: -12, filter: "blur(8px)", duration: 1, stagger: 0.08, clearProps: "filter,transform" }, 0.4)
      .from(root.querySelectorAll("[data-line]"), { opacity: 0, yPercent: 35, filter: "blur(18px)", duration: 1.6, stagger: 0.16, ease: "expo.out", clearProps: "filter,transform" }, 0.5)
      .from(root.querySelectorAll("[data-rise]"), { opacity: 0, y: 26, filter: "blur(10px)", duration: 1.2, stagger: 0.1, clearProps: "filter,transform" }, 1.0)
      .from(root.querySelector("[data-photo]"), { opacity: 0, y: 60, scale: 0.94, duration: 1.6, ease: "expo.out", clearProps: "transform" }, 0.5)
      .from(root.querySelector("[data-photo-img]"), { scale: 1.25, duration: 2.4, ease: "expo.out", clearProps: "transform" }, 0.5)
      .from(root.querySelector("[data-doc]"), { opacity: 0, x: -60, y: 30, duration: 1.4, ease: "expo.out", clearProps: "transform" }, 0.9)
      .from(root.querySelector("[data-seal]"), { opacity: 0, scale: 0.4, rotate: -120, duration: 1.4, ease: "back.out(1.6)", clearProps: "transform" }, 1.1)
      .from(root.querySelectorAll("[data-seg]"), { scaleX: 0, transformOrigin: "left center", duration: 0.6, stagger: 0.06, clearProps: "transform" }, 1.3);

    // (Intro targets keep their inline opacity: clearing it would let `.js [data-intro]` hide them again.)

    // The stack leans toward the pointer (desktop).
    const stack = root.querySelector<HTMLElement>("[data-stack]");
    let onMove: ((e: PointerEvent) => void) | null = null;
    if (desktop && stack) {
      const rx = gsap.quickTo(stack, "rotationX", { duration: 0.9, ease: "power3.out" });
      const ry = gsap.quickTo(stack, "rotationY", { duration: 0.9, ease: "power3.out" });
      onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(((e.clientY - r.top) / r.height - 0.5) * -8);
      };
      root.addEventListener("pointermove", onMove);
    }
    const cancel = onSiteReady(() => tl.play());
    return () => {
      cancel();
      if (onMove) root.removeEventListener("pointermove", onMove);
    };
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroAurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={styles.heroGrid} />
      </div>

      <div className={`container ${styles.heroLayout}`}>
        <div className={styles.heroCopy}>
          {/* The stage number, huge and outlined, behind the headline */}
          <span className={styles.bigNum} aria-hidden="true">
            {num.split("").map((d, k) => (
              <span key={k} className={styles.digit} data-digit data-text={d}>
                {d}
              </span>
            ))}
          </span>

          <div className={styles.chips}>
            <p className="eyebrow" data-intro data-chip>
              {hero.eyebrow}
            </p>
            <span className={styles.stageChip} data-intro data-chip>
              <span className={styles.stageChipIcon} aria-hidden="true">
                <Icon name={STAGE_ICONS[i]} />
              </span>
              Stage {num} <i>/ {pad(STAGES.length)}</i>
            </span>
          </div>
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
              .filter((a) => liveHref(a.href))
              .map((a, k) => (
                <ButtonLink key={a.href} href={a.href} variant={k === 0 ? "primary" : "secondary"}>
                  {a.label}
                </ButtonLink>
              ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.stack} data-stack>
            <span className={styles.halo} aria-hidden="true" />
            <div className={styles.photoCard} data-intro data-photo aria-hidden="true">
              <span className={styles.photoImg} data-photo-img>
                <Image src={photo.src} alt="" fill priority quality={85} sizes="(min-width: 1100px) 34vw, 90vw" style={{ objectPosition: photo.pos }} />
              </span>
              <span className={styles.photoShade} />
              <span className={styles.photoTag}>
                <b>{num}</b>
                {page.label}
              </span>
              {/* Where this stage sits: eight segments along the bottom of the photo */}
              <span className={styles.photoBar}>
                {STAGES.map((s, k) => (
                  <i key={s.href} data-seg data-on={k === i || undefined} data-done={k < i || undefined} />
                ))}
              </span>
            </div>

            {/* A seal turning slowly at the photo's corner, the stage icon at its centre */}
            <span className={styles.seal} data-intro data-seal aria-hidden="true">
              <svg className={styles.sealRing} viewBox="0 0 120 120">
                <defs>
                  <path id={`seal-${i}`} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
                </defs>
                {/* textLength = the circle's circumference (2π × 47), so the words close the ring exactly */}
                <text textLength={295} lengthAdjust="spacing">
                  <textPath href={`#seal-${i}`} textLength={295} lengthAdjust="spacing">
                    {`${doc ? doc.stamp : page.label} · Stage ${num}/${pad(STAGES.length)} · `}
                  </textPath>
                </text>
              </svg>
              <span className={styles.sealCore}>
                <Icon name={STAGE_ICONS[i]} />
              </span>
            </span>

            {doc && (
              <div className={styles.docCard} data-intro data-doc>
                <PaperDoc doc={doc} stampDelay={1.8} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- where this stage sits */

/** A white panel rising over the hero: the eight stages, this one lit, the rest one click away. */
function StageNav({ i }: { i: number }) {
  const ref = useRef<HTMLElement>(null);
  const groupOf = (k: number) => JOURNEY.findIndex((g) => g.stages.some((s) => s.href === STAGES[k].href));
  const gi = groupOf(i);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    gsap.from(root.querySelector("[data-panel]"), { y: 70, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "opacity,transform", scrollTrigger: { trigger: root, start: "top bottom", once: true } });
    gsap.from(root.querySelectorAll("[data-node]"), { opacity: 0, y: 20, scale: 0.7, duration: 0.8, stagger: 0.06, ease: "back.out(1.8)", clearProps: "opacity,transform", scrollTrigger: { trigger: root, start: "top 85%", once: true } });
    gsap.fromTo(root.querySelector("[data-fill]"), { scaleX: 0 }, { scaleX: i / (STAGES.length - 1), duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", once: true } });
  });

  return (
    <section ref={ref} className={styles.nav} aria-label="The eight stages">
      <div className="container">
        <div className={styles.navPanel} data-panel style={vars({ "--p": i / (STAGES.length - 1) })}>
          <div className={styles.navHead}>
            <p className={styles.navKicker}>
              <span aria-hidden="true" />
              Stage {pad(i + 1)} of {pad(STAGES.length)} · {JOURNEY[gi].title}
            </p>
            <SmartLink href="/services/" className={styles.navAll}>
              All eight stages
              <Arrow />
            </SmartLink>
          </div>

          <div className={styles.navPhases} aria-hidden="true">
            {JOURNEY.map((g, k) => (
              <span key={g.title} style={vars({ "--span": g.stages.length })} data-on={k === gi || undefined}>
                {g.title}
              </span>
            ))}
          </div>

          <div className={styles.navTrack}>
            <span className={styles.navLine} aria-hidden="true">
              <i data-fill />
            </span>
            <ol className={styles.navNodes}>
              {STAGES.map((s, k) => {
                const href = liveHref(s.href);
                const state = k < i ? "done" : k === i ? "on" : undefined;
                const inner = (
                  <>
                    <span className={styles.navDot}>
                      <Icon name={STAGE_ICONS[k]} />
                    </span>
                    <span className={styles.navNum}>{pad(k + 1)}</span>
                    <span className={styles.navLabel}>{s.label}</span>
                  </>
                );
                return (
                  <li key={s.href} data-state={state} data-node>
                    {k === i || !href ? (
                      <span className={styles.navNode} aria-current={k === i ? "page" : undefined}>
                        {inner}
                      </span>
                    ) : (
                      <SmartLink href={href} className={styles.navNode}>
                        {inner}
                      </SmartLink>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Small screens: a progress bar in eight segments */}
          <span className={styles.navBar} aria-hidden="true">
            {STAGES.map((s, k) => (
              <i key={s.href} data-on={k === i || undefined} data-done={k < i || undefined} />
            ))}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- sections */

export function FloodCards({ s }: { s: Of<"cards"> }) {
  const cols = s.cols ?? 3;
  return (
    <section id={s.id} className={`section ${styles.cardsSection}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} align={s.intro ? "split" : "left"} />
        <ul className={styles.cards} data-cols={cols} data-cards>
          {s.items.map((it, k) => (
            <li key={it.title} className={styles.card} data-card {...flood}>
              <FloodLayer />
              <div className={styles.cardTop}>
                <span className={styles.cardIcon} aria-hidden="true">
                  <Icon name={it.icon ?? "check"} />
                </span>
                <span className={styles.cardNum}>{pad(k + 1)}</span>
              </div>
              <h3 className={styles.cardTitle}>{it.title}</h3>
              <p className={styles.cardBody}>
                <Rich text={it.body} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Steps on a white panel: a line runs through the numbered steps and fills as you scroll. */
export function LightSteps({ s }: { s: Of<"steps"> }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const list = root.querySelector("[data-steps]");
    gsap.fromTo(root.querySelector("[data-steps-fill]"), { "--fill": 0 }, { "--fill": 1, ease: "none", scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 55%", scrub: 0.5 } });
    gsap.from(root.querySelectorAll("[data-step]"), { opacity: 0, y: 40, duration: 1.1, stagger: 0.12, ease: "expo.out", clearProps: "opacity,transform", scrollTrigger: { trigger: list, start: "top 80%", once: true } });
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.stepsSection}`} aria-label={`${s.title} ${s.accent ?? ""}`}>
      <div className="container">
        <div className={styles.stepsPanel}>
          <span className={styles.stepsGlow} aria-hidden="true" />
          <header className={styles.stepsHead}>
            {s.eyebrow && (
              <p className={styles.lightKicker}>
                <span aria-hidden="true" />
                {s.eyebrow}
              </p>
            )}
            <h2 className={styles.lightTitle}>
              {s.title} {s.accent && <span className={styles.lightAccent}>{s.accent}</span>}
            </h2>
            {s.intro && <p className={styles.lightIntro}>{s.intro}</p>}
          </header>
          <ol className={styles.steps} data-steps style={vars({ "--n": s.items.length })}>
            <span className={styles.stepsLine} data-steps-fill aria-hidden="true" />
            {s.items.map((it, k) => (
              <li key={it.title} className={styles.step} data-step>
                <span className={styles.stepNum}>{pad(k + 1)}</span>
                <h3 className={styles.stepTitle}>{it.title}</h3>
                <p className={styles.stepBody}>
                  <Rich text={it.body} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ previous / next */

function StageLinks({ i }: { i: number }) {
  const prev = i > 0 ? STAGES[i - 1] : null;
  const next = i < STAGES.length - 1 ? STAGES[i + 1] : null;

  return (
    <section className={`section ${styles.links}`} aria-label="Continue through the stages">
      <div className={`container ${styles.linksGrid}`} data-cards>
        {prev && liveHref(prev.href) ? (
          <SmartLink href={prev.href} className={`${styles.card} ${styles.prev}`} data-card {...flood}>
            <FloodLayer />
            <span className={styles.linkKicker}>
              <Arrow back />
              Previous stage
            </span>
            <span className={styles.linkNum}>{pad(i)}</span>
            <span className={styles.linkTitle}>{prev.label}</span>
            <span className={styles.linkBody}>{prev.body}</span>
          </SmartLink>
        ) : (
          <SmartLink href="/services/" className={`${styles.card} ${styles.prev}`} data-card {...flood}>
            <FloodLayer />
            <span className={styles.linkKicker}>
              <Arrow back />
              All services
            </span>
            <span className={styles.linkTitle}>The eight stages</span>
            <span className={styles.linkBody}>Choose the stages in your agreed scope.</span>
          </SmartLink>
        )}

        {next && liveHref(next.href) ? (
          <SmartLink href={next.href} className={`${styles.card} ${styles.next}`} data-card {...flood}>
            <FloodLayer />
            <span className={styles.nextText}>
              <span className={styles.linkKicker}>
                Next stage
                <Arrow />
              </span>
              <span className={styles.linkNum}>{pad(i + 2)}</span>
              <span className={styles.linkTitle}>{next.label}</span>
              <span className={styles.linkBody}>{next.body}</span>
            </span>
            <span className={styles.nextPhoto} aria-hidden="true">
              <Icon name={STAGE_ICONS[i + 1]} />
              <span>{pad(i + 2)}</span>
            </span>
          </SmartLink>
        ) : (
          <SmartLink href="/services/" className={`${styles.card} ${styles.next}`} data-card {...flood}>
            <FloodLayer />
            <span className={styles.nextText}>
              <span className={styles.linkKicker}>
                Back to the start
                <Arrow />
              </span>
              <span className={styles.linkTitle}>All eight stages</span>
              <span className={styles.linkBody}>From registration to a closed account, with one accountable team.</span>
            </span>
          </SmartLink>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/**
 * A service stage page in the home and Services language: the hero with the
 * stage's photo and document, a white panel placing it among the eight stages,
 * its sections (cards turn light on hover; steps on a white panel; the
 * specialised visuals as before), then the previous and next stages.
 */
export function StagePage({ page }: { page: SitePage }) {
  const ref = useRef<HTMLDivElement>(null);
  const i = Math.max(0, STAGES.findIndex((s) => s.href === page.route));

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
      <StageHero page={page} i={i} />
      <StageNav i={i} />
      {page.sections.map((s, k) => {
        if (s.kind === "cards") return <FloodCards key={k} s={s} />;
        if (s.kind === "steps") return <LightSteps key={k} s={s} />;
        if (s.kind === "split") return <WhoDoesWhat key={k} section={s} />;
        if (s.kind === "statement") return <StageStatement key={k} s={s} />;
        if (s.kind === "anatomy") return <AnatomyShowcase key={k} s={s} />;
        if (s.kind === "balance") return <BalanceShowcase key={k} s={s} />;
        if (s.kind === "cadence") return <CadenceShowcase key={k} s={s} />;
        return <SiteSection key={k} s={s} />;
      })}
      <StageLinks i={i} />
    </div>
  );
}
