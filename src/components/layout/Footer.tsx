"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { SmartLink } from "@/components/ui/SmartLink";
import { useMotion } from "@/components/motion/useMotion";
import { gsap } from "@/lib/gsap";
import { AUDIENCE_LINKS, COMPANY_LINKS, DELIVERY_LINKS, DEMO_LINK, SERVICE_LINKS, liveHref, type NavLink } from "@/content/navigation";
import { CONTACT } from "@/content/site/company";
import type { Cta } from "@/content/site/types";
import { Icon } from "@/components/site/Icon";
import { TitleText } from "@/components/site/Title";
import { CopyrightYear } from "./CopyrightYear";
import styles from "./Footer.module.css";

const SOFTQUBES = { lead: "Designed and developed by", name: "Softqubes Technologies LLC", href: "https://softqubes.com/" };

/** What happens after a demo request (from the FAQ: discuss workflow and scope, then a proposal). */
const NEXT = [
  { title: "Request a demo", body: "Tell us where claims stall today." },
  { title: "We discuss your workflow", body: "Scope, systems and the stages you want covered." },
  { title: "You get a proposal", body: "Based on the stages our team would own." },
];

function Column({ title, links }: { title: string; links: NavLink[] }) {
  const pathname = usePathname();
  if (!links.length) return null;
  return (
    <nav className={styles.column} aria-label={title}>
      <h2 className={styles.columnTitle}>{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <SmartLink href={link.href} className={styles.link} aria-current={link.href === pathname ? "page" : undefined}>
              {link.label}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Footer and the page's closing call to action, merged into one full-width
 * sheet: soft drifting light and the mark at the centre of its top edge; the
 * offer with who you'll talk to and what happens next; then the link columns
 * and credits. A glow follows the pointer across the whole frame.
 */
export function Footer({ cta }: { cta?: Cta }) {
  const ref = useRef<HTMLElement>(null);
  const actions = cta?.actions.filter((a) => liveHref(a.href)) ?? [];

  useMotion(ref, ({ motion }) => {
    const root = ref.current!;
    const frame = root.querySelector<HTMLElement>("[data-frame]")!;
    const onMove = (e: PointerEvent) => {
      const r = frame.getBoundingClientRect();
      frame.style.setProperty("--mx", `${e.clientX - r.left}px`);
      frame.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    frame.addEventListener("pointermove", onMove, { passive: true });
    if (motion) {
      gsap.from(frame, { y: 80, opacity: 0, duration: 1.4, ease: "expo.out", clearProps: "transform,opacity", scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
      gsap.from(root.querySelector("[data-crest]"), { opacity: 0, scale: 0.4, rotate: -90, duration: 1.2, delay: 0.5, ease: "back.out(1.6)", clearProps: "opacity,transform", scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
      gsap.from(root.querySelectorAll("[data-crest-line]"), { scaleX: 0, duration: 1.6, delay: 0.6, ease: "expo.out", clearProps: "transform", scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
      gsap.from(root.querySelectorAll("[data-next]"), { opacity: 0, x: 24, filter: "blur(8px)", duration: 1, stagger: 0.14, ease: "power3.out", clearProps: "opacity,transform,filter", scrollTrigger: { trigger: frame, start: "top 70%", once: true } });
      gsap.from(root.querySelectorAll("[data-col]"), { opacity: 0, y: 30, duration: 1.1, stagger: 0.08, ease: "power3.out", clearProps: "opacity,transform", scrollTrigger: { trigger: root.querySelector("[data-cols]"), start: "top 92%", once: true } });
    }
    return () => frame.removeEventListener("pointermove", onMove);
  });

  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.frame} data-frame data-has-cta={cta ? true : undefined}>
          <span className={styles.aurora} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className={styles.grid} aria-hidden="true" />
          <span className={styles.spot} aria-hidden="true" />

          <div className={`container ${styles.inner}`}>
            {cta && (
              <section className={styles.cta} aria-labelledby="cta-title">
                <div className={styles.copy}>
                  <h2 id="cta-title" className={styles.title}>
                    <TitleText title={cta.title} accent={cta.accent} />
                  </h2>
                  <p className={styles.text}>{cta.body}</p>
                  {actions.length > 0 && (
                    <div className={styles.actions}>
                      {actions.map((a, i) => (
                        <ButtonLink key={a.href} href={a.href} variant={i === 0 ? "primary" : "secondary"}>
                          {a.label}
                        </ButtonLink>
                      ))}
                    </div>
                  )}
                </div>

                <aside className={styles.panel} aria-label="Talk to the team">
                  <div className={styles.person}>
                    <span className={styles.avatar} aria-hidden="true">
                      HP
                      <i />
                    </span>
                    <span className={styles.personText}>
                      <span className={styles.kicker}>You&rsquo;ll be talking to</span>
                      <b>{CONTACT.name}</b>
                    </span>
                  </div>
                  <p className={styles.lines}>
                    <a href={`mailto:${CONTACT.email}`}>
                      <Icon name="mail" />
                      {CONTACT.email}
                    </a>
                    <a href={`tel:${CONTACT.tel}`}>
                      <Icon name="phone" />
                      {CONTACT.phone}
                    </a>
                  </p>
                  <p className={styles.nextHead}>What happens next</p>
                  <ol className={styles.next}>
                    {NEXT.map((n, i) => (
                      <li key={n.title} data-next>
                        <span className={styles.nextNum}>{i + 1}</span>
                        <span>
                          <b>{n.title}</b>
                          <span>{n.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </aside>
              </section>
            )}

            {cta && (
              <div className={styles.divider} aria-hidden="true" />
            )}

            <div className={styles.main}>
              <div className={styles.brand} data-col>
                <Logo tone="light" width={190} />
                <p className={styles.intro}>
                  Your revenue cycle, <span className="accent-text">fully managed.</span>
                </p>
                {!cta && (
                  <>
                    <p className={styles.contact}>
                      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                      <a href={`tel:${CONTACT.tel}`}>{CONTACT.phone}</a>
                    </p>
                    <ButtonLink href={DEMO_LINK.href}>{DEMO_LINK.label}</ButtonLink>
                  </>
                )}
              </div>
              <div className={styles.columns} data-cols>
                <div data-col>
                  <Column title="Services" links={SERVICE_LINKS} />
                </div>
                <div data-col>
                  <Column title="Who we help" links={AUDIENCE_LINKS} />
                </div>
                <div data-col>
                  <Column title="How it works" links={DELIVERY_LINKS} />
                </div>
                <div data-col>
                  <Column title="Company" links={COMPANY_LINKS} />
                </div>
              </div>
            </div>

            <div className={styles.bottom}>
              <p>
                © <CopyrightYear /> ConvergeFlow. All rights reserved.
              </p>
              <p className={styles.credit}>
                {SOFTQUBES.lead}{" "}
                <a href={SOFTQUBES.href} target="_blank" rel="noopener">
                  {SOFTQUBES.name}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
              <SmartLink href="#main" className={styles.top} data-back-to-top>
                Back to top
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 13V3.5M4 7l4-4 4 4" />
                </svg>
              </SmartLink>
            </div>
          </div>
        </div>

        {/* The mark sits on the centre of the frame's top line */}
        <span className={styles.crestLine} data-crest-line aria-hidden="true" />
        <span className={styles.crest} data-crest aria-hidden="true">
          <i />
        </span>
      </div>
    </footer>
  );
}
