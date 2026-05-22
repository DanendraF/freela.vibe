import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Wifi, MapPin, X, Clock, Briefcase, Coins } from "lucide-react";
import { useState } from "react";
import { MotionSection } from "@/components/MotionSection";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Freela.Vibe" },
      { name: "description", content: "Talent Hub & coworking finder in Yogyakarta." },
    ],
  }),
  component: WorkPage,
});

type Project = {
  id: string;
  tag: string;
  title: string;
  client: string;
  score: number;
  salary: string;
  duration: string;
  type: string;
  description: string;
  responsibilities: string[];
};

const projects: Project[] = [
  {
    id: "p1",
    tag: "Branding",
    title: "Identity for local cafe",
    client: "Local SME Kopi Tjap Tugu",
    score: 88,
    salary: "Rp 4–6 mil",
    duration: "3 weeks",
    type: "Project-based",
    description:
      "Building visual identity for a specialty cafe in Kotagede, focusing on local culture & Javanese single-origin coffee.",
    responsibilities: [
      "Moodboard & competitor research",
      "Logo + complete visual system",
      "Application to menu, packaging, signage",
    ],
  },
  {
    id: "p2",
    tag: "Web Dev",
    title: "Educational NGO landing page",
    client: "Sekolah Sokola NGO",
    score: 76,
    salary: "Rp 6–9 mil",
    duration: "1 month",
    type: "Project-based",
    description:
      "Donation & literacy program landing page for children in remote Yogyakarta. Free stack, prefer Next/Astro.",
    responsibilities: [
      "Design & build responsive landing page",
      "Donation form integration",
      "SEO optimization & analytics",
    ],
  },
  {
    id: "p3",
    tag: "Content",
    title: "Editorial for F&B startup",
    client: "Sajian.id Startup",
    score: 91,
    salary: "Rp 3.5 mil/mo",
    duration: "3-month retainer",
    type: "Part-time",
    description:
      "Write 8 articles/month on Indonesian cuisine and manage weekly newsletter to 12k subscribers.",
    responsibilities: [
      "Research & interview culinary figures",
      "Write 8 long-form articles/month",
      "Newsletter & basic SEO",
    ],
  },
  {
    id: "p4",
    tag: "Motion",
    title: "Explainer video for civil campaign",
    client: "Suara Warga NGO",
    score: 82,
    salary: "Rp 7–10 mil",
    duration: "5 weeks",
    type: "Project-based",
    description:
      "2 explainer videos @ 60 seconds for regional budget participation campaign. Style: 2D motion + local art.",
    responsibilities: [
      "Storyboard & script",
      "2D animation + sound design",
      "Vertical version for IG/TikTok",
    ],
  },
];

type Cowork = {
  name: string;
  vibe: string;
  price: string;
  wifi: number;
  seat: "green" | "yellow" | "red";
  address: string;
  mapsQuery: string;
};

const coworkings: Cowork[] = [
  { name: "Antologi Collabs", vibe: "Creative", price: "Rp 75k/day", wifi: 4, seat: "green", address: "Prawirotaman, Yogyakarta", mapsQuery: "Antologi Collaborative Space Yogyakarta" },
  { name: "Lokal Hood", vibe: "Quiet", price: "Rp 60k/day", wifi: 3, seat: "yellow", address: "Demangan, Yogyakarta", mapsQuery: "Lokal Hood Coworking Yogyakarta" },
  { name: "Klinik Kopi Studio", vibe: "Social", price: "Rp 40k/day", wifi: 3, seat: "green", address: "North Sleman", mapsQuery: "Klinik Kopi Yogyakarta" },
  { name: "Kebun Ide", vibe: "Quiet", price: "Rp 90k/day", wifi: 4, seat: "red", address: "Kotagede, Yogyakarta", mapsQuery: "Kebun Ide Yogyakarta" },
  { name: "Ruang Bersama", vibe: "Creative", price: "Rp 55k/day", wifi: 4, seat: "green", address: "Kasongan, Bantul", mapsQuery: "Ruang Bersama Coworking Yogyakarta" },
  { name: "Tempo Gelato Loft", vibe: "Social", price: "Rp 35k/day", wifi: 2, seat: "yellow", address: "Prawirotaman, Yogyakarta", mapsQuery: "Tempo Gelato Yogyakarta" },
];

function WorkPage() {
  const [active, setActive] = useState<Project | null>(null);
  const [activeCowork, setActiveCowork] = useState<Cowork | null>(null);

  return (
    <>
      <section 
        className="grain relative overflow-hidden bg-cover bg-center pt-36 pb-24 text-vibe-cream"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1600&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-vibe-clay/85 to-vibe-terracotta/95 backdrop-blur-[2px]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-vibe-cream/90 drop-shadow-sm">Work</p>
          <h1 className="mt-3 font-display text-6xl md:text-8xl">Can I make a living?</h1>
          <p className="mt-6 max-w-xl text-vibe-cream/80">
            Talent Hub connects you with SMEs, startups, and NGOs. Coworking finder helps you find the right rhythm.
          </p>
        </div>
      </section>

      <section className="bg-vibe-cream py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <h2 className="font-display text-4xl text-vibe-charcoal md:text-5xl">Talent Opportunity Hub</h2>
            <p className="mt-2 text-sm text-vibe-charcoal/60">Click a card to see job details.</p>
          </MotionSection>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <MotionSection key={p.id} delay={i * 0.05}>
                <motion.button
                  whileHover={{ y: -3 }}
                  onClick={() => setActive(p)}
                  className="group flex h-full w-full flex-col rounded-2xl bg-white p-5 text-left transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(44,44,44,0.2)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-vibe-warm px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">{p.tag}</span>
                    <span className="text-[10px] uppercase tracking-wider text-vibe-charcoal/50">{p.score}% match</span>
                  </div>
                  <h3 className="mt-3 line-clamp-2 font-display text-lg leading-tight text-vibe-charcoal">{p.title}</h3>
                  <p className="mt-1 truncate text-xs text-vibe-charcoal/60">{p.client}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-vibe-charcoal/70">
                    <span className="inline-flex items-center gap-1 font-medium text-vibe-terracotta">
                      <Coins size={11} /> {p.salary}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {p.duration}
                    </span>
                  </div>
                  <span className="mt-4 inline-flex items-center text-xs font-medium text-vibe-terracotta opacity-0 transition-opacity group-hover:opacity-100">
                    View details →
                  </span>
                </motion.button>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibe-warm py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <h2 className="font-display text-4xl text-vibe-charcoal md:text-5xl">Coworking Finder</h2>
            <p className="mt-2 text-sm text-vibe-charcoal/60">Click to view location on map.</p>
          </MotionSection>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {coworkings.map((c, i) => (
              <MotionSection key={c.name} delay={i * 0.04}>
                <motion.button
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveCowork(c)}
                  className="h-full w-full rounded-3xl bg-white p-6 text-left"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-xl text-vibe-charcoal">{c.name}</h3>
                    <span
                      className={`h-3 w-3 rounded-full ${
                        c.seat === "green" ? "bg-vibe-mint" : c.seat === "yellow" ? "bg-vibe-clay" : "bg-vibe-terracotta"
                      }`}
                    />
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-vibe-terracotta">{c.vibe}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-vibe-charcoal/60">
                    <MapPin size={11} /> {c.address}
                  </p>
                  <p className="mt-4 text-sm text-vibe-charcoal/80">{c.price}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-vibe-charcoal/70">
                    <Wifi size={14} />
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((b) => (
                        <motion.span
                          key={b}
                          className="block w-1 rounded-sm"
                          style={{ height: 4 + b * 2, backgroundColor: b <= c.wifi ? "#7A9E7E" : "rgba(44,44,44,0.15)" }}
                          animate={b <= c.wifi ? { opacity: [0.6, 1, 0.6] } : {}}
                          transition={{ duration: 1.6, repeat: Infinity, delay: b * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.button>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-vibe-cream p-6 sm:rounded-3xl sm:p-8"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 rounded-full bg-vibe-warm p-2 text-vibe-charcoal"
              >
                <X size={16} />
              </button>
              <span className="rounded-full bg-vibe-warm px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider">{active.tag}</span>
              <h3 className="mt-3 font-display text-3xl text-vibe-charcoal md:text-4xl">{active.title}</h3>
              <p className="mt-1 text-sm text-vibe-charcoal/60">{active.client}</p>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-white p-3">
                  <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-vibe-charcoal/50"><Coins size={10} /> Salary</p>
                  <p className="mt-1 font-display text-base text-vibe-terracotta">{active.salary}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-vibe-charcoal/50"><Clock size={10} /> Duration</p>
                  <p className="mt-1 font-display text-base">{active.duration}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-vibe-charcoal/50"><Briefcase size={10} /> Type</p>
                  <p className="mt-1 font-display text-base">{active.type}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-vibe-charcoal/50">About the job</p>
                <p className="mt-2 text-sm leading-relaxed text-vibe-charcoal/80">{active.description}</p>
              </div>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-vibe-charcoal/50">Responsibilities</p>
                <ul className="mt-2 space-y-1.5 text-sm text-vibe-charcoal/80">
                  {active.responsibilities.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-vibe-terracotta" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 rounded-2xl bg-vibe-warm p-3 text-xs text-vibe-charcoal/70">
                Your compatibility: <strong className="text-vibe-charcoal">{active.score}%</strong>
              </div>

              <button className="mt-6 w-full rounded-full bg-vibe-charcoal px-5 py-3 text-sm font-medium text-vibe-cream">
                Apply now
              </button>
            </motion.div>
          </motion.div>
        )}

        {activeCowork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCowork(null)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-vibe-cream p-6 sm:rounded-3xl sm:p-8"
            >
              <button
                onClick={() => setActiveCowork(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-vibe-warm p-2 text-vibe-charcoal"
              >
                <X size={16} />
              </button>
              <h3 className="font-display text-3xl text-vibe-charcoal">{activeCowork.name}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-vibe-charcoal/60">
                <MapPin size={12} /> {activeCowork.address}
              </p>
              <div className="mt-5 overflow-hidden rounded-2xl border border-vibe-charcoal/10">
                <iframe
                  title={`Map of ${activeCowork.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(activeCowork.mapsQuery)}&output=embed`}
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wider text-vibe-charcoal/50">Vibe</p>
                  <p className="mt-1 font-display text-base text-vibe-terracotta">{activeCowork.vibe}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] uppercase tracking-wider text-vibe-charcoal/50">Rate</p>
                  <p className="mt-1 font-display text-base">{activeCowork.price}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeCowork.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-vibe-charcoal px-5 py-3 text-sm font-medium text-vibe-cream"
              >
                Open in Google Maps
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
