"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  color: string;
  filled: boolean;
};

const COLORS = ["#e0566c", "#f28b9b", "#c7354f", "#f6aab6", "#d94862"];

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/**
 * Sunflower (golden-angle) layout over an oval sized to the viewport, so hearts
 * cover the area evenly; the inner 30% is skipped to keep them clear of the card.
 */
function makeParticles(count: number, offset: number): Particle[] {
  const rx = Math.min(640, window.innerWidth * 0.48);
  const ry = Math.min(420, window.innerHeight * 0.46);
  return Array.from({ length: count }, (_, id) => {
    const angle = (id + offset) * GOLDEN_ANGLE + (Math.random() - 0.5) * 0.25;
    const r = 0.3 + 0.7 * Math.sqrt((id + 0.5) / count) + (Math.random() - 0.5) * 0.06;
    return {
      id,
      x: Math.cos(angle) * rx * r,
      // Hearts drift slightly upward as they fly out, like they are floating away.
      y: Math.sin(angle) * ry * r - 30,
      size: 14 + Math.random() * 18,
      rotate: Math.random() * 60 - 30,
      delay: Math.random() * 0.25,
      duration: 1.5 + Math.random() * 0.8,
      color: COLORS[id % COLORS.length],
      filled: id % 2 === 0,
    };
  });
}

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 4.4 2.5.2.3.6.3.8 0 .8-1.4 2.3-2.5 4.4-2.5 3.7 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21Z";

function Heart({ size, color, filled }: { size: number; color: string; filled: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
    >
      <path
        d={HEART_PATH}
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One-shot burst of filled and outlined hearts radiating from the centre of its parent. */
export function HeartBurst({ count = 40, delay = 0, offset = 0 }: { count?: number; delay?: number; offset?: number }) {
  const [particles] = useState(() => makeParticles(count, offset));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.span
        className="absolute size-24 rounded-full bg-[radial-gradient(circle,rgba(246,170,182,0.75),rgba(246,170,182,0))]"
        style={{ left: "50%", top: "50%", marginLeft: -48, marginTop: -48 }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 3.2], opacity: [0.8, 0] }}
        transition={{ duration: 0.9, delay, ease: "easeOut" }}
      />
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{ left: "50%", top: "50%", marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.3, 1, 0.6],
            opacity: [1, 1, 0.9, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: p.duration, delay: delay + p.delay, ease: [0.22, 1, 0.36, 1] }}
        >
          <Heart size={p.size} color={p.color} filled={p.filled} />
        </motion.span>
      ))}
    </div>
  );
}
