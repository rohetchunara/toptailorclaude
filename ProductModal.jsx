"use client";

import { useEffect, useState } from "react";
import { formatNPR } from "@/data/products";
import { useCart } from "@/context/CartContext";

const SIZES = ["S", "M", "L", "XL", "XXL", "Custom"];

export default function ProductModal({ product, onClose }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("M");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-y-auto rounded-t-3xl bg-[var(--bg-elevated)] shadow-2xl sm:flex-row sm:rounded-3xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--ink)] shadow-md"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="h-72 w-full shrink-0 sm:h-auto sm:w-1/2">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-1 flex-col p-8 sm:p-10">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
            {product.category.replace("-", " ")}
          </p>
          <h2 className="mt-2 font-display text-3xl text-[var(--ink)] sm:text-4xl">{product.name}</h2>
          <p className="mt-3 font-display text-2xl text-[var(--accent)]">{formatNPR(product.price)}</p>

          <p className="mt-5 text-sm leading-relaxed text-[var(--ink-soft)]">{product.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-2 border-y border-[var(--hairline)] py-5 text-sm sm:grid-cols-2">
            <p><span className="text-[var(--ink-soft)]">Fabric: </span><span className="text-[var(--ink)]">{product.fabric}</span></p>
            <p><span className="text-[var(--ink-soft)]">Lining: </span><span className="text-[var(--ink)]">{product.lining}</span></p>
            <p className="sm:col-span-2"><span className="text-[var(--ink-soft)]">Origin: </span><span className="text-[var(--ink)]">{product.origin}</span></p>
          </div>

          <ul className="mt-5 flex flex-col gap-2">
            {product.details.map((detail) => (
              <li key={detail} className="flex gap-3 text-sm text-[var(--ink-soft)]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-[var(--ink)]">
              Select Size — <span className="text-[var(--ink-soft)] normal-case tracking-normal">unsure? see our </span>
              <a href="/custom-orders" className="underline">measurement guide</a>
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                    size === s
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]"
                      : "border-[var(--hairline)] text-[var(--ink-soft)] hover:border-[var(--ink)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 w-full bg-[var(--ink)] py-4 text-xs uppercase tracking-[0.25em] text-[var(--bg)] transition-opacity hover:opacity-85"
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>
          <a
            href="/custom-orders"
            className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--ink-soft)] underline underline-offset-4"
          >
            Prefer made-to-measure? Start a custom order
          </a>
        </div>
      </div>
    </div>
  );
}
