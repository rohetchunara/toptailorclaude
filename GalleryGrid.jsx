"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const GALLERY_ITEMS = [
  { src: "/images/hero-main.jpg", caption: "Editorial Studio Sitting, Kathmandu", tall: true },
  { src: "/images/gallery-wedding.jpg", caption: "Client Wedding — Maroon Daura Suruwal" },
  { src: "/images/viewer-suit-navy.jpg", caption: "The Regent Pinstripe, in Motion" },
  { src: "/images/gallery-event.jpg", caption: "Evening Gala, Durbar Marg", tall: true },
  { src: "/images/viewer-tuxedo-black.jpg", caption: "The Midnight Tuxedo" },
  { src: "/images/catalog-daura-royal.jpg", caption: "The Royal Dhaka, Client Fitting" },
  { src: "/images/viewer-daura-suruwal.jpg", caption: "Heritage Daura Suruwal, Detail" },
  { src: "/images/catalog-suit-tweed.jpg", caption: "Autumn Tweed Sitting" },
  { src: "/images/catalog-blazer-linen.jpg", caption: "Summer Linen Edit" },
];

function GalleryTile({ item, onOpen }) {
  const ref = useReveal();
  return (
    <button
      ref={ref}
      onClick={() => onOpen(item)}
      className={`reveal group relative block w-full overflow-hidden rounded-lg bg-[var(--hairline)] text-left ${
        item.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
      }`}
    >
      <img
        src={item.src}
        alt={item.caption}
        className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="p-4 text-xs uppercase tracking-[0.15em] text-white">{item.caption}</p>
      </div>
    </button>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY_ITEMS.map((item) => (
          <GalleryTile key={item.src + item.caption} item={item} onOpen={setActive} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-h-[85vh] max-w-3xl">
            <img
              src={active.src}
              alt={active.caption}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-white/80">
              {active.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
