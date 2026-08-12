type ZipRow = [lat: number, lng: number, city: string, state: string];

let zipTable: Record<string, ZipRow> | null = null;

/** The ZIP centroid table is ~300KB, so it loads on first use rather than up front. */
export async function lookupZip(zip: string) {
  if (!zipTable) {
    const mod = await import("../data/zip-centroids.json");
    zipTable = (mod.default ?? mod) as unknown as Record<string, ZipRow>;
  }
  const row = zipTable[zip];
  if (!row) return null;
  return { lat: row[0], lng: row[1], city: row[2], state: row[3] };
}

export function distanceMiles(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 3958.8;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatDistance(mi: number, lang: "es" | "en") {
  if (mi < 0.2) return lang === "es" ? "a pasos" : "steps away";
  const value = mi < 10 ? mi.toFixed(1) : Math.round(mi).toString();
  return lang === "es" ? `a ${value} mi` : `${value} mi away`;
}
