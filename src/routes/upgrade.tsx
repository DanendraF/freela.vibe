import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Sparkles, Crown, Leaf } from "lucide-react";
import { useAuth, type PlanTier } from "@/lib/auth";

export const Route = createFileRoute("/upgrade")({
  head: () => ({ meta: [{ title: "Choose Plan — Freela.Vibe" }] }),
  component: UpgradePage,
});

const VILLAGE_PERKS = [
  "Basic access to Talent Hub (5 applications / month)",
  "Partner coworking booking (public price)",
  "Limited Vibe Match (3 intros / month)",
  "Weekly community event newsletter",
  "Basic contract templates",
];

const CITY_PERKS = [
  "Full access to Talent Hub — unlimited applications",
  "Priority booking at 30+ partner coworking spaces (25% discount)",
  "Unlimited Vibe Match + automatic intro to collectives",
  "Priority tickets to civic events + 20% discount",
  "Freelance micro-insurance (BPJS-TK collaboration)",
  "Tax assistant & premium contract templates",
  "Physical Digital City Pass + local partner QR vouchers",
];

const PLAN_PRICE: Record<PlanTier, number> = { village: 39, city: 89 };
const PLAN_LABEL: Record<PlanTier, string> = { village: "Village Pass", city: "Digital City Pass" };

function UpgradePage() {
  const { trialExpired, isPro, plan, upgradeToPro, trialDaysLeft } = useAuth();
  const navigate = useNavigate();
  const [picked, setPicked] = useState<PlanTier | null>(null);
  const [done, setDone] = useState(false);

  const confirm = () => {
    if (!picked) return;
    upgradeToPro(picked);
    setDone(true);
    setTimeout(() => navigate({ to: "/" }), 1400);
  };

  const headline = isPro
    ? `Active: ${plan ? PLAN_LABEL[plan] : "Pass"} ✨`
    : trialExpired
    ? "Trial expired — choose your plan"
    : "Choose your Freela.Vibe plan";

  const sub = isPro
    ? "Thank you for joining. Enjoy all your benefits."
    : trialExpired
    ? "Your Digital City Pass trial has ended. To continue, you must select a plan."
    : `Digital City Pass trial active — ${Math.max(trialDaysLeft, 0)} days left. Choose a plan before it expires.`;

  return (
    <div className="grain relative min-h-screen overflow-hidden bg-gradient-to-br from-vibe-charcoal via-[#3b2a22] to-vibe-terracotta px-6 pt-24 pb-16 text-vibe-cream">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.28em] text-vibe-clay">Membership</p>
        <h1 className="mt-3 font-display text-4xl md:text-6xl">{headline}</h1>
        <p className="mt-4 max-w-2xl text-vibe-cream/80">{sub}</p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Village Pass */}
          <div className="rounded-3xl bg-vibe-cream/5 p-6 ring-1 ring-vibe-cream/10 backdrop-blur">
            <div className="flex items-center gap-2 text-vibe-clay">
              <Leaf size={16} />
              <p className="text-xs uppercase tracking-[0.2em]">Village Pass</p>
            </div>
            <p className="mt-3 font-display text-4xl text-vibe-cream">
              Rp 39k<span className="text-base text-vibe-cream/60"> /month</span>
            </p>
            <p className="mt-2 text-sm text-vibe-cream/70">
              Essential for freelancers just starting out in the ecosystem.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-vibe-cream/85">
              {VILLAGE_PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-vibe-sage" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {!isPro && (
              <button
                onClick={() => setPicked("village")}
                className="mt-6 w-full rounded-full border border-vibe-cream/30 px-5 py-3 text-sm font-medium text-vibe-cream hover:bg-vibe-cream/10"
              >
                Choose Village Pass
              </button>
            )}
            {isPro && plan === "village" && (
              <p className="mt-6 text-xs uppercase tracking-wider text-vibe-sage">Active plan</p>
            )}
          </div>

          {/* Digital City Pass */}
          <div className="relative rounded-3xl bg-vibe-cream p-6 text-vibe-charcoal ring-1 ring-vibe-clay shadow-2xl">
            <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-vibe-terracotta px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-vibe-cream">
              <Sparkles size={10} /> Recommended
            </span>
            <div className="flex items-center gap-2 text-vibe-terracotta">
              <Crown size={16} />
              <p className="text-xs uppercase tracking-[0.2em]">Digital City Pass</p>
            </div>
            <p className="mt-3 font-display text-4xl">
              Rp 89k<span className="text-base text-vibe-charcoal/60"> /month</span>
            </p>
            <p className="mt-2 text-sm text-vibe-charcoal/70">
              Full access to the ecosystem + exclusive benefits for Jogja digital citizens.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {CITY_PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-vibe-sage" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {!isPro && (
              <button
                onClick={() => setPicked("city")}
                className="mt-6 w-full rounded-full bg-vibe-charcoal px-5 py-3 text-sm font-medium text-vibe-cream hover:bg-vibe-charcoal/90"
              >
                {trialExpired ? "Activate City Pass →" : "Upgrade to City Pass →"}
              </button>
            )}
            {isPro && plan === "city" && (
              <p className="mt-6 text-xs uppercase tracking-wider text-vibe-terracotta">Active plan</p>
            )}
          </div>
        </motion.div>

        {!isPro && !trialExpired && (
          <p className="mt-6 text-center text-xs text-vibe-cream/60">
            During your 14-day trial, you automatically get all Digital City Pass benefits + onboarding kit.
          </p>
        )}
      </div>

      {picked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
          onClick={() => !done && setPicked(null)}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-vibe-cream p-8 text-vibe-charcoal"
          >
            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-vibe-sage text-vibe-cream">
                  <Check size={28} />
                </div>
                <h3 className="mt-4 font-display text-2xl">Congratulations, {PLAN_LABEL[picked]} is active!</h3>
                <p className="mt-2 text-sm text-vibe-charcoal/70">Redirecting you to the home page…</p>
              </div>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.2em] text-vibe-terracotta">{PLAN_LABEL[picked]}</p>
                <h3 className="mt-1 font-display text-2xl">Payment Confirmation</h3>
                <p className="mt-2 text-sm text-vibe-charcoal/70">
                  Rp {PLAN_PRICE[picked]}.000 / month · payment simulation (UI demo).
                </p>
                <div className="mt-5 space-y-3">
                  <input placeholder="Name on card" className="w-full rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm" />
                  <input placeholder="•••• •••• •••• ••••" className="w-full rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM/YY" className="rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm" />
                    <input placeholder="CVC" className="rounded-xl border border-vibe-charcoal/15 px-4 py-3 text-sm" />
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button onClick={() => setPicked(null)} className="flex-1 rounded-full border border-vibe-charcoal/20 px-5 py-2.5 text-sm">
                    Cancel
                  </button>
                  <button onClick={confirm} className="flex-1 rounded-full bg-vibe-terracotta px-5 py-2.5 text-sm font-medium text-vibe-cream">
                    Pay Rp {PLAN_PRICE[picked]}k
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
