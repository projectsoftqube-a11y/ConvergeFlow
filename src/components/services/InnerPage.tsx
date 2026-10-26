"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { liveHref, navGroupFor, type NavGroup } from "@/content/navigation";
import type { IconName, Section, SitePage } from "@/content/site/types";
import { Rich } from "@/components/content/Rich";
import { Aurora } from "@/components/fx/Aurora";
import { FloodLayer } from "@/components/fx/FloodLayer";
import { setFloodOrigin } from "@/components/fx/flood";
import { Icon } from "@/components/site/Icon";
import { PaperDoc } from "@/components/site/Paper";
import { SiteSection } from "@/components/site/Sections";
import { SectionHead } from "@/components/site/Title";
import { WhoDoesWhat } from "./ServicesHub";
import { FloodCards, LightSteps } from "./StagePage";
import { AnatomyShowcase, BalanceShowcase, CadenceShowcase, StageStatement } from "./StageFeatures";
import { pad } from "./stageMeta";
import styles from "./InnerPage.module.css";

type Of<K extends Section["kind"]> = Extract<Section, { kind: K }>;

const flood = {
  "data-flood": "",
  "data-glow": "",
  onPointerEnter: setFloodOrigin,
  onPointerLeave: setFloodOrigin,
};
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Photo shown beside the technology page's illustrative document. */
const TECH_PHOTO = { src: "/assets/photos/v2/technology.jpg", alt: "" };
/** Photo in the security page's window, behind its facts. */
const SECURITY_PHOTO = { src: "/assets/photos/v2/security.jpg", alt: "" };
/** Icons for the security page's facts, in order. */
const FACT_ICONS: IconName[] = ["lock", "layers", "eye", "shield"];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ hero */

/** Shared intro for both heroes: paused until the loading screen lifts; intro targets keep their inline opacity. */
export function useHeroIntro(ref: RefObject<HTMLElement | null>) {
  useMotion(ref, ({ motion }) => {
    const root = ref.current!;
    gsap.set(root.querySelectorAll("[data-intro]"), { opacity: 1 });
    if (!motion) return;
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });
    tl.from(root.querySelector("[data-aurora]"), { opacity: 0, scale: 1.15, duration: 2.4 }, 0)
      .from(
        root.querySelectorAll("[data-tab]"),
        {
          opacity: 0,
          y: -14,
          filter: "blur(8px)",
          duration: 1,
          stagger: 0.08,
          clearProps: "filter,transform",
        },
        0.1,
      )
      .from(
        root.querySelectorAll("[data-chip]"),
        {
          opacity: 0,
          y: -12,
          filter: "blur(8px)",
          duration: 1,
          clearProps: "filter,transform",
        },
        0.3,
      )
      .from(
        root.querySelectorAll("[data-line]"),
        {
          opacity: 0,
          yPercent: 35,
          filter: "blur(18px)",
          duration: 1.6,
          stagger: 0.16,
          ease: "expo.out",
          clearProps: "filter,transform",
        },
        0.4,
      )
      .from(
        root.querySelectorAll("[data-rise]"),
        {
          opacity: 0,
          y: 26,
          filter: "blur(10px)",
          duration: 1.2,
          stagger: 0.1,
          clearProps: "filter,transform",
        },
        0.9,
      )
      .from(
        root.querySelector("[data-photo]"),
        {
          opacity: 0,
          y: 70,
          scale: 0.96,
          duration: 1.7,
          ease: "expo.out",
          clearProps: "transform",
        },
        0.5,
      );
    const card = root.querySelector("[data-doc]");
    if (card)
      tl.from(
        card,
        {
          opacity: 0,
          y: 40,
          duration: 1.4,
          ease: "expo.out",
          clearProps: "transform",
        },
        1.0,
      );
    tl.from(
      root.querySelectorAll("[data-proof]"),
      {
        opacity: 0,
        x: -16,
        duration: 0.8,
        stagger: 0.1,
        clearProps: "transform",
      },
      1.3,
    );
    return onSiteReady(() => tl.play());
  });
}

export function HeroCopy({ page, center = false, actions = true }: { page: SitePage; center?: boolean; actions?: boolean }) {
  const hero = page.hero;
  return (
    <>
      <p className="eyebrow" data-intro data-chip>
        {hero.eyebrow}
      </p>
      <h1 id="page-title" className={styles.heroTitle} data-center={center || undefined} data-intro>
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
      {actions && (
        <div className={styles.heroActions} data-intro data-rise>
          {hero.actions
            .filter((a) => liveHref(a.href))
            .map((a, k) => (
              <ButtonLink key={a.href} href={a.href} variant={k === 0 ? "primary" : "secondary"}>
                {a.label}
              </ButtonLink>
            ))}
        </div>
      )}
    </>
  );
}

/**
 * Who We Help hero (the same on all three audience pages): the copy on the
 * left under a switcher between the three audiences; the page's photo fills
 * the right half to the screen edge, with its note docked over the seam.
 */
function AudienceHero({ page, group }: { page: SitePage; group: NavGroup }) {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  const v = page.hero.visual;
  const photo = v.kind === "photo" ? v.photo : null;
  const links = group.columns.flatMap((c) => c.links);

  return (
    <section ref={ref} className={styles.aHero} aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroAurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={styles.heroGrid} />
      </div>

      {photo && (
        <div className={styles.aPhoto} data-intro data-photo aria-hidden="true">
          <Image src={photo.src} alt="" fill priority quality={85} sizes="(min-width: 1100px) 50vw, 100vw" />
          <span className={styles.aShade} />
          {photo.caption && <span className={styles.aTag}>{photo.caption}</span>}
        </div>
      )}

      <div className={`container ${styles.aLayout}`}>
        <div className={styles.aCopy}>
          <nav className={styles.tabs} aria-label={group.label}>
            {links.map((l) =>
              l.href === page.route ? (
                <span key={l.href} className={styles.tab} aria-current="page" data-intro data-tab>
                  {l.label}
                </span>
              ) : (
                <SmartLink key={l.href} href={l.href} className={styles.tab} data-intro data-tab>
                  {l.label}
                </SmartLink>
              ),
            )}
          </nav>
          <HeroCopy page={page} />
        </div>

        {v.kind === "photo" && (v.note || v.chips?.length) && (
          <div className={styles.aNote} data-intro data-doc>
            <span className={styles.noteMark} aria-hidden="true" />
            {v.note && <p className={styles.aNoteTitle}>{v.note}</p>}
            {v.chips?.length ? (
              <ul className={styles.noteList}>
                {v.chips.map((c) => (
                  <li key={c} data-proof>
                    <span aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

/** The photo in the window: the page's own, or the one that sits behind its document or facts. */
function windowPhoto(page: SitePage) {
  const v = page.hero.visual;
  if (v.kind === "photo") return v.photo.src;
  if (v.kind === "document") return TECH_PHOTO.src;
  return SECURITY_PHOTO.src;
}

/** The card floating in front of the window: the photo's note, the illustrative document, or the security facts. */
function FrontCard({ page }: { page: SitePage }) {
  const v = page.hero.visual;
  if (v.kind === "photo")
    return v.note ? (
      <p className={styles.dNote} data-proof>
        <span className={styles.noteMark} aria-hidden="true" />
        {v.note}
      </p>
    ) : null;
  if (v.kind === "document")
    return (
      <div className={styles.dDoc} data-doc>
        <PaperDoc doc={v.doc} stampDelay={1.8} />
      </div>
    );
  const facts = page.hero.facts ?? [];
  return (
    <div className={styles.dFacts} data-doc>
      <span className={styles.dLock} aria-hidden="true">
        <span />
        <Icon name="lock" />
      </span>
      <ul>
        {facts.map((fact, k) => (
          <li key={fact} data-proof>
            <span className={styles.dFactIcon} aria-hidden="true">
              <Icon name={FACT_ICONS[k % FACT_ICONS.length]} />
            </span>
            {fact}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The three hand-offs a document's rows describe: where it comes from, who reviews it, where it lands. */
const FLOW_ROWS = ["Source", "Reviewed by", "Delivered to"];
const FLOW_ICONS: IconName[] = ["search", "user", "link"];

/**
 * Technology's visual: a board with the route the work takes (payer portal,
 * specialist, practice system) drawn as nodes with a pulse travelling between
 * them, the specialist's photo beside it, and the illustrative verification
 * result below, so nothing sits on top of anything else.
 */
function TechBoard({ page }: { page: SitePage }) {
  const v = page.hero.visual;
  if (v.kind !== "document") return null;
  const nodes = FLOW_ROWS.map((label) => v.doc.rows.find(([k]) => k === label)).filter((r): r is [string, string] => Boolean(r));
  return (
    <div className={styles.board}>
      <div className={styles.boardBar} aria-hidden="true">
        <span className={styles.winDots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.winLabel}>How the work moves</span>
      </div>
      <div className={styles.boardBody}>
        <ol className={styles.flow} aria-label="How a verification moves">
          {nodes.map(([k, val], i) => (
            <li key={k} className={styles.flowNode} data-proof>
              <span className={styles.flowIcon} aria-hidden="true">
                {i === 1 ? <Image src={TECH_PHOTO.src} alt="" fill quality={75} sizes="56px" /> : <Icon name={FLOW_ICONS[i]} />}
              </span>
              <span className={styles.flowText}>
                <span className={styles.flowKey}>{k}</span>
                <span className={styles.flowVal}>{val}</span>
              </span>
              {i < nodes.length - 1 && <span className={styles.flowLink} aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <div className={styles.boardDoc} data-doc>
          <PaperDoc doc={v.doc} stampDelay={1.8} />
        </div>
      </div>
    </div>
  );
}

/**
 * How It Works hero (the same on all three delivery pages): the copy on the
 * left with a vertical stepper through the three chapters; on the right a
 * window onto the page's photo, tilted in 3D, with its note, document or facts
 * floating in front at a different depth. The window leans toward the pointer;
 * the chapter number stands large behind it.
 */
function DeliveryHero({ page, group }: { page: SitePage; group: NavGroup }) {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  const links = group.columns.flatMap((c) => c.links);
  const at = Math.max(
    0,
    links.findIndex((l) => l.href === page.route),
  );

  useMotion(ref, ({ motion, desktop }) => {
    if (!motion || !desktop) return;
    const root = ref.current!;
    const tilt = root.querySelector<HTMLElement>("[data-tilt]");
    if (!tilt) return;
    gsap.set(tilt, { rotationY: -9, rotationX: 4 });
    const ry = gsap.quickTo(tilt, "rotationY", {
      duration: 1.2,
      ease: "power3.out",
    });
    const rx = gsap.quickTo(tilt, "rotationX", {
      duration: 1.2,
      ease: "power3.out",
    });
    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      ry(-9 + ((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(4 - ((e.clientY - r.top) / r.height - 0.5) * 8);
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  });

  return (
    <section ref={ref} className={styles.dHero} aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroAurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={styles.dGrid} />
        <span className={styles.dScan} />
        <span className={styles.dBigNum}>{pad(at + 1)}</span>
      </div>

      <div className={`container ${styles.dLayout}`}>
        <div className={styles.dCopy}>
          <HeroCopy page={page} />
          {page.hero.facts && page.hero.visual.kind !== "none" && (
            <ul className={styles.heroFacts} data-intro data-rise>
              {page.hero.facts.map((fact) => (
                <li key={fact}>
                  <Icon name="check" />
                  {fact}
                </li>
              ))}
            </ul>
          )}

          <nav className={styles.chapters} aria-label={group.label}>
            {links.map((l, k) => {
              const here = l.href === page.route;
              const inner = (
                <>
                  <span className={styles.chapterTop}>
                    <span className={styles.chapterNum}>{pad(k + 1)}</span>
                    {here ? (
                      <span className={styles.chapterHere}>You&rsquo;re here</span>
                    ) : (
                      <span className={styles.chapterGo} aria-hidden="true">
                        <Arrow />
                      </span>
                    )}
                  </span>
                  <span className={styles.chapterLabel}>{l.label}</span>
                  <span className={styles.chapterBar} aria-hidden="true">
                    <i />
                  </span>
                </>
              );
              return here ? (
                <span key={l.href} className={styles.chapter} aria-current="page" data-intro data-tab>
                  {inner}
                </span>
              ) : (
                <SmartLink key={l.href} href={l.href} className={styles.chapter} data-done={k < at || undefined} data-intro data-tab>
                  {inner}
                </SmartLink>
              );
            })}
          </nav>
        </div>

        <div className={styles.dStage} data-intro data-photo>
          <span className={styles.dHalo} aria-hidden="true" />
          <div className={styles.dTilt} data-tilt>
            {page.hero.visual.kind === "document" ? (
              <TechBoard page={page} />
            ) : (
              <>
                <div className={styles.window} aria-hidden="true">
                  <div className={styles.winBar}>
                    <span className={styles.winDots}>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className={styles.winLabel}>
                      {group.label} · <b>{pad(at + 1)}</b> / {pad(links.length)}
                    </span>
                  </div>
                  <div className={styles.winBody}>
                    <Image src={windowPhoto(page)} alt="" fill priority quality={85} sizes="(min-width: 1100px) 46vw, 100vw" />
                    <span className={styles.wShade} />
                  </div>
                </div>
                <div className={styles.dFront} data-kind={page.hero.visual.kind}>
                  <FrontCard page={page} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- sections */

/** "Registration, benefits verification, treatment planning and estimates." -> the separate tasks. */
const tasksOf = (body: string) =>
  body
    .replace(/\.$/, "")
    .split(", ")
    .map((t) => t.replace(/^and /, "").trim())
    .filter(Boolean)
    .map((t) => t[0].toUpperCase() + t.slice(1));

/**
 * The dental revenue cycle as a ring: the stages sit around a circle with a
 * light travelling the loop, the closing note at its centre, and the stage
 * cards beside it. The lit stage moves on by itself while the section is in
 * view; pointing at or focusing a stage takes over.
 */
function StageCycle({ s }: { s: Of<"stages"> }) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);
  const n = s.items.length;

  useEffect(() => {
    const root = ref.current;
    if (!root || held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(id);
      if (e.isIntersecting) id = window.setInterval(() => setOn((v) => (v + 1) % n), 3200);
    });
    io.observe(root);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
  }, [held, n]);

  return (
    <section ref={ref} id={s.id} className={`section ${styles.cycle}`} style={vars({ "--n": n, "--on": on })}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
        <div className={styles.cycleLayout}>
          <div className={styles.ringWrap} aria-hidden="true">
            <svg className={styles.ringSvg} viewBox="0 0 400 400">
              <circle className={styles.ringBase} cx="200" cy="200" r="160" />
              <circle className={styles.ringArc} cx="200" cy="200" r="160" pathLength={1} />
            </svg>
            <span className={styles.ringRunner} />
            <span className={styles.ringLoop}>
              <svg viewBox="0 0 16 16">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" />
              </svg>
            </span>
            {s.items.map((it, k) => (
              <span key={it.title} className={styles.ringNode} style={vars({ "--i": k })} data-on={k === on || undefined}>
                <b>{pad(k + 1)}</b>
              </span>
            ))}
            <div className={styles.ringCore}>
              <span className={styles.ringCoreNum}>{pad(on + 1)}</span>
              <span className={styles.ringCoreTitle}>{s.items[on]?.title}</span>
              {s.note && <span className={styles.ringCoreNote}>{s.note}</span>}
            </div>
          </div>

          {/* the stages select the ring's lit stage; they don't navigate anywhere */}
          <ol
            className={styles.cycleList}
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
          >
            {s.items.map((it, k) => (
              <li key={it.title}>
                <button
                  type="button"
                  className={styles.cycleItem}
                  data-on={k === on || undefined}
                  aria-pressed={k === on}
                  onPointerEnter={() => setOn(k)}
                  onFocus={() => setOn(k)}
                  onClick={() => setOn(k)}
                >
                  <span className={styles.cycleNum} aria-hidden="true">
                    {pad(k + 1)}
                  </span>
                  <span className={styles.cycleText}>
                    <span className={styles.cycleTitle}>{it.title}</span>
                    <span className={styles.cycleBody}>
                      <Rich text={it.body} />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        {s.note && <p className="visually-hidden">{s.note}</p>}
      </div>
    </section>
  );
}

/**
 * The medical service scope as a pipeline: one panel per stage, its tasks
 * listed with ticks, joined by a band of light that flows from the first to
 * the last. Panels turn light on hover.
 */
function ScopeFlow({ s }: { s: Of<"stages"> }) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-pipe]"), start: "top 78%", once: true }, defaults: { ease: "expo.out" } });
    tl.from(root.querySelector("[data-band]"), { scaleX: 0, duration: 1.6, ease: "power2.inOut", clearProps: "transform" })
      .from(root.querySelectorAll("[data-panel]"), { opacity: 0, y: 60, duration: 1.2, stagger: 0.15, clearProps: "opacity,transform" }, 0.2)
      .from(root.querySelectorAll("[data-task]"), { opacity: 0, x: -12, duration: 0.6, stagger: 0.04, clearProps: "opacity,transform" }, 0.7);
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.scope}`} style={vars({ "--n": s.items.length })}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
        <div className={styles.pipe} data-pipe>
          <span className={styles.band} data-band aria-hidden="true" />
          <ol className={styles.pipeList}>
            {s.items.map((it, k) => {
              const href = it.href ? liveHref(it.href) : null;
              return (
                <li key={it.title} className={styles.panel} data-panel {...flood}>
                  <FloodLayer />
                  <div className={styles.panelHead}>
                    <span className={styles.panelNum} aria-hidden="true">
                      {pad(k + 1)}
                    </span>
                    <span className={styles.panelStep}>
                      Stage {k + 1} of {s.items.length}
                    </span>
                  </div>
                  <h3 className={styles.panelTitle}>
                    {href ? (
                      <SmartLink href={href} className={styles.panelLink}>
                        {it.title}
                      </SmartLink>
                    ) : (
                      it.title
                    )}
                  </h3>
                  <ul className={styles.tasks}>
                    {tasksOf(it.body).map((t) => (
                      <li key={t} data-task>
                        <Icon name="check" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  {href && (
                    <span className={styles.panelGo} aria-hidden="true">
                      Explore
                      <Arrow />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        {s.note && (
          <p className={styles.pillNote} data-anim="fade">
            <span aria-hidden="true" />
            {s.note}
          </p>
        )}
      </div>
    </section>
  );
}

/** A checklist of items beside its heading. */
function ChipGrid({ s }: { s: Of<"chips"> }) {
  return (
    <section id={s.id} className={`section ${styles.chipSection}`}>
      <div className={`container ${styles.chipLayout}`}>
        <div className={styles.chipHead}>
          <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
          {s.body && (
            <p className={styles.lede} data-anim="fade">
              <Rich text={s.body} />
            </p>
          )}
          {s.note && (
            <p className={styles.chipNote} data-anim="fade">
              <Icon name="refresh" />
              {s.note}
            </p>
          )}
        </div>
        <div className={styles.chipPanel}>
          <p className={styles.chipPanelHead} aria-hidden="true">
            <span>What we check</span>
            <span>{s.chips.length} items</span>
          </p>
          <ul className={styles.chipList} data-anim="stagger">
            {s.chips.map((c) => (
              <li key={c}>
                <span className={styles.chipTick} aria-hidden="true">
                  <Icon name="check" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Copy beside a checklist card (or a single link card when there are no points). */
function FeatureBlock({ s }: { s: Of<"feature"> }) {
  const link = s.link && liveHref(s.link.href) ? s.link : null;
  const points = s.points ?? [];
  return (
    <section id={s.id} className={`section ${styles.feature}`}>
      <div className={`container ${styles.featureLayout}`} data-reverse={s.reverse || undefined}>
        <div className={styles.featureCopy}>
          <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
          <div className={styles.featureBody} data-anim="fade">
            {s.body.map((p, k) => (
              <p key={k}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          {link && points.length > 0 && (
            <div data-anim="fade">
              <ButtonLink href={link.href} variant="secondary">
                {link.label}
              </ButtonLink>
            </div>
          )}
        </div>

        {points.length > 0 ? (
          <div className={styles.pointsCard} data-anim="fade">
            <span className={styles.pointsGlow} aria-hidden="true" />
            <p className={styles.pointsHead} aria-hidden="true">
              <span className={styles.pointsMark} />
              {points.length} items
            </p>
            <ol className={styles.points}>
              {s.points!.map((p, k) => (
                <li key={p}>
                  <span className={styles.pointNum}>{pad(k + 1)}</span>
                  {p}
                  <span className={styles.pointTick} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : link ? (
          <SmartLink href={link.href} className={styles.linkCard} data-anim="fade" {...flood}>
            <FloodLayer />
            <span className={styles.linkIcon} aria-hidden="true">
              <Icon name="book" />
            </span>
            <span className={styles.linkTitle}>{link.label}</span>
            <span className={styles.linkGo} aria-hidden="true">
              <Arrow />
            </span>
          </SmartLink>
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/**
 * A Who We Help or How It Works page in the home and Services language: the
 * group's own hero (each family shares one, with a switcher between its
 * pages), then its sections (cards turn
 * light on hover; steps and statements on white panels; stages as connected
 * cards; checklists, features, anatomy, balance and cadence redesigned).
 */
export function InnerPage({ page }: { page: SitePage }) {
  const ref = useRef<HTMLDivElement>(null);
  const group = navGroupFor(page.route);

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
      {group?.label === "Who We Help" ? <AudienceHero page={page} group={group} /> : group ? <DeliveryHero page={page} group={group} /> : null}
      {page.sections.map((s, k) => {
        switch (s.kind) {
          case "cards":
            return <FloodCards key={k} s={s} />;
          case "evidence":
            return (
              <FloodCards
                key={k}
                s={{
                  kind: "cards",
                  id: s.id,
                  eyebrow: s.eyebrow,
                  title: s.title,
                  accent: s.accent,
                  intro: s.body ?? s.intro,
                  items: s.items,
                  cols: 4,
                }}
              />
            );
          case "steps":
            return <LightSteps key={k} s={s} />;
          case "split":
            return <WhoDoesWhat key={k} section={s} />;
          case "statement":
            return <StageStatement key={k} s={s} />;
          case "anatomy":
            return <AnatomyShowcase key={k} s={s} />;
          case "balance":
            return <BalanceShowcase key={k} s={s} />;
          case "cadence":
            return <CadenceShowcase key={k} s={s} />;
          case "stages":
            return s.layout === "cycle" ? <StageCycle key={k} s={s} /> : <ScopeFlow key={k} s={s} />;
          case "chips":
            return <ChipGrid key={k} s={s} />;
          case "feature":
            return <FeatureBlock key={k} s={s} />;
          default:
            return <SiteSection key={k} s={s} />;
        }
      })}
    </div>
  );
}
