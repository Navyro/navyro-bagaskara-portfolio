import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

/**
 * 404 — one glance, two exits.
 *
 * CL-12: this used to be `min-h-[70vh]` and centred, which forced 237–240px of scrolling on a
 * 900px screen and broke the left-aligned editorial grid every other page uses. The wrapper no
 * longer sets a minimum height: <main> is already `flex-1` inside a `min-h-screen` column, so a
 * short page fills the viewport exactly instead of overflowing it.
 */
export default function NotFound() {
  return (
    <div
      data-not-found
      className="mx-auto flex w-full max-w-editorial flex-1 flex-col justify-center px-6 py-10 lg:px-12 lg:py-12"
    >
      <div className="max-w-2xl">
        <span className="font-heading text-meta font-bold uppercase tracking-widest text-accent">
          404 — Page not found
        </span>

        <h1 className="mt-4 font-heading text-h1 font-bold tracking-tight text-text-primary text-balance">
          This page does not exist.
        </h1>

        <p className="mt-5 max-w-md text-body text-text-secondary">
          The address may be mistyped, may have moved, or may never have existed.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            data-cursor="cta"
            className="tap inline-flex items-center gap-2 rounded-btn bg-accent px-6 py-3 text-control font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <Home size={16} /> Back Home
          </Link>
          <Link
            href="/work"
            data-cursor="cta"
            className="tap inline-flex items-center gap-2 rounded-btn border border-border bg-surface px-6 py-3 text-control font-semibold text-text-primary transition-colors hover:border-text-primary"
          >
            <ArrowLeft size={16} /> View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
