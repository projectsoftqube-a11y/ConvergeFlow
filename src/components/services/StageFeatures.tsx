"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import type { Section } from "@/content/site/types";
import { Aurora } from "@/components/fx/Aurora";
import { FloodLayer } from "@/components/fx/FloodLayer";
import { setFloodOrigin } from "@/components/fx/flood";
import { Icon } from "@/components/site/Icon";
import { SectionHead } from "@/components/site/Title";
import styles from "./StageFeatures.module.css";

type Of<K extends Section["kind"]> = Extract<Section, { kind: K }>;
const vars = (v: Record<string, string | number>) => v as CSSProperties;
const flood = { "data-flood": "", "data-glow": "", onPointerEnter: setFloodOrigin, onPointerLeave: setFloodOrigin };

/* ============================================================== statement */

/** A pull-quote on a white panel: its words light up as it scrolls by; the caveat sits beneath. */
export function StageStatement({ s }: { s: Of<"statement"> }) {
  return (
    <section id={s.id} className={`section ${styles.statement}`}>
      <div className="container">
        <figure className={styles.quote}>
          <span className={styles.quoteGlow} aria-hidden="true" />
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className={styles.quoteText}>
            <p data-anim="scrub">
              {s.text} {s.accent && <span className={styles.quoteAccent}>{s.accent}</span>}
            </p>
          </blockquote>
          {s.sub && (
            <figcaption className={styles.quoteSub} data-anim="fade">
              <span className={styles.quoteSubIcon} aria-hidden="true">
                <Icon name="shield" />
              </span>
              {s.sub}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

/* ================================================================ anatomy */

const MOLARS = new Set([1, 2, 3, 14, 15, 16, 17, 18, 19, 30, 31, 32]);
const PREMOLARS = new Set([4, 5, 12, 13, 20, 21, 28, 29]);
const EXAMPLE = 30;
const kindOf = (n: number) => (MOLARS.has(n) ? "molar" : PREMOLARS.has(n) ? "premolar" : "anterior");
const quadrantOf = (n: number) => (n <= 8 ? "Upper right" : n <= 16 ? "Upper left" : n <= 24 ? "Lower left" : "Lower right");

/** ADA Universal numbering laid out as two arches: 1–16 across the top, 32–17 across the bottom (chart view). */
const ARCH = [
  ...Array.from({ length: 16 }, (_, k) => ({ n: k + 1, deg: 197 + k * (146 / 15) })),
  ...Array.from({ length: 16 }, (_, k) => ({ n: 32 - k, deg: 163 - k * (146 / 15) })),
].map(({ n, deg }) => {
  const a = (deg * Math.PI) / 180;
  // rounded, so server and browser render identical style strings
  const r3 = (v: number) => Math.round(v * 1000) / 1000;
  const cos = r3(Math.cos(a));
  const sin = r3(Math.sin(a));
  return { n, x: r3(50 + 43 * cos), y: r3(50 + 39 * sin), cos, sin, rot: r3(deg + 90) };
});

const LEGEND = [
  { mark: "1–32 · A–T", text: "ADA Universal tooth numbers" },
  { mark: "M D O I B L", text: "Treated surfaces" },
  { mark: "Quadrant · arch", text: "When the code requires it" },
];

/**
 * "Anatomy that matches the procedure": the teeth as two arches you can tap,
 * the selected tooth read out at the centre, and the brochure's example check
 * (tooth 30, mesial and occlusal) beside it with its surface diagram.
 */
export function AnatomyShowcase({ s }: { s: Of<"anatomy"> }) {
  const ref = useRef<HTMLElement>(null);
  const [tooth, setTooth] = useState(EXAMPLE);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-panel]"), start: "top 78%", once: true }, defaults: { ease: "expo.out" } });
    tl.from(root.querySelector("[data-panel]"), { opacity: 0, y: 60, duration: 1.3, clearProps: "opacity,transform" })
      .from(root.querySelectorAll("[data-tooth]"), { opacity: 0, scale: 0.4, duration: 0.7, stagger: { each: 0.02, from: "center" }, clearProps: "opacity,transform" }, 0.3)
      .from(root.querySelectorAll("[data-surface-on]"), { opacity: 0, duration: 0.6, stagger: 0.25 }, 1.0)
      .from(root.querySelectorAll("[data-side]"), { opacity: 0, x: 30, duration: 1, stagger: 0.12, clearProps: "opacity,transform" }, 0.6);
  });

  const isExample = tooth === EXAMPLE;
  const button = (n: number) => (
    <button key={n} type="button" className={styles.tooth} data-kind={kindOf(n)} data-tooth aria-pressed={tooth === n} aria-label={`Tooth ${n}, ${quadrantOf(n).toLowerCase()} ${kindOf(n)}`} onClick={() => setTooth(n)}>
      <span className={styles.toothShape} aria-hidden="true" />
      <span className={styles.toothNum}>{n}</span>
    </button>
  );

  return (
    <section ref={ref} id={s.id} className={`section ${styles.anatomy}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.body} align="split" />
        <ul className={styles.legend} data-anim="stagger">
          {LEGEND.map((l) => (
            <li key={l.mark}>
              <b>{l.mark}</b>
              {l.text}
            </li>
          ))}
        </ul>

        <div className={styles.anatomyPanel} data-panel>
          <div className={styles.chartCol}>
            <p className={styles.chartHead}>
              <span>ADA Universal numbering</span>
              <span className={styles.chartHint}>Tap a tooth</span>
            </p>
            {/* Wide screens: two arches; small screens: two rows of eight per arch */}
            <div className={styles.arches} role="group" aria-label="ADA Universal tooth numbering chart">
              <div className={styles.archRow} data-arch="upper">
                {ARCH.slice(0, 16).map((t) => (
                  <span key={t.n} className={styles.slot} style={vars({ "--x": `${t.x}%`, "--y": `${t.y}%`, "--cx": t.cos, "--cy": t.sin, "--rot": `${t.rot}deg` })}>
                    {button(t.n)}
                  </span>
                ))}
              </div>
              <div className={styles.archRow} data-arch="lower">
                {ARCH.slice(16).map((t) => (
                  <span key={t.n} className={styles.slot} style={vars({ "--x": `${t.x}%`, "--y": `${t.y}%`, "--cx": t.cos, "--cy": t.sin, "--rot": `${t.rot}deg` })}>
                    {button(t.n)}
                  </span>
                ))}
              </div>
              <div className={styles.readout} aria-live="polite">
                <span className={styles.readoutNum} key={tooth}>
                  #{tooth}
                </span>
                <span className={styles.readoutText}>
                  {quadrantOf(tooth)} · {kindOf(tooth)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.sideCol}>
            <figure className={styles.check} data-side>
              <figcaption className={styles.checkKicker}>
                <span aria-hidden="true" />
                Example check
              </figcaption>
              <p className={styles.checkTitle}>A restoration on tooth 30 with mesial and occlusal surfaces must match what the clinical record shows.</p>
              <div className={styles.checkBody}>
                <svg className={styles.surfaces} viewBox="0 0 120 120" role="img" aria-label="Tooth surfaces: mesial and occlusal treated">
                  <path d="M10 10h100L85 35H35z" className={styles.surface} />
                  <path d="M10 110h100L85 85H35z" className={styles.surface} />
                  <path d="M10 10v100l25-25V35z" className={styles.surface} data-on data-surface-on />
                  <path d="M110 10v100L85 85V35z" className={styles.surface} />
                  <rect x="35" y="35" width="50" height="50" className={styles.surface} data-on data-surface-on />
                  <text x="60" y="27" textAnchor="middle">B</text>
                  <text x="60" y="103" textAnchor="middle">L</text>
                  <text x="22" y="65" textAnchor="middle">M</text>
                  <text x="98" y="65" textAnchor="middle">D</text>
                  <text x="60" y="65" textAnchor="middle">O</text>
                </svg>
                <dl className={styles.checkRows}>
                  <div>
                    <dt>Tooth</dt>
                    <dd>30</dd>
                  </div>
                  <div>
                    <dt>Surfaces</dt>
                    <dd>M · O</dd>
                  </div>
                  <div>
                    <dt>Chart</dt>
                    <dd data-ok={isExample || undefined}>{isExample ? "Matches ✓" : "Select #30"}</dd>
                  </div>
                </dl>
              </div>
              <p className={styles.checkNote}>Illustrative example from the dental billing brochure.</p>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ balance */

/** The brochure example, step by step: from the charge to who pays what (figures are illustrative). */
const STEPS = [
  { key: "charge", label: "Charge", amount: 1000, from: 0, sign: "", tone: "total", note: "The fee billed for the procedure." },
  { key: "adj", label: "Contractual adjustment", amount: 200, from: 800, sign: "−", tone: "adj", note: "Charge above the contract allowance. Never billed to the patient." },
  { key: "allow", label: "Contract allowance", amount: 800, from: 0, sign: "", tone: "total", note: "What the contract allows for the procedure." },
  { key: "plan", label: "Plan pays", amount: 400, from: 400, sign: "", tone: "plan", note: "50% plan benefit on the allowance, deductible met." },
  { key: "patient", label: "Patient share", amount: 400, from: 0, sign: "", tone: "patient", note: "The remaining 50% of the allowance." },
] as const;
const MAX = 1000;
const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * "How a dental claim balances" as a waterfall: the $1,000 charge, less the
 * $200 contractual adjustment, leaves the $800 allowance, which splits into
 * what the plan pays and the patient's share. Bars rise in sequence with
 * their values counting up; hovering or focusing a step explains it.
 */
export function BalanceShowcase({ s }: { s: Of<"balance"> }) {
  const ref = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState<number | null>(null);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-chart]"), start: "top 75%", once: true }, defaults: { ease: "expo.out" } });
    root.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar, i) => {
      // bars grow up from the baseline (sideways on phones, where the chart turns)
      const sideways = window.matchMedia("(max-width: 639.98px)").matches;
      tl.from(bar, sideways ? { scaleX: 0, transformOrigin: "0% 50%", duration: 1, clearProps: "transform" } : { scaleY: 0, transformOrigin: "50% 100%", duration: 1, clearProps: "transform" }, i * 0.28);
      const val = root.querySelectorAll<HTMLElement>("[data-val]")[i];
      const target = Number(val.dataset.val);
      const sign = val.dataset.sign ?? "";
      const st = { v: 0 };
      tl.to(st, { v: target, duration: 1, ease: "power3.out", onUpdate: () => (val.textContent = `${sign}${money(Math.round(st.v))}`) }, i * 0.28);
    });
    tl.from(root.querySelectorAll("[data-link]"), { scaleX: 0, transformOrigin: "left center", duration: 0.5, stagger: 0.28 }, 0.6);
    tl.from(root.querySelector("[data-equation]"), { opacity: 0, y: 16, duration: 0.9, clearProps: "opacity,transform" }, 1.5);
  });

  const shown = focus === null ? null : STEPS[focus];

  return (
    <section ref={ref} id={s.id} className={`section ${styles.balance}`}>
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} />

        <div className={styles.balancePanel}>
          <ul className={styles.facts} aria-label="Example inputs">
            <li data-badge>Illustrative example</li>
            <li>$1,000 charge</li>
            <li>$800 contract allowance</li>
            <li>Deductible met</li>
            <li>50% plan benefit</li>
          </ul>

          <div className={styles.chart} data-chart>
            <div className={styles.grid} aria-hidden="true">
              {[1000, 500, 0].map((g) => (
                <span key={g} style={vars({ "--g": g / MAX })}>
                  <i>{money(g)}</i>
                </span>
              ))}
            </div>
            <ol className={styles.cols}>
              {STEPS.map((st, i) => (
                <li
                  key={st.key}
                  className={styles.col}
                  data-tone={st.tone}
                  data-dim={(focus !== null && focus !== i) || undefined}
                  tabIndex={0}
                  onPointerEnter={() => setFocus(i)}
                  onPointerLeave={() => setFocus(null)}
                  onFocus={() => setFocus(i)}
                  onBlur={() => setFocus(null)}
                  style={vars({ "--h": st.amount / MAX, "--b": st.from / MAX })}
                >
                  <span className={styles.plot}>
                    <span className={styles.bar} data-bar>
                      <span className={styles.val} data-val={st.amount} data-sign={st.sign}>
                        {st.sign}
                        {money(st.amount)}
                      </span>
                    </span>
                    {i < STEPS.length - 1 && <span className={styles.link} data-link aria-hidden="true" style={vars({ "--t": (st.key === "adj" ? 800 : st.key === "plan" ? 400 : st.from + st.amount) / MAX })} />}
                  </span>
                  <span className={styles.colLabel}>{st.label}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.explain} aria-live="polite">
            {shown ? (
              <>
                <b>{shown.label}:</b> {shown.note}
              </>
            ) : (
              "Hover, tap or tab through the steps to see how each amount is worked out."
            )}
          </p>

          <p className={styles.equation} data-equation>
            <span data-tone="plan">$400</span>
            <i>+</i>
            <span data-tone="patient">$400</span>
            <i>+</i>
            <span data-tone="adj">$200</span>
            <i>=</i>
            <b>$1,000</b>
          </p>
          {s.note && (
            <p className={styles.balanceNote}>
              <Icon name="shield" />
              {s.note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================================================================ cadence */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

/** The measures named in a "defined measures" body, as chips (falls back to the text). */
function measures(body: string) {
  const m = body.match(/^(.*?),\s*defined with you\.?$/i);
  if (!m) return null;
  const list = m[1].split(/,\s*|\s+and\s+/).filter(Boolean);
  return list.map((t) => t.charAt(0).toUpperCase() + t.slice(1));
}

/**
 * "Reporting you can act on": three cards over drifting light, each with a
 * small picture of its rhythm: the working week with today lit (daily), four
 * weeks with each Friday ringed (weekly), and the measures as chips. Cards
 * turn light on hover.
 */
export function CadenceShowcase({ s }: { s: Of<"cadence"> }) {
  const ref = useRef<HTMLElement>(null);

  useMotion(ref, ({ motion }) => {
    if (!motion) return;
    const root = ref.current!;
    gsap.from(root.querySelectorAll("[data-card]"), {
      opacity: 0,
      y: 70,
      rotateX: 12,
      filter: "blur(8px)",
      duration: 1.3,
      stagger: 0.12,
      ease: "expo.out",
      clearProps: "opacity,transform,filter",
      scrollTrigger: { trigger: root.querySelector("[data-cards]"), start: "top 82%", once: true },
    });
    gsap.from(root.querySelectorAll("[data-pip]"), { scale: 0, duration: 0.5, stagger: 0.03, ease: "back.out(2)", clearProps: "transform", scrollTrigger: { trigger: root.querySelector("[data-cards]"), start: "top 75%", once: true } });
  });

  return (
    <section ref={ref} id={s.id} className={`section ${styles.cadence}`}>
      <Aurora green={0.5} className={styles.cadenceAurora} />
      <div className="container">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} intro={s.intro} align="center" />
        <ol className={styles.cadenceGrid} data-cards>
          {s.items.map((it, i) => {
            const chips = it.icon === "chart" ? measures(it.body) : null;
            return (
              <li key={it.title} className={styles.cadenceCard} data-card {...flood}>
                <FloodLayer />
                <div className={styles.cadenceTop}>
                  <span className={styles.cadenceIcon} aria-hidden="true">
                    <Icon name={it.icon ?? "check"} />
                  </span>
                  <span className={styles.cadenceNum}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className={styles.cadenceTitle}>{it.title}</h3>

                <div className={styles.visual} aria-hidden="true">
                  {it.icon === "clock" && (
                    <span className={styles.days}>
                      {WEEKDAYS.map((d, k) => (
                        <span key={d} data-pip data-state={k < 2 ? "done" : k === 2 ? "today" : undefined}>
                          <i />
                          {d}
                        </span>
                      ))}
                    </span>
                  )}
                  {it.icon === "calendar" && (
                    <span className={styles.weeks}>
                      {Array.from({ length: 4 }, (_, w) => (
                        <span key={w} className={styles.week}>
                          <b>Wk {w + 1}</b>
                          {WEEKDAYS.map((d, k) => (
                            <i key={d} data-pip data-review={k === 4 || undefined} />
                          ))}
                        </span>
                      ))}
                    </span>
                  )}
                  {chips && (
                    <span className={styles.chips}>
                      {chips.map((c) => (
                        <span key={c} data-pip>
                          {c}
                        </span>
                      ))}
                    </span>
                  )}
                </div>

                <p className={styles.cadenceBody}>{chips ? "Defined with you." : it.body}</p>
              </li>
            );
          })}
        </ol>
        {s.note && (
          <p className={styles.cadenceNote} data-anim="fade">
            <Icon name="flag" />
            {s.note}
          </p>
        )}
      </div>
    </section>
  );
}
