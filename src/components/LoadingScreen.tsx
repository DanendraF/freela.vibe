import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const letters = "Freela.Vibe".split("");

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-vibe-charcoal text-vibe-cream"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex font-display text-5xl md:text-7xl"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
            }}
          >
            {letters.map((l, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
                }}
              >
                {l === " " ? "\u00A0" : l}
              </motion.span>
            ))}
          </motion.div>

          <div className="mt-10 h-[2px] w-56 overflow-hidden bg-vibe-cream/15">
            <motion.div
              className="h-full bg-vibe-terracotta"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-vibe-cream/60">
            Yogyakarta Creative Ecosystem
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
