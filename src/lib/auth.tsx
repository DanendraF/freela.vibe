import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type AccountType = "freelancer" | "gov";

export type OnboardingData = {
  // Step 1 — Basic Profile
  fullName: string;
  ageRange: string;
  originCity: string;
  profession: string;
  experienceLevel: string;
  // Step 2 — Work Style & Lifestyle
  workStyle: string;
  workspace: string;
  productiveHours: string;
  lifestyle: string[];
  // Step 3 — Goals & Needs
  mainGoal: string;
  challenges: string[];
  opportunities: string[];
  // Step 4 — City & Community Matching
  communityInterests: string[];
  eventPrefs: string[];
  collabStyle: string;
  // Step 5 — City Setup
  monthlyBudget: string;
  transport: string;
  housing: string;
  // Legacy / optional
  pivot?: { lat: number; lng: number; label: string } | null;
};

export type User = {
  email: string;
  name: string;
  accountType: AccountType;
};

type Account = {
  email: string;
  name: string;
  password: string;
  accountType: AccountType;
};

export type PlanTier = "village" | "city";

type Persisted = {
  user: User | null;
  onboarding: OnboardingData | null;
  trialStartedAt: number | null;
  isPro: boolean;
  plan: PlanTier | null;
};

type AuthCtx = Persisted & {
  ready: boolean;
  trialDaysLeft: number;
  trialExpired: boolean;
  signUp: (email: string, name: string, password: string, accountType: AccountType) => { ok: true } | { ok: false; error: string };
  signIn: (email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
  completeOnboarding: (data: OnboardingData) => void;
  upgradeToPro: (plan?: PlanTier) => void;
};

const KEY = "freelavibe.auth.v2";
const ACC_KEY = "freelavibe.accounts.v2";
const Ctx = createContext<AuthCtx | null>(null);
const empty: Persisted = { user: null, onboarding: null, trialStartedAt: null, isPro: false, plan: null };

function load(): Persisted {
  if (typeof window === "undefined") return empty;
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : empty; } catch { return empty; }
}
function save(p: Persisted) { if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(p)); }
function loadAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(ACC_KEY) ?? "[]"); } catch { return []; }
}
function saveAccounts(a: Account[]) { if (typeof window !== "undefined") localStorage.setItem(ACC_KEY, JSON.stringify(a)); }

const TRIAL_DAYS = 14;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => { setState(load()); setReady(true); }, []);
  const update = (n: Persisted) => { setState(n); save(n); };

  const signUp: AuthCtx["signUp"] = (email, name, password, accountType) => {
    const e = email.trim().toLowerCase();
    if (!e || !password) return { ok: false, error: "Email & password wajib diisi." };
    if (password.length < 6) return { ok: false, error: "Password minimal 6 karakter." };
    const accounts = loadAccounts();
    if (accounts.some((a) => a.email === e)) return { ok: false, error: "Email sudah terdaftar. Silakan masuk." };
    const acc: Account = { email: e, name: name.trim() || e.split("@")[0], password, accountType };
    saveAccounts([...accounts, acc]);
    update({ ...state, user: { email: acc.email, name: acc.name, accountType: acc.accountType } });
    return { ok: true };
  };

  const signIn: AuthCtx["signIn"] = (email, password) => {
    const e = email.trim().toLowerCase();
    const acc = loadAccounts().find((a) => a.email === e);
    if (!acc) return { ok: false, error: "Akun tidak ditemukan." };
    if (acc.password !== password) return { ok: false, error: "Password salah." };
    update({ ...state, user: { email: acc.email, name: acc.name, accountType: acc.accountType } });
    return { ok: true };
  };

  const logout = () => update(empty);
  const completeOnboarding = (data: OnboardingData) =>
    update({ ...state, onboarding: data, trialStartedAt: state.trialStartedAt ?? Date.now() });
  const upgradeToPro: AuthCtx["upgradeToPro"] = (plan = "city") => update({ ...state, isPro: true, plan });

  const trialDaysLeft = state.trialStartedAt
    ? TRIAL_DAYS - Math.floor((Date.now() - state.trialStartedAt) / (1000 * 60 * 60 * 24))
    : TRIAL_DAYS;
  const trialExpired = !state.isPro && state.trialStartedAt !== null && trialDaysLeft <= 0;

  return (
    <Ctx.Provider value={{ ...state, trialDaysLeft, trialExpired, ready, signUp, signIn, logout, completeOnboarding, upgradeToPro }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
