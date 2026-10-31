"use client";

import { Fragment, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/content";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

const target = new Date(site.weddingStart).getTime();

function remaining(now: number): Remaining {
  const total = Math.max(0, Math.floor((target - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  // Null until mounted so the server render and first client render agree.
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setLeft(remaining(Date.now()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: left ? String(left.days) : "–" },
    { label: "Hours", value: left ? pad(left.hours) : "–" },
    { label: "Minutes", value: left ? pad(left.minutes) : "–" },
    { label: "Seconds", value: left ? pad(left.seconds) : "–" },
  ];

  return (
    <section id="countdown" className="bg-white px-6 py-16 lg:py-[120px]">
      <div className="mx-auto flex max-w-[726px] flex-col items-center gap-6 lg:gap-8">
        <Reveal>
          <h2 className="font-script text-[30px] leading-[1.4] text-forest lg:text-[40px] lg:leading-normal">Save the Date</h2>
        </Reveal>
        <Reveal className="w-full" delay={0.1}>
          <div
            className="flex items-center justify-center gap-2 rounded-[20px] border-[1.5px] border-[#b7d3cf] px-3 py-8 min-[390px]:gap-[14px] min-[390px]:px-[18px] sm:gap-5 lg:rounded-[32px] lg:border-2 lg:px-10 lg:py-20"
            role="timer"
            aria-live="off"
          >
            {units.map((u, i) => (
              <Fragment key={u.label}>
                {i > 0 && (
                  <>
                    <span aria-hidden className="h-9 w-px shrink-0 bg-[#b7d3cf] sm:hidden" />
                    <span aria-hidden className="hidden font-numeral text-[#b7d3cf] sm:inline sm:text-[52px] sm:leading-[64px] lg:text-[72px] lg:leading-[80px]">
                      |
                    </span>
                  </>
                )}
                <div className="flex min-w-0 flex-1 flex-col items-center gap-[6px] text-center sm:w-[88px] sm:flex-none sm:gap-0 lg:w-[116px]">
                  <span className="font-numeral text-[38px] leading-[1.1] tabular-nums text-forest sm:text-[52px] sm:leading-[64px] lg:text-[72px] lg:leading-[80px]">
                    {u.value}
                  </span>
                  <span className="text-[11px] leading-[1.366] text-muted lg:text-[14px] lg:leading-[1.5]">{u.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
