import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

const freelancerLinks = [
  { to: "/arrive", label: "Arrive" },
  { to: "/connect", label: "Connect" },
  { to: "/work", label: "Work" },
  { to: "/feel", label: "Feel" },
  { to: "/me", label: "Personal" },
] as const;
const govLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/work", label: "Talent" },
  { to: "/connect", label: "Community" },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const padY = useTransform(scrollY, [0, 100], ["0.9rem", "0.5rem"]);
  const shadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 10px 30px -12px rgba(44,44,44,0.18)"]
  );
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isPro, onboarding } = useAuth();
  const isGov = user?.accountType === "gov";
  const links = isGov ? govLinks : freelancerLinks;

  if (location.pathname === "/login" || location.pathname === "/onboarding" || location.pathname === "/me") return null;

  return (
    <motion.header
      className="fixed left-1/2 top-10 z-40 w-full max-w-5xl -translate-x-1/2 px-4 md:w-auto md:px-0"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.nav
        style={{ paddingTop: padY, paddingBottom: padY, boxShadow: shadow }}
        className="mx-auto flex w-fit min-w-[280px] max-w-full items-center justify-between gap-2 rounded-full border border-vibe-charcoal/10 bg-vibe-cream/80 px-4 backdrop-blur-md sm:gap-4 sm:px-5 md:min-w-0"
      >
        <Link to="/" className="px-2 font-display text-xl text-vibe-charcoal sm:text-2xl" onClick={() => setMobileMenuOpen(false)}>
          Freela<span className="text-vibe-terracotta">.</span>Vibe
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="relative rounded-full px-3 py-1.5 text-sm text-vibe-charcoal/80 transition-colors hover:text-vibe-charcoal"
              >
                {active && (
                  <motion.span
                    layoutId="activeLink"
                    className="absolute inset-0 -z-0 rounded-full bg-vibe-warm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto block p-2 text-vibe-charcoal md:hidden"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {user && (onboarding || isGov) ? (
          <div className="ml-1 hidden items-center gap-2 md:flex">
            {!isGov && <Link
              to="/upgrade"
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                isPro
                  ? "bg-vibe-sage text-vibe-cream"
                  : "bg-vibe-charcoal text-vibe-cream"
              }`}
            >
              {isPro ? "Pro" : "Upgrade"}
            </Link>}
            <button
              onClick={() => { logout(); navigate({ to: "/login" }); }}
              title="Logout"
              className="rounded-full border border-vibe-charcoal/15 p-2 text-vibe-charcoal/70 hover:text-vibe-charcoal"
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="ml-1 hidden rounded-full bg-vibe-charcoal px-4 py-2 text-xs font-medium text-vibe-cream md:block"
          >
            Start →
          </Link>
        )}
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full mt-4 flex w-[calc(100vw-3rem)] max-w-sm flex-col gap-2 rounded-[2rem] border border-vibe-charcoal/10 bg-white/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
            style={{ left: "50%", x: "-50%" }}
          >
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    active ? "bg-vibe-warm text-vibe-charcoal" : "text-vibe-charcoal/70 hover:bg-vibe-warm/50"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="my-2 h-px bg-vibe-charcoal/5" />
            {user && (onboarding || isGov) ? (
              <div className="flex flex-col gap-2 px-2">
                {!isGov && (
                  <Link
                    to="/upgrade"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-center text-xs font-medium ${
                      isPro ? "bg-vibe-sage text-vibe-cream" : "bg-vibe-charcoal text-vibe-cream"
                    }`}
                  >
                    {isPro ? "Pro" : "Upgrade"}
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate({ to: "/login" });
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-vibe-charcoal/15 py-2.5 text-xs font-medium text-vibe-charcoal/80"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-2 rounded-xl bg-vibe-charcoal py-3 text-center text-sm font-medium text-vibe-cream"
              >
                Start →
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
