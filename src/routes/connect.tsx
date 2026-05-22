import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MotionSection } from "@/components/MotionSection";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Freela.Vibe" },
      { name: "description", content: "Vibe Match & networking events for Jogja freelancers." },
    ],
  }),
  component: ConnectPage,
});

const tagGroups = {
  Skills: ["UI/UX", "Web Dev", "Copywriting", "Branding", "Photography", "Motion"],
  Lifestyle: ["Morning person", "Night owl", "Coffee lover", "Outdoor", "Bookworm", "Foodie"],
  "Work Style": ["Solo deep work", "Collaborative", "Async", "In-person", "Remote-first"],
};

const matches = [
  { name: "Aldi", skill: "Brand Designer", score: 92, vibe: "Coffee lover · Async" },
  { name: "Mira", skill: "Frontend Dev", score: 87, vibe: "Night owl · Collab" },
  { name: "Raka", skill: "Photographer", score: 81, vibe: "Outdoor · Solo deep work" },
];

const events = [
  { date: "12 Mar", type: "Workshop", title: "Branding for Indie Creators", host: "Hyperakea" },
  { date: "18 Mar", type: "Meetup", title: "Freelancer Coffee Sunday", host: "Klinik Kopi" },
  { date: "24 Mar", type: "Talk", title: "Civic Tech & Communities", host: "Gandeng Tangan" },
  { date: "02 Apr", type: "Hackday", title: "Make Something for Jogja", host: "Code.id" },
];

function ConnectPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (t: string) => {
    const n = new Set(selected);
    n.has(t) ? n.delete(t) : n.add(t);
    setSelected(n);
  };

  return (
    <>
      <section className="grain relative overflow-hidden bg-gradient-to-b from-vibe-lavender to-[#cdc0e0] pt-36 pb-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <p className="text-xs uppercase tracking-[0.28em] text-vibe-charcoal/70">Connect</p>
          <h1 className="mt-3 font-display text-6xl text-vibe-charcoal md:text-8xl">
            Can I find my people?
          </h1>
          <p className="mt-6 max-w-xl text-vibe-charcoal/80">
            Vibe Match finds collaborators and communities that align with your working rhythm.
          </p>
        </div>
      </section>

      <section className="bg-vibe-cream py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <h2 className="font-display text-4xl text-vibe-charcoal md:text-5xl">Vibe Match</h2>
            <p className="mt-2 text-vibe-charcoal/70">Select tags that describe you.</p>
          </MotionSection>
          <div className="mt-10 grid grid-cols-1 gap-8 rounded-[2rem] bg-white/60 p-8 shadow-sm backdrop-blur-md md:grid-cols-3 md:p-10">
            {Object.entries(tagGroups).map(([group, tags]) => (
              <div key={group} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-vibe-charcoal/10"></span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vibe-charcoal/50">{group}</p>
                  <span className="h-px flex-1 bg-vibe-charcoal/10"></span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {tags.map((t) => {
                    const active = selected.has(t);
                    return (
                      <motion.button
                        key={t}
                        onClick={() => toggle(t)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                          active
                            ? "border-vibe-terracotta bg-vibe-terracotta text-vibe-cream shadow-lg shadow-vibe-terracotta/30"
                            : "border-transparent bg-white text-vibe-charcoal shadow-sm hover:border-vibe-charcoal/10 hover:shadow-md"
                        }`}
                      >
                        {t}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {selected.size >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-vibe-terracotta">Match found</p>
                <h3 className="mt-2 font-display text-3xl text-vibe-charcoal">Vibes that match you</h3>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {matches.map((m, i) => (
                    <motion.div
                      key={m.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-3xl bg-white p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vibe-lavender font-display text-xl text-vibe-charcoal">
                          {m.name[0]}
                        </div>
                        <span className="rounded-full bg-vibe-mint px-2 py-1 text-xs font-medium text-vibe-charcoal">
                          {m.score}% match
                        </span>
                      </div>
                      <p className="mt-4 font-display text-xl text-vibe-charcoal">{m.name}</p>
                      <p className="text-sm text-vibe-charcoal/70">{m.skill}</p>
                      <p className="mt-2 text-xs text-vibe-charcoal/60">{m.vibe}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="bg-[#f1ece2] py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Community</p>
            <h2 className="mt-2 font-display text-4xl text-vibe-charcoal md:text-5xl">
              Communities you can join
            </h2>
            <p className="mt-3 max-w-xl text-vibe-charcoal/70">
              Study circles, sharing sessions, and coffee runs with Jogja freelancers — pick the ones that match your rhythm.
            </p>
          </MotionSection>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Jogja Designers Circle", focus: "UI/UX · Branding", members: 412, vibe: "Weekly critique sessions", tag: "Design" },
              { name: "Code in Kopi", focus: "Web & Mobile Dev", members: 538, vibe: "Pair coding every Friday afternoon", tag: "Tech" },
              { name: "Pena Lepas", focus: "Writer & Content Creator", members: 289, vibe: "Writing sprint + review", tag: "Words" },
              { name: "Frame Yogyakarta", focus: "Photography & Videography", members: 364, vibe: "Monthly photo walks", tag: "Visual" },
              { name: "Freelance Finance Club", focus: "Taxes, invoices, cashflow", members: 198, vibe: "Free tax consultation", tag: "Money" },
              { name: "Slow Mornings JOG", focus: "Wellbeing & lifestyle", members: 221, vibe: "Saturday morning yoga + journaling", tag: "Wellbeing" },
            ].map((c, i) => (
              <MotionSection key={c.name} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-3xl border border-vibe-charcoal/10 bg-white/70 p-6 backdrop-blur-md">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vibe-lavender font-display text-xl text-vibe-charcoal">
                      {c.name[0]}
                    </div>
                    <span className="rounded-full bg-vibe-mint/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-vibe-charcoal">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-vibe-charcoal">{c.name}</h3>
                  <p className="text-sm text-vibe-charcoal/70">{c.focus}</p>
                  <p className="mt-3 text-xs text-vibe-charcoal/60">{c.vibe}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="text-xs text-vibe-charcoal/60">{c.members} members</span>
                    <button className="rounded-full bg-vibe-charcoal px-4 py-1.5 text-xs font-medium text-vibe-cream hover:bg-vibe-terracotta">
                      Join
                    </button>
                  </div>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibe-warm py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <MotionSection>
            <h2 className="font-display text-4xl text-vibe-charcoal md:text-5xl">Networking Events</h2>
          </MotionSection>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {events.map((e, i) => (
              <MotionSection key={e.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-3xl bg-white p-6">
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-vibe-charcoal px-3 py-1.5 text-xs font-medium text-vibe-cream">
                      {e.date}
                    </div>
                    <span className="text-xs uppercase tracking-[0.18em] text-vibe-terracotta">{e.type}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-vibe-charcoal">{e.title}</h3>
                  <p className="mt-1 text-sm text-vibe-charcoal/60">by {e.host}</p>
                  <button className="mt-auto pt-6 text-left text-sm font-medium text-vibe-terracotta hover:underline">
                    RSVP →
                  </button>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
