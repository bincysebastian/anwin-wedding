"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { colourCode, images } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

/** Figma's diamond gradient fill for "Shades of Blue", sized to the 490×53 text box. */
const BLUE_GRADIENT = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 490 53' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><g transform='matrix(24.5 0 0 2.65 245 26.5)'><rect height='190' width='190' fill='url(%23grad)' id='quad' shape-rendering='crispEdges'/><use href='%23quad' transform='scale(1 -1)'/><use href='%23quad' transform='scale(-1 1)'/><use href='%23quad' transform='scale(-1 -1)'/></g><defs><linearGradient id='grad' gradientUnits='userSpaceOnUse' x2='5' y2='5'><stop stop-color='rgba(5,60,160,1)' offset='0'/><stop stop-color='rgba(21,72,150,1)' offset='0.16106'/><stop stop-color='rgba(37,83,140,1)' offset='0.32212'/><stop stop-color='rgba(66,108,185,1)' offset='0.69231'/><stop stop-color='rgba(34,80,137,1)' offset='0.84615'/><stop stop-color='rgba(18,66,113,1)' offset='0.92308'/><stop stop-color='rgba(2,52,89,1)' offset='1'/></linearGradient></defs></svg>")`;

export function DressCode() {
  const reduce = useReducedMotion();

  return (
    <section id="dress-code" className="bg-sand px-6 py-16 lg:p-[120px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex w-full flex-col gap-4 lg:w-[490px] lg:shrink-0 lg:gap-7">
          <div className="flex flex-col gap-4 lg:gap-3">
            <h2 className="font-display text-[36px] leading-[1.12] text-forest lg:text-[60px] lg:leading-[64px] lg:tracking-[-2px]">
              <SplitText text={colourCode.title} inView />
            </h2>
            <Reveal delay={0.15}>
              <p
                className="bg-clip-text font-display text-[29px] font-bold leading-[1.333] text-transparent lg:text-[40px] lg:leading-normal"
                style={{ backgroundImage: BLUE_GRADIENT, backgroundSize: "100% 100%" }}
              >
                {colourCode.palette}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <p className="text-[14px] leading-[1.65] text-muted lg:text-[16px] lg:leading-[1.6]">{colourCode.copy}</p>
          </Reveal>
        </div>

        <Reveal className="w-full lg:w-[637.15px] lg:shrink-0" delay={0.1}>
          <div className="relative h-[367px] w-full overflow-hidden rounded-[16px] lg:aspect-[637.15/684] lg:h-auto lg:rounded-[18.74px]">
            <motion.div
              className="absolute inset-0"
              initial={reduce ? undefined : { scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
            >
              <Image
                src={images.dressPalette}
                alt="Stack of folded fabrics in shades of blue: mist, sky blue, dusty blue, cornflower, denim blue, steel blue, cobalt and deep ocean"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
