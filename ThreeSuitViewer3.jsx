"use client";

// Dedicated 3D showcase wrapper for the Heritage Daura Suruwal.
import ShowcaseSection from "@/components/ShowcaseSection";
import { showcaseProducts } from "@/data/products";

export default function ThreeSuitViewer3() {
  return (
    <ShowcaseSection
      product={showcaseProducts[2]}
      index={3}
      reverse={false}
      direction={1}
      speed={0.48}
    />
  );
}
