// src/utils/imageHelper.js

const fallback = "/images/default.jpg";

// Exact filename mapping for mismatched images
const manualMap = {
  "suvarna prashan": "/images/suvarna-prashan.jpg",
  "arogya apple cider vinegar tablets":
    "/images/arogya-apple-cider-vinegar-tablets.jpg",
};

export function getImageForProduct(name = "") {
  if (!name) return fallback;

  const key = name.toLowerCase().trim();

  // First check manual map
  if (manualMap[key]) return manualMap[key];

  // Auto-slug as fallback
  const slug = key.replace(/[^a-z0-9]+/g, "-");
  return `/images/${slug}.jpg`;
}
