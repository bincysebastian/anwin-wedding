"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CroppedImage } from "@/components/CroppedImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { itineraryStops } from "@/lib/content";

type Stop = (typeof itineraryStops)[number];

function StopCard({ stop, index, total }: { stop: Stop; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  // Cards only stack on desktop; on mobile a card is taller than the screen, so they follow one another.
  const [stacked, setStacked] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setStacked(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} className="relative lg:sticky lg:top-24" style={{ zIndex: index + 1 }}>
      <motion.article
        style={reduce || !stacked ? undefined : { scale }}
        initial={reduce ? undefined : { opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex origin-top flex-col-reverse gap-7 overflow-hidden rounded-[20px] bg-cream p-5 lg:flex-row-reverse lg:items-center lg:gap-14 lg:p-6"
      >
        <div className="relative h-[310px] w-full shrink-0 overflow-hidden rounded-[16px] lg:h-[520px] lg:w-[550px] lg:rounded-[20px]">
          <motion.div className="absolute inset-[-4%_0]" style={reduce ? undefined : { y: imageY }}>
            <div className="absolute inset-0 hidden lg:block">
              <CroppedImage src={stop.image} crop={stop.crop} alt={stop.title} sizes="560px" />
            </div>
            <div className="absolute inset-0 lg:hidden">
              <CroppedImage src={stop.image} crop={stop.mobileCrop} alt={stop.title} sizes="100vw" />
            </div>
          </motion.div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[18px] lg:gap-6 lg:p-6">
          <p className="font-display text-[24px] text-muted lg:text-[30px]">{stop.number}</p>
          <h3 className="font-display text-[34px] leading-[1.12] text-forest lg:text-[48px] lg:leading-[1.2]">{stop.title}</h3>
          <p className="text-[14px] leading-[1.65] text-muted lg:text-[16px] lg:leading-[1.6]">{stop.copy}</p>
          <dl className="flex flex-col text-[12px] lg:pt-2 lg:text-[14px]">
            {stop.details.map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between gap-4 border-b border-forest/15 py-[14px] lg:items-start"
              >
                <dt className="shrink-0 text-muted">{d.label}</dt>
                <dd className="text-right font-bold text-forest">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.article>
    </div>
  );
}

export function WeddingDay() {
  return (
    <section id="the-day" className="bg-sand px-6 py-16 lg:p-[120px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:gap-16">
        <div className="flex flex-col gap-5 text-center lg:gap-6">
          <h2 className="font-display text-[35px] leading-[1.12] text-forest lg:text-[60px] lg:leading-[64px] lg:tracking-[-2px]">
            <SplitText text="Wedding Day," inView />
            <br />
            <SplitText text="Beautifully Unfolding." inView delay={0.15} />
          </h2>
          <Reveal delay={0.3}>
            <p className="text-[14px] leading-[1.65] text-muted lg:leading-5">
              An evening of holy vows at the altar, followed by dinner with the people we love.
              <br className="hidden lg:block" /> Join us as we begin our life together in faith and joy.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 lg:gap-8">
          {itineraryStops.map((stop, i) => (
            <StopCard key={stop.number} stop={stop} index={i} total={itineraryStops.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
