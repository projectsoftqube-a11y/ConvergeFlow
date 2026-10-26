"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type PointerEvent as RPointerEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { liveHref } from "@/content/navigation";
import { getSitePage } from "@/content/site";
import { STAGES } from "@/content/site/services";
import type { IconName, Section, SitePage } from "@/content/site/types";
import { Aurora } from "@/components/fx/Aurora";
import { Icon } from "@/components/site/Icon";
import { SiteSection } from "@/components/site/Sections";
import { SectionHead, TitleText } from "@/components/site/Title";
import { useHeroIntro } from "@/components/services/InnerPage";
import { pad } from "@/components/services/stageMeta";
import inner from "@/components/services/InnerPage.module.css";
import styles from "./AboutPage.module.css";

type Of<K extends Section["kind"]> = Extract<Section, { kind: K }>;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Each specialist role, with a photo of that work and the stages it covers. */
const ROLE_DETAIL: Partial<Record<IconName, { photo: string; stages: string[] }>> = {
  shield: {
    photo: "/assets/photos/v2/about-verification.jpg",
    stages: ["/services/eligibility-verification/", "/services/prior-authorization/"],
  },
  tooth: {
    photo: "/assets/photos/v2/about-coding.jpg",
    stages: ["/services/dental-coding/", "/services/claims-submission/"],
  },
  coins: {
    photo: "/assets/photos/v2/about-payments.jpg",
    stages: ["/services/payment-posting/", "/services/denial-management/", "/services/ar-management/"],
  },
};

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ hero */

/**
 * About hero: an editorial header (the title on the left, the lead and actions
 * on the right) over a cinematic photo of the team at work. The photo opens
 * from a band across the middle and settles as it scrolls; the specialist
 * roles sit along its foot on a glass bar and the page's note floats top right.
 */
function AboutHero({ page, roles }: { page: SitePage; roles: { title: string; icon?: IconName }[] }) {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  const hero = page.hero;
  const v = hero.visual;
  const photo = v.kind === "photo" ? v.photo : null;
  const note = v.kind === "photo" ? v.note : undefined;

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const frame = root.querySelector("[data-frame]");
    const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
    tl.from(
      frame,
      {
        clipPath: "inset(46% 0% 46% 0% round 40px)",
        duration: 1.9,
        clearProps: "clipPath",
      },
      0.55,
    )
      .from(root.querySelector("[data-frame] img"), { scale: 1.25, duration: 2.6, clearProps: "transform" }, 0.55)
      .from(
        root.querySelectorAll("[data-role]"),
        {
          opacity: 0,
          y: 24,
          duration: 1,
          stagger: 0.1,
          clearProps: "opacity,transform",
        },
        1.5,
      )
      .from(
        root.querySelectorAll("[data-tag]"),
        {
          opacity: 0,
          y: -16,
          duration: 1,
          stagger: 0.12,
          clearProps: "opacity,transform",
        },
        1.7,
      );
    // the photo settles as the page scrolls on
    if (frame)
      gsap.fromTo(
        root.querySelector("[data-drift]"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    return onSiteReady(() => tl.play());
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="page-title">
      <div className={inner.heroBg} aria-hidden="true">
        <span className={inner.heroAurora} data-aurora>
          <Aurora green={0.5} />
        </span>
        <span className={inner.heroGrid} />
      </div>

      <div className={`container ${styles.heroHead}`}>
        <div className={styles.heroTitleCol}>
          <p className="eyebrow" data-intro data-chip>
            {hero.eyebrow}
          </p>
          <h1 id="page-title" className={inner.heroTitle} data-intro>
            <span className={inner.line} data-line>
              {hero.title}
            </span>{" "}
            {hero.accent && (
              <span className={`${inner.line} ${inner.lineAccent}`} data-line>
                {hero.accent}
              </span>
            )}
          </h1>
        </div>
        <div className={styles.heroSide}>
          <p className={inner.heroLead} data-intro data-rise>
            {hero.lead}
          </p>
          <div className={inner.heroActions} data-intro data-rise>
            {hero.actions
              .filter((a) => liveHref(a.href))
              .map((a, k) => (
                <ButtonLink key={a.href} href={a.href} variant={k === 0 ? "primary" : "secondary"}>
                  {a.label}
                </ButtonLink>
              ))}
          </div>
        </div>
      </div>

      {photo && (
        <div className={`container ${styles.frameWrap}`} data-intro data-photo>
          <figure className={styles.frame} data-frame>
            <span className={styles.drift} data-drift>
              <Image src={photo.src} alt={photo.alt} fill priority quality={85} sizes="(min-width: 1500px) 1440px, 92vw" />
            </span>
            <span className={styles.frameShade} aria-hidden="true" />
            {note && (
              <p className={styles.frameNote} data-tag>
                <span aria-hidden="true">
                  <Icon name="route" />
                </span>
                {note}
              </p>
            )}
            {photo.caption && (
              <figcaption className={styles.frameCaption} data-tag>
                <span aria-hidden="true" />
                {photo.caption}
              </figcaption>
            )}
            <ul className={styles.roles}>
              {roles.map((r) => (
                <li key={r.title} data-role>
                  <span className={styles.roleIcon} aria-hidden="true">
                    {r.icon && <Icon name={r.icon} />}
                  </span>
                  {r.title}
                </li>
              ))}
            </ul>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------- managed service (feature) */

/**
 * "A managed service, not just a dashboard": an editorial spread, the title
 * beside numbered paragraphs, then the photo widening from a window to the
 * full width of the screen as it scrolls into view.
 */
function ServiceRole({ s }: { s: Of<"feature"> }) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const band = root.querySelector("[data-band]");
    if (band) {
      gsap.fromTo(
        band,
        { clipPath: "inset(0% 22% 0% 22% round 40px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top 92%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      );
      gsap.fromTo(
        root.querySelector("[data-band] img"),
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
    gsap.from(root.querySelectorAll("[data-para]"), {
      opacity: 0,
      y: 40,
      duration: 1.2,
      stagger: 0.15,
      ease: "expo.out",
      clearProps: "opacity,transform",
      scrollTrigger: { trigger: root, start: "top 70%", once: true },
    });
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.role}`}>
      <div className={`container ${styles.roleSpread}`}>
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
        <div className={styles.roleText}>
          {s.body.map((p, k) => (
            <p key={p} className={styles.rolePara} data-para>
              <span className={styles.roleNum} aria-hidden="true">
                {pad(k + 1)}
              </span>
              {p}
            </p>
          ))}
        </div>
      </div>
      {s.photo && (
        <figure className={styles.band} data-band>
          <Image src={s.photo.src} alt={s.photo.alt} fill quality={85} sizes="100vw" />
          <span className={styles.bandShade} aria-hidden="true" />
          {s.photo.caption && (
            <figcaption className={styles.bandTag}>
              <span aria-hidden="true" />
              {s.photo.caption}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

/* --------------------------------------------------------- specialist cards */

/** Sets the card's tilt from the pointer, as CSS variables. */
const tiltFrom = (e: RPointerEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--tx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
  el.style.setProperty("--ty", String(((e.clientY - r.top) / r.height - 0.5) * 2));
};
const tiltReset = (e: RPointerEvent<HTMLElement>) => {
  e.currentTarget.style.setProperty("--tx", "0");
  e.currentTarget.style.setProperty("--ty", "0");
};

/**
 * "Specialists behind every stage": each role as a profile card. A photo of
 * that work, the role and what it does, the stages it owns as links, and a
 * strip of the eight stages with its own lit. Cards lean toward the pointer
 * and turn light, the photo easing in.
 */
function TeamBadges({ s }: { s: Of<"cards"> }) {
  const ref = useRef<HTMLElement>(null);
  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    gsap.from(root.querySelectorAll("[data-pcard]"), {
      opacity: 0,
      y: 90,
      rotateX: 14,
      duration: 1.5,
      stagger: 0.14,
      ease: "expo.out",
      clearProps: "opacity,transform",
      scrollTrigger: {
        trigger: root.querySelector("[data-pcards]"),
        start: "top 80%",
        once: true,
      },
    });
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.badges}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} align="center" />
        <ul className={styles.pcards} data-pcards>
          {s.items.map((item, k) => {
            const d = item.icon ? ROLE_DETAIL[item.icon] : undefined;
            const owned = d?.stages ?? [];
            const stages = owned.map((href) => STAGES.find((st) => st.href === href)).filter((st) => st && liveHref(st.href));
            return (
              <li key={item.title} className={styles.pcardSlot}>
                <article className={styles.pcard} data-pcard onPointerMove={tiltFrom} onPointerLeave={tiltReset}>
                  <span className={styles.pcardEdge} aria-hidden="true" />
                  {d && (
                    <div className={styles.pPhoto}>
                      <Image src={d.photo} alt="" fill quality={85} sizes="(min-width: 1100px) 28vw, (min-width: 760px) 45vw, 92vw" />
                      <span className={styles.pPhotoShade} aria-hidden="true" />
                      <span className={styles.pRole}>Role {pad(k + 1)}</span>
                    </div>
                  )}
                  <div className={styles.pBody}>
                    <span className={styles.pIcon} aria-hidden="true">
                      {item.icon && <Icon name={item.icon} />}
                    </span>
                    <h3 className={styles.pTitle}>{item.title}</h3>
                    <p className={styles.pText}>{item.body}</p>
                    {stages.length > 0 && (
                      <ul className={styles.pStages} aria-label={`Stages ${item.title.toLowerCase()} own`}>
                        {stages.map((st) => (
                          <li key={st!.href}>
                            <SmartLink href={st!.href} className={styles.pStage}>
                              <span>{pad(STAGES.indexOf(st!) + 1)}</span>
                              {st!.label}
                              <Arrow />
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className={styles.pStrip} aria-hidden="true">
                      {STAGES.map((st) => (
                        <i key={st.href} data-on={owned.includes(st.href) || undefined} />
                      ))}
                      <span>
                        {owned.length} of {STAGES.length} stages
                      </span>
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- handoff relay */

/**
 * "Every handoff has an owner": a relay track. As the section scrolls past, a
 * baton runs along the track and each checkpoint lights as it is reached.
 */
function HandoffRelay({ s }: { s: Of<"steps"> }) {
  const ref = useRef<HTMLElement>(null);
  const n = s.items.length;

  useMotion(ref, ({ motion }) => {
    const root = ref.current!;
    const marks = gsap.utils.toArray<HTMLElement>("[data-mark]", root);
    const set = (p: number) => {
      root.style.setProperty("--p", String(p));
      marks.forEach((m, i) => m.toggleAttribute("data-on", p >= i / Math.max(1, n - 1) - 0.02));
    };
    if (!motion) {
      set(1);
      return;
    }
    set(0);
    gsap.to(
      {},
      {
        scrollTrigger: {
          trigger: root.querySelector("[data-track]"),
          start: "top 75%",
          end: "bottom 45%",
          scrub: 0.6,
          onUpdate: (self) => set(self.progress),
        },
      },
    );
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.relay}`} style={vars({ "--n": n })}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
        <div className={styles.track} data-track>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} />
            <span className={styles.baton}>
              <Icon name="user" />
            </span>
          </span>
          <ol className={styles.marks}>
            {s.items.map((item, k) => (
              <li key={item.title} className={styles.mark} data-mark>
                <span className={styles.markDot} aria-hidden="true">
                  {pad(k + 1)}
                </span>
                <h3 className={styles.markTitle}>{item.title}</h3>
                <p className={styles.markBody}>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- practices we support */

/** "Who we help": photo tiles for each audience; on wide screens the tile you point at opens wider. */
function PracticeTiles({ s }: { s: Of<"related"> }) {
  const pages = s.routes.map((r) => getSitePage(r)).filter((p): p is SitePage => Boolean(p && liveHref(p.route)));
  return (
    <section id={s.id} className={`section ${styles.tiles}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
        <ul className={styles.tileRow}>
          {pages.map((p, k) => {
            const photo = p.hero.visual.kind === "photo" ? p.hero.visual.photo : null;
            return (
              <li key={p.route} className={styles.tile}>
                <SmartLink href={p.route} className={styles.tileLink}>
                  {photo && <Image src={photo.src} alt="" fill quality={75} sizes="(min-width: 1000px) 40vw, 90vw" />}
                  <span className={styles.tileShade} aria-hidden="true" />
                  <span className={styles.tileNum} aria-hidden="true">
                    {pad(k + 1)}
                  </span>
                  <span className={styles.tileText}>
                    <span className={styles.tileTitle}>
                      <TitleText title={p.label} />
                    </span>
                    <span className={styles.tileBody}>{p.seo.description}</span>
                    <span className={styles.tileGo} aria-hidden="true">
                      Explore
                      <Arrow />
                    </span>
                  </span>
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** About: editorial hero, the service in a spread, the specialists as badges, the handoff relay, then who we help. */
export function AboutPage({ page }: { page: SitePage }) {
  const team = page.sections.find((x): x is Of<"cards"> => x.kind === "cards");
  const roles = (team?.items ?? []).map((it) => ({
    title: it.title,
    icon: it.icon,
  }));
  return (
    <>
      <AboutHero page={page} roles={roles} />
      {page.sections.map((s, k) => {
        if (s.kind === "feature") return <ServiceRole key={k} s={s} />;
        if (s.kind === "cards") return <TeamBadges key={k} s={s} />;
        if (s.kind === "steps") return <HandoffRelay key={k} s={s} />;
        if (s.kind === "related") return <PracticeTiles key={k} s={s} />;
        return <SiteSection key={k} s={s} />;
      })}
    </>
  );
}
