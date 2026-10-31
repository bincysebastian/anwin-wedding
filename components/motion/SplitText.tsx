"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitTextProps = {
  text: string;
  className?: string;
  mode?: "words" | "chars";
  delay?: number;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
};

export function SplitText({ text, className, mode = "words", delay = 0, inView = false }: SplitTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");
  const step = mode === "chars" ? 0.045 : 0.08;
  let index = 0;

  const trigger = inView
    ? { whileInView: { y: "0%", opacity: 1 }, viewport: { once: true, margin: "-60px" } }
    : { animate: { y: "0%", opacity: 1 } };

  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={`${word}-${w}`} aria-hidden className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
          {(mode === "chars" ? word.split("") : [word]).map((part, p) => {
            const i = index++;
            return (
              <motion.span
                key={`${part}-${p}`}
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                {...trigger}
                transition={{ duration: 0.9, delay: delay + i * step, ease: [0.22, 1, 0.36, 1] }}
              >
                {part}
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
