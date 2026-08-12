import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Copy } from "../copy";
import type { Origin, RankedCenter } from "../types";
import { distanceMiles } from "../lib/geo";

interface Props {
  centers: RankedCenter[];
  activeId: string | null;
  focus: { id: string; nonce: number } | null;
  origin: Origin | null;
  onActivate: (id: string | null) => void;
  t: Copy;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

function popupHtml(center: RankedCenter, t: Copy) {
  const query = center.precision === "exact" ? `${center.lat},${center.lng}` : center.address;
  const receiving = center.status === "receiving";
  const badgeStyle = receiving
    ? "color:#2f6b4f;background:#e4efe6;border:1px solid rgba(47,107,79,.25)"
    : "color:#b04227;background:#f9e6df;border:1px solid rgba(176,66,39,.25)";

  return `
    <div style="font-family:Inter,system-ui,sans-serif">
      <strong style="display:block;font-family:Fraunces,Georgia,serif;font-size:14.5px;line-height:1.25;letter-spacing:-.01em;color:#1c1714">
        ${escapeHtml(center.displayName)}
      </strong>
      <span style="${badgeStyle};margin-top:7px;display:inline-block;border-radius:999px;padding:2px 8px;font-size:10.5px;font-weight:700;letter-spacing:.02em">
        ${escapeHtml(receiving ? t.card.receiving : t.card.full)}
      </span>
      <p style="margin:7px 0 0;font-size:12px;line-height:1.5;color:#6b6259">${escapeHtml(center.address)}</p>
      <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}"
         target="_blank" rel="noopener noreferrer"
         style="margin-top:9px;display:inline-block;font-size:12px;font-weight:600;color:#1c1714;text-decoration:underline;text-decoration-color:rgba(28,23,20,.25);text-underline-offset:3px">
        ${escapeHtml(t.card.directions)} &rarr;
      </a>
    </div>`;
}

/**
 * The network has a handful of far-flung centers (TX, NC, UT, WI). Fitting every pin
 * would zoom out to the whole country, so frame the relevant cluster instead:
 * the nearest handful when we know where the donor is, otherwise the dense core.
 */
function framing(centers: RankedCenter[], origin: Origin | null) {
  if (origin) {
    const nearest = [...centers]
      .sort((a, b) => (a.distanceMi ?? Infinity) - (b.distanceMi ?? Infinity))
      .slice(0, 8);
    const bounds = L.latLngBounds(nearest.map((c) => [c.lat, c.lng] as L.LatLngTuple));
    bounds.extend([origin.lat, origin.lng]);
    return bounds;
  }

  const median = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  };
  const hub = {
    lat: median(centers.map((c) => c.lat)),
    lng: median(centers.map((c) => c.lng)),
  };

  const core = centers.filter((c) => distanceMiles(hub, c) <= 75);
  const framed = core.length >= 3 ? core : centers;
  return L.latLngBounds(framed.map((c) => [c.lat, c.lng] as L.LatLngTuple));
}

export default function CenterMap({ centers, activeId, focus, origin, onActivate, t }: Props) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef(new Map<string, L.Marker>());
  const originRef = useRef<L.Marker | null>(null);
  const activateRef = useRef(onActivate);
  activateRef.current = onActivate;

  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      preferCanvas: false,
    }).setView([25.79, -80.26], 10);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    // Only take over the wheel once the user has engaged with the map.
    map.once("click", () => map.scrollWheelZoom.enable());

    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
      markersRef.current.clear();
      originRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;

    layer.clearLayers();
    markersRef.current.clear();

    for (const center of centers) {
      const size = center.status === "receiving" ? 14 : 11;
      const icon = L.divIcon({
        className: "",
        html: `<span class="pin pin-${center.status}" style="width:${size}px;height:${size}px"></span>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      const marker = L.marker([center.lat, center.lng], { icon, riseOnHover: true, title: center.displayName });
      marker.bindPopup(popupHtml(center, t), { closeButton: false, offset: [0, -2], minWidth: 210 });
      marker.on("mouseover", () => activateRef.current(center.id));
      marker.on("mouseout", () => activateRef.current(null));
      marker.on("click", () => activateRef.current(center.id));
      marker.addTo(layer);
      markersRef.current.set(center.id, marker);
    }

    if (centers.length) {
      map.fitBounds(framing(centers, origin), { padding: [40, 40], maxZoom: 13 });
    }
  }, [centers, origin, t]);

  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      marker.getElement()?.querySelector(".pin")?.classList.toggle("pin-active", id === activeId);
    }
  }, [activeId, centers]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !origin) return;
    originRef.current?.remove();
    originRef.current = L.marker([origin.lat, origin.lng], {
      icon: L.divIcon({
        className: "",
        html:
          '<span style="display:block;width:18px;height:18px;border-radius:999px;background:rgba(217,150,42,.28);border:2px solid #a86d12;box-shadow:0 0 0 4px rgba(217,150,42,.14)"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
      interactive: false,
      zIndexOffset: -100,
    }).addTo(map);
  }, [origin]);

  useEffect(() => {
    if (!focus) return;
    const map = mapRef.current;
    const marker = markersRef.current.get(focus.id);
    if (!map || !marker) return;
    map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 14), { duration: 0.65 });
    marker.openPopup();
  }, [focus]);

  return <div ref={elRef} className="size-full" />;
}
