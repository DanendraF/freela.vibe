import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function TrialBanner() {
  const { user, onboarding, trialDaysLeft, trialExpired, isPro } = useAuth();
  const location = useLocation();
  if (!user || !onboarding || isPro) return null;
  if (location.pathname === "/upgrade") return null;

  const urgent = trialDaysLeft <= 3;
  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 px-4 py-2 text-center text-xs font-medium ${
        trialExpired
          ? "bg-vibe-terracotta text-vibe-cream"
          : urgent
          ? "bg-vibe-clay text-vibe-charcoal"
          : "bg-vibe-warm text-vibe-charcoal"
      }`}
    >
      <span className="inline-flex items-center gap-2">
        <Sparkles size={12} />
        {trialExpired
          ? "Digital City Pass trial expired. Choose Village Pass or Digital City Pass to continue."
          : `Digital City Pass + Onboarding Kit trial active — ${trialDaysLeft} days left`}
        <Link to="/upgrade" className="underline underline-offset-2">
          {trialExpired ? "Choose a plan →" : "View plans"}
        </Link>
      </span>
    </div>
  );
}
