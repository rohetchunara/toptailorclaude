"use client";

import Link from "next/link";
import { products, formatNPR } from "@/data/products";
import { useReveal } from "@/hooks/useReveal";

function Card({ product }) {
  const ref = useReveal();
  return (
    <Link href={`/catalog?product=${product.id}`} ref={ref} className="reveal group block">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-[var(--hairline)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-display text-lg text-[var(--ink)]">{product.name}</p>
        <p className="text-sm text-[var(--ink-soft)]">{formatNPR(product.price)}</p>
      </div>
    </Link>
  );
}

export default function HomeCatalogPreview() {
  const headingRef = useReveal();
  const featured = products.filter((p) => !p.id.startsWith("showcase")).slice(0, 4);

  return (
    <section className="border-t border-[var(--hairline)] bg-[var(--bg)] py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div ref={headingRef} className="reveal flex flex-col items-center text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.5em] text-[var(--ink-soft)]">
            The Wider Collection
          </p>
          <h2 className="mt-4 font-display text-4xl text-[var(--ink)] sm:text-5xl">
            Catalog Highlights
          </h2>
          <p className="mt-4 max-w-lg text-sm text-[var(--ink-soft)] sm:text-base">
            A curated edit of our most requested suits, blazers, and Daura Suruwal — each
            piece finished entirely by hand.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {featured.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/catalog"
            className="border border-[var(--ink)] px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
          >
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
