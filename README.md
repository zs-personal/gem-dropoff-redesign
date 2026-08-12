# GEM Drop-Off Network — redesign concept

A design-forward alternative to [gemdropoff.com](https://gemdropoff.com/), the directory that helps
donors find drop-off centers ("centros de acopio") collecting aid for
[Global Empowerment Mission](https://www.globalempowermentmission.org/)'s active disaster responses.

Same purpose and the same real center data, rebuilt from scratch on GEM's brand with a working
proximity search.

> **This is an unofficial concept, not a GEM property.** It uses GEM's logo, photography and mission
> copy, all pulled from their public site, to show what an on-brand version could look like.

## What's different from the original

| Area | Original | This concept |
| --- | --- | --- |
| Scope | Venezuela donations | GEM's disaster response overall, with Venezuela and Colombia as the active missions |
| Identity | Default utility styling | GEM black/white/orange (`#FC5F21`), uppercase Archivo display type, GEM LATAM logo |
| Hero | Static header | Full-bleed mission photography, Ken Burns + parallax, masked headline reveal, glass ZIP search |
| Motion | None | Scroll reveals, animated stat counters, marquee ticker, parallax quote band — all gated behind `prefers-reduced-motion` |
| Finding a center | ZIP field, reload sorts the list | ZIP **or** browser geolocation, live distance in miles on every card |
| Map | Per-center Google Maps links | Full network map, status-colored pins, list ↔ map hover sync, click to fly to a pin |
| Hours | Raw text string | Parsed into **"Abierto · cierra 10:00 PM"** / "Cerrado hoy", in Miami time |
| Browsing | One long list | Search, filters (receiving / all / warehouses), sort, paginated list |
| Naming | Internal codes (`COL - AUTO ACOUSTIKS INC`) | Cleaned for donors (`Auto Acoustiks`) |
| Language | Spanish only | Spanish primary with an EN toggle |
| Registration | Link to a separate page | Inline two-panel pitch + form with success state |

## Data

All 107 centers come from the live original site, not invented. `source-snapshot.html` is the saved
page; two scripts turn it into the app dataset:

```bash
npm run data   # extract → geocode → write src/data/
```

1. `scripts/extract-centers.mjs` parses the snapshot into `data/centers.raw.json`
   (name, type, address, hours, status, ZIP, coordinates where the original exposed them).
2. `scripts/build-data.mjs` fills the gaps and writes `src/data/centers.json`:
   - geocodes the 49 centers that had no coordinates via OpenStreetMap Nominatim
     (cached in `data/geocode-cache.json`, so reruns don't re-hit the API)
   - falls back to the ZIP centroid when an address can't be geocoded
   - cleans display names, derives city, corrects misspelled cities against USPS ZIP data
   - drops one true duplicate record
   - emits `src/data/zip-centroids.json` for ZIP → coordinate lookup

Result: 107 centers (75 receiving, 32 full) across 40 cities, every one placed on the map.

Mission descriptions in `src/data/missions.ts` are GEM's own published copy, translated to Spanish.

## Caveats to review before showing anyone publicly

- **Brand assets are GEM's.** The logo (`public/brand/`) and photography (`public/missions/`) were
  downloaded from globalempowermentmission.org. Fine for a pitch, needs their sign-off for anything real.
- **21 of 107 pins are ZIP-level approximate** (their addresses were too malformed to geocode
  precisely). Those cards are labeled "Ubicación aproximada".
- **The "Qué se necesita" section is placeholder copy.** The categories are plausible but were not
  taken from the original site — confirm the real needs list before this goes anywhere real.
- **Status is a snapshot**, not live. Receiving/full reflects the moment the source page was saved.
- The registration form is UI only and submits nowhere.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
Project sites are served from `/<repo>/`, so the workflow passes that path as `VITE_BASE`; public
assets are resolved through `src/lib/asset.ts` so they respect it. Nothing to change if the repo is
renamed.

## Stack

Vite 8, React 19, TypeScript, Tailwind CSS v4, Leaflet with CARTO Positron tiles.
No API keys required. The ~300KB ZIP centroid table is code-split and only loads when
someone actually searches by ZIP.
