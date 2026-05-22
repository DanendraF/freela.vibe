import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Wifi, Trees, Utensils, Music, BookOpen } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  CircleMarker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon paths (bundler-safe via CDN)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type POI = {
  id: string;
  name: string;
  type: "cafe" | "coworking" | "park" | "food" | "music" | "library";
  lat: number;
  lng: number;
};

const POIS: POI[] = [
  { id: "p1", name: "Klinik Kopi", type: "cafe", lat: -7.745, lng: 110.395 },
  { id: "p2", name: "Filosofi Kopi Jogja", type: "cafe", lat: -7.788, lng: 110.365 },
  { id: "p3", name: "Epicentrum Coffee", type: "cafe", lat: -7.762, lng: 110.41 },
  { id: "p4", name: "Antologi Collaborative Space", type: "coworking", lat: -7.79, lng: 110.37 },
  { id: "p5", name: "GreenHost Boutique Cowork", type: "coworking", lat: -7.815, lng: 110.365 },
  { id: "p6", name: "Kolektif Agency Hub", type: "coworking", lat: -7.77, lng: 110.39 },
  { id: "p7", name: "Hutan Kota Mangkubumi", type: "park", lat: -7.78, lng: 110.367 },
  { id: "p8", name: "Alun-Alun Kidul", type: "park", lat: -7.812, lng: 110.363 },
  { id: "p9", name: "Sate Klathak Pak Pong", type: "food", lat: -7.83, lng: 110.4 },
  { id: "p10", name: "Gudeg Yu Djum", type: "food", lat: -7.77, lng: 110.38 },
  { id: "p11", name: "LIR Space", type: "music", lat: -7.79, lng: 110.4 },
  { id: "p12", name: "Perpus Kota Yogya", type: "library", lat: -7.8, lng: 110.37 },
  { id: "p13", name: "Sleman Co-Living", type: "coworking", lat: -7.7, lng: 110.4 },
  { id: "p14", name: "Kasongan Studio Cafe", type: "cafe", lat: -7.85, lng: 110.34 },
];

const TYPE_META: Record<POI["type"], { label: string; icon: typeof Coffee; color: string }> = {
  cafe: { label: "Cafe", icon: Coffee, color: "#c4654a" },
  coworking: { label: "Coworking", icon: Wifi, color: "#7d9b76" },
  park: { label: "Taman", icon: Trees, color: "#4a6741" },
  food: { label: "Kuliner", icon: Utensils, color: "#a0522d" },
  music: { label: "Musik/Seni", icon: Music, color: "#9b72cf" },
  library: { label: "Pustaka", icon: BookOpen, color: "#3b6fa0" },
};

const RADIUS_KM = 10;
const CENTER: [number, number] = [-7.795, 110.39];

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export type Pivot = { lat: number; lng: number; label: string };

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onPick(e.latlng.lat, e.latlng.lng),
  });
  return null;
}

export function PivotMap({
  pivot,
  onChange,
}: {
  pivot: Pivot | null;
  onChange: (p: Pivot) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const nearby = useMemo(() => {
    if (!pivot) return [];
    return POIS.map((p) => ({ ...p, dist: distanceKm(pivot, p) }))
      .filter((p) => p.dist <= RADIUS_KM)
      .sort((a, b) => a.dist - b.dist);
  }, [pivot]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    nearby.forEach((p) => (c[p.type] = (c[p.type] ?? 0) + 1));
    return c;
  }, [nearby]);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-vibe-charcoal/15">
        <div className="aspect-[4/3] w-full bg-vibe-warm">
          {mounted && (
            <MapContainer
              center={pivot ? [pivot.lat, pivot.lng] : CENTER}
              zoom={12}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <ClickHandler
                onPick={(lat, lng) =>
                  onChange({ lat, lng, label: `Titik (${lat.toFixed(3)}, ${lng.toFixed(3)})` })
                }
              />
              {POIS.map((p) => {
                const meta = TYPE_META[p.type];
                const inRange = pivot ? distanceKm(pivot, p) <= RADIUS_KM : true;
                return (
                  <CircleMarker
                    key={p.id}
                    center={[p.lat, p.lng]}
                    radius={6}
                    pathOptions={{
                      color: meta.color,
                      fillColor: meta.color,
                      fillOpacity: inRange ? 0.9 : 0.25,
                      weight: 1.5,
                      opacity: inRange ? 1 : 0.4,
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -4]}>
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                      <br />
                      <span style={{ fontSize: 10, opacity: 0.7 }}>{meta.label}</span>
                    </Tooltip>
                  </CircleMarker>
                );
              })}
              {pivot && (
                <>
                  <Circle
                    center={[pivot.lat, pivot.lng]}
                    radius={RADIUS_KM * 1000}
                    pathOptions={{
                      color: "#c4654a",
                      fillColor: "#c4654a",
                      fillOpacity: 0.1,
                      weight: 1.5,
                      dashArray: "4 4",
                    }}
                  />
                  <Marker position={[pivot.lat, pivot.lng]} />
                </>
              )}
            </MapContainer>
          )}
        </div>

        <div className="pointer-events-none absolute left-3 top-3 z-[400] rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/70 backdrop-blur shadow">
          {pivot ? `Radius ${RADIUS_KM} km` : "Klik di peta untuk set titik tumpu"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(TYPE_META) as POI["type"][]).map((t) => {
          const meta = TYPE_META[t];
          const Icon = meta.icon;
          const n = counts[t] ?? 0;
          return (
            <div
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-vibe-charcoal/10 bg-white/70 px-3 py-1 text-[11px] text-vibe-charcoal/80"
            >
              <Icon size={12} style={{ color: meta.color }} />
              {meta.label}
              {pivot && (
                <span className="ml-1 rounded-full bg-vibe-charcoal/5 px-1.5 text-[10px] font-medium">
                  {n}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {pivot && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-vibe-charcoal/10 bg-white/70 p-4"
          >
            <div className="flex items-baseline justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-vibe-charcoal/60">
                Dalam radius {RADIUS_KM} km
              </p>
              <p className="text-xs text-vibe-terracotta">{nearby.length} tempat</p>
            </div>
            <ul className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
              {nearby.length === 0 && (
                <li className="text-xs text-vibe-charcoal/50">
                  Tidak ada tempat di radius ini. Coba klik area lain.
                </li>
              )}
              {nearby.map((p) => {
                const meta = TYPE_META[p.type];
                const Icon = meta.icon;
                return (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-2 rounded-xl bg-vibe-cream/60 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon size={14} style={{ color: meta.color }} />
                      <span className="truncate text-sm text-vibe-charcoal">{p.name}</span>
                    </div>
                    <span className="shrink-0 text-[11px] text-vibe-charcoal/60">
                      {p.dist.toFixed(1)} km
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
