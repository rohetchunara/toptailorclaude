"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import { products, formatNPR } from "@/data/products";

const NAV_LINKS = [
  { href: "/catalog", label: "Catalog" },
  { href: "/bespoke", label: "Bespoke Services" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/gallery", label: "Gallery" },
  { href: "/stores", label: "Store Locations" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const { count, setIsOpen } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const results =
    query.trim().length > 0
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
          .slice(0, 6)
      : [];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-[var(--hairline)] bg-[var(--bg)]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-[1.5rem] font-medium tracking-[0.35em] text-[var(--ink)] transition-colors group-hover:text-[var(--accent)] md:text-[1.7rem]">
            TOP TAILOR
          </span>
          <span className="mt-1 text-[0.55rem] uppercase tracking-[0.5em] text-[var(--ink-soft)]">
            तयारी पोशाक
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-[0.72rem] uppercase tracking-[0.2em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] ${
                pathname === link.href ? "text-[var(--ink)]" : ""
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-[var(--accent)] transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--hairline)]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--hairline)]"
          >
            {mounted && theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
              </svg>
            )}
          </button>

          <button
            aria-label="Open cart"
            onClick={() => setIsOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--hairline)]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6 4.5 2H2" />
              <circle cx="9.5" cy="20" r="1.3" />
              <circle cx="17.5" cy="20" r="1.3" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-semibold text-black">
                {count}
              </span>
            )}
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--ink)] transition-colors hover:bg-[var(--hairline)] lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-[var(--hairline)] bg-[var(--bg)]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-10">
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search suits, tuxedos, Daura Suruwal..."
              className="w-full border-b border-[var(--hairline)] bg-transparent pb-3 font-display text-2xl text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]"
            />
            {results.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-6">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/catalog?product=${p.id}`}
                    className="group"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-md bg-[var(--hairline)]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-xs text-[var(--ink)]">{p.name}</p>
                    <p className="text-[0.7rem] text-[var(--ink-soft)]">{formatNPR(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-[var(--hairline)] bg-[var(--bg)] px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-2xl text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
