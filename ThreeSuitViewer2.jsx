"use client";

// Dedicated 3D showcase wrapper for the Midnight Tuxedo.
import ShowcaseSection from "@/components/ShowcaseSection";
import { showcaseProducts } from "@/data/products";

export default function ThreeSuitViewer2() {
  return (
    <ShowcaseSection
      product={showcaseProducts[1]}
      index={2}
      reverse
      direction={-1}
      speed={0.36}
    />
  );
}
