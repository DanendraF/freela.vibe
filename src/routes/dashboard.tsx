import { createFileRoute } from "@tanstack/react-router";
import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { MotionSection } from "@/components/MotionSection";
import { Sparkles, TrendingUp, Users, Building2, MessageCircle, AlertTriangle, Brain } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Talent Intelligence Dashboard — Freela.Vibe" },
      { name: "description", content: "Smart city insights for Yogyakarta government." },
    ],
  }),
  component: Dashboard,
});

// 1. Ecosystem KPI summary
const kpis = [
  { label: "Active Registered Freelancers", value: 12480, suffix: "", delta: "+18% QoQ" },
  { label: "City Pass Revenue Projection", value: 1340, suffix: "M", delta: "+24% QoQ" },
  { label: "Facilitated Projects", value: 3204, suffix: "", delta: "+9% QoQ" },
  { label: "Freelancer Retention 90d", value: 78, suffix: "%", delta: "+6% QoQ" },
];

// 2. Freelancer growth (registered vs active)
const growth = [
  { m: "Sep", reg: 60, act: 38 },
  { m: "Oct", reg: 75, act: 50 },
  { m: "Nov", reg: 92, act: 64 },
  { m: "Dec", reg: 110, act: 78 },
  { m: "Jan", reg: 128, act: 90 },
  { m: "Feb", reg: 150, act: 108 },
  { m: "Mar", reg: 175, act: 128 },
];

// 3. Creative economy movement (project volume per sector)
const sectors = [
  { name: "UI / UX", v: 720, color: "#C96A3A" },
  { name: "Content & Copy", v: 612, color: "#E8B57F" },
  { name: "Photography", v: 488, color: "#A8C5A0" },
  { name: "Branding", v: 422, color: "#D9A441" },
  { name: "Web Dev", v: 540, color: "#7FA8C9" },
  { name: "Motion & Video", v: 268, color: "#B58FC9" },
];

// 4. Skill distribution
const skills = [
  { name: "Web & Frontend Dev", v: 82 },
  { name: "Brand & Visual Design", v: 74 },
  { name: "Content & Copy", v: 66 },
  { name: "Photo & Video", v: 58 },
  { name: "Motion & 3D", v: 41 },
  { name: "Strategy & PM", v: 35 },
];

// 5. Coworking demand (occupancy)
const coworking = [
  { name: "Lippo Plaza Hub", occ: 92 },
  { name: "Antologi Collaboraction", occ: 88 },
  { name: "Greenhost Boutique", occ: 81 },
  { name: "GIK UGM Coworking", occ: 76 },
  { name: "Kotabaru Workspace", occ: 64 },
  { name: "Loka Coworking", occ: 58 },
];

// 6. Community activity (Jogja Pulse)
const pulseTopics = [
  { topic: "Night public transportation", vol: 1240, sentiment: "neg" },
  { topic: "Free public coworking", vol: 980, sentiment: "pos" },
  { topic: "Boarding house affordability", vol: 870, sentiment: "neg" },
  { topic: "Monthly cultural events", vol: 760, sentiment: "pos" },
  { topic: "Internet in suburban areas", vol: 540, sentiment: "neg" },
  { topic: "Upskilling training", vol: 460, sentiment: "pos" },
];

// 7. Freelancer pain points (real-time survey)
const painPoints = [
  { label: "Professional isolation", v: 84 },
  { label: "Unstable income", v: 71 },
  { label: "Lack of tax understanding", v: 58 },
  { label: "Contracts without protection", v: 49 },
  { label: "Access to funding", v: 42 },
  { label: "Healthcare access", v: 38 },
];

// 8. AI Insights
const insights = [
  {
    tag: "Workspace Policy",
    text: "Occupancy of 5 out of 6 tier-1 coworkings exceeds 75%. Consider subsidizing 3 new public coworkings in south Sleman & north Bantul.",
  },
  {
    tag: "Upskilling Program",
    text: "Motion & 3D sector grew 32% YoY but only 41% of freelancers have this skill. Open Motion Designer training scholarships in Q3.",
  },
  {
    tag: "Civic Response",
    text: "Topic 'Night public transportation' (1,240 votes, negative sentiment) is dominant among creative freelancers. Trial night Trans Jogja 22:00–01:00 on the Malioboro–UGM corridor.",
  },
  {
    tag: "Fiscal & Education",
    text: "58% of freelancers don't understand taxes. Collaborate with DJP DIY for an in-app tax module + City Pass incentive for the first year.",
  },
];

function Dashboard() {
  return (
    <section className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 text-vibe-cream">
      <div className="mx-auto max-w-7xl px-6">
        <MotionSection>
          <div className="inline-flex items-center gap-2 rounded-full border border-vibe-clay/40 bg-vibe-clay/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-vibe-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-vibe-clay" />
            Yogyakarta City Government · Internal View
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-vibe-clay">Talent Intelligence</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl">Yogyakarta Creative Pulse</h1>
          <p className="mt-4 max-w-2xl text-vibe-cream/60">
            Dashboard for the Department of Tourism, Communication & Information Technology, & Bappeda of Yogyakarta City. Anonymous aggregate
            data from Freela.Vibe users — flowing to the city government for smart city planning.
          </p>
        </MotionSection>

        {/* 1. Ecosystem KPI */}
        <BlockHeader icon={<Sparkles size={14} />} num="01" title="Ecosystem Summary" />
        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <MotionSection key={k.label} delay={i * 0.05}>
              <div className="rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-vibe-cream/50">{k.label}</p>
                <Counter value={k.value} suffix={k.suffix} />
                <p className="mt-1 text-xs text-vibe-mint">{k.delta}</p>
              </div>
            </MotionSection>
          ))}
        </div>

        {/* 2. Freelancer growth */}
        <BlockHeader icon={<TrendingUp size={14} />} num="02" title="Freelancer Growth" />
        <MotionSection>
          <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-vibe-cream/60">
              <Legend color="#C96A3A" label="Registered" />
              <Legend color="#A8C5A0" label="Active (≥1 project / 30d)" />
            </div>
            <GrowthChart />
            <div className="mt-2 flex justify-between text-xs text-vibe-cream/50">
              {growth.map((g) => <span key={g.m}>{g.m}</span>)}
            </div>
          </div>
        </MotionSection>

        {/* 3 & 4. Creative economy & Skill distribution */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <BlockHeader icon={<TrendingUp size={14} />} num="03" title="Creative Economy Movement" />
            <MotionSection>
              <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
                <p className="text-xs text-vibe-cream/50">Project volume per sector (90 days)</p>
                <div className="mt-5 space-y-3">
                  {sectors.map((s, i) => {
                    const max = Math.max(...sectors.map((x) => x.v));
                    return (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs text-vibe-cream/70">
                          <span>{s.name}</span>
                          <span>{s.v} projects</span>
                        </div>
                        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-vibe-cream/10">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: s.color, transformOrigin: "left", width: "100%" }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: s.v / max }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.06 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MotionSection>
          </div>

          <div>
            <BlockHeader icon={<Users size={14} />} num="04" title="Skill Distribution" />
            <MotionSection delay={0.05}>
              <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
                <p className="text-xs text-vibe-cream/50">Planning basis for city upskilling programs</p>
                <div className="mt-5 space-y-4">
                  {skills.map((s, i) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-xs text-vibe-cream/70">
                        <span>{s.name}</span>
                        <span>{s.v}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-vibe-cream/10">
                        <motion.div
                          className="h-full rounded-full bg-vibe-terracotta"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: s.v / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08 }}
                          style={{ transformOrigin: "left", width: "100%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>
        </div>

        {/* 5. Coworking demand */}
        <BlockHeader icon={<Building2 size={14} />} num="05" title="Coworking Demand" />
        <MotionSection>
          <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
            <p className="text-xs text-vibe-cream/50">
              7-day average occupancy · public workspace need indicator
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              {coworking.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-vibe-cream/10 bg-vibe-cream/[0.04] p-4"
                >
                  <p className="text-sm">{c.name}</p>
                  <p className="mt-2 font-display text-3xl text-vibe-cream">{c.occ}%</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-vibe-cream/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: c.occ > 85 ? "#C96A3A" : c.occ > 70 ? "#D9A441" : "#A8C5A0",
                        transformOrigin: "left",
                        width: "100%",
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: c.occ / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-vibe-cream/50">
                    {c.occ > 85 ? "Overdemand" : c.occ > 70 ? "Optimal" : "Available"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* 6 & 7. Jogja Pulse & Pain points */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div>
            <BlockHeader icon={<MessageCircle size={14} />} num="06" title="Community Activity · Jogja Pulse" />
            <MotionSection>
              <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
                <p className="text-xs text-vibe-cream/50">Top topics voiced by citizens in 30 days</p>
                <div className="mt-5 space-y-3">
                  {pulseTopics.map((t, i) => (
                    <motion.div
                      key={t.topic}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-vibe-cream/10 bg-vibe-cream/[0.04] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            t.sentiment === "pos" ? "bg-vibe-mint" : "bg-vibe-clay"
                          }`}
                        />
                        <p className="text-sm">{t.topic}</p>
                      </div>
                      <p className="text-xs text-vibe-cream/60">{t.vol.toLocaleString("en-US")} votes</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>

          <div>
            <BlockHeader icon={<AlertTriangle size={14} />} num="07" title="Freelancer Pain Points" />
            <MotionSection delay={0.05}>
              <div className="mt-4 rounded-3xl border border-vibe-cream/10 bg-vibe-cream/[0.03] p-6">
                <p className="text-xs text-vibe-cream/50">
                  Real-time user survey · n = 2,418 active freelancers
                </p>
                <div className="mt-5 space-y-4">
                  {painPoints.map((p, i) => (
                    <div key={p.label}>
                      <div className="flex justify-between text-xs text-vibe-cream/70">
                        <span>{p.label}</span>
                        <span className="font-medium text-vibe-clay">{p.v}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-vibe-cream/10">
                        <motion.div
                          className="h-full rounded-full bg-vibe-clay"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: p.v / 100 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.08 }}
                          style={{ transformOrigin: "left", width: "100%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>
        </div>

        {/* 8. AI Insights */}
        <BlockHeader icon={<Brain size={14} />} num="08" title="AI Insights — Civic Talent Graph" />
        <MotionSection>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {insights.map((ins, i) => (
              <motion.div
                key={ins.tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl border border-vibe-mint/30 bg-gradient-to-br from-vibe-mint/[0.06] to-transparent p-6"
              >
                <div className="flex items-center gap-2">
                  <Brain size={14} className="text-vibe-mint" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-vibe-mint">
                    {ins.tag}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-vibe-cream/85">{ins.text}</p>
                <button className="mt-4 text-xs text-vibe-mint underline-offset-4 hover:underline">
                  Follow up →
                </button>
              </motion.div>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}

function BlockHeader({ icon, num, title }: { icon: React.ReactNode; num: string; title: string }) {
  return (
    <div className="mt-12 flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.22em] text-vibe-cream/40">{num}</span>
      <span className="h-px flex-1 bg-vibe-cream/10" />
      <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-vibe-cream/70">
        {icon}
        {title}
      </span>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function GrowthChart() {
  const W = 600;
  const H = 180;
  const max = Math.max(...growth.map((g) => g.reg));
  const xs = (i: number) => (i * W) / (growth.length - 1);
  const ys = (v: number) => H - (v / max) * (H - 20) - 10;
  const line = (key: "reg" | "act") =>
    growth.map((g, i) => `${i === 0 ? "M" : "L"} ${xs(i)} ${ys(g[key])}`).join(" ");
  const area = (key: "reg" | "act") =>
    `${line(key)} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 w-full">
      <motion.path
        d={area("reg")}
        fill="#C96A3A"
        opacity="0.12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      />
      <motion.path
        d={line("reg")}
        fill="none"
        stroke="#C96A3A"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
      />
      <motion.path
        d={line("act")}
        fill="none"
        stroke="#A8C5A0"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.2 }}
      />
      {growth.map((g, i) => (
        <g key={g.m}>
          <circle cx={xs(i)} cy={ys(g.reg)} r="3.5" fill="#C96A3A" />
          <circle cx={xs(i)} cy={ys(g.act)} r="3.5" fill="#A8C5A0" />
        </g>
      ))}
    </svg>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const [d, setD] = useState(0);
  useEffect(() => {
    spring.set(value);
    return spring.on("change", (v) => setD(Math.round(v)));
  }, [value, spring]);
  return (
    <p className="mt-3 font-display text-4xl text-vibe-cream md:text-5xl">
      {d.toLocaleString("en-US")}{suffix}
    </p>
  );
}
