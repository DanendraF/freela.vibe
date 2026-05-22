import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { useAuth, type OnboardingData } from "@/lib/auth";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Onboarding — Freela.Vibe" }] }),
  component: OnboardingPage,
});

const AGE_RANGES = ["18–22", "23–27", "28–32", "33–40", "40+"];
const PROFESSIONS = ["UI/UX Designer", "Web Developer", "Content Writer", "Photographer", "Videographer", "Brand Strategist", "Illustrator", "Product Manager"];
const EXPERIENCE = ["Junior (0–2 yrs)", "Mid (2–5 yrs)", "Senior (5+ yrs)", "Lead / Founder"];

const WORK_STYLES = ["Deep focus solo", "Async collaborative", "Daily sync team", "Hybrid project-based"];
const WORKSPACES = ["Home / room", "Cafe", "Coworking", "Outdoor / park", "Collective studio"];
const PRODUCTIVE_HOURS = ["Morning (5–11)", "Afternoon (11–16)", "Evening (16–20)", "Night (20–02)"];
const LIFESTYLE = ["Quiet", "Social", "Outdoorsy", "Foodie", "Coffee", "Music", "Art", "Sport"];

const GOALS = ["Find local clients", "Build portfolio", "Join collective", "Explore city & culture", "Stabilize income", "Career pivot"];
const CHALLENGES = ["Professional isolation", "Unstable income", "Taxes & legal", "Hard to find clients", "Burnout", "Workspace access"];
const OPPORTUNITIES = ["SME Projects", "Civic / gov", "National brands", "Startup", "NGO & community", "International remote"];

const COMMUNITIES = ["Designer", "Developer", "Writer", "Photographer", "Civic tech", "Sustainability", "Music", "Film"];
const EVENT_PREFS = ["Workshop", "Casual meetup", "Hackathon", "Exhibition", "Open mic", "Conference"];
const COLLAB_STYLES = ["Lone wolf", "Duo / pair", "Small squad (3–5)", "Open collective"];

const BUDGETS = ["< 3M", "3–5M", "5–8M", "8–15M", "> 15M"];
const TRANSPORT = ["Personal motorbike", "Bicycle", "Ride-hailing", "Walking", "Public transit"];
const HOUSING = ["Solo room", "Premium room", "Rented house", "Co-living", "Long-term hotel"];

const empty: OnboardingData = {
  fullName: "", ageRange: "", originCity: "", profession: "", experienceLevel: "",
  workStyle: "", workspace: "", productiveHours: "", lifestyle: [],
  mainGoal: "", challenges: [], opportunities: [],
  communityInterests: [], eventPrefs: [], collabStyle: "",
  monthlyBudget: "", transport: "", housing: "",
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs transition ${
        active ? "border-vibe-terracotta bg-vibe-terracotta text-vibe-cream" : "border-vibe-charcoal/15 hover:border-vibe-terracotta/60"
      }`}>
      {active && <Check size={12} />}{children}
    </button>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-vibe-charcoal/70">{label}</label>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({ ...empty, fullName: user?.name ?? "" });

  const toggle = (k: keyof OnboardingData, v: string) => setData((d) => {
    const arr = d[k] as string[];
    return { ...d, [k]: arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v] };
  });

  const totalSteps = 5;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const finish = () => { completeOnboarding(data); navigate({ to: "/me" }); };

  const canNext = (() => {
    if (step === 0) return data.fullName.trim() && data.ageRange && data.originCity.trim() && data.profession && data.experienceLevel;
    if (step === 1) return data.workStyle && data.workspace && data.productiveHours && data.lifestyle.length >= 1;
    if (step === 2) return data.mainGoal && data.challenges.length >= 1 && data.opportunities.length >= 1;
    if (step === 3) return data.communityInterests.length >= 1 && data.eventPrefs.length >= 1 && data.collabStyle;
    if (step === 4) return data.monthlyBudget && data.transport && data.housing;
    return false;
  })();

  const stepTitles = ["Basic Profile", "Work Style & Lifestyle", "Goals & Needs", "City & Community", "City Setup"];

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-gradient-to-br from-vibe-cream via-vibe-warm to-vibe-clay px-6 pt-24 pb-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Step {step + 1} / {totalSteps}</p>
        <h1 className="mt-2 font-display text-4xl text-vibe-charcoal md:text-5xl">{stepTitles[step]}</h1>

        <div className="mt-6 flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-vibe-terracotta" : "bg-vibe-charcoal/15"}`} />
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white/85 p-6 backdrop-blur-xl md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="space-y-5">
              {step === 0 && (
                <>
                  <div>
                    <label className="text-xs text-vibe-charcoal/70">Full name</label>
                    <input value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
                  </div>
                  <Field label="Age range">
                    {AGE_RANGES.map((v) => <Chip key={v} active={data.ageRange === v} onClick={() => setData({ ...data, ageRange: v })}>{v}</Chip>)}
                  </Field>
                  <div>
                    <label className="text-xs text-vibe-charcoal/70">Origin city</label>
                    <input value={data.originCity} onChange={(e) => setData({ ...data, originCity: e.target.value })} placeholder="Bandung, Surabaya, …"
                      className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
                  </div>
                  <Field label="Profession">
                    {PROFESSIONS.map((v) => <Chip key={v} active={data.profession === v} onClick={() => setData({ ...data, profession: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Experience level">
                    {EXPERIENCE.map((v) => <Chip key={v} active={data.experienceLevel === v} onClick={() => setData({ ...data, experienceLevel: v })}>{v}</Chip>)}
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Work style">
                    {WORK_STYLES.map((v) => <Chip key={v} active={data.workStyle === v} onClick={() => setData({ ...data, workStyle: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Favorite workspace">
                    {WORKSPACES.map((v) => <Chip key={v} active={data.workspace === v} onClick={() => setData({ ...data, workspace: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Productive hours">
                    {PRODUCTIVE_HOURS.map((v) => <Chip key={v} active={data.productiveHours === v} onClick={() => setData({ ...data, productiveHours: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Lifestyle preferences (select multiple)">
                    {LIFESTYLE.map((v) => <Chip key={v} active={data.lifestyle.includes(v)} onClick={() => toggle("lifestyle", v)}>{v}</Chip>)}
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field label="Main goal in Yogyakarta">
                    {GOALS.map((v) => <Chip key={v} active={data.mainGoal === v} onClick={() => setData({ ...data, mainGoal: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Freelancer challenges (select multiple)">
                    {CHALLENGES.map((v) => <Chip key={v} active={data.challenges.includes(v)} onClick={() => toggle("challenges", v)}>{v}</Chip>)}
                  </Field>
                  <Field label="Opportunities of interest (select multiple)">
                    {OPPORTUNITIES.map((v) => <Chip key={v} active={data.opportunities.includes(v)} onClick={() => toggle("opportunities", v)}>{v}</Chip>)}
                  </Field>
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Community interests (select multiple)">
                    {COMMUNITIES.map((v) => <Chip key={v} active={data.communityInterests.includes(v)} onClick={() => toggle("communityInterests", v)}>{v}</Chip>)}
                  </Field>
                  <Field label="Event preferences (select multiple)">
                    {EVENT_PREFS.map((v) => <Chip key={v} active={data.eventPrefs.includes(v)} onClick={() => toggle("eventPrefs", v)}>{v}</Chip>)}
                  </Field>
                  <Field label="Collaboration style">
                    {COLLAB_STYLES.map((v) => <Chip key={v} active={data.collabStyle === v} onClick={() => setData({ ...data, collabStyle: v })}>{v}</Chip>)}
                  </Field>
                </>
              )}

              {step === 4 && (
                <>
                  <Field label="Monthly budget">
                    {BUDGETS.map((v) => <Chip key={v} active={data.monthlyBudget === v} onClick={() => setData({ ...data, monthlyBudget: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Transport preference">
                    {TRANSPORT.map((v) => <Chip key={v} active={data.transport === v} onClick={() => setData({ ...data, transport: v })}>{v}</Chip>)}
                  </Field>
                  <Field label="Housing type">
                    {HOUSING.map((v) => <Chip key={v} active={data.housing === v} onClick={() => setData({ ...data, housing: v })}>{v}</Chip>)}
                  </Field>
                  <div className="rounded-2xl bg-vibe-warm p-4 text-xs text-vibe-charcoal/80">
                    🎁 Once completed, you'll get a <strong>free 14-day Onboarding Kit</strong>: full access to Talent Hub, Coworking Finder, & Vibe Match.
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={back} disabled={step === 0} className="text-xs text-vibe-charcoal/60 disabled:opacity-30">← Back</button>
            {step < totalSteps - 1 ? (
              <button onClick={next} disabled={!canNext} className="rounded-full bg-vibe-charcoal px-5 py-2.5 text-xs font-medium text-vibe-cream disabled:opacity-30">Next →</button>
            ) : (
              <button onClick={finish} disabled={!canNext} className="rounded-full bg-vibe-terracotta px-5 py-2.5 text-xs font-medium text-vibe-cream disabled:opacity-30">Activate Onboarding Kit ✨</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
