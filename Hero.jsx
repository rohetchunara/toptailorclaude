"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0">
        <img
          src="/images/hero-main.jpg"
          alt="Top Tailor models wearing bespoke suits and traditional Daura Suruwal"
          className={`h-full w-full object-cover transition-all duration-[1800ms] ease-out ${
            loaded ? "scale-100 opacity-70 dark:opacity-60" : "scale-110 opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/10 via-[var(--bg)]/40 to-[var(--bg)]" />
        <div className="absolute inset-0 bg-[var(--bg)]/10 dark:bg-black/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p
          className={`mb-6 text-[0.65rem] uppercase text-[var(--ink)] tracking-[0.6em] transition-all duration-1000 ${
            loaded ? "translate-y-0 opacity-80" : "translate-y-3 opacity-0"
          }`}
        >
          Est. Kathmandu &mdash; Bespoke Since Generations
        </p>

        <h1
          className={`font-display font-light text-[var(--ink)] leading-[0.95] transition-all duration-[1400ms] ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ fontSize: "clamp(3.2rem, 11vw, 9.5rem)", letterSpacing: "0.14em" }}
        >
          TOP <span className="italic">TAILOR</span>
        </h1>

        <p
          className={`mt-7 font-display text-[var(--ink-soft)] transition-all delay-200 duration-[1400ms] ease-out ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ fontSize: "clamp(1.05rem, 2.4vw, 1.6rem)", letterSpacing: "0.5em" }}
        >
          तयारी पोशाक
        </p>

        <p
          className={`mt-8 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)] transition-all delay-300 duration-[1400ms] ease-out sm:text-base ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          Suits, tuxedos, and traditional Daura Suruwal — cut, stitched, and finished by hand
          in our Kathmandu atelier. Modern tailoring, rooted in Nepali heritage.
        </p>

        <div
          className={`mt-12 flex flex-col items-center gap-5 transition-all delay-500 duration-[1400ms] ease-out sm:flex-row ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <Link
            href="/catalog"
            className="border border-[var(--ink)] px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            Explore Catalog
          </Link>
          <Link
            href="/custom-orders"
            className="px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink-soft)] underline decoration-[var(--hairline)] underline-offset-8 transition-colors duration-300 hover:text-[var(--ink)]"
          >
            Begin a Custom Order
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-70">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[var(--ink)]">Scroll</span>
        <span className="h-10 w-px animate-float-slow bg-[var(--ink)]" />
      </div>
    </section>
  );
}
