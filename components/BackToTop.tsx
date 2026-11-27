"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Back-to-top control for the long pages (/design, /work, case studies).
 *
 * Decisions that matter:
 *
 * - **It appears late, not at the top.** Appearing after roughly one viewport of scrolling keeps the
 *   first screen clean and means the button is only there when the reader actually needs it.
 * - **44px square, inset from the edge, above the home-indicator area.** The touch target rule the
 *   rest of the site follows, plus `env(safe-area-inset-bottom)` so it does not sit under the iOS
 *   gesture bar.
 * - **Instant jump when motion is reduced.** `scroll-behavior: smooth` is skipped for readers who
 *   asked for less motion; they get the top of the page immediately.
 * - **The scroll listener is passive and throttled by rAF.** A plain `onScroll` that sets state on
 *   every frame is how a small button becomes a jank source on a long page.
 */

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      }}
      aria-label="Back to top"
      // Not focusable while hidden: a control nobody can see should not sit in the tab order.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface text-text-primary shadow-lg transition-all duration-300 hover:border-text-primary hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background print:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
