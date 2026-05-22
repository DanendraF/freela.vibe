import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Award, Briefcase, Calendar, Coffee, Compass, Code2, Link2, MapPin,
  Palette, Sparkles, Sprout, Trophy, Users, Wallet, Zap, Home, User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/me")({
  head: () => ({ meta: [{ title: "Personal — Freela.Vibe" }] }),
  component: PersonalPage,
});

function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/40 bg-white/55 p-5 shadow-[0_20px_60px_-30px_rgba(44,44,44,0.25)] backdrop-blur-xl md:p-6 ${className}`}>
      {children}
    </div>
  );
}
function SectionTitle({ icon: Icon, title, hint }: { icon: any; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-vibe-warm text-vibe-terracotta"><Icon size={16} /></span>
      <div>
        <h2 className="font-display text-xl text-vibe-charcoal md:text-2xl">{title}</h2>
        {hint && <p className="text-[11px] text-vibe-charcoal/60">{hint}</p>}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/50">{label}</p>
      <p className="mt-1 font-display text-2xl text-vibe-charcoal">{value}</p>
      {sub && <p className="text-[11px] text-vibe-charcoal/60">{sub}</p>}
    </div>
  );
}

function PersonalPage() {
  const { user, onboarding, isPro, trialDaysLeft } = useAuth();
  const name = user?.name ?? "Freelancer";
  const initials = name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const title = onboarding?.profession ?? "Multidisciplinary Creative";
  const cityStatus = isPro ? "Digital City Pass" : `Onboarding Kit · ${Math.max(trialDaysLeft, 0)}d`;
  const vibe = onboarding?.lifestyle?.slice(0, 3) ?? ["Quiet", "Coffee", "Creative"];
  const passportLevel = 2;
  const points = 1240;

  const insights = [
    { type: "Community", icon: Users, title: "Jogja Designers Weekly", meta: "Thu · Lokananta", color: "bg-vibe-lavender/30" },
    { type: "Event", icon: Calendar, title: "Civic Hack Sunday", meta: "Sun 23 Nov · City Hall", color: "bg-vibe-sage/30" },
    { type: "Project", icon: Briefcase, title: "Rebrand Bantul MSME Coffee", meta: "Budget 8–12m · 3 wks", color: "bg-vibe-warm" },
    { type: "Coworking", icon: Coffee, title: "Lokananta Co.", meta: "1.2 km · 82% match", color: "bg-vibe-clay/30" },
  ];

  const timeline = [
    { d: "Today", t: "Checked in at Lokananta Co.", pts: "+15 pts" },
    { d: "Yesterday", t: "Submitted civic-hack proposal", pts: "+40 pts" },
    { d: "3 days ago", t: "Attended Designer Weekly meetup", pts: "+25 pts" },
    { d: "Last wk", t: "Completed passport profile", pts: "+100 pts" },
  ];

  const badges = [
    { name: "First Pivot", icon: Compass },
    { name: "Coffee Crawler", icon: Coffee },
    { name: "Civic Helper", icon: Sprout },
    { name: "Night Owl", icon: Sparkles },
  ];

  const benefits = [
    { t: "15% discount at Lokananta Co.", icon: Coffee },
    { t: "Free 1x Trans Jogja / day", icon: MapPin },
    { t: "20% off DKV curation workshop", icon: Palette },
    { t: "Priority access to civic-lab", icon: Sprout },
  ];

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-gradient-to-br from-vibe-cream via-vibe-warm to-vibe-clay/70 px-5 pt-24 pb-32 md:px-10">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-vibe-lavender/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-72 w-72 rounded-full bg-vibe-sage/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl space-y-6">
        {/* IDENTITY */}
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <Glass>
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="relative">
                <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-vibe-terracotta to-vibe-clay text-2xl font-display text-vibe-cream shadow-lg">
                  {initials}
                </div>
                <span className="absolute -bottom-1 -right-1 rounded-full border-2 border-white bg-vibe-sage px-2 py-0.5 text-[9px] font-medium text-vibe-cream">
                  L{passportLevel}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-vibe-terracotta">Creative Passport</p>
                <h1 className="font-display text-3xl text-vibe-charcoal md:text-4xl">{name}</h1>
                <p className="text-sm text-vibe-charcoal/70">{title}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-vibe-warm px-3 py-1 text-[11px] text-vibe-charcoal">
                    <MapPin size={11} /> Yogyakarta · {cityStatus}
                  </span>
                  {vibe.map((v) => (
                    <span key={v} className="rounded-full bg-vibe-lavender/40 px-3 py-1 text-[11px] text-vibe-charcoal">#{v.toLowerCase()}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 md:flex-col">
                {[{ I: Link2, l: "in" }, { I: Code2, l: "gh" }, { I: Palette, l: "be" }].map(({ I, l }) => (
                  <button key={l} className="grid h-10 w-10 place-items-center rounded-2xl border border-vibe-charcoal/10 bg-white/70 text-vibe-charcoal/70 hover:text-vibe-terracotta">
                    <I size={15} />
                  </button>
                ))}
              </div>
            </div>
          </Glass>
        </motion.div>

        {/* CREATIVE PASSPORT */}
        <Glass>
          <SectionTitle icon={Award} title="Creative Passport" hint="Soft gamification — collab & contribution, not competition." />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-vibe-warm to-vibe-clay/40 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/60">Contribution points</p>
              <p className="mt-1 font-display text-3xl text-vibe-charcoal">{points.toLocaleString()}</p>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
                <div className="h-full w-[62%] rounded-full bg-vibe-terracotta" />
              </div>
              <p className="mt-2 text-[11px] text-vibe-charcoal/60">760 pts to Level {passportLevel + 1}</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/60">Badges</p>
              <div className="mt-3 grid grid-cols-4 gap-3">
                {badges.map((b) => (
                  <div key={b.name} className="flex flex-col items-center gap-1.5 rounded-2xl border border-vibe-charcoal/10 bg-vibe-cream/60 p-3 text-center">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-vibe-warm text-vibe-terracotta"><b.icon size={15} /></span>
                    <span className="text-[10px] font-medium text-vibe-charcoal">{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white/60 p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/60">Activity timeline</p>
            <ul className="mt-3 space-y-3">
              {timeline.map((it) => (
                <li key={it.t} className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-vibe-terracotta" />
                    <div>
                      <p className="text-vibe-charcoal">{it.t}</p>
                      <p className="text-[11px] text-vibe-charcoal/55">{it.d}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-vibe-sage/20 px-2.5 py-1 text-[10px] font-medium text-vibe-sage">{it.pts}</span>
                </li>
              ))}
            </ul>
          </div>
        </Glass>

        {/* PERSONALIZED CITY INSIGHTS */}
        <Glass>
          <SectionTitle icon={Sparkles} title="Personalized City Insights" hint="AI recommendations based on your profile & vibe." />
          <div className="grid gap-3 md:grid-cols-2">
            {insights.map((i) => (
              <div key={i.title} className={`group flex items-start gap-3 rounded-2xl ${i.color} p-4 transition hover:scale-[1.01]`}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/70 text-vibe-charcoal"><i.icon size={16} /></span>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-vibe-charcoal/60">{i.type}</p>
                  <p className="text-sm font-medium text-vibe-charcoal">{i.title}</p>
                  <p className="text-[11px] text-vibe-charcoal/65">{i.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </Glass>

        {/* MONTHLY EXPENSE SIMULATION */}
        <MonthlyExpense />

        <Glass>
          <SectionTitle icon={Trophy} title="City Status & Benefits" />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-vibe-charcoal to-vibe-charcoal/80 p-5 text-vibe-cream md:col-span-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-vibe-cream/60">{isPro ? "Digital City Pass" : "Onboarding Kit"}</p>
              <p className="mt-2 font-display text-2xl">{name}</p>
              <p className="text-[11px] text-vibe-cream/70">Yogyakarta · ID {(user?.email ?? "x").slice(0, 6).toUpperCase()}</p>
              <div className="mt-4 flex items-center justify-between text-[11px]">
                <span className="rounded-full bg-vibe-cream/15 px-2.5 py-1">L{passportLevel}</span>
                <span>{isPro ? "Active" : `${Math.max(trialDaysLeft, 0)} days left`}</span>
              </div>
              {!isPro && (
                <Link to="/upgrade" className="mt-4 block rounded-full bg-vibe-terracotta px-4 py-2 text-center text-[11px] font-medium">
                  Upgrade to City Pass
                </Link>
              )}
            </div>
            <div className="rounded-2xl bg-white/70 p-4 md:col-span-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/60">Active benefits</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {benefits.map((b) => (
                  <div key={b.t} className="flex items-center gap-2 rounded-xl bg-vibe-cream/70 p-3 text-[12px] text-vibe-charcoal">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-vibe-warm text-vibe-terracotta"><b.icon size={13} /></span>
                    {b.t}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-vibe-sage/15 p-3 text-[12px]">
                <div className="flex items-center gap-2 text-vibe-charcoal">
                  <Sprout size={14} className="text-vibe-sage" />
                  Local impact counter
                </div>
                <span className="font-display text-lg text-vibe-charcoal">Rp 2,4 jt</span>
              </div>
              <p className="mt-1 text-[10px] text-vibe-charcoal/55">Your estimated contribution to Jogja's creative economy this month.</p>
            </div>
          </div>
        </Glass>
      </div>

      {/* BOTTOM NAV — modern, glassmorphism */}
      <nav className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-white/40 bg-white/70 px-2 py-2 shadow-[0_20px_60px_-20px_rgba(44,44,44,0.3)] backdrop-blur-xl">
          {[
            { to: "/", I: Home, l: "Home" },
            { to: "/connect", I: Users, l: "Connect" },
            { to: "/work", I: Briefcase, l: "Work" },
            { to: "/feel", I: Zap, l: "Feel" },
            { to: "/me", I: UserIcon, l: "Me", active: true },
          ].map((it) => (
            <Link key={it.to} to={it.to} className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] transition ${
              it.active ? "bg-vibe-charcoal text-vibe-cream" : "text-vibe-charcoal/70 hover:text-vibe-charcoal"
            }`}>
              <it.I size={14} />
              <span className="hidden sm:inline">{it.l}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function MonthlyExpense() {
  const [housing, setHousing] = useState(2500000);
  const [food, setFood] = useState(1500000);
  const [transport, setTransport] = useState(500000);
  const [workspace, setWorkspace] = useState(800000);
  const total = housing + food + transport + workspace;
  return (
    <Glass>
      <SectionTitle icon={Wallet} title="Monthly Expense Simulation" hint="Adjust sliders to simulate living costs in Jogja." />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Housing" value={housing} setValue={setHousing} min={800000} max={6000000} step={100000} />
          <Slider label="Food" value={food} setValue={setFood} min={500000} max={4000000} step={100000} />
          <Slider label="Transport" value={transport} setValue={setTransport} min={100000} max={2000000} step={50000} />
          <Slider label="Workspace" value={workspace} setValue={setWorkspace} min={0} max={2500000} step={50000} />
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-vibe-charcoal to-[#3a3530] p-6 text-vibe-cream">
          <p className="text-[10px] uppercase tracking-[0.25em] text-vibe-clay">Estimated total</p>
          <AnimatedTotal value={total} />
          <div className="mt-5 space-y-1.5 text-[12px]">
            {[["Housing", housing], ["Food", food], ["Transport", transport], ["Workspace", workspace]].map(([l, v]) => (
              <div key={l as string} className="flex justify-between border-b border-vibe-cream/15 py-1.5">
                <span className="opacity-70">{l}</span>
                <span>Rp {(v as number).toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Glass>
  );
}

function Slider({ label, value, setValue, min, max, step }: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-vibe-charcoal">
        <span className="font-medium">{label}</span>
        <span className="text-vibe-charcoal/70">Rp {value.toLocaleString("id-ID")}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-3 w-full accent-vibe-terracotta" />
    </div>
  );
}

function AnimatedTotal({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 80, damping: 18 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    spring.set(value);
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [value, spring]);
  useTransform(spring, (v) => v);
  return <p className="mt-3 font-display text-4xl text-vibe-cream md:text-5xl">Rp {display.toLocaleString("id-ID")}</p>;
}

