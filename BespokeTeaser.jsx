"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

export default function BespokeTeaser() {
  const ref = useReveal();

  return (
    <section className="border-t border-[var(--hairline)] bg-[var(--bg)] py-24 md:py-32">
      <div
        ref={ref}
        className="reveal mx-auto flex max-w-4xl flex-col items-center px-6 text-center md:px-10"
      >
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-[var(--ink-soft)]">
          Bespoke &amp; Made-to-Measure
        </p>
        <h2 className="mt-5 font-display text-4xl leading-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
          Cut to Your Exact Measure
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
          From first consultation to final fitting, our master tailors craft every garment
          around your measurements, posture, and preference. Available in-atelier or entirely
          from home.
        </p>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row">
          <Link
            href="/bespoke"
            className="border border-[var(--ink)] px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            Discover Bespoke Services
          </Link>
          <Link
            href="/custom-orders"
            className="px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink-soft)] underline decoration-[var(--hairline)] underline-offset-8 transition-colors duration-300 hover:text-[var(--ink)]"
          >
            How to Measure at Home
          </Link>
        </div>
      </div>
    </section>
  );
}
