"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CroppedImage } from "@/components/CroppedImage";
import { heartCrop, images, site } from "@/lib/content";

/**
 * The heart stage is laid out in Figma pixels (1440×940 desktop, 390×430 mobile)
 * and scaled with --u so it shrinks proportionally on narrower screens.
 */
export function WithLove() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const heartOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const brideX = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);
  const groomX = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const fade = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <section className="bg-cream">
      <div ref={ref} className="overflow-hidden">
        <div
          className="relative mx-auto h-[calc(430*var(--u))] w-[calc(390*var(--u))] [--u:min(1px,calc(100vw/390))] lg:h-[calc(940*var(--u))] lg:w-[calc(1440*var(--u))] lg:[--u:min(1px,calc(100vw/1440))]"
        >
          <motion.div
            className="absolute left-[calc(64*var(--u))] top-[calc(64*var(--u))] size-[calc(262*var(--u))] lg:left-[calc(392*var(--u))] lg:top-[calc(142*var(--u))] lg:size-[calc(656*var(--u))]"
            style={reduce ? undefined : { scale, opacity: heartOpacity }}
          >
            <div
              className="relative size-full overflow-hidden"
              style={{
                maskImage: `url(${images.heartMask})`,
                WebkitMaskImage: `url(${images.heartMask})`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            >
              <CroppedImage src={images.heartPhoto} crop={heartCrop} alt="Bia and Anwin" sizes="(max-width: 1024px) 400px, 980px" />
            </div>
          </motion.div>

          <motion.p
            className="absolute left-[calc(24*var(--u))] top-[calc(185*var(--u))] font-display text-[length:calc(50*var(--u))] leading-[1.333] text-forest lg:leading-normal lg:left-[calc(150*var(--u))] lg:top-[calc(310*var(--u))] lg:text-[length:calc(144*var(--u))]"
            style={reduce ? undefined : { x: brideX, opacity: fade }}
          >
            {site.bride}
          </motion.p>
          <motion.p
            className="absolute left-[calc(210*var(--u))] top-[calc(310*var(--u))] font-display text-[length:calc(50*var(--u))] leading-[1.333] text-forest lg:leading-normal lg:left-[calc(925*var(--u))] lg:top-[calc(588*var(--u))] lg:text-[length:calc(144*var(--u))]"
            style={reduce ? undefined : { x: groomX, opacity: fade }}
          >
            {site.groom}
          </motion.p>
        </div>
      </div>

      <footer className="px-6 pb-8 lg:bg-white lg:px-[166px] lg:pb-[63px] lg:pt-12">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between border-t border-[#d8cfc2] pt-[22px] text-[10px] uppercase lg:pt-5 lg:font-inter lg:text-[12px] lg:font-medium lg:leading-[14.4px] lg:tracking-[1.68px]">
          <p className="text-[#5e5750]">{site.footerDate}</p>
          <a href="#top" className="text-[#985641] transition-opacity hover:opacity-70">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
