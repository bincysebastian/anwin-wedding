import type { CSSProperties } from "react";

type Leaf = {
  id: number;
  left: number;
  size: number;
  fall: number;
  sway: number;
  swayDuration: number;
  spin: number;
  delay: number;
  drift: number;
  tone: number;
  opacity: number;
};

/** Soft sage-to-olive greens: [leaf fill, vein]. */
const TONES = [
  ["#8fa37a", "#5f7350"],
  ["#a8b98f", "#6f8460"],
  ["#6f8a63", "#4a6142"],
  ["#b9c4a0", "#7d8f68"],
];

/** Seeded PRNG (mulberry32) so server and client generate identical leaves. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeLeaves(count: number): Leaf[] {
  const random = seeded(20270105);
  return Array.from({ length: count }, (_, id) => {
    const fall = 12 + random() * 8;
    return {
      id,
      // Spread evenly across the width, jittered within each column.
      left: ((id + random()) / count) * 100,
      size: 10 + random() * 6,
      fall,
      sway: 20 + random() * 35,
      swayDuration: 3 + random() * 2.5,
      spin: 5 + random() * 5,
      // Negative delays start each leaf mid-fall so the shower is already under way on load.
      delay: -random() * fall,
      drift: (random() - 0.3) * 140,
      tone: id % TONES.length,
      opacity: 0.7 + random() * 0.25,
    };
  });
}

const LEAVES = makeLeaves(10);

function LeafShape({ size, tone }: { size: number; tone: number }) {
  const [fill, vein] = TONES[tone];
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 20 32" aria-hidden>
      <path d="M10 1C17 7 18 18 10 29C2 18 3 7 10 1Z" fill={fill} />
      <path d="M10 4V31" stroke={vein} strokeWidth="0.9" strokeLinecap="round" />
      <path d="M10 12L6.5 9M10 17L5.5 13.5M10 12L13.5 9M10 17L14.5 13.5M10 22L7 19.5M10 22L13 19.5" stroke={vein} strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

/** A few small leaves drifting down; every other leaf is hidden below the lg breakpoint. */
export function LeafShower() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {LEAVES.map((l) => (
        <span
          key={l.id}
          className={`leaf-fall absolute top-0 ${l.id % 2 ? "hidden lg:block" : ""}`}
          style={
            {
              left: `${l.left}%`,
              opacity: l.opacity,
              animationDuration: `${l.fall}s`,
              animationDelay: `${l.delay}s`,
              "--leaf-drift": `${l.drift}px`,
            } as CSSProperties
          }
        >
          <span
            className="leaf-sway block"
            style={
              {
                animationDuration: `${l.swayDuration}s`,
                animationDelay: `${l.delay}s`,
                "--leaf-sway": `${l.sway}px`,
              } as CSSProperties
            }
          >
            <span className="leaf-spin block" style={{ animationDuration: `${l.spin}s`, animationDelay: `${l.delay}s` }}>
              <LeafShape size={l.size} tone={l.tone} />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}
