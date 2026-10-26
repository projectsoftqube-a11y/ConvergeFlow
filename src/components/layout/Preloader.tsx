"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/components/motion/SmoothScroll";
import { markSiteReady } from "@/lib/siteReady";
import { STAGES } from "@/content/site/services";
import { Aurora } from "@/components/fx/Aurora";
import styles from "./Preloader.module.css";

/* The counter reaches 100% about 3.5s after navigation starts (later only on slow connections, capped at MAX_MS). */
const MIN_MS = 3400;
const MAX_MS = 7000;
const R = 54;
const RING = 2 * Math.PI * R;
const PANELS = 6;
const WORD = "ConvergeFlow";
const FLOW_FROM = 8; // "Flow" is set in mint
const DIGITS = Array.from({ length: 10 }, (_, d) => d);
const pad = (n: number) => String(n).padStart(2, "0");

/* Client-only detection: false during SSR/hydration, true once mounted — so the loader's
   counter and stage text never ship in the server HTML (CF-013). */
const noopSubscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

/**
 * Pace of the minimum timeline, in eight beats (one per stage): within each beat the
 * count eases in and out, so it settles briefly on every stage name before moving on.
 */
const paced = (t: number) => {
  const s = Math.min(1, t / MIN_MS) * STAGES.length;
  const k = Math.floor(s);
  if (k >= STAGES.length) return 1;
  const f = s - k;
  return (k + f * f * (3 - 2 * f)) / STAGES.length;
};

/**
 * Loading screen for a full page load.
 *
 * Over drifting green and blue light, the eight stages orbit in as points of
 * light and converge on the mark while a ring fills and the mark is revealed
 * clockwise; "ConvergeFlow" assembles letter by letter beneath it; rolling
 * odometer digits count to 100% in eight eased beats, settling on each stage
 * name, over about 3.5s from navigation start (longer only while a slow
 * connection is still loading fonts and files).
 *
 * At 100% the mark flashes and collapses, the letters and digits roll away,
 * and the screen opens in six panels sliding up from the centre while the
 * hero intro plays. Client-side navigations never show it; reduced motion
 * skips it; CSS keeps it hidden without JS and removes it if the script never
 * finishes.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  // Render only after mount (see onClient/onServer) so the loader markup is absent
  // from the server HTML that crawlers and AI tools read first (CF-013).
  const mounted = useSyncExternalStore(noopSubscribe, onClient, onServer);

  useEffect(() => {
    if (!mounted) return;
    const root = ref.current;
    if (!root) return;
    const html = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markSiteReady();
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }

    html.classList.add("is-loading");
    // Lenis starts in a sibling effect that runs after this one.
    const lockId = requestAnimationFrame(() => getLenis()?.stop());

    const q = <T extends Element = HTMLElement>(sel: string) => root.querySelectorAll<T>(sel);
    const stage = root.querySelector<HTMLElement>("[data-stage]")!;
    const ring = root.querySelector<SVGCircleElement>("[data-ring]")!;
    const cols = Array.from(q("[data-col]"));
    const strips = cols.map((c) => c.firstElementChild as HTMLElement);

    let real = 0;
    const bump = (v: number) => (real = Math.max(real, v));
    document.fonts?.ready.then(() => bump(0.6));
    const onLoad = () => bump(1);
    if (document.readyState === "complete") bump(1);
    else window.addEventListener("load", onLoad, { once: true });

    let shown = 0;
    let lastValue = 0;
    let lastStage = 0;
    let last = 0;
    let raf = 0;
    let tl: gsap.core.Timeline | null = null;

    const setCount = (v: number) => {
      const digits = [Math.floor(v / 100), Math.floor(v / 10) % 10, v % 10];
      digits.forEach((d, i) => (strips[i].style.transform = `translateY(${-d * 10}%)`));
      // Leading zeros stay dim.
      cols[0].toggleAttribute("data-dim", v < 100);
      cols[1].toggleAttribute("data-dim", v < 10);
    };

    const exit = () => {
      root.setAttribute("data-exit", "");
      const flash = root.querySelector("[data-flash]");
      const emblem = root.querySelector("[data-emblem]");
      tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("is-loading");
          setGone(true);
        },
      });
      tl.fromTo(flash, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }, 0)
        .to(flash, { opacity: 0, scale: 2.8, duration: 0.8, ease: "power2.out" }, 0.3)
        .to(emblem, { scale: 1.1, duration: 0.45, ease: "back.out(2.2)" }, 0)
        .to(q("[data-letter]"), { yPercent: -115, duration: 0.5, stagger: 0.025, ease: "power3.in" }, 0.2)
        .to(cols, { yPercent: -110, duration: 0.45, stagger: 0.05, ease: "power3.in" }, 0.2)
        .to(q("[data-out]"), { opacity: 0, y: -12, filter: "blur(6px)", duration: 0.4, stagger: 0.04, ease: "power2.in" }, 0.2)
        // The mark collapses into the light, then the screen opens.
        .to(emblem, { scale: 0.55, opacity: 0, filter: "blur(10px)", duration: 0.5, ease: "power3.in" }, 0.5)
        .to(root.querySelector("[data-scene]"), { opacity: 0, duration: 0.45, ease: "power2.out" }, 0.7)
        .add(() => {
          getLenis()?.start();
          markSiteReady();
        }, 0.8)
        .to(q("[data-panel]"), { yPercent: -100, duration: 0.95, stagger: { each: 0.07, from: "center" }, ease: "expo.inOut" }, 0.75);
    };

    // `t` counts from navigation start (performance.now()'s origin), so the wait before
    // scripts boot counts toward the minimum instead of adding to it.
    const frame = (t: number) => {
      const dt = last ? Math.min(100, t - last) : 16;
      last = t;
      // Creep forward while waiting; real loading signals pull ahead; never ahead of the paced minimum.
      const creep = 0.92 * (1 - Math.exp(-t / 1600));
      let goal = real >= 1 || t > MAX_MS ? 1 : Math.max(real * 0.9, creep);
      goal = Math.min(goal, paced(t));
      // Ease toward the goal with a ~110ms time constant, the same at any refresh rate.
      shown += (goal - shown) * (1 - Math.exp(-dt / 110));
      if (goal === 1 && 1 - shown < 0.01) shown = 1;

      root.style.setProperty("--p", shown.toFixed(4));
      ring.style.strokeDashoffset = String(RING * (1 - shown));
      const v = Math.round(shown * 100);
      if (v !== lastValue) {
        lastValue = v;
        setCount(v);
      }
      const k = Math.min(STAGES.length - 1, Math.floor(shown * STAGES.length));
      if (k !== lastStage) {
        lastStage = k;
        stage.textContent = `${pad(k + 1)} · ${STAGES[k].label}`;
        stage.animate([{ opacity: 0, transform: "translateY(8px)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "blur(0px)" }], {
          duration: 420,
          easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        });
      }

      if (shown === 1) exit();
      else raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(lockId);
      window.removeEventListener("load", onLoad);
      tl?.kill();
      html.classList.remove("is-loading");
      getLenis()?.start();
      // Not marking the site ready here: in development React re-runs this effect once,
      // and hero intros have their own failsafe if the loader never finishes.
    };
  }, [mounted]);

  if (!mounted || gone) return null;

  return (
    <div ref={ref} className={styles.root} aria-hidden="true">
      <div className={styles.panels}>
        {Array.from({ length: PANELS }, (_, i) => (
          <span key={i} data-panel />
        ))}
      </div>

      <div className={styles.scene} data-scene>
        <Aurora green={0.5} />
        <span className={styles.grid} />

        <div className={styles.top} data-out>
          <span>Managed revenue cycle</span>
          <span>Dental &amp; medical</span>
        </div>

        <div className={styles.center}>
          <div className={styles.emblem} data-emblem>
            <span className={styles.halo} />
            <span className={styles.dial} />
            <span className={styles.orbit}>
              {STAGES.map((s, i) => (
                <i key={s.href} style={{ ["--a" as string]: `${i * 45}deg`, ["--k" as string]: i }} />
              ))}
            </span>
            <svg className={styles.ring} viewBox="0 0 120 120">
              <defs>
                <linearGradient id="preloader-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#3fd6c3" />
                  <stop offset="1" stopColor="#eafffb" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r={R} className={styles.track} />
              <circle cx="60" cy="60" r={R} className={styles.fill} data-ring style={{ strokeDasharray: RING, strokeDashoffset: RING }} />
            </svg>
            <span className={styles.head}>
              <i />
            </span>
            <span className={styles.disc}>
              <span className={styles.markGhost} />
              <span className={styles.mark} />
            </span>
            <span className={styles.flash} data-flash />
          </div>

          <p className={styles.word}>
            {WORD.split("").map((ch, i) => (
              <span key={i} data-flow={i >= FLOW_FROM || undefined} style={{ ["--i" as string]: i }}>
                <span data-letter>{ch}</span>
              </span>
            ))}
          </p>
        </div>

        <div className={styles.foot}>
          <p className={styles.meta} data-out>
            <span>Loading</span>
            <b className={styles.stage} data-stage>
              01 · {STAGES[0].label}
            </b>
          </p>
          <p className={styles.count}>
            <span className={styles.digits}>
              {[0, 1, 2].map((c) => (
                <span key={c} className={styles.col} data-col data-dim={c < 2 || undefined}>
                  <span className={styles.strip}>
                    {DIGITS.map((d) => (
                      <i key={d}>{d}</i>
                    ))}
                  </span>
                </span>
              ))}
            </span>
            <em data-out>%</em>
          </p>
        </div>

        <span className={styles.bar} data-out>
          <i />
        </span>
      </div>
    </div>
  );
}
