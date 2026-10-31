import { Reveal } from "@/components/motion/Reveal";
import { families as f } from "@/lib/content";

const label =
  "text-[10px] font-semibold uppercase leading-[1.7] lg:text-[13px] lg:font-bold lg:leading-[18px] lg:tracking-[2px]";
const script = "font-script text-[22px] leading-[1.4] lg:text-[24px] lg:leading-normal";
const house = "text-[12px] leading-[1.65] lg:text-[14px] lg:font-bold lg:leading-[1.6]";
const name = "font-display leading-[1.12] lg:text-[40px] lg:font-bold lg:leading-normal";

export function Families() {
  return (
    <section id="families" className="bg-white px-6 pb-16 lg:px-[120px] lg:pb-[120px]">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center text-center text-forest">
        <Reveal className="flex flex-col items-center">
          <p className={label}>{f.grandparentsLabel}</p>
          <p className={`mt-3 lg:mt-4 ${script}`}>{f.grandparents}</p>
          <p className={`mt-7 lg:mt-12 ${label}`}>{f.parentsLabel}</p>
          <p className={`mt-3 lg:mt-4 ${script}`}>{f.parents}</p>
          <p className={`mt-3 lg:mt-10 ${house}`}>{f.groomHouse}</p>
          <p className="mt-3 font-script text-[20px] leading-[1.4] lg:mt-6 lg:leading-normal">{f.request}</p>
        </Reveal>

        <Reveal className="flex flex-col items-center" delay={0.1}>
          <h2 className={`mt-7 text-[31px] lg:mt-8 ${name}`}>{f.groom}</h2>
          <p className={`mt-7 lg:mt-8 ${label}`}>{f.joiner}</p>
          <h2 className={`mt-7 text-[33px] lg:mt-8 ${name}`}>{f.bride}</h2>
        </Reveal>

        <Reveal className="flex flex-col items-center" delay={0.15}>
          <p className={`mt-7 lg:mt-8 ${script}`}>{f.brideParents}</p>
          <div className="mt-4 font-script text-[21px] leading-[1.4] lg:text-[24px] lg:leading-normal">
            {f.brideGrandparents.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className={`mt-4 lg:mt-10 ${house}`}>{f.brideHouse}</p>
        </Reveal>
      </div>
    </section>
  );
}
