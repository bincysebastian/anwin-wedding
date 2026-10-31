"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { CroppedImage } from "@/components/CroppedImage";
import { BlurText } from "@/components/motion/BlurText";
import { scatteredDesktop, scatteredMobile } from "@/lib/content";

type Photo = (typeof scatteredDesktop)[number];

/** Upward drift in px per second, plus extra drift per px the page is scrolled. */
const DRIFT_SPEED = 26;
const SCROLL_BOOST = 0.25;

/** Moves a photo up from its Figma spot and wraps it back in below the section once it leaves the top. */
function DriftingPhoto({ photo, drift, loop }: { photo: Photo; drift: MotionValue<number>; loop: MotionValue<number> }) {
  const top = Number(photo.style.top ?? 0);
  const height = Number(photo.style.height ?? 0);
  const y = useTransform(() => {
    const length = loop.get();
    if (!length) return 0;
    const wrapped = ((((top + height - drift.get()) % length) + length) % length) - height;
    return wrapped - top;
  });

  return (
    <motion.div className="absolute overflow-hidden" style={{ ...photo.style, y }}>
      <CroppedImage src={photo.src} sizes="240px" />
    </motion.div>
  );
}

function ScatteredPhotos({
  photos,
  className,
  section,
}: {
  photos: Photo[];
  className: string;
  section: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const inView = useInView(section);
  const drift = useMotionValue(0);
  // Zero until mounted so the server render and first client render agree.
  const loop = useMotionValue(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const tallest = Math.max(...photos.map((p) => Number(p.style.height ?? 0)));
    const update = () => loop.set((section.current?.offsetHeight ?? 0) + tallest);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [photos, section, loop]);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    drift.set(drift.get() + (Math.min(delta, 100) / 1000) * DRIFT_SPEED);
  });

  useMotionValueEvent(scrollY, "change", (y) => {
    if (reduce) return;
    const prev = scrollY.getPrevious() ?? y;
    drift.set(drift.get() + Math.max(0, y - prev) * SCROLL_BOOST);
  });

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {photos.map((photo, i) =>
        reduce ? (
          <div key={i} className="absolute overflow-hidden" style={photo.style}>
            <CroppedImage src={photo.src} sizes="240px" />
          </div>
        ) : (
          <DriftingPhoto key={i} photo={photo} drift={drift} loop={loop} />
        )
      )}
    </div>
  );
}

export function SaveTheDate({ slotRef }: { slotRef: (el: HTMLDivElement | null) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="save-the-date"
      className="relative h-[640px] overflow-hidden bg-sand lg:h-[846px]"
    >
      <ScatteredPhotos photos={scatteredMobile} className="lg:hidden" section={sectionRef} />
      <ScatteredPhotos photos={scatteredDesktop} className="hidden lg:block" section={sectionRef} />

      <div className="relative flex flex-col items-center pt-[132px] lg:pt-[218px]">
        <h2 className="w-[294px] text-center font-display text-[34px] leading-[45px] text-forest lg:w-[1040px] lg:text-[46px] lg:leading-[60px] lg:tracking-[-1px]">
          <BlurText text="Save The Date" />
        </h2>
        <p className="mt-[7px] text-[11px] leading-[15px] text-muted lg:mt-[10px] lg:text-[10px] lg:leading-4">
          <BlurText text="Scratch to Reveal" delay={0.3} />
        </p>
        {/* The scratch card itself is rendered by DateJourney and travels from here. */}
        <div
          ref={slotRef}
          aria-hidden
          className="mt-[21px] h-[272px] w-[200px] lg:mt-[18px] lg:h-[340px] lg:w-[250px]"
        />
      </div>
    </section>
  );
}
