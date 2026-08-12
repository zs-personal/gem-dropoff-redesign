// Enriches the extracted centers with coordinates and writes the app dataset.
// Centers missing coords are geocoded via Nominatim, falling back to ZIP centroid.
import fs from "node:fs";
import path from "node:path";

const ROOT = new URL("..", import.meta.url);
const ZIP_SOURCE = "/tmp/zips.json";
// Donors are overwhelmingly South Florida; the rest are states where centers exist.
const STATES = new Set(["FL", "GA", "TX", "NC", "UT", "WI"]);
const CACHE_PATH = new URL("data/geocode-cache.json", ROOT);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const zipRows = JSON.parse(fs.readFileSync(ZIP_SOURCE, "utf8"));
const zipAll = new Map();
const zipScoped = {};
for (const row of zipRows) {
  const lat = Number(row.latitude);
  const lng = Number(row.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
  const zip = String(row.zip_code).padStart(5, "0");
  zipAll.set(zip, { lat, lng, city: row.city, state: row.state });
  if (STATES.has(row.state)) {
    zipScoped[zip] = [Number(lat.toFixed(4)), Number(lng.toFixed(4)), row.city, row.state];
  }
}

const centers = JSON.parse(fs.readFileSync(new URL("data/centers.raw.json", ROOT), "utf8"));

// Short all-caps tokens are acronyms (LBU, MGC) and should stay uppercase.
const titleCase = (value) =>
  value
    .split(" ")
    .map((word) => (word.length <= 3 && /^[A-Z0-9&#]+$/.test(word) ? word : word.charAt(0) + word.slice(1).toLowerCase()))
    .join(" ");

// Internal routing codes ("COL - ", "VZ - ") are noise for donors; surface a clean name.
const cleanName = (name) => {
  let out = name
    .replace(/^(COL|VZ)\s*-\s*/i, "")
    .replace(/\s*,?\s*(LLC|INC)\.?$/i, "")
    .trim();
  if (!/[a-záéíóúñ]/.test(out)) out = titleCase(out);
  return out
    .replace(/\s+-\s*/g, " – ")
    .replace(/(\w)-\s+/g, "$1 – ")
    .replace(/,(?=\S)/g, ", ")
    .replace(/\s{2,}/g, " ")
    .trim();
};

// City names in the source contain typos ("Wiston Salem"); prefer the USPS spelling
// when it is a near match, but keep genuinely different local names (Doral vs Miami).
const editDistance = (a, b) => {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i += 1) {
    let last = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, last + (a[i - 1] === b[j - 1] ? 0 : 1));
      last = current;
    }
  }
  return prev[b.length];
};

const cityFromAddress = (address) => {
  const parts = address.split(",").map((p) => p.trim());
  const stateIdx = parts.findIndex((p) => /^[A-Z]{2}\b/.test(p) || /^[A-Z]{2},?\s*\d{5}/.test(p));
  if (stateIdx > 0) return parts[stateIdx - 1];
  return parts.length > 1 ? parts[parts.length - 2] : null;
};

const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, "utf8")) : {};
const saveCache = () => fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));

async function geocode(address) {
  if (address in cache) return cache[address];
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", address.replace(/,\s*(?=\d{5})/g, " "));
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "us");
  const res = await fetch(url, {
    headers: { "User-Agent": "ayuda-venezuela-redesign/1.0 (donation drop-off directory demo)" },
  });
  if (!res.ok) return null;
  const json = await res.json();
  const hit = json.length ? { lat: Number(json[0].lat), lng: Number(json[0].lon) } : null;
  cache[address] = hit;
  saveCache();
  await sleep(1100); // Nominatim asks for at most 1 request/second
  return hit;
}

const enriched = [];
let geocoded = 0;
let approx = 0;

for (const center of centers) {
  // Several addresses omit the comma before the city, so fall back to the ZIP's city.
  const parsedCity = cityFromAddress(center.address);
  const zipCity = zipAll.get(center.zip)?.city ?? null;
  const usableCity = parsedCity && !/\d/.test(parsedCity) && parsedCity.length <= 24;
  let city = usableCity ? parsedCity : zipCity;
  if (city && zipCity && city !== zipCity) {
    const distance = editDistance(city.toLowerCase(), zipCity.toLowerCase());
    if (distance > 0 && distance <= 2) city = zipCity;
  }

  const out = {
    ...center,
    displayName: cleanName(center.name),
    city,
    precision: "exact",
  };

  if (out.lat === null) {
    const hit = await geocode(center.address);
    if (hit) {
      out.lat = hit.lat;
      out.lng = hit.lng;
      geocoded += 1;
      process.stdout.write(`geocoded  ${out.displayName}\n`);
    } else {
      const fallback = zipAll.get(center.zip);
      if (fallback) {
        out.lat = fallback.lat;
        out.lng = fallback.lng;
        out.precision = "approximate";
        approx += 1;
        process.stdout.write(`zip-approx ${out.displayName} (${center.zip})\n`);
      } else {
        process.stdout.write(`FAILED     ${out.displayName}\n`);
      }
    }
  }
  enriched.push(out);
}

// The source list contains a few true duplicates (same name + address).
const seen = new Map();
const deduped = [];
const dropped = [];
for (const c of enriched) {
  const key = `${c.displayName.toLowerCase()}|${c.address.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  if (seen.has(key)) {
    dropped.push(c.name);
    continue;
  }
  seen.set(key, true);
  deduped.push(c);
}

const final = deduped
  .sort((a, b) => a.displayName.localeCompare(b.displayName, "es"))
  .map((c, i) => ({ ...c, id: `c${String(i + 1).padStart(3, "0")}` }));

const outDir = new URL("src/data/", ROOT);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(new URL("centers.json", outDir), JSON.stringify(final));
fs.writeFileSync(new URL("zip-centroids.json", outDir), JSON.stringify(zipScoped));

console.log("\n---");
console.log("centers:", final.length, "| geocoded:", geocoded, "| zip-approx:", approx, "| dropped dupes:", dropped);
console.log("receiving:", final.filter((c) => c.status === "receiving").length, "full:", final.filter((c) => c.status === "full").length);
console.log("no coords:", final.filter((c) => c.lat === null).map((c) => c.displayName));
console.log("zip table entries:", Object.keys(zipScoped).length, "size:", (fs.statSync(path.join(outDir.pathname, "zip-centroids.json")).size / 1024).toFixed(0) + "KB");
