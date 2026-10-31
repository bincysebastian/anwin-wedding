"use client";

import { motion, useReducedMotion } from "framer-motion";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

/** Word-by-word blur-in on scroll, matching the Framer reference headings. */
export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}
