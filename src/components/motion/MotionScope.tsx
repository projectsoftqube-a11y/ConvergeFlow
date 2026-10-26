"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, MOTION_QUERIES } from "@/lib/gsap";

/**
 * Declarative scroll reveals. Server-rendered markup opts in with
 * `data-anim`; content is fully visible until this runs, so nothing is lost
 * if JavaScript fails.
 *
 *  data-anim="fade"     blur + rise + fade
 *  data-anim="stagger"  blur + rise + fade each direct child in sequence
 *  data-anim="words"    word-by-word blur reveal for headings (SplitText)
 *  data-anim="scrub"    words light up from dim as the element scrolls by
 *  data-anim="stamp"    status badge pops in with a glow
 *  data-glow            pointer-follow light: sets --mx / --my on the element
 *
 * Wrap each page body in <MotionScope>: its effect runs only after the whole
 * subtree has hydrated, so GSAP never touches markup React has not adopted.
 */
export function MotionScope({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    // Pointer-follow light for glow cards (works with or without motion).
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-glow]");
      if (!el || !scope.contains(el)) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    scope.addEventListener("pointermove", onMove, { passive: true });

    const mm = gsap.matchMedia(scope);

    mm.add(MOTION_QUERIES, (ctx) => {
      const { motion } = ctx.conditions as Record<string, boolean>;
      if (!motion) return;

      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, scope);
      const start = "top 88%";

      q("[data-anim='fade']").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          filter: "blur(10px)",
          duration: 1.3,
          delay: Number(el.dataset.delay ?? 0),
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      q("[data-anim='stagger']").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 40,
          filter: "blur(10px)",
          duration: 1.2,
          stagger: 0.09,
          clearProps: "opacity,transform,filter",
          scrollTrigger: { trigger: el, start, once: true },
        });
      });

      // Status badges pop in with a glow once their document is in view.
      q("[data-anim='stamp']").forEach((el) => {
        gsap.from(el, {
          scale: 0.4,
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.7,
          ease: "back.out(2)",
          delay: Number(el.dataset.delay ?? 0.35),
          clearProps: "transform,opacity,filter",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Word-by-word blur reveal for headings (keeps nested accents intact).
      q("[data-anim='words']").forEach((el) => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.words, {
              opacity: 0,
              y: 18,
              filter: "blur(12px)",
              duration: 1.1,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start, once: true },
            });
          },
        });
      });

      // Editorial statements: each word lights up from dim as the line scrolls through the viewport.
      q("[data-anim='scrub']").forEach((el) => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 62%", scrub: true } },
            );
          },
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      scope.removeEventListener("pointermove", onMove);
      mm.revert();
    };
  }, []);

  return (
    <div ref={scopeRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
