"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatNPR } from "@/data/products";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--bg-elevated)] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-8 py-6">
          <h2 className="font-display text-2xl tracking-wide text-[var(--ink)]">Your Selection</h2>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink)] hover:bg-[var(--hairline)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-display text-xl text-[var(--ink-soft)]">Your bag is empty.</p>
              <Link
                href="/catalog"
                onClick={() => setIsOpen(false)}
                className="mt-6 border-b border-[var(--ink)] pb-1 text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
              >
                Explore the Catalog
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-6">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="h-28 w-20 shrink-0 overflow-hidden rounded-md bg-[var(--hairline)]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-base text-[var(--ink)]">{item.name}</p>
                      <p className="text-xs text-[var(--ink-soft)]">Size {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-[var(--hairline)] px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="h-5 w-5 text-xs text-[var(--ink)]"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-xs text-[var(--ink)]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="h-5 w-5 text-xs text-[var(--ink)]"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm text-[var(--ink)]">{formatNPR(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    aria-label="Remove item"
                    className="self-start text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[var(--hairline)] px-8 py-6">
            <div className="mb-4 flex items-center justify-between text-sm text-[var(--ink)]">
              <span className="uppercase tracking-[0.2em] text-[var(--ink-soft)]">Subtotal</span>
              <span className="font-display text-lg">{formatNPR(total)}</span>
            </div>
            <button className="w-full bg-[var(--ink)] py-4 text-xs uppercase tracking-[0.25em] text-[var(--bg)] transition-opacity hover:opacity-85">
              Proceed to Checkout
            </button>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.15em] text-[var(--ink-soft)]">
              Complimentary alterations on all made-to-measure orders
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
