import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

const PUBLIC_ROUTES = ["/login", "/onboarding", "/upgrade"];

export function AuthGate({ children }: { children: ReactNode }) {
  const { ready, user, onboarding, trialExpired, isPro } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!ready) return;
    const path = location.pathname;
    const isPublic = PUBLIC_ROUTES.includes(path);
    const isGov = user?.accountType === "gov";

    if (!user && !isPublic) { navigate({ to: "/login" }); return; }
    // gov accounts skip onboarding entirely
    if (user && !isGov && !onboarding && path !== "/onboarding") { navigate({ to: "/onboarding" }); return; }
    if (user && isGov && path === "/onboarding") { navigate({ to: "/dashboard" }); return; }
    if (user && !isGov && onboarding && trialExpired && !isPro && path !== "/upgrade") { navigate({ to: "/upgrade" }); return; }
    if (user && path === "/login") { navigate({ to: isGov ? "/dashboard" : "/" }); }
  }, [ready, user, onboarding, trialExpired, isPro, location.pathname, navigate]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-vibe-cream">
        <div className="text-sm text-vibe-charcoal/60">Loading...</div>
      </div>
    );
  }
  return <>{children}</>;
}
