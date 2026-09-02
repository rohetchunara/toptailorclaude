"use client";

import { useState } from "react";
import RotatingShowcase from "@/components/RotatingShowcase";
import ProductModal from "@/components/ProductModal";
import { formatNPR } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

export default function ShowcaseSection({ product, index, reverse, direction, speed }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal();

  return (
    <section className="relative border-t border-[var(--hairline)] bg-[var(--bg)] py-24 md:py-32">
      <div
        ref={ref}
        className={`reveal mx-auto flex max-w-[1500px] flex-col items-center gap-14 px-6 md:px-10 lg:gap-20 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="flex w-full justify-center lg:w-1/2">
          <RotatingShowcase image={product.image} direction={direction} speed={speed} />
        </div>

        <div className="flex w-full flex-col lg:w-1/2">
          <span className="text-[0.65rem] uppercase tracking-[0.5em] text-[var(--ink-soft)]">
            {`0${index}`} &mdash; Signature Piece
          </span>
          <h2 className="mt-5 font-display text-4xl leading-tight text-[var(--ink)] sm:text-5xl md:text-6xl">
            {product.name}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
            {product.description}
          </p>

          <dl className="mt-8 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6 text-sm">
            <div className="flex justify-between gap-6 border-b border-[var(--hairline)] pb-3">
              <dt className="text-[var(--ink-soft)]">Fabric</dt>
              <dd className="text-right text-[var(--ink)]">{product.fabric}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-[var(--hairline)] pb-3">
              <dt className="text-[var(--ink-soft)]">Lining</dt>
              <dd className="text-right text-[var(--ink)]">{product.lining}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="text-[var(--ink-soft)]">Origin</dt>
              <dd className="text-right text-[var(--ink)]">{product.origin}</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <p className="font-display text-3xl text-[var(--accent)]">{formatNPR(product.price)}</p>
            <button
              onClick={() => setOpen(true)}
              className="border border-[var(--ink)] px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
            >
              Show More / View Price
            </button>
          </div>
        </div>
      </div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </section>
  );
}
