"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { images, navLinks } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const [saveTheDate, ...sectionLinks] = navLinks;

function RsvpPill() {
  return (
    <a
      href="#rsvp"
      className="group flex h-11 items-center gap-[10px] rounded-full border border-forest bg-white/[0.08] pl-[5px] pr-[18px] text-forest transition-colors hover:bg-white/30 lg:h-10 lg:gap-4 lg:border-[#446457] lg:pl-1 lg:pr-6 lg:text-[#446457]"
    >
      <span className="flex size-[30px] items-center justify-center rounded-full bg-[#f4eeee] transition-transform duration-500 group-hover:rotate-90 lg:size-8 lg:bg-[#eaeaea]">
        <Image src={images.sparkle} alt="" width={16} height={16} />
      </span>
      <span className="text-[12px] lg:text-[13px]">RSVP</span>
    </a>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group relative">
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

/** Navigation that sits on top of the hero photograph. */
export function HeroNav() {
  const reduce = useReducedMotion();
  return (
    <motion.header
      className="relative z-10 w-full"
      initial={reduce ? undefined : { opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
    >
      <div className="flex flex-col gap-3 lg:h-12 lg:flex-row lg:items-center lg:justify-center lg:gap-14">
        <div className="flex items-center justify-between lg:hidden">
          <a href={saveTheDate.href} className="text-[11px] uppercase text-forest">
            {saveTheDate.label}
          </a>
          <RsvpPill />
        </div>

        <nav className="flex h-11 items-center justify-between text-[10px] uppercase text-forest lg:hidden">
          {sectionLinks.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        <nav className="hidden items-center gap-[26px] text-[10px] uppercase text-black lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <RsvpPill />
        </div>
      </div>
    </motion.header>
  );
}
