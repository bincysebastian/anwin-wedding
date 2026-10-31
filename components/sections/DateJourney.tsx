"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScratchCard } from "@/components/motion/ScratchCard";
import { HeartBurst } from "@/components/motion/HeartBurst";
import { LifetimeMemories } from "@/components/sections/LifetimeMemories";
import { SaveTheDate } from "@/components/sections/SaveTheDate";
import { images, scratchCoverCrop } from "@/lib/content";

type Box = { top: number; left: number; width: number; height: number };

/** Layout position relative to `root`, ignoring transforms from entrance animations. */
function layoutBox(el: HTMLElement, root: HTMLElement): Box {
  let top = 0;
  let left = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    top += node.offsetTop;
    left += node.offsetLeft;
    node = node.offsetParent as HTMLElement | null;
  }
  return { top, left, width: el.offsetWidth, height: el.offsetHeight };
}

const visible = (els: (HTMLElement | null)[]) => els.find((el) => el && el.offsetWidth > 0) ?? null;

/** Travel starts when the card nears the top of the screen and ends with the slot a third of the way down. */
const START_AT = 0.1;
const END_AT = 0.35;

/**
 * Save the Date + Lifetime Memories share one scratch card: it starts under
 * "Scratch to Reveal" and is carried down into the centre slot of the memories
 * grid as the visitor scrolls, like the Framer reference.
 */
export function DateJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const startRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endRefs = useRef<(HTMLDivElement | null)[]>([]);
  const boxes = useRef<{ start: Box; end: Box; rootTop: number } | null>(null);
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(false);

  const setStartSlot = useCallback((el: HTMLDivElement | null) => {
    startRefs.current[0] = el;
  }, []);
  const endSlot = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      endRefs.current[index] = el;
    },
    []
  );

  const top = useMotionValue(0);
  const left = useMotionValue(0);
  const width = useMotionValue(0);
  const height = useMotionValue(0);
  const radius = useMotionValue(14);
  const opacity = useMotionValue(0);

  const { scrollY } = useScroll();

  const apply = useCallback(
    (y: number) => {
      const b = boxes.current;
      if (!b) return;
      const vh = window.innerHeight;
      const s0 = b.rootTop + b.start.top - vh * START_AT;
      const s1 = Math.max(s0 + 1, b.rootTop + b.end.top - vh * END_AT);
      const p = reduce ? 1 : Math.min(1, Math.max(0, (y - s0) / (s1 - s0)));
      const lerp = (a: number, c: number) => a + (c - a) * p;
      top.set(lerp(b.start.top, b.end.top));
      left.set(lerp(b.start.left, b.end.left));
      width.set(lerp(b.start.width, b.end.width));
      height.set(lerp(b.start.height, b.end.height));
      radius.set(lerp(window.innerWidth < 1024 ? 10 : 14, 20));
      opacity.set(1);
    },
    [reduce, top, left, width, height, radius, opacity]
  );

  const measure = useCallback(() => {
    const root = rootRef.current;
    const start = visible(startRefs.current);
    const end = visible(endRefs.current);
    if (!root || !start || !end) return;
    boxes.current = {
      start: layoutBox(start, root),
      end: layoutBox(end, root),
      rootTop: root.getBoundingClientRect().top + window.scrollY,
    };
    apply(window.scrollY);
  }, [apply]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  useMotionValueEvent(scrollY, "change", apply);

  return (
    <div ref={rootRef} className="relative">
      <SaveTheDate slotRef={setStartSlot} />
      <LifetimeMemories slotRef={endSlot} />

      <motion.div
        className="absolute z-20 overflow-hidden shadow-[0_24px_60px_-30px_rgba(24,43,40,0.45)]"
        style={{ top, left, width, height, borderRadius: radius, opacity }}
      >
        <ScratchCard
          coverSrc={images.sprite}
          coverCrop={scratchCoverCrop}
          revealSrc={images.dateReveal}
          cursorSrc={images.scratchCursor}
          onReveal={() => setBurst(true)}
        />
      </motion.div>

      {burst && !reduce && (
        <motion.div className="pointer-events-none absolute z-30" style={{ top, left, width, height }}>
          <HeartBurst count={8} />
          <HeartBurst count={4} delay={0.35} offset={0.5} />
        </motion.div>
      )}
    </div>
  );
}
