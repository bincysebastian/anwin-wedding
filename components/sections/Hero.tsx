"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CroppedImage } from "@/components/CroppedImage";
import { HeroNav } from "@/components/SiteNav";
import { LeafShower } from "@/components/motion/LeafShower";
import { SplitText } from "@/components/motion/SplitText";
import { heroMobileCrop, images, site } from "@/lib/content";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex h-[720px] flex-col gap-[82px] overflow-hidden px-6 pb-12 pt-5 lg:h-[900px] lg:justify-between lg:gap-0 lg:px-[120px] lg:pb-[70px]"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 overflow-hidden lg:hidden">
          <CroppedImage
            src={images.hero}
            crop={heroMobileCrop}
            alt="Anwin and Bia standing on a rocky outcrop above a misty green mountain valley"
            sizes="290vw"
          />
        </div>
        <Image
          src={images.hero}
          alt="Anwin and Bia standing on a rocky outcrop above a misty green mountain valley"
          fill
          sizes="100vw"
          className="hidden object-cover lg:block"
        />
      </motion.div>
      <LeafShower />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <HeroNav />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 text-center text-black lg:gap-[22px] lg:text-cream">
        <h1 className="w-full font-display text-[59px] leading-[1.08] lg:text-[180px] lg:leading-[160px]">
          <SplitText text={site.couple} mode="chars" delay={0.4} />
        </h1>
        <motion.p
          className="text-[13px] lg:text-[16px]"
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          {site.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
