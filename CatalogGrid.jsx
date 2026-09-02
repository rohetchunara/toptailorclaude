"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories, formatNPR, getProductById } from "@/data/products";
import ProductModal from "@/components/ProductModal";
import { useCart } from "@/context/CartContext";
import { useReveal } from "@/hooks/useReveal";

function ProductCard({ product, onOpen }) {
  const { addItem } = useCart();
  const ref = useReveal();

  return (
    <div ref={ref} className="reveal group cursor-pointer" onClick={() => onOpen(product)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[var(--hairline)]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, "M");
            }}
            className="m-4 w-[calc(100%-2rem)] bg-white/95 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-black transition-colors hover:bg-white"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-lg text-[var(--ink)]">{product.name}</p>
          <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-[var(--ink-soft)]">
            {product.category.replace("-", " ")}
          </p>
        </div>
        <p className="shrink-0 text-sm text-[var(--ink)]">{formatNPR(product.price)}</p>
      </div>
    </div>
  );
}

export default function CatalogGrid() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const found = getProductById(productId);
      if (found) setSelected(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list =
      activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, sort]);

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-16 md:px-10">
      <div className="flex flex-col gap-8 border-b border-[var(--hairline)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.5em] text-[var(--ink-soft)]">The Collection</p>
          <h1 className="mt-3 font-display text-4xl text-[var(--ink)] sm:text-5xl">Full Catalog</h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border border-[var(--hairline)] bg-transparent px-4 py-2 text-xs uppercase tracking-[0.15em] text-[var(--ink)] outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors ${
              activeCategory === cat.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                : "border-[var(--hairline)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onOpen={setSelected} />
        ))}
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
