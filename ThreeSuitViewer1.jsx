"use client";

// Dedicated 3D showcase wrapper for the Regent Pinstripe suit.
import ShowcaseSection from "@/components/ShowcaseSection";
import { showcaseProducts } from "@/data/products";

export default function ThreeSuitViewer1() {
  return (
    <ShowcaseSection
      product={showcaseProducts[0]}
      index={1}
      reverse={false}
      direction={1}
      speed={0.42}
    />
  );
}
