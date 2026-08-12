// Parses the saved snapshot of the original site into a clean centers dataset.
import fs from "node:fs";

const html = fs.readFileSync(new URL("../source-snapshot.html", import.meta.url), "utf8");

const decode = (s) =>
  s
    .replace(/<!--\s*-->/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

const cards = html.split('<div class="card p-4 border-l-4 border-l-').slice(1);

const pick = (chunk, re) => {
  const m = chunk.match(re);
  return m ? decode(m[1]) : null;
};

const centers = cards.map((chunk, index) => {
  const status = chunk.startsWith("green") ? "receiving" : "full";
  const name = pick(chunk, /<p class="font-semibold text-slate-900">([\s\S]*?)<\/p>/);
  const meta = pick(chunk, /<p class="text-xs text-slate-500">([\s\S]*?)<\/p>/) ?? "";
  const address = pick(chunk, /<p class="mt-1 text-sm text-slate-600">([\s\S]*?)<\/p>/);
  const hours = pick(chunk, /<p class="text-sm text-slate-600">🕒([\s\S]*?)<\/p>/);

  const [kindRaw, regionRaw] = meta.split("·").map((part) => part.trim());
  const kind = kindRaw === "Almacén" ? "warehouse" : "collection";

  const coordMatch = chunk.match(/query=(-?\d+\.\d+),(-?\d+\.\d+)/);
  // Take the LAST 5-digit group: street numbers are often 5 digits too.
  const zipMatches = address ? [...address.matchAll(/\b(\d{5})\b/g)] : [];
  const zipMatch = zipMatches.length ? zipMatches[zipMatches.length - 1] : null;

  return {
    id: `c${String(index + 1).padStart(3, "0")}`,
    name,
    kind,
    region: regionRaw || null,
    address,
    hours: hours || null,
    zip: zipMatch ? zipMatch[1] : null,
    state: address?.match(/\b([A-Z]{2})\b(?=[, ]*\d{5})/)?.[1] ?? null,
    lat: coordMatch ? Number(coordMatch[1]) : null,
    lng: coordMatch ? Number(coordMatch[2]) : null,
    status,
  };
});

const withCoords = centers.filter((c) => c.lat !== null).length;
const stats = {
  total: centers.length,
  receiving: centers.filter((c) => c.status === "receiving").length,
  full: centers.filter((c) => c.status === "full").length,
  warehouses: centers.filter((c) => c.kind === "warehouse").length,
  withCoords,
  missingCoords: centers.length - withCoords,
  states: [...new Set(centers.map((c) => c.state).filter(Boolean))].sort(),
  missingZip: centers.filter((c) => !c.zip).map((c) => c.name),
};

fs.mkdirSync(new URL("../data/", import.meta.url), { recursive: true });
fs.writeFileSync(new URL("../data/centers.raw.json", import.meta.url), JSON.stringify(centers, null, 2));
console.log(JSON.stringify(stats, null, 2));
console.log("\nsample:", JSON.stringify(centers[0], null, 2));
console.log("\nno-coord examples:", centers.filter((c) => c.lat === null).slice(0, 6).map((c) => `${c.name} | ${c.address}`));
