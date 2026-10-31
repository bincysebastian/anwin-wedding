"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { memories, type MemoryCard } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

function Rise({ children, className, index }: { children: ReactNode; className?: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease }}
    >
      {children}
    </motion.div>
  );
}

function Card({ card, className }: { card: MemoryCard; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 overflow-hidden rounded-[16px] bg-sand p-4 text-center transition-transform duration-500 hover:-translate-y-1 lg:gap-6 lg:rounded-[20px] lg:px-[18px] lg:py-8 ${className ?? ""}`}
    >
      <Image src={card.icon} alt="" width={20} height={20} className="size-[18px] lg:size-5" />
      <div className="flex w-full flex-col items-center gap-3">
        <p className="font-display text-[36px] leading-[1.1] text-forest lg:text-[48px]">{card.value}</p>
        <p className="w-full text-[12px] leading-[1.5] text-muted lg:text-[16px]">{card.meaning}</p>
      </div>
    </div>
  );
}

/** The date card from Save the Date lands in these slots (see DateJourney). */
export function LifetimeMemories({ slotRef }: { slotRef: (index: number) => (el: HTMLDivElement | null) => void }) {
  const m = memories;
  const slot = slotRef;

  return (
    <section className="bg-white">
      {/* Mobile */}
      <div className="flex flex-col gap-12 px-6 pb-12 pt-16 lg:hidden">
        <div ref={slot(0)} aria-hidden className="h-[468px] w-full" />
        <div className="flex flex-col gap-3">
          <Rise index={0} className="flex gap-3">
            <Card card={m.two} className="h-[180px] min-w-0 flex-1" />
            <Card card={m.us} className="h-[180px] min-w-0 flex-1" />
          </Rise>
          <Rise index={1} className="flex gap-3">
            <Card card={m.three} className="h-[180px] min-w-0 flex-1" />
            <Card card={m.infinity} className="h-[180px] min-w-0 flex-1" />
          </Rise>
          <Rise index={2} className="flex gap-3">
            <Card card={m.vow} className="h-[180px] min-w-0 flex-1" />
            <Card card={m.you} className="h-[180px] min-w-0 flex-1" />
          </Rise>
        </div>
      </div>

      {/* Desktop */}
      <div className="mx-auto hidden h-[736px] max-w-[1440px] items-start gap-3 px-10 pb-20 pt-[120px] lg:flex xl:px-[120px]">
        <Rise index={0} className="flex h-[536px] flex-[190] flex-col gap-3">
          <Card card={m.two} className="h-[262px]" />
          <Card card={m.us} className="h-[262px]" />
        </Rise>
        <Rise index={1} className="flex-[190]">
          <Card card={m.three} className="h-[536px]" />
        </Rise>
        <div ref={slot(1)} aria-hidden className="h-[536px] flex-[392]" />
        <Rise index={3} className="flex h-[536px] flex-[190] flex-col gap-3">
          <Card card={m.infinity} className="h-[262px]" />
          <Card card={m.vow} className="h-[262px]" />
        </Rise>
        <Rise index={4} className="flex-[190]">
          <Card card={m.you} className="h-[536px]" />
        </Rise>
      </div>
    </section>
  );
}
