"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { Logo } from "@/components/ui/Logo";
import { useMotion } from "@/components/motion/useMotion";
import { getLenis } from "@/components/motion/SmoothScroll";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onSiteReady } from "@/lib/siteReady";
import { liveHref, navGroupFor } from "@/content/navigation";
import { getSitePage } from "@/content/site";
import { BROCHURES, brochureFor, type Brochure } from "@/content/site/brochures";
import type { IconName, Section, SitePage } from "@/content/site/types";
import { Aurora } from "@/components/fx/Aurora";
import { FloodLayer } from "@/components/fx/FloodLayer";
import { setFloodOrigin } from "@/components/fx/flood";
import { Icon } from "@/components/site/Icon";
import { SectionHead } from "@/components/site/Title";
import { pad } from "./stageMeta";
import styles from "./ResourcesPage.module.css";

type Of<K extends Section["kind"]> = Extract<Section, { kind: K }>;
type Download = Of<"downloads">["items"][number];
type Page = Brochure["pages"][number];

const flood = {
  "data-flood": "",
  "data-glow": "",
  onPointerEnter: setFloodOrigin,
  onPointerLeave: setFloodOrigin,
};
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * Where a brochure unfolds as you scroll: wide and tall enough for the full
 * spread to sit on one screen, and motion allowed. Everywhere else its pages
 * sit in a swipeable row.
 */
const FOLD_MQ = "(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)";

/** An icon for each guide page. */
const GUIDE_ICONS: Record<string, IconName> = {
  "/how-it-works/": "route",
  "/services/": "layers",
  "/industries/dental/": "tooth",
  "/technology/": "link",
  "/technology/security/": "lock",
  "/pricing/": "coins",
};

const categoryOf = (route: string) => (route.startsWith("/services/") ? "Services" : (navGroupFor(route)?.label ?? "Company"));

/** The guide pages that are live, with the area each belongs to. */
const guideList = (routes: string[]) =>
  routes
    .map((r) => getSitePage(r))
    .filter((p): p is SitePage => Boolean(p && liveHref(p.route)))
    .map((p) => ({ page: p, cat: categoryOf(p.route) }));

const bookId = (b: Brochure) => `brochure-${b.short.toLowerCase()}`;

/** Splits "Revenue Cycle Management brochure" into its name and the last word, which takes the accent. */
const splitTitle = (t: string) => {
  const at = t.lastIndexOf(" ");
  return at > 0 ? [t.slice(0, at), t.slice(at + 1)] : [t, ""];
};

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M3 8h9.5M8.5 4l4 4-4 4" />
    </svg>
  );
}

/** A file link styled like the site's buttons (a plain <a>, so `download` and new tabs work). */
function FileButton({ href, download, variant, icon, children }: { href: string; download?: boolean; variant: "primary" | "secondary"; icon: IconName; children: ReactNode }) {
  return (
    <a href={href} className={`btn btn-${variant}`} download={download || undefined} target={download ? undefined : "_blank"} rel={download ? undefined : "noopener"}>
      <span className="btn-glow" aria-hidden="true" />
      <span className="btn-icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {!download && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}

/* ------------------------------------------------------------------ hero */

/**
 * The hand of pages: the RCM brochure's six pages fanned to the left of the
 * centre, the dental brochure's to the right, covers in the middle. Each
 * card's angle comes from its distance to the centre.
 */
const DECK = [...BROCHURES[0].pages.map((p, k) => ({ ...p, side: -1, k })).reverse(), ...BROCHURES[1].pages.map((p, k) => ({ ...p, side: 1, k }))];

/**
 * Library hero: the headline centred over a hand of brochure pages fanned in a
 * wide arc, rising from below the fold. The arc spreads open when the page
 * loads, leans with the pointer, and each page lifts when pointed at.
 */
function ResourcesHero({ page }: { page: SitePage }) {
  const ref = useRef<HTMLElement>(null);
  const hero = page.hero;

  useMotion(ref, ({ motion, desktop }) => {
    const root = ref.current!;
    gsap.set(root.querySelectorAll("[data-intro]"), { opacity: 1 });
    if (!motion) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-card]", root);
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      paused: true,
    });
    tl.from(root.querySelector("[data-spot]"), { opacity: 0, scale: 0.6, duration: 2.4 }, 0)
      .from(
        root.querySelectorAll("[data-chip]"),
        {
          opacity: 0,
          y: -12,
          filter: "blur(8px)",
          duration: 1,
          clearProps: "filter,transform",
        },
        0.15,
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
        0.3,
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
        0.8,
      )
      // the pages rise as one stack, then spread into the arc from the centre out
      .fromTo(
        cards,
        { "--a": 0, "--rise": "280px", opacity: 0 },
        {
          "--a": (_: number, el: HTMLElement) => Number(el.dataset.a),
          "--rise": "0px",
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          stagger: { each: 0.05, from: "center" },
          clearProps: "opacity",
        },
        0.6,
      )
      .from(
        root.querySelectorAll("[data-tag]"),
        {
          opacity: 0,
          y: 12,
          duration: 0.9,
          stagger: 0.1,
          clearProps: "transform",
        },
        1.6,
      );

    let onMove: ((e: PointerEvent) => void) | null = null;
    const fan = root.querySelector<HTMLElement>("[data-fan]");
    if (desktop && fan) {
      const rot = gsap.quickTo(fan, "rotation", {
        duration: 1.4,
        ease: "power3.out",
      });
      const x = gsap.quickTo(fan, "x", { duration: 1.4, ease: "power3.out" });
      onMove = (e: PointerEvent) => {
        const r = root.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        rot(px * 4);
        x(px * 30);
      };
      root.addEventListener("pointermove", onMove);
    }
    const cancel = onSiteReady(() => tl.play());
    return () => {
      cancel();
      if (onMove) root.removeEventListener("pointermove", onMove);
    };
  });

  const n = DECK.length;

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="page-title">
      <div className={styles.heroBg} aria-hidden="true">
        <span className={styles.heroAurora}>
          <Aurora green={0.5} />
        </span>
        <span className={styles.heroGrid} />
        <span className={styles.spot} data-spot />
      </div>

      <div className={`container ${styles.heroCopy}`}>
        <p className="eyebrow" data-intro data-chip>
          {hero.eyebrow}
        </p>
        <h1 id="page-title" className={styles.heroTitle} data-intro>
          <span className={styles.line} data-line>
            {hero.title}
          </span>
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

      <div className={styles.deck} aria-hidden="true">
        <div className={styles.fan} data-fan>
          {DECK.map((p, i) => (
            <span key={p.src} className={styles.card} data-card data-a={i - (n - 1) / 2} data-cover={p.k === 0 || undefined} style={vars({ "--a": i - (n - 1) / 2 })}>
              <Image src={p.src} alt="" fill quality={85} sizes="(min-width: 1100px) 12rem, 7rem" priority={p.k < 2} />
            </span>
          ))}
        </div>
        <p className={`${styles.deckTag} ${styles.deckTagL}`} data-tag>
          <b>RCM</b> · {BROCHURES[0].pages.length} pages
        </p>
        <p className={`${styles.deckTag} ${styles.deckTagR}`} data-tag>
          <b>Dental</b> · {BROCHURES[1].pages.length} pages
        </p>
        <span className={styles.deckFade} />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- page reader */

/** A full-size page reader in a modal dialog: previous / next, arrow keys, Esc or the backdrop to close. */
function PageReader({ id, title, pages, at, setAt }: { id: string; title: string; pages: Page[]; at: number | null; setAt: (n: number | null) => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (at !== null && !d.open) {
      d.showModal();
      getLenis()?.stop();
    }
  }, [at]);

  const close = () => ref.current?.close();
  const go = (n: number) => setAt(Math.max(0, Math.min(pages.length - 1, n)));

  return (
    <dialog
      ref={ref}
      className={styles.reader}
      aria-labelledby={`${id}-reader`}
      data-lenis-prevent
      onClose={() => {
        getLenis()?.start();
        setAt(null);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (at === null) return;
        if (e.key === "ArrowRight") go(at + 1);
        if (e.key === "ArrowLeft") go(at - 1);
      }}
    >
      {at !== null && (
        <div className={styles.readerInner}>
          <header className={styles.readerBar}>
            <p id={`${id}-reader`} className={styles.readerTitle}>
              <span>
                {pad(at + 1)} / {pad(pages.length)}
              </span>
              {pages[at].title}
              <span className="visually-hidden"> · {title}</span>
            </p>
            <div className={styles.readerCtrls}>
              <button type="button" className={styles.readerBtn} onClick={() => go(at - 1)} disabled={at === 0} aria-label="Previous page">
                <Arrow back />
              </button>
              <button type="button" className={styles.readerBtn} onClick={() => go(at + 1)} disabled={at === pages.length - 1} aria-label="Next page">
                <Arrow />
              </button>
              <button type="button" className={styles.readerBtn} onClick={close} aria-label="Close">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
          </header>
          <div className={styles.readerPage} key={at}>
            <Image src={pages[at].src} alt={`Page ${at + 1} of the ${title}: ${pages[at].title}`} fill quality={85} sizes="(min-width: 900px) 52rem, 94vw" />
          </div>
        </div>
      )}
    </dialog>
  );
}

/* -------------------------------------------------------------- the folds */

/** One page face of a fold: the page image, a shade for light, and a click target that opens the reader. */
function Face({ page, k, alt, side, open, sizes }: { page: Page; k: number; alt: string; side: "front" | "back"; open: (k: number) => void; sizes: string }) {
  return (
    <div className={`${styles.face} ${side === "back" ? styles.faceBack : ""}`} data-face={side}>
      <Image src={page.src} alt={alt} fill quality={85} sizes={sizes} />
      <span className={styles.shade} data-shade aria-hidden="true" />
      <button type="button" className={styles.faceBtn} tabIndex={-1} aria-hidden="true" onClick={() => open(k)}>
        <span>
          <Icon name="search" />
          Read page {k + 1}
        </span>
      </button>
    </div>
  );
}

/**
 * The six-panel zig-zag: each panel hangs off the previous one's edge, so
 * folding is a chain of hinges. Panel k turns +2β or −2β against its
 * neighbour, so even panels sit at γ − β and odd ones at γ + β. Closed (both
 * 88°) each panel folds behind the one before and only the cover faces the
 * reader; open (both 0) the six pages lie side by side.
 */
function Accordion({ pages, alt, open, k = 0 }: { pages: Page[]; alt: (k: number) => string; open: (k: number) => void; k?: number }) {
  if (k >= pages.length) return null;
  return (
    <div className={styles.panel} data-panel>
      <Face page={pages[k]} k={k} alt={alt(k)} side="front" open={open} sizes="(min-width: 900px) 17vw, 1px" />
      <div className={`${styles.face} ${styles.faceBack} ${styles.paper}`} aria-hidden="true" />
      <Accordion pages={pages} alt={alt} open={open} k={k + 1} />
    </div>
  );
}

/**
 * The two-page book: each leaf carries a page on its front and the next on
 * its back, hinged at the spine. Closed, page 1 is the cover on the right;
 * each turn opens the next spread; it ends on the back cover with the download.
 */
function Book({ pages, alt, open, href, index }: { pages: Page[]; alt: (k: number) => string; open: (k: number) => void; href: string; index: number }) {
  const leaves = Array.from({ length: Math.ceil(pages.length / 2) }, (_, i) => [2 * i, 2 * i + 1] as const);
  return (
    <div className={styles.book} data-book>
      <span className={styles.bookBase} data-base aria-hidden="true" />
      <div className={styles.bookEnd} aria-hidden="true">
        <Logo tone="light" width={160} />
        <p className={styles.endKicker}>End of brochure {pad(index + 1)}</p>
        <p className={styles.endTitle}>
          Share it with <em>your team.</em>
        </p>
        <a href={href} download className={styles.endBtn} tabIndex={-1}>
          <Icon name="download" />
          Download PDF
        </a>
      </div>
      {leaves.map(([a, b]) => (
        <div key={a} className={styles.leaf} data-leaf>
          <Face page={pages[a]} k={a} alt={alt(a)} side="front" open={open} sizes="(min-width: 900px) 40vw, 1px" />
          {b < pages.length ? (
            <Face page={pages[b]} k={b} alt={alt(b)} side="back" open={open} sizes="(min-width: 900px) 40vw, 1px" />
          ) : (
            <div className={`${styles.face} ${styles.faceBack} ${styles.paper}`} aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

/** The scroll timeline for the zig-zag. Returns the step shown at a timeline time. */
function buildAccordion(root: HTMLElement, tl: gsap.core.Timeline) {
  const acc = root.querySelector<HTMLElement>("[data-acc]")!;
  const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", root);
  const shades = panels.map((p) => p.querySelector<HTMLElement>(":scope > [data-face] [data-shade]"));
  const n = panels.length;
  const st = { beta: 88, gamma: 88 };
  const apply = () => {
    let x = 0;
    let min = 0;
    let max = 0;
    panels.forEach((p, i) => {
      const world = st.gamma + (i % 2 ? st.beta : -st.beta);
      gsap.set(p, {
        rotationY: i === 0 ? st.gamma - st.beta : (i % 2 ? 2 : -2) * st.beta,
      });
      const rad = (world * Math.PI) / 180;
      x += Math.cos(rad);
      min = Math.min(min, x);
      max = Math.max(max, x);
      // light from the front: panels turned away from the reader fall into shade
      const s = shades[i];
      if (s) s.style.opacity = String(Math.min(0.6, Math.abs(Math.sin(rad)) * (world > 0 ? 0.55 : 0.2)));
    });
    // keep whatever is visible centred on the stage
    gsap.set(acc, { xPercent: ((n / 2 - (min + max) / 2) / n) * 100 });
  };
  apply();
  tl.to(st, { gamma: 0, beta: 60, duration: 1, ease: "power2.inOut", onUpdate: apply }, 0.35).to(st, { beta: 0, duration: 1.3, ease: "power2.inOut", onUpdate: apply }, 1.35);
  tl.fromTo(root.querySelectorAll("[data-label]"), { opacity: 0.3 }, { opacity: 1, duration: 0.4, stagger: 0.1, ease: "none" }, 1.8);
  return (t: number) => (t < 0.55 ? 0 : t < 2.5 ? 1 : 2);
}

/** The scroll timeline for the book: the cover swings open, then each leaf turns. */
function buildBook(root: HTMLElement, tl: gsap.core.Timeline) {
  const book = root.querySelector<HTMLElement>("[data-book]")!;
  const base = root.querySelector<HTMLElement>("[data-base]")!;
  const leafEls = gsap.utils.toArray<HTMLElement>("[data-leaf]", root);
  const count = leafEls.length;
  const FLIP = 1;
  const HOLD = 0.55;
  const flipAt = (i: number) => 0.4 + i * (FLIP + HOLD);
  // unturned leaves stack on the right, the first on top; tiny depth steps keep the 3D order exact
  leafEls.forEach((leaf, i) => gsap.set(leaf, { z: (count - i) * 0.6, zIndex: count - i }));
  // closed, the cover sits in the middle of the stage
  gsap.set(book, { xPercent: -25 });
  tl.to(book, { xPercent: 0, duration: FLIP, ease: "power2.inOut" }, flipAt(0)).set(base, { opacity: 1 }, flipAt(0) + FLIP * 0.9);
  leafEls.forEach((leaf, i) => {
    const t = flipAt(i);
    const [front, back] = leaf.querySelectorAll("[data-shade]");
    tl.to(
      leaf,
      {
        rotationY: -180,
        z: (i + 1) * 0.6,
        duration: FLIP,
        ease: "power2.inOut",
      },
      t,
    ).set(leaf, { zIndex: count + 1 + i }, t + FLIP / 2);
    // light falls off the page as it lifts, and returns as it lands
    if (front) tl.fromTo(front, { opacity: 0 }, { opacity: 0.45, duration: FLIP / 2, ease: "power1.in" }, t);
    if (back) tl.fromTo(back, { opacity: 0.45 }, { opacity: 0, duration: FLIP / 2, ease: "power1.out" }, t + FLIP / 2);
  });
  return (t: number) => {
    let s = 0;
    for (let i = 0; i < count; i++) if (t >= flipAt(i) + FLIP / 2) s = i + 1;
    return s;
  };
}

/** The pages on show at each step of the book. */
const BOOK_PAGES = [[0], [1, 2], [3, 4], [5]];

const STEP_LABELS = {
  accordion: ["Cover · scroll to unfold", "Unfolding the panels", "All six pages · select one to read"],
  book: ["Cover · scroll to open", "Pages 2 & 3", "Pages 4 & 5", "Page 6 · the back cover"],
} as const;

/**
 * One brochure, full width. On wide screens the section pins and scrolling
 * unfolds it: the RCM brochure as a six-panel zig-zag, the dental brochure as
 * a two-page book whose leaves turn one by one. A rail of page titles sits
 * under it, and any page opens in the reader. Elsewhere the pages sit in a
 * swipeable row with the contents beneath.
 */
function FoldShowcase({ item, b, index, kind }: { item: Download; b: Brochure; index: number; kind: "accordion" | "book" }) {
  const ref = useRef<HTMLElement>(null);
  const swipeRef = useRef<HTMLOListElement>(null);
  const [mode, setMode] = useState<"fold" | "swipe">("swipe");
  const [step, setStep] = useState(0);
  const [page, setPage] = useState(0);
  const [reading, setReading] = useState<number | null>(null);

  const pages = b.pages;
  const id = bookId(b);
  const [name, accent] = splitTitle(item.title);
  const alt = (k: number) => `Page ${k + 1} of the ${item.title}: ${pages[k].title}`;
  // the zig-zag lies six pages wide; the book opens to a two-page spread
  const panels = kind === "accordion" ? 6 : 2;
  const onShow = kind === "book" ? (BOOK_PAGES[step] ?? []) : pages.map((_, k) => k);

  // copy rises in as the brochure arrives
  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    gsap.from(root.querySelectorAll("[data-reveal]"), {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
      clearProps: "opacity,transform,filter",
      scrollTrigger: { trigger: root, start: "top 75%", once: true },
    });
  });

  // the scroll-driven fold, wherever FOLD_MQ holds
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia(root);
    mm.add(FOLD_MQ, () => {
      root.setAttribute("data-live", "");
      setMode("fold");
      const pin = root.querySelector<HTMLElement>("[data-pin]")!;
      const tilt = root.querySelector<HTMLElement>("[data-tilt]")!;
      let shown = 0;
      let stepAt: (t: number) => number = () => 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * (kind === "accordion" ? 2.4 : 3)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const s = stepAt(tl.time());
            if (s !== shown) {
              shown = s;
              setStep(s);
            }
          },
        },
      });
      // the folded brochure lies tilted back, then rises to face the reader
      tl.fromTo(
        tilt,
        { rotationX: 18, scale: 0.88 },
        {
          rotationX: kind === "book" ? 3 : 5,
          scale: 1,
          duration: kind === "accordion" ? 2.3 : 1.4,
          ease: "power1.inOut",
        },
        0.3,
      );
      stepAt = kind === "accordion" ? buildAccordion(root, tl) : buildBook(root, tl);
      tl.to({}, { duration: 0.6 }, tl.duration());
      // the pin adds scroll length, so later triggers re-measure
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(raf);
        root.removeAttribute("data-live");
        setMode("swipe");
        setStep(0);
      };
    });
    return () => mm.revert();
  }, [kind]);

  const onSwipe = () => {
    const el = swipeRef.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let dist = Infinity;
    Array.from(el.children).forEach((c, k) => {
      const it = c as HTMLElement;
      const d = Math.abs(it.offsetLeft + it.offsetWidth / 2 - mid);
      if (d < dist) {
        dist = d;
        best = k;
      }
    });
    if (best !== page) setPage(best);
  };

  const swipeTo = (k: number) => {
    const el = swipeRef.current;
    const it = el?.children[k] as HTMLElement | undefined;
    if (!el || !it) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: it.offsetLeft - (el.clientWidth - it.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const labels = STEP_LABELS[kind];

  return (
    <article
      ref={ref}
      id={id}
      className={styles.fold}
      data-kind={kind}
      aria-labelledby={`${id}-title`}
      style={vars({
        "--ar": b.aspect,
        "--wide": b.aspect * panels,
        "--cols": panels,
      })}
    >
      <div className={styles.foldPin} data-pin>
        <div className={`container ${styles.foldLayout}`}>
          <div className={styles.foldHead}>
            <p className="eyebrow" data-reveal>
              Brochure {pad(index + 1)} · {pages.length} pages
            </p>
            <h3 id={`${id}-title`} className={styles.foldTitle} data-reveal>
              {name} {accent && <em className="serif-accent">{accent}</em>}
            </h3>
            <p className={styles.foldLead} data-reveal>
              {item.body}
            </p>
          </div>

          <div className={styles.foldFoot} data-reveal>
            <div className={styles.foldActions}>
              <FileButton href={item.href} download variant="primary" icon="download">
                Download PDF
              </FileButton>
              <FileButton href={item.href} variant="secondary" icon="eye">
                Open in browser
              </FileButton>
            </div>
            <p className={styles.foldMeta}>
              PDF · {pages.length} pages · {b.sizeKb} KB
            </p>
          </div>

          {/* phones, tablets, short screens and reduced motion: a swipeable row */}
          <div className={styles.swipeWrap}>
            <ol ref={swipeRef} className={styles.swipe} onScroll={onSwipe} aria-label={`${item.title} pages`} tabIndex={0}>
              {pages.map((p, k) => (
                <li key={p.src} className={styles.swipeItem}>
                  <button type="button" className={styles.swipeOpen} onClick={() => setReading(k)} aria-label={`Read page ${k + 1}: ${p.title}`}>
                    <Image src={p.src} alt={alt(k)} fill quality={85} sizes="(min-width: 900px) 22rem, 80vw" />
                    <span className={styles.swipeNum} aria-hidden="true">
                      {pad(k + 1)}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.pager}>
              {pages.map((p, k) => (
                <i key={p.src} data-on={k === page || undefined} aria-hidden="true" />
              ))}
              <span aria-live="polite">
                Page {page + 1} of {pages.length}
              </span>
            </p>
          </div>

          <ol className={styles.toc} aria-label="Contents">
            {pages.map((p, k) => (
              <li key={p.src}>
                <button type="button" className={styles.tocRow} aria-current={(mode === "swipe" && k === page) || undefined} aria-label={`Go to page ${k + 1}: ${p.title}`} onClick={() => swipeTo(k)}>
                  <span className={styles.tocNum}>{pad(k + 1)}</span>
                  <span className={styles.tocTitle}>{p.title}</span>
                  <span className={styles.tocPage}>p.{k + 1}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* wide screens: the fold itself, full width */}
        <div className={styles.foldStage}>
          <span className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.tilt} data-tilt>
            <div className={styles.acc} data-acc>
              {kind === "accordion" ? <Accordion pages={pages} alt={alt} open={setReading} /> : <Book pages={pages} alt={alt} open={setReading} href={item.href} index={index} />}
            </div>
          </div>
          <div className={styles.railWrap}>
            <ol className={styles.rail} aria-label={`${item.title}: read a page`}>
              {pages.map((p, k) => (
                <li key={p.src} data-label data-on={onShow.includes(k) || undefined}>
                  <button type="button" className={styles.railBtn} onClick={() => setReading(k)}>
                    <span className={styles.railNum}>{pad(k + 1)}</span>
                    <span className={styles.railTitle}>{p.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.foldStep} aria-live="polite">
              {labels.map((l, s) => (
                <i key={l} data-on={s === step || undefined} aria-hidden="true" />
              ))}
              <span>{labels[step]}</span>
            </p>
          </div>
        </div>
      </div>

      <PageReader id={id} title={item.title} pages={pages} at={reading} setAt={setReading} />
    </article>
  );
}

function Brochures({ s }: { s: Of<"downloads"> }) {
  return (
    <section id={s.id} className={`section ${styles.brochures}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} align="center" />
      </div>
      <div className={styles.foldList}>
        {s.items.map((item, k) => {
          const b = brochureFor(item.href);
          return b ? <FoldShowcase key={item.href} item={item} b={b} index={k} kind={k % 2 ? "book" : "accordion"} /> : null;
        })}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- guide library */

/** The guide pages as cards that turn light on hover, filtered by area. */
function Guides({ s }: { s: Of<"related"> }) {
  const ref = useRef<HTMLElement>(null);
  const guides = guideList(s.routes);
  const cats = ["All", ...Array.from(new Set(guides.map((g) => g.cat)))];
  const [cat, setCat] = useState("All");
  const shown = guides.filter((g) => cat === "All" || g.cat === cat);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    gsap.from(root.querySelectorAll("[data-card]"), {
      opacity: 0,
      y: 60,
      rotateX: 12,
      filter: "blur(8px)",
      duration: 1.2,
      stagger: 0.08,
      ease: "expo.out",
      clearProps: "opacity,transform,filter",
      scrollTrigger: {
        trigger: root.querySelector("[data-grid]"),
        start: "top 85%",
        once: true,
      },
    });
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.guides}`}>
      <Aurora green={0.5} className={styles.guidesAurora} />
      <div className="container">
        <div className={styles.guidesHead}>
          <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />
          <div className={styles.filters} role="group" aria-label="Filter guides">
            {cats.map((c) => (
              <button key={c} type="button" className={styles.filter} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
                <span>{c === "All" ? guides.length : guides.filter((g) => g.cat === c).length}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className={styles.guideGrid} data-grid key={cat}>
          {shown.map(({ page: p, cat: c }, k) => (
            <li key={p.route} className={styles.guide} data-card style={vars({ "--k": k })} {...flood}>
              <FloodLayer />
              <div className={styles.guideTop}>
                <span className={styles.guideIcon} aria-hidden="true">
                  <Icon name={GUIDE_ICONS[p.route] ?? "book"} />
                </span>
                <span className={styles.guideCat}>{c}</span>
              </div>
              <h3 className={styles.guideTitle}>
                <SmartLink href={p.route} className={styles.guideLink}>
                  {p.label}
                </SmartLink>
              </h3>
              <p className={styles.guideBody}>{p.seo.description}</p>
              <span className={styles.guideGo} aria-hidden="true">
                Read the guide
                <Arrow />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

/**
 * Resources, laid out as a library: the fanned-pages hero; the RCM brochure
 * unfolding as a zig-zag and the dental brochure turning as a book as you
 * scroll; then the guide pages, filterable by area.
 */
export function ResourcesPage({ page }: { page: SitePage }) {
  return (
    <>
      <ResourcesHero page={page} />
      {page.sections.map((sec, k) => {
        if (sec.kind === "downloads") return <Brochures key={k} s={sec} />;
        if (sec.kind === "related") return <Guides key={k} s={sec} />;
        return null;
      })}
    </>
  );
}
