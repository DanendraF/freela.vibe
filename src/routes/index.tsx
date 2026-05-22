import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Users, Briefcase, Heart, ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { VibeCard } from "@/components/VibeCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Freela.Vibe — Grow, connect, belong in Yogyakarta" },
      { name: "description", content: "Civic talent ecosystem for Gen Z freelancers in Yogyakarta. Arrive, connect, create, and feel at home." },
    ],
  }),
  component: Landing,
});

const testimonials = [
  { name: "Rara", skill: "UI Designer", quote: "Moving to Jogja feels so much lighter. The community is incredibly warm." },
  { name: "Bima", skill: "Web Dev", quote: "The coworking space in Prawirotaman has become my second office." },
  { name: "Nayla", skill: "Content Creator", quote: "From afternoon coffee to project collaborations — everything flows naturally." },
  { name: "Dimas", skill: "Brand Strategist", quote: "The cost of living makes sense, and the quality of life levels up." },
  { name: "Sasha", skill: "Illustrator", quote: "Vibe Match found me the perfect project partner." },
  { name: "Reno", skill: "Motion Designer", quote: "Jogja has a rhythm that's really friendly for freelancers." },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <FeatureGrid />
      <EcosystemFlow />
      <Marquee />
      <CTAFooter />
    </>
  );
}

function Hero() {
  return (
    <section className="grain relative min-h-screen overflow-hidden bg-vibe-cream pt-32 pb-20 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8">
        <motion.div
          className="md:col-span-7"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 2.6 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium uppercase tracking-[0.28em] text-vibe-terracotta"
          >
            Yogyakarta Creative Ecosystem
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-6xl leading-[0.95] text-vibe-charcoal sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            Grow.<br />
            Connect.<br />
            <span className="relative inline-block">
              Belong.
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 300 16"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 Q 50 2 100 8 T 200 8 T 298 8"
                  stroke="#C96A3A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 3.5, duration: 1.2, ease: "easeOut" }}
                />
              </svg>
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="md:col-span-5 md:pt-32 flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          <p className="text-base text-vibe-charcoal/75 md:text-lg">
            Freela.Vibe is an ecosystem for Gen Z freelancers looking to make Jogja their second home.
          </p>
          <Link
            to="/arrive"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-vibe-terracotta px-7 py-4 text-sm font-medium text-vibe-cream shadow-[0_10px_30px_-10px_rgba(201,106,58,0.6)] transition-all hover:scale-[1.04] hover:shadow-[0_18px_40px_-12px_rgba(201,106,58,0.7)]"
          >
            Start Your Journey
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <FloatingCards />
        </motion.div>
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const } },
};

function FloatingCards() {
  const items = [
    { label: "Arrive", color: "#A8C5A0", icon: MapPin },
    { label: "Connect", color: "#B8A9D4", icon: Users },
    { label: "Work", color: "#D4956A", icon: Briefcase },
    { label: "Feel", color: "#E8DDD0", icon: Heart },
  ];
  const leftClasses = ["md:left-[0%]", "md:left-[18%]", "md:left-[36%]", "md:left-[54%]"];
  const topClasses = ["md:top-[0px]", "md:top-[22px]", "md:top-[44px]", "md:top-[66px]"];

  return (
    <div className="relative mt-8 flex flex-wrap gap-3 md:mt-6 md:block md:h-48">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <motion.div
            key={it.label}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_18px_40px_-20px_rgba(44,44,44,0.35)] md:absolute ${leftClasses[i]} ${topClasses[i]}`}
            style={{ backgroundColor: it.color }}
            initial={{ opacity: 0, y: 20, rotate: -4 + i * 2 }}
            animate={{ opacity: 1, y: [0, -10, 0], rotate: -4 + i * 2 }}
            transition={{
              opacity: { delay: 3.4 + i * 0.15, duration: 0.6 },
              y: { delay: 3.4 + i * 0.2, duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon size={16} />
            <span className="text-xs font-medium">{it.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function FeatureGrid() {
  return (
    <section className="bg-vibe-cream py-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <MotionSection>
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Four Pillars</p>
          <h2 className="mt-3 max-w-2xl font-display text-5xl text-vibe-charcoal md:text-6xl">
            Everything you need to create in Jogja.
          </h2>
        </MotionSection>
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          <MotionSection delay={0.05}>
            <VibeCard title="Arrive" subtitle="Come and experience" Icon={MapPin} bg="#A8C5A0"
              features={["City Onboarding Kit", "Living Cost Estimator", "Digital City Pass"]} />
          </MotionSection>
          <MotionSection delay={0.15}>
            <VibeCard title="Connect" subtitle="Find your community" Icon={Users} bg="#B8A9D4"
              features={["Vibe Match", "Networking Events", "Collaboration Finder"]} />
          </MotionSection>
          <MotionSection delay={0.25}>
            <VibeCard title="Work" subtitle="Build your craft" Icon={Briefcase} bg="#D4956A"
              features={["Talent Opportunity Hub", "Coworking Finder", "AI Project Match"]} />
          </MotionSection>
          <MotionSection delay={0.35}>
            <VibeCard title="Feel Included" subtitle="Feel at home" Icon={Heart} bg="#E8DDD0"
              features={["Vibe Board", "Jogja Pulse", "Civic Feedback"]} />
          </MotionSection>
        </div>
      </div>
    </section>
  );
}

const flowSteps = [
  { n: 1, title: "Sign up", desc: "Create your profile & vibe" },
  { n: 2, title: "Vibe Match", desc: "Communities & compatible collaborators" },
  { n: 3, title: "Onboarding Kit", desc: "Guide to living in Jogja" },
  { n: 4, title: "Project & Coworking", desc: "Find work, find space" },
  { n: 5, title: "Civic Pulse", desc: "Your voice heard by the city" },
  { n: 6, title: "Insights", desc: "Data turns into recommendations" },
  { n: 7, title: "Belong", desc: "Jogja becomes home" },
];

function EcosystemFlow() {
  return (
    <section className="bg-vibe-warm py-28">
      <div className="mx-auto max-w-5xl px-6">
        <MotionSection>
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Ecosystem flow</p>
          <h2 className="mt-3 font-display text-5xl text-vibe-charcoal md:text-6xl">
            Seven steps, two outcomes.
          </h2>
        </MotionSection>
        <div className="relative mt-14">
          <div className="absolute left-6 top-0 h-full w-px bg-vibe-charcoal/15 md:left-1/2" />
          <div className="space-y-8">
            {flowSteps.map((s, i) => (
              <MotionSection key={s.n} delay={i * 0.05}>
                <div className={`relative flex flex-col gap-4 md:flex-row ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="md:w-1/2 md:px-8">
                    <div className="rounded-2xl bg-white p-6 shadow-[0_12px_30px_-18px_rgba(44,44,44,0.3)]">
                      <div className="text-xs font-medium uppercase tracking-[0.2em] text-vibe-terracotta">
                        Step 0{s.n}
                      </div>
                      <h3 className="mt-2 font-display text-2xl text-vibe-charcoal">{s.title}</h3>
                      <p className="mt-1 text-sm text-vibe-charcoal/70">{s.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2">
                    <div className="h-3 w-3 rounded-full bg-vibe-terracotta ring-4 ring-vibe-warm" />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </MotionSection>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <MotionSection>
              <div className="rounded-3xl bg-vibe-sage p-8">
                <p className="text-xs uppercase tracking-[0.2em] opacity-70">For freelancers</p>
                <h4 className="mt-2 font-display text-3xl">Grow, connect, belong</h4>
              </div>
            </MotionSection>
            <MotionSection delay={0.1}>
              <div className="rounded-3xl bg-vibe-lavender p-8">
                <p className="text-xs uppercase tracking-[0.2em] opacity-70">For government</p>
                <h4 className="mt-2 font-display text-3xl">Smart city insights</h4>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...testimonials, ...testimonials];
  return (
    <section className="overflow-hidden bg-vibe-cream py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <MotionSection>
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Vibe snippets</p>
          <h2 className="mt-3 font-display text-5xl text-vibe-charcoal md:text-6xl">
            Voices from the community.
          </h2>
        </MotionSection>
      </div>
      <div className="mt-12 overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {items.map((t, i) => (
            <div
              key={i}
              className="flex w-80 shrink-0 flex-col gap-3 rounded-3xl border border-vibe-charcoal/8 bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vibe-warm font-display text-vibe-terracotta">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-vibe-charcoal">{t.name}</p>
                  <p className="text-xs text-vibe-charcoal/60">{t.skill}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-vibe-charcoal/80">"{t.quote}"</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <section className="relative overflow-hidden bg-vibe-charcoal py-32 text-vibe-cream">
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="batik" width="80" height="80" patternUnits="userSpaceOnUse">
            <motion.path
              d="M40 0 L80 40 L40 80 L0 40 Z M40 20 L60 40 L40 60 L20 40 Z"
              fill="none"
              stroke="#C96A3A"
              strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "40px 40px" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#batik)" />
      </svg>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <MotionSection>
          <h2 className="font-display text-6xl leading-[0.95] md:text-8xl">
            Yogyakarta<br />is waiting for you.
          </h2>
        </MotionSection>
        <MotionSection delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/arrive"
              className="rounded-full bg-vibe-terracotta px-7 py-4 text-sm font-medium text-vibe-cream transition-transform hover:scale-[1.04]"
            >
              Sign Up For Free
            </Link>
            <Link
              to="/dashboard"
              className="rounded-full border border-vibe-cream/40 px-7 py-4 text-sm font-medium text-vibe-cream transition-colors hover:bg-vibe-cream hover:text-vibe-charcoal"
            >
              View City Dashboard
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
