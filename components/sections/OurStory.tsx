"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CroppedImage } from "@/components/CroppedImage";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { storyChapters } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function OurStory() {
  const [active, setActive] = useState(0);

  return (
    <section id="our-story" className="bg-cream px-6 py-16 lg:px-[120px] lg:pb-[120px] lg:pt-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 lg:gap-[52px]">
        <div className="flex w-full max-w-[720px] flex-col gap-5 text-center lg:gap-6">
          <h2 className="font-display text-[36px] leading-[1.12] text-forest lg:text-[64px] lg:leading-[1.1]">
            <SplitText text="The Journey" inView />
            <br />
            <SplitText text="That Brought Us Here." inView delay={0.15} />
          </h2>
          <Reveal delay={0.3}>
            <p className="text-[14px] leading-[1.65] text-muted lg:text-[16px] lg:leading-[1.6]">
              From a simple hello to a thousand shared adventures, every season has quietly brought us closer to this moment.
            </p>
          </Reveal>
        </div>

        {/* Mobile: stacked chapters + timeline */}
        <div className="flex w-full flex-col gap-8 lg:hidden">
          <div className="flex flex-col gap-5">
            {storyChapters.map((c, i) => {
              const isActive = i === active;
              return (
                <Reveal key={c.year} delay={i * 0.1}>
                  <motion.button
                    type="button"
                    onClick={() => setActive(i)}
                    animate={{
                      backgroundColor: isActive ? "#364c48" : "#fffefa",
                      borderColor: isActive ? "#364c48" : "#daddd8",
                    }}
                    transition={{ duration: 0.6, ease }}
                    className="flex w-full flex-col gap-[18px] overflow-hidden rounded-[20px] border p-5 text-left"
                  >
                    <div className="relative h-[178px] w-full overflow-hidden rounded-[16px]">
                      <CroppedImage src={c.image} crop={c.mobileCrop} alt={c.title} sizes="100vw" />
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <motion.p
                        className="text-[11px] leading-[1.366]"
                        animate={{ color: isActive ? "#b7d3cf" : "#8c602c" }}
                        transition={{ duration: 0.6 }}
                      >
                        {c.year}
                      </motion.p>
                      <motion.p
                        className="font-display text-[27px] leading-[1.12]"
                        animate={{ color: isActive ? "#fffefa" : "#334b47" }}
                        transition={{ duration: 0.6 }}
                      >
                        {c.title}
                      </motion.p>
                      <motion.p
                        className="text-[14px] leading-[1.65]"
                        animate={{ color: isActive ? "rgba(255,254,250,0.85)" : "#606968" }}
                        transition={{ duration: 0.6 }}
                      >
                        {c.copy}
                      </motion.p>
                    </div>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>

          <div className="relative h-[76px] w-full">
            <div className="absolute inset-x-0 top-[22px] h-px bg-[#daddd8]" />
            <motion.div
              className="absolute left-0 top-[22px] h-px bg-[#364c48]"
              animate={{ width: `${storyChapters[active].position * 100}%` }}
              transition={{ duration: 0.8, ease }}
            />
            <motion.div
              className="absolute top-0 -ml-[22px] size-[44px] rounded-full border border-[#364c48] bg-cream"
              animate={{ left: `${storyChapters[active].position * 100}%` }}
              transition={{ duration: 0.8, ease }}
            />
            {storyChapters.map((c, i) => {
              const isActive = i === active;
              return (
                <button
                  key={c.year}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${c.year}`}
                  className="absolute top-0 -ml-[30px] flex h-[76px] w-[60px] flex-col items-center"
                  style={{ left: `${c.position * 100}%` }}
                >
                  <span className="flex h-[44px] items-center justify-center">
                    <motion.span
                      className="rounded-full"
                      animate={{
                        width: isActive ? 10 : 8,
                        height: isActive ? 10 : 8,
                        backgroundColor: isActive ? "#364c48" : "#606968",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </span>
                  <span className="mt-[10px] text-[11px] leading-[1.366] text-muted">{c.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: interactive cards + timeline */}
        <Reveal className="hidden w-full flex-col items-center gap-[52px] lg:flex" delay={0.1}>
          <div className="flex justify-center gap-4">
            {storyChapters.map((c, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={c.year}
                  type="button"
                  onClick={() => setActive(i)}
                  animate={{
                    backgroundColor: isActive ? "#364c48" : "#fffefa",
                    borderColor: isActive ? "#364c48" : "#daddd8",
                    y: isActive ? -6 : 0,
                  }}
                  transition={{ duration: 0.6, ease }}
                  className="flex h-[420px] w-[322.7px] flex-col gap-4 overflow-hidden rounded-[20px] border p-5 text-left"
                >
                  <div className="relative h-[164px] w-[283px] shrink-0 overflow-hidden rounded-[16px]">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: isActive ? 1.06 : 1 }}
                      transition={{ duration: 1.2, ease }}
                    >
                      <CroppedImage src={c.image} crop={c.crop} alt={c.title} sizes="300px" />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <motion.p
                      className="text-[13px] tracking-[2px]"
                      animate={{ color: isActive ? "rgba(255,254,250,0.7)" : "#8c602c" }}
                      transition={{ duration: 0.6 }}
                    >
                      {c.year}
                    </motion.p>
                    <motion.p
                      className="font-display text-[26px] leading-[1.15]"
                      animate={{ color: isActive ? "#fffefa" : "#334b47" }}
                      transition={{ duration: 0.6 }}
                    >
                      {c.title}
                    </motion.p>
                    <motion.p
                      className="text-[14px] leading-[1.55]"
                      animate={{ color: isActive ? "rgba(255,254,250,0.85)" : "#606968" }}
                      transition={{ duration: 0.6 }}
                    >
                      {c.copy}
                    </motion.p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="relative h-20 w-[662px]">
            <div className="absolute left-0 top-[26px] h-px w-[660px] bg-[#daddd8]" />
            <motion.div
              className="absolute left-0 top-[26px] h-px bg-[#364c48]"
              animate={{ width: storyChapters[active].position * 660 }}
              transition={{ duration: 0.8, ease }}
            />
            <motion.div
              className="absolute top-0 size-[52px] rounded-full border-[1.5px] border-[#364c48] bg-cream"
              animate={{ left: storyChapters[active].position * 660 - 26 }}
              transition={{ duration: 0.8, ease }}
            />
            {storyChapters.map((c, i) => {
              const x = c.position * 660;
              const isActive = i === active;
              return (
                <button
                  key={c.year}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${c.year}`}
                  className="absolute top-0 flex h-20 w-[60px] flex-col items-center"
                  style={{ left: x - 30 }}
                >
                  <span className="flex h-[52px] items-center justify-center">
                    <motion.span
                      className="rounded-full"
                      animate={{
                        width: isActive ? 12 : 8,
                        height: isActive ? 12 : 8,
                        backgroundColor: isActive ? "#364c48" : "#606968",
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </span>
                  <span className="mt-[6px] text-[13px] tracking-[2px] text-muted">{c.year}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
