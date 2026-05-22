import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Briefcase, Building2 } from "lucide-react";
import { useAuth, type AccountType } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Freela.Vibe" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("freelancer");
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signup") {
      if (password !== confirm) return setError("Passwords do not match.");
      const r = signUp(email, name, password, accountType);
      if (!r.ok) return setError(r.error);
      navigate({ to: accountType === "gov" ? "/dashboard" : "/onboarding" });
    } else {
      const r = signIn(email, password);
      if (!r.ok) return setError(r.error);
      navigate({ to: "/" });
    }
  };

  return (
    <div className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-vibe-cream via-vibe-warm to-vibe-clay px-6 py-20">
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-md rounded-3xl bg-white/85 p-8 shadow-[0_30px_80px_-30px_rgba(44,44,44,0.3)] backdrop-blur-xl md:p-10"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-vibe-terracotta">Freela.Vibe</p>
        <h1 className="mt-3 font-display text-4xl text-vibe-charcoal md:text-5xl">
          {mode === "signup" ? "Create account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-vibe-charcoal/70">
          {mode === "signup" ? "Start your civic journey in Yogyakarta — free for 14 days." : "Pick up right where you left off."}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "signup" && (
            <>
              <div>
                <label className="text-xs font-medium text-vibe-charcoal/70">Account Type</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {([
                    { v: "freelancer", icon: Briefcase, label: "Freelancer", desc: "Personal page & city perks" },
                    { v: "gov", icon: Building2, label: "Government", desc: "City ecosystem dashboard" },
                  ] as const).map((o) => {
                    const Active = accountType === o.v;
                    const Icon = o.icon;
                    return (
                      <button
                        type="button"
                        key={o.v}
                        onClick={() => setAccountType(o.v)}
                        className={`rounded-2xl border p-3 text-left transition ${
                          Active ? "border-vibe-terracotta bg-vibe-warm/60" : "border-vibe-charcoal/15 hover:border-vibe-terracotta/50"
                        }`}
                      >
                        <Icon size={16} className="text-vibe-terracotta" />
                        <div className="mt-1.5 text-xs font-medium text-vibe-charcoal">{o.label}</div>
                        <div className="text-[10px] text-vibe-charcoal/60">{o.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-vibe-charcoal/70">Nickname</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Mira"
                  className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
              </div>
            </>
          )}
          <div>
            <label className="text-xs font-medium text-vibe-charcoal/70">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
              className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
          </div>
          <div>
            <label className="text-xs font-medium text-vibe-charcoal/70">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
              className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
          </div>
          {mode === "signup" && (
            <div>
              <label className="text-xs font-medium text-vibe-charcoal/70">Confirm password</label>
              <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repeat password"
                className="mt-1 w-full rounded-xl border border-vibe-charcoal/15 bg-white px-4 py-3 text-sm outline-none focus:border-vibe-terracotta" />
            </div>
          )}

          {error && <div className="rounded-xl bg-vibe-terracotta/10 px-3 py-2 text-xs text-vibe-terracotta">{error}</div>}

          <button type="submit" className="w-full rounded-full bg-vibe-charcoal px-5 py-3 text-sm font-medium text-vibe-cream transition-transform hover:scale-[1.01]">
            {mode === "signup" ? "Create account & start" : "Login"}
          </button>
        </form>

        <button onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(null); }}
          className="mt-6 w-full text-center text-xs text-vibe-charcoal/60 underline underline-offset-2">
          {mode === "signup" ? "Already have an account? Login" : "Don't have an account? Sign up"}
        </button>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.2em] text-vibe-charcoal/40">
          Demo · local storage only
        </p>
      </motion.div>
    </div>
  );
}
