import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MotionSection } from "@/components/MotionSection";
import { Monitor, Heart, Briefcase, Baby, Map, Home, Building2, Trees, PenTool } from "lucide-react";

export const Route = createFileRoute("/feel")({
  head: () => ({
    meta: [
      { title: "Feel Included — Freela.Vibe" },
      { name: "description", content: "Vibe Board & Jogja Pulse — civic participation for freelancers." },
    ],
  }),
  component: FeelPage,
});

const board = [
  { tag: "Art", title: "ARTJOG painting exhibition", h: 280 },
  { tag: "Music", title: "Acoustic sunset at Tugu", h: 220 },
  { tag: "Workshop", title: "Zine printing in Kotagede", h: 320 },
  { tag: "Community", title: "Prawirotaman Sunday market", h: 200 },
  { tag: "Talk", title: "Civic talk: inclusive city", h: 260 },
  { tag: "Food", title: "Angkringan festival", h: 240 },
];



function FeelPage() {
  return (
    <>
      <section 
        className="grain relative overflow-hidden bg-cover bg-center pt-36 pb-24"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1600&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-vibe-warm/85 to-[#f0e2cf]/95 backdrop-blur-[2px]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-vibe-terracotta drop-shadow-sm">Feel included</p>
          <h1 className="mt-3 font-display text-6xl text-vibe-charcoal md:text-8xl">Do I belong here?</h1>
          <p className="mt-6 max-w-xl text-vibe-charcoal/80">
            Your voice shapes Jogja. Vibe Board for inspiration, Jogja Pulse for civic participation.
          </p>
        </div>
      </section>

      <section className="bg-vibe-cream py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <h2 className="font-display text-4xl text-vibe-charcoal md:text-5xl">Vibe Board</h2>
          </MotionSection>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {board.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-white"
              >
                <div
                  className="flex items-end p-5"
                  style={{
                    height: b.h,
                    background: `linear-gradient(180deg, ${
                      ["#A8C5A0", "#B8A9D4", "#D4956A", "#E8DDD0"][i % 4]
                    } 0%, #f5f0e8 100%)`,
                  }}
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-vibe-charcoal/70">{b.tag}</p>
                    <p className="mt-1 font-display text-xl text-vibe-charcoal">{b.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <JogjaPulse />
    </>
  );
}


const polls = [
  {
    id: "01",
    icon: PenTool,
    q: "What facilities do you need most as a freelancer?",
    opts: [
      { label: "Free coworking", desc: "Comfortable workspace at no cost.", icon: Monitor, bg: "bg-[#eef2ea]" },
      { label: "Healthcare access", desc: "Clinics, hospitals, pharmacies, etc.", icon: Heart, bg: "bg-[#f5ebe6]" },
      { label: "Legal contract aid", desc: "Consultation, documents, protection.", icon: Briefcase, bg: "bg-[#f6eadc]" },
      { label: "Childcare", desc: "Trustworthy and reliable daycare.", icon: Baby, bg: "bg-[#eef2ea]" }
    ]
  },
  {
    id: "02",
    icon: Map,
    q: "Which district needs more public spaces?",
    opts: [
      { label: "Sleman", desc: "Northern area, close to nature & campus.", icon: Trees, bg: "bg-[#eef2ea]" },
      { label: "Bantul", desc: "Creative, cultural, and community hub.", icon: Home, bg: "bg-[#f5ebe6]" },
      { label: "City Center", desc: "Hub of activity and crowds.", icon: Building2, bg: "bg-[#f6eadc]" },
      { label: "Kulon Progo", desc: "Quiet, natural, and developing.", icon: Map, bg: "bg-[#eef2ea]" }
    ]
  }
];

function JogjaPulse() {
  const [voted, setVoted] = useState<Record<number, number | null>>({});

  return (
    <section className="bg-vibe-cream py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <MotionSection>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-vibe-terracotta">Jogja Pulse</p>
              <h2 className="mt-3 font-display text-5xl text-vibe-charcoal md:text-6xl">
                Your voice, the <span className="italic">pulse</span> of the city.
              </h2>
              <p className="mt-4 text-vibe-charcoal/70">
                Help us understand your needs so the recommendations you receive are more relevant and personalized.
              </p>
            </div>
            {/* Tugu Illustration Placeholder */}
            <div className="hidden md:flex h-40 w-64 items-center justify-center opacity-60">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d="M100 20 L90 70 L80 150 L120 150 L110 70 Z" fill="#d8e2d4" stroke="#2c2c2c" strokeWidth="2"/>
                <circle cx="100" cy="100" r="60" fill="#eef2ea" className="-z-10" />
                <path d="M60 150 L140 150" stroke="#2c2c2c" strokeWidth="2"/>
                <path d="M95 20 L105 20" stroke="#2c2c2c" strokeWidth="2"/>
                <circle cx="100" cy="80" r="3" fill="#d4956a" />
              </svg>
            </div>
          </div>
        </MotionSection>

        <div className="mt-14 space-y-6">
          {polls.map((p, pi) => (
            <MotionSection key={p.id} delay={pi * 0.1}>
              <div className="flex flex-col md:flex-row overflow-hidden rounded-[2rem] bg-white border border-vibe-charcoal/5 shadow-sm">
                
                {/* Left Panel */}
                <div className="w-full shrink-0 bg-[#fbf8f4] p-8 md:w-[320px] md:p-10 flex flex-col justify-center relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#ebdcc4]/50 text-vibe-charcoal">
                    <p.icon size={24} />
                  </div>
                  <p className="mb-2 text-sm font-semibold tracking-widest text-vibe-terracotta">{p.id}</p>
                  <h3 className="font-display text-2xl leading-tight text-vibe-charcoal">{p.q}</h3>
                  <svg className="mt-6 w-8 text-vibe-terracotta opacity-80" viewBox="0 0 40 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5" />
                  </svg>
                </div>

                {/* Right Panel (Options) */}
                <div className="grid flex-1 grid-cols-1 gap-4 p-8 md:grid-cols-2 md:p-10">
                  {p.opts.map((opt, oi) => {
                    const picked = voted[pi] === oi;
                    return (
                      <button
                        key={opt.label}
                        onClick={() => setVoted((v) => ({ ...v, [pi]: oi }))}
                        className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                          picked
                            ? "border-vibe-terracotta bg-[#fdfaf8] shadow-sm shadow-vibe-terracotta/10"
                            : "border-vibe-charcoal/10 bg-white hover:border-vibe-charcoal/30 hover:shadow-sm"
                        }`}
                      >
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-vibe-charcoal ${opt.bg}`}>
                          <opt.icon size={20} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-vibe-charcoal">{opt.label}</p>
                          <p className="mt-0.5 text-xs text-vibe-charcoal/60">{opt.desc}</p>
                        </div>
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          picked ? "border-vibe-terracotta" : "border-vibe-charcoal/20"
                        }`}>
                          {picked && <div className="h-2.5 w-2.5 rounded-full bg-vibe-terracotta" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>
            </MotionSection>
          ))}
        </div>

        <MotionSection delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-end gap-6 sm:flex-row">
            <p className="text-sm font-medium text-vibe-charcoal/60">
              Your answers help us understand your needs.
            </p>
            <button className="rounded-full bg-[#5b755b] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#5b755b]/20 transition-all hover:bg-[#4a614a] hover:-translate-y-0.5 hover:shadow-xl">
              Continue &rarr;
            </button>
          </div>
        </MotionSection>

      </div>
    </section>
  );
}
