import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export function VibeCard({
  title,
  subtitle,
  features,
  Icon,
  bg,
  fg = "#2c2c2c",
}: {
  title: string;
  subtitle: string;
  features: string[];
  Icon: LucideIcon;
  bg: string;
  fg?: string;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl p-8 min-h-[320px] flex flex-col"
      style={{ backgroundColor: bg, color: fg }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-20"
        style={{ backgroundColor: fg }}
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.4, opacity: 0.12 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        whileHover={{ rotate: 8, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
      >
        <Icon size={22} />
      </motion.div>
      <h3 className="font-display text-3xl mt-5 relative z-10">{title}</h3>
      <p className="text-sm mt-2 opacity-80 relative z-10">{subtitle}</p>
      <ul className="mt-6 space-y-1.5 text-sm relative z-10">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="opacity-60">·</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
