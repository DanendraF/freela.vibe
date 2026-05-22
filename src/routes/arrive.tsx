import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, BadgePercent, Building2, Bus, Coffee,
  Heart, MapPin, Moon, Music2, Palette, Sparkles, Ticket, UtensilsCrossed,
  Wallet, X,
} from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/arrive")({
  head: () => ({
    meta: [
      { title: "Arrive — Freela.Vibe" },
      { name: "description", content: "Introduction to Jogja, explore district vibes, and stories that shape the city." },
    ],
  }),
  component: ArrivePage,
});

function ArrivePage() {
  return (
    <>
      <WelcomeHeader />
      <PengenalanKota />
      <JelajahiVibe />
      <HiddenStories />
      <DigitalCityPass />
    </>
  );
}

/* ---------- 1. Personalized Welcome Header ---------- */
function WelcomeHeader() {
  const { user, onboarding, isPro, trialDaysLeft } = useAuth();
  const name = user?.name ?? onboarding?.fullName ?? "Freelancer";
  const stats = [
    { label: "Avg living cost", value: "Rp 5.3m", icon: Wallet },
    { label: "Top area this week", value: "Prawirotaman", icon: MapPin },
    { label: "Upcoming event", value: "ARTJOG · 3 days", icon: Sparkles },
  ];
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-vibe-mint to-vibe-sage pt-36 pb-20">
      <div className="mx-auto max-w-[1400px] px-6">
        <p className="text-xs uppercase tracking-[0.28em] text-vibe-charcoal/70">Arrive · City Adaptation</p>
        <div className="mt-6 flex flex-col gap-6 rounded-3xl bg-white/70 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-5">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-vibe-charcoal text-2xl font-display text-vibe-cream">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-vibe-charcoal/70">Welcome back,</p>
              <h1 className="font-display text-3xl text-vibe-charcoal md:text-4xl">{name}</h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-vibe-terracotta px-3 py-1 text-xs font-medium text-vibe-cream">
                  ✦ Freelance Vibe
                </span>
                <span className="rounded-full bg-vibe-warm px-3 py-1 text-xs text-vibe-charcoal">
                  {isPro ? "Active City Pass" : `Trial · ${Math.max(0, trialDaysLeft)} days`}
                </span>
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 md:max-w-md">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-vibe-cream p-4">
                <s.icon size={16} className="text-vibe-terracotta" />
                <p className="mt-2 text-[11px] uppercase tracking-wider text-vibe-charcoal/60">{s.label}</p>
                <p className="mt-1 font-display text-lg leading-tight text-vibe-charcoal">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Pengenalan Kota Jogja ---------- */
function PengenalanKota() {
  return (
    <section className="bg-vibe-cream pt-20 pb-10">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_auto_1fr]">
        <MotionSection>
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">01 · Onboarding Kit</p>
          <h2 className="mt-3 font-display text-5xl leading-[1.05] text-vibe-charcoal md:text-6xl">
            Introduction to<br />Jogja City
          </h2>
          <p className="mt-5 max-w-sm text-vibe-charcoal/70">
            Get to know Jogja closer through the atmosphere, stories, culture, and experiences that make this city special.
          </p>
        </MotionSection>

        <MotionSection delay={0.1}>
          <TuguIllustration />
        </MotionSection>

        <MotionSection delay={0.2}>
          <p className="font-serif text-lg italic leading-relaxed text-vibe-charcoal/80 md:text-xl">
            Jogja isn't just a place to visit,<br />but to be felt. <span className="text-vibe-terracotta">♡</span>
          </p>
        </MotionSection>
      </div>
    </section>
  );
}

function TuguIllustration() {
  return (
    <div className="relative mx-auto h-48 w-48">
      <div className="absolute inset-0 rounded-full bg-vibe-mint/60 blur-xl" />
      <svg viewBox="0 0 120 160" className="relative h-full w-full">
        <circle cx="60" cy="90" r="46" fill="#A8C5A0" opacity="0.4" />
        {/* Spire */}
        <path d="M60 8 L57 28 L63 28 Z" fill="#2c2c2c" />
        <circle cx="60" cy="30" r="3" fill="#C96A3A" />
        {/* Top ornament */}
        <path d="M54 34 L66 34 L62 44 L58 44 Z" fill="#2c2c2c" />
        {/* Upper sphere */}
        <circle cx="60" cy="52" r="9" fill="#fdf6ec" stroke="#2c2c2c" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="56" y="60" width="8" height="6" fill="#2c2c2c" />
        {/* Column */}
        <rect x="52" y="66" width="16" height="50" fill="#fdf6ec" stroke="#2c2c2c" strokeWidth="1.5" />
        <line x1="56" y1="72" x2="64" y2="72" stroke="#2c2c2c" strokeWidth="0.8" />
        <line x1="56" y1="84" x2="64" y2="84" stroke="#2c2c2c" strokeWidth="0.8" />
        <line x1="56" y1="96" x2="64" y2="96" stroke="#2c2c2c" strokeWidth="0.8" />
        <line x1="56" y1="108" x2="64" y2="108" stroke="#2c2c2c" strokeWidth="0.8" />
        {/* Base */}
        <rect x="46" y="116" width="28" height="8" fill="#2c2c2c" />
        <rect x="42" y="124" width="36" height="10" fill="#fdf6ec" stroke="#2c2c2c" strokeWidth="1.5" />
        <rect x="38" y="134" width="44" height="10" fill="#2c2c2c" />
        {/* Sparkles */}
        <g fill="#C96A3A">
          <circle cx="22" cy="30" r="1.5" />
          <circle cx="100" cy="42" r="1.2" />
          <circle cx="14" cy="60" r="1" />
          <circle cx="108" cy="70" r="1.2" />
          <circle cx="20" cy="92" r="1" />
        </g>
        <g stroke="#C96A3A" strokeWidth="0.8" fill="none">
          <path d="M22 24 L22 36 M16 30 L28 30" />
          <path d="M100 36 L100 48 M94 42 L106 42" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- 3. Jelajahi Vibe Jogja ---------- */
type VibeArea = {
  name: string;
  desc: string;
  img: string;
};
const vibeAreas: VibeArea[] = [
  { name: "Malioboro", desc: "Iconic, crowded, chaotic nostalgia.", img: "https://images.unsplash.com/photo-1583309217394-d4afa1b51815?w=600&q=80" },
  { name: "Prawirotaman", desc: "Creative district for artists & global nomads.", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80" },
  { name: "Kaliurang", desc: "Cold air, healing, slow mornings.", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80" },
  { name: "Nitiprayan", desc: "Local arts, studios, hidden culture.", img: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=600&q=80" },
  { name: "Kotabaru", desc: "Quiet streets with a colonial vibe.", img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&q=80" },
  { name: "Seturan", desc: "Youthful energy, cafes & nightlife.", img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80" },
];

function JelajahiVibe() {
  return (
    <section className="bg-vibe-cream py-16">
      <div className="mx-auto max-w-[1400px] px-6">
        <MotionSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">02 · Explore The Vibes</p>
              <h2 className="mt-3 font-display text-4xl text-vibe-charcoal md:text-5xl">Explore Jogja Vibes</h2>
              <p className="mt-3 max-w-md text-vibe-charcoal/70">
                Every corner of the city has a unique atmosphere and character.
              </p>
            </div>
            <button className="mt-5 hidden items-center gap-2 rounded-full bg-vibe-sage px-5 py-2.5 text-sm text-vibe-cream transition hover:bg-vibe-charcoal md:inline-flex">
              Explore All Vibes <ArrowRight size={14} />
            </button>
          </div>
        </MotionSection>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vibeAreas.map((v, i) => (
            <MotionSection key={v.name} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-[320px] w-full overflow-hidden rounded-3xl bg-vibe-charcoal shadow-[0_18px_40px_-22px_rgba(44,44,44,0.5)]"
              >
                <img src={v.img} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-vibe-charcoal via-vibe-charcoal/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-vibe-cream">
                  <h3 className="font-display text-2xl leading-tight">{v.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-vibe-cream/85">{v.desc}</p>
                </div>
              </motion.div>
            </MotionSection>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <button className="inline-flex items-center gap-2 rounded-full bg-vibe-sage px-6 py-3 text-sm text-vibe-cream shadow-md transition hover:bg-vibe-charcoal">
            Explore All Vibes <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- 4. Cerita yang Membentuk Jogja ---------- */
type Story = {
  title: string;
  desc: string;
  img: string;
  icon: typeof Sparkles;
};
const stories: Story[] = [
  { title: "Tugu Jogja Philosophy", desc: "Symbol of the imaginary axis that becomes the center of harmony between humans, nature, and God.", img: "https://images.unsplash.com/photo-1583309217394-d4afa1b51815?w=500&q=80", icon: Sparkles },
  { title: "Angkringan Culture", desc: "More than just dinner, it's a space for chats, stories, and simple warmth.", img: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=500&q=80", icon: UtensilsCrossed },
  { title: "Jogja is Made of Longing", desc: "The origin of the phrase that describes the feelings of everyone who has ever returned to Jogja.", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80", icon: Heart },
  { title: "Gudeg & Slow Living", desc: "Sweet taste, long process, and a slow yet meaningful rhythm of life.", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80", icon: UtensilsCrossed },
  { title: "Malioboro at Midnight", desc: "When the lights dim, Jogja reveals its calm, romantic, and serene side.", img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=500&q=80", icon: Moon },
  { title: "Jogja Street Artists", desc: "Creative expressions that live in every corner of the city and become part of Jogja's breath.", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80", icon: Music2 },
];

function HiddenStories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 4500); // ganti tiap 4.5 detik
    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    front: { opacity: 1, y: 0, x: isMobile ? 0 : 90, scale: 1, zIndex: 10 },
    behind1: { opacity: 1, y: isMobile ? -20 : -35, x: isMobile ? 0 : 125, scale: isMobile ? 0.95 : 0.94, zIndex: 9 },
    behind2: { opacity: 0.85, y: isMobile ? -40 : -70, x: isMobile ? 0 : 160, scale: isMobile ? 0.90 : 0.88, zIndex: 8 },
    behind3: { opacity: 0.6, y: isMobile ? -60 : -105, x: isMobile ? 0 : 195, scale: isMobile ? 0.85 : 0.82, zIndex: 7 },
    behind4: { opacity: 0.3, y: isMobile ? -80 : -140, x: isMobile ? 0 : 230, scale: isMobile ? 0.80 : 0.76, zIndex: 6 },
    leave: { opacity: 0, y: isMobile ? 50 : 50, x: isMobile ? -50 : -50, scale: 1.05, zIndex: 11, rotate: -5 },
    hidden: { opacity: 0, y: isMobile ? -100 : -150, x: isMobile ? 0 : 240, scale: 0.7, zIndex: 0 },
  };

  return (
    <section className="bg-vibe-cream pt-10 pb-20 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 md:grid-cols-[1fr_1.6fr] md:min-h-[500px]">
        <MotionSection>
          <div className="md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">03 · Hidden Stories</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-vibe-charcoal md:text-5xl">
              Stories that<br />Shape Jogja
            </h2>
            <p className="mt-4 max-w-sm text-vibe-charcoal/70">
              From history, philosophy, to small stories that live in the community.
            </p>
          </div>
        </MotionSection>

        <div className="relative flex h-[460px] w-full items-center justify-center md:h-auto">
          {stories.map((s, i) => {
            const offset = (i - currentIndex + stories.length) % stories.length;
            let position = "behind";
            if (offset === 0) position = "front";
            else if (offset === 1) position = "behind1";
            else if (offset === 2) position = "behind2";
            else if (offset === 3) position = "behind3";
            else if (offset === 4) position = "behind4";
            else if (offset === stories.length - 1) position = "leave";
            else position = "hidden";

            return (
              <motion.div
                key={s.title}
                className="absolute w-full max-w-[90vw] md:max-w-md origin-bottom"
                variants={cardVariants}
                initial="hidden"
                animate={position}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                <div
                  className="group flex w-full flex-col gap-4 rounded-3xl bg-white p-5 text-left shadow-[0_20px_50px_-20px_rgba(44,44,44,0.3)] transition-colors"
                >
                  <img src={s.img} alt={s.title} loading="lazy" className="h-48 md:h-56 w-full rounded-2xl object-cover" />
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <s.icon size={18} className="text-vibe-terracotta" />
                        <h3 className="font-display text-xl md:text-2xl text-vibe-charcoal">{s.title}</h3>
                      </div>
                      <p className="mt-2 text-xs md:text-sm leading-relaxed text-vibe-charcoal/70">{s.desc}</p>
                    </div>
                    {offset === 0 && (
                      <button
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % stories.length)}
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-vibe-warm text-vibe-charcoal transition hover:bg-vibe-terracotta hover:text-vibe-cream cursor-pointer"
                      >
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Digital City Pass ---------- */
function DigitalCityPass() {
  const { user, isPro } = useAuth();
  const passId = useMemo(() => {
    const seed = (user?.email ?? "guest").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `JOG-${(seed % 9000 + 1000).toString()}-FV`;
  }, [user]);
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&bgcolor=fdf6ec&color=2c2c2c&margin=8&data=${encodeURIComponent(`freela.vibe:pass:${passId}`)}`;

  return (
    <section className="bg-vibe-warm py-20">
      <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">04 · Digital City Pass</p>
          <h2 className="mt-3 font-display text-4xl text-vibe-charcoal md:text-5xl">Your city membership card</h2>
        </MotionSection>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <motion.div
            initial={{ rotate: -2, opacity: 0, y: 20 }}
            whileInView={{ rotate: -1.5, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-vibe-charcoal via-[#3a3530] to-vibe-terracotta p-7 text-vibe-cream shadow-[0_30px_60px_-30px_rgba(44,44,44,0.6)]"
          >
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-vibe-clay/20 blur-2xl" />
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-vibe-cream/60">Digital City Pass</p>
                <p className="mt-1 font-display text-2xl">Yogyakarta</p>
              </div>
              <Ticket size={22} className="text-vibe-clay" />
            </div>
            <div className="mt-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-vibe-cream/60">Holder</p>
                <p className="mt-1 font-display text-xl">{user?.name ?? "Guest"}</p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-vibe-cream/60">Pass ID</p>
                <p className="mt-1 font-mono text-sm tracking-widest">{passId}</p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-vibe-cream/60">Status</p>
                <p className="mt-1 text-sm">{isPro ? "Active · Annual" : "Trial · 14 days"}</p>
              </div>
              <div className="rounded-2xl bg-vibe-cream p-2">
                <img src={qr} alt="City Pass QR" className="h-28 w-28 rounded-lg" />
              </div>
            </div>
          </motion.div>

          <ul className="space-y-3">
            {[
              { icon: BadgePercent, t: "10–25% discount at 40+ cafe & coworking partners" },
              { icon: Ticket, t: "Priority access to ARTJOG, FKY, Ngayogjazz events" },
              { icon: Bus, t: "Trans Jogja weekly unlimited pass" },
              { icon: Sparkles, t: "Physical welcome kit: tote, printed map, coffee voucher" },
              { icon: Building2, t: "Access to 30+ coworking partners in the city" },
              { icon: Coffee, t: "Free welcome coffee at selected partner cafes" },
              { icon: Palette, t: "Discount on curated DKV workshops & art studios" },
            ].map((b) => (
              <li key={b.t} className="flex items-start gap-3 rounded-2xl bg-white/70 p-4 backdrop-blur-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-vibe-terracotta text-vibe-cream">
                  <b.icon size={16} />
                </span>
                <p className="text-sm text-vibe-charcoal">{b.t}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
