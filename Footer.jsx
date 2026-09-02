"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  // Hidden admin trigger (desktop): hold Shift and type T, O, P in sequence.
  useEffect(() => {
    const sequence = ["T", "O", "P"];
    let progress = 0;
    let lastTime = 0;

    const onKeyDown = (e) => {
      if (!e.shiftKey) {
        progress = 0;
        return;
      }
      const now = Date.now();
      if (now - lastTime > 2200) progress = 0;
      lastTime = now;

      const key = e.key.toUpperCase();
      if (key === sequence[progress]) {
        progress += 1;
        if (progress === sequence.length) {
          progress = 0;
          router.push("/admin");
        }
      } else {
        progress = key === sequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  // Hidden admin trigger (mobile): tap the footer credit line 5 times.
  const handleMobileTap = () => {
    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 1800);
    if (tapCount.current >= 5) {
      tapCount.current = 0;
      router.push("/admin");
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.3em] text-[var(--ink)]">TOP TAILOR</p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.4em] text-[var(--ink-soft)]">
              तयारी पोशाक
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
              Bespoke suits, tuxedos, and traditional Daura Suruwal — tailored in Kathmandu,
              worn everywhere.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink)]">Explore</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--ink-soft)]">
              <li><Link href="/catalog" className="hover:text-[var(--ink)]">Catalog</Link></li>
              <li><Link href="/bespoke" className="hover:text-[var(--ink)]">Bespoke Services</Link></li>
              <li><Link href="/custom-orders" className="hover:text-[var(--ink)]">Custom Orders</Link></li>
              <li><Link href="/gallery" className="hover:text-[var(--ink)]">Gallery</Link></li>
              <li><Link href="/stores" className="hover:text-[var(--ink)]">Store Locations</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink)]">Contact</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-[var(--ink-soft)]">
              <li>Durbar Marg, Kathmandu</li>
              <li>+977 1-4123456</li>
              <li>atelier@toptailor.com.np</li>
              <li>Mon – Sat, 10am – 7pm</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink)]">Join the List</p>
            <p className="mt-5 text-sm text-[var(--ink-soft)]">
              Private previews, trunk shows, and seasonal collections.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex border-b border-[var(--hairline)]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent py-2 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-soft)]"
              />
              <button
                type="submit"
                className="shrink-0 text-xs uppercase tracking-[0.2em] text-[var(--ink)]"
              >
                {status === "loading" ? "..." : "Join"}
              </button>
            </form>
            {status === "success" && (
              <p className="mt-2 text-xs text-[var(--accent)]">Welcome to the list.</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--hairline)] pt-8 text-[11px] uppercase tracking-[0.15em] text-[var(--ink-soft)] md:flex-row">
          <p>© {new Date().getFullYear()} Top Tailor. All rights reserved.</p>
          {/* Hidden admin trigger for mobile: tap this mark 5 times. Desktop uses Shift+T+O+P */}
          <p onClick={handleMobileTap} className="cursor-default select-none">
            Handcrafted in Kathmandu, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
