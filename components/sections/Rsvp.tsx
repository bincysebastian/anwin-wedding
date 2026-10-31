"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { images, site, warmestWishes } from "@/lib/content";
import { submitRsvp, type RsvpBody } from "@/lib/rsvp";

type FormState = RsvpBody;

const initial: FormState = {
  attending: null,
  firstName: "",
  lastName: "",
  mobile: "",
  guests: "",
  side: null,
  dietary: "",
};

const ease = [0.22, 1, 0.36, 1] as const;

const MAX_GUESTS = 20;

function Choice({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      animate={{
        borderColor: selected ? "#334b47" : "#e0e2dc",
        backgroundColor: selected ? "#f4f2ed" : "#fffefa",
      }}
      transition={{ duration: 0.3 }}
      className={`rounded-[10px] border uppercase text-forest ${className ?? ""}`}
    >
      {children}
    </motion.button>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[1.7px] text-forest">{label}</span>
      <input
        {...rest}
        className="h-12 rounded-[10px] border border-[#e0e2dc] bg-cream px-4 text-[15px] text-forest outline-none transition-colors placeholder:text-[#a9b0ad] focus:border-forest"
      />
    </label>
  );
}

function StepHeading({ title, copy }: { title: ReactNode; copy: string }) {
  return (
    <div className="flex flex-col gap-[18px] lg:gap-6">
      <h3 className="font-display text-[39px] leading-[1.12] text-forest lg:text-[52px] lg:leading-[1.05]">{title}</h3>
      <p className="text-[14px] leading-[1.65] text-muted lg:text-[15px] lg:leading-[1.6]">{copy}</p>
    </div>
  );
}

export function Rsvp() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const guestCount = Number(form.guests);
  const guestsValid =
    form.attending === "no" || (Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= MAX_GUESTS);

  const canContinue =
    step === 0
      ? form.attending !== null
      : step === 1
        ? Boolean(form.firstName.trim() && form.lastName.trim() && form.mobile.trim() && guestsValid)
        : form.side !== null;

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitRsvp(form);
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="bg-sand px-6 py-16 lg:p-[120px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 lg:gap-[72px]">
        <div className="flex flex-col items-center text-center text-forest">
          <Reveal className="flex flex-col items-center">
            <p className="text-[10px] font-semibold uppercase leading-[1.7] lg:text-[13px] lg:font-bold lg:leading-[18px] lg:tracking-[2px]">
              {warmestWishes.label}
            </p>
            <div className="mt-3 flex flex-col gap-3 font-script text-[22px] leading-[1.4] lg:mt-6 lg:gap-[10px] lg:text-[24px] lg:leading-[1.25]">
              {warmestWishes.names.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
            <Image src={images.ornamentMobile} alt="" width={280} height={28} className="mt-10 lg:hidden" />
            <Image src={images.ornament} alt="" width={392} height={39} className="mt-12 hidden h-auto w-[392px] lg:block" />
          </Reveal>
          <Reveal className="flex flex-col items-center" delay={0.1}>
            <h2 className="mt-10 font-display text-[32px] leading-[1.12] lg:mt-12 lg:text-[39px] lg:leading-normal">{warmestWishes.title}</h2>
            <div className="mt-5 flex max-w-[438px] flex-col gap-5 text-[14px] leading-[1.65] text-muted lg:gap-3 lg:leading-[1.6] lg:text-[#8a9693]">
              {warmestWishes.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </Reveal>
          <h2 className="mt-10 font-display text-[35px] leading-[1.12] lg:mt-[72px] lg:text-[72px] lg:leading-[80px]">
            <span className="flex flex-col items-center lg:hidden">
              {["Anwin Sony", "&", "Bia Maria Jacob"].map((line, i) => (
                <SplitText key={line} text={line} inView delay={i * 0.08} />
              ))}
            </span>
            <span className="hidden lg:inline">
              <SplitText text={warmestWishes.couple} inView />
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          <Reveal className="relative flex h-[470px] flex-col justify-end overflow-hidden rounded-[20px] p-6 lg:h-[700px] lg:flex-1 lg:p-12 lg:pb-[62px]">
            <motion.div
              className="absolute inset-0"
              initial={reduce ? undefined : { scale: 1.12 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
            >
              <Image
                src={images.invitation}
                alt="Anwin and Bia in a mountain meadow"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </motion.div>
            <Image
              src={images.invitationScrimMobile}
              alt=""
              width={342}
              height={250}
              className="absolute bottom-0 left-0 h-[250px] w-full lg:hidden"
            />
            <Image
              src={images.invitationGradient}
              alt=""
              width={588}
              height={392}
              className="absolute bottom-0 left-0 hidden h-[56%] w-full lg:block"
            />
            <div className="relative flex flex-col gap-[10px] text-cream lg:gap-0">
              <p className="text-[10px] lg:text-[12px]">{site.weddingDateShort}</p>
              <p className="font-display text-[36px] leading-[1.12] lg:text-[58px] lg:leading-[1.15]">
                {site.invitationTitle}
              </p>
              <p className="text-[12px] leading-[1.65] lg:text-[14px] lg:leading-[1.6]">{site.church}</p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col gap-[30px] overflow-hidden rounded-[20px] bg-cream p-6 lg:h-[700px] lg:flex-1 lg:justify-between lg:gap-0 lg:px-12 lg:py-[70px]"
          >
            {submitted ? (
              <motion.div
                className="flex flex-1 flex-col items-center justify-center gap-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <motion.span
                  className="flex size-16 items-center justify-center rounded-full bg-forest"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
                >
                  <Image src={images.sealSparkle} alt="" width={28} height={28} className="invert" />
                </motion.span>
                <p className="text-[11px] uppercase tracking-[2px] text-muted lg:text-[13px]">RSVP Received</p>
                <h3 className="font-display text-[38px] leading-[1.1] text-forest lg:text-[52px] lg:leading-[1.05]">
                  Thank you for your response.
                </h3>
                <p className="text-[15px] leading-[1.65] text-muted">
                  Your RSVP has been received.
                  <br />
                  We look forward to celebrating with you.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="relative h-9 lg:h-10">
                  <div className="flex justify-between text-[11px] lg:text-[13px] lg:leading-[18px]">
                    <span className="text-[10px] uppercase text-forest lg:text-[13px] lg:tracking-[2px]">Your Response</span>
                    <span className="text-muted">{String(step + 1).padStart(2, "0")} / 03</span>
                  </div>
                  <div className="absolute top-[35px] h-px w-full bg-[#e4e5e0] lg:top-[38px]">
                    <motion.div
                      className="h-px bg-[#7e8b85]"
                      initial={false}
                      animate={{ width: `${((step + 1) / 3) * 100}%` }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </div>
                </div>

                <div className="relative flex-1 lg:flex lg:flex-col lg:justify-center">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={step}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -40 }}
                      transition={{ duration: 0.45, ease }}
                      className="flex flex-col gap-[30px] lg:gap-12"
                    >
                      {step === 0 && (
                        <>
                          <StepHeading
                            title={
                              <>
                                Will you be
                                <br />
                                joining us?
                              </>
                            }
                            copy="Your presence would mean the world. Let us know if we should save you a seat."
                          />
                          <div className="flex gap-3">
                            {(
                              [
                                ["yes", "Joyfully Accepts", images.faceHappy],
                                ["no", "Regretfully Declines", images.faceSad],
                              ] as const
                            ).map(([value, label, face]) => (
                              <Choice
                                key={value}
                                selected={form.attending === value}
                                onClick={() =>
                                  setForm((f) => ({ ...f, attending: value, guests: value === "no" ? "" : f.guests }))
                                }
                                className="flex min-h-[126px] min-w-0 flex-1 flex-col items-center gap-4 px-2 py-5 text-[10px] leading-[1.6] lg:h-[146px] lg:justify-center lg:gap-5 lg:py-0 lg:text-[12px] lg:leading-[1.5] lg:tracking-[1.7px]"
                              >
                                <motion.span
                                  animate={form.attending === value ? { rotate: [0, -12, 12, 0], scale: 1.15 } : { scale: 1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <Image src={face} alt="" width={28} height={28} />
                                </motion.span>
                                {label}
                              </Choice>
                            ))}
                          </div>
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <StepHeading
                            title="Who should we expect?"
                            copy="Tell us who is responding so we can prepare your place."
                          />
                          <div className="flex flex-col gap-4">
                            <div className="grid gap-4 lg:grid-cols-2">
                              <Field
                                label="First Name"
                                value={form.firstName}
                                autoComplete="given-name"
                                onChange={(e) => update("firstName", e.target.value)}
                              />
                              <Field
                                label="Last Name"
                                value={form.lastName}
                                autoComplete="family-name"
                                onChange={(e) => update("lastName", e.target.value)}
                              />
                            </div>
                            <Field
                              label="Mobile Number"
                              type="tel"
                              value={form.mobile}
                              autoComplete="tel"
                              onChange={(e) => update("mobile", e.target.value)}
                            />
                            {form.attending === "yes" && (
                              <Field
                                label="Total members attending"
                                type="text"
                                inputMode="numeric"
                                placeholder="e.g. 2"
                                value={form.guests}
                                onChange={(e) => update("guests", e.target.value.replace(/\D/g, "").slice(0, 2))}
                              />
                            )}
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <StepHeading
                            title="A few final details."
                            copy="The thoughtful little things help us make the evening perfect for everyone."
                          />
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <span className="text-[11px] uppercase tracking-[1.7px] text-forest">
                                How do you know the couple?
                              </span>
                              <div className="grid grid-cols-3 gap-3">
                                {(
                                  [
                                    ["bia", "Bia’s Side"],
                                    ["anwin", "Anwin’s Side"],
                                    ["both", "Both Sides"],
                                  ] as const
                                ).map(([value, label]) => (
                                  <Choice
                                    key={value}
                                    selected={form.side === value}
                                    onClick={() => update("side", value)}
                                    className="h-12 px-2 text-[11px] lg:tracking-[1.2px]"
                                  >
                                    {label}
                                  </Choice>
                                ))}
                              </div>
                            </div>
                            <Field
                              label="Dietary requirements"
                              placeholder="Optional"
                              value={form.dietary}
                              onChange={(e) => update("dietary", e.target.value)}
                            />
                          </div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {error && <p className="text-[13px] text-[#bd6843]">{error}</p>}

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => go(step - 1)}
                    className={`text-[11px] uppercase tracking-[2px] text-muted transition-opacity hover:text-forest lg:text-[12px] ${
                      step === 0 ? "pointer-events-none opacity-0" : ""
                    }`}
                  >
                    Back
                  </button>
                  <motion.button
                    type="button"
                    disabled={!canContinue || loading}
                    onClick={() => (step < 2 ? go(step + 1) : submit())}
                    whileHover={canContinue ? { scale: 1.03 } : undefined}
                    whileTap={canContinue ? { scale: 0.97 } : undefined}
                    className="group flex h-[50px] items-center gap-3 rounded-full bg-forest pl-3 pr-[22px] text-[11px] font-medium uppercase text-cream transition-opacity disabled:opacity-40 lg:pl-[14px] lg:pr-6 lg:text-[12px] lg:tracking-[2px]"
                  >
                    <span className="flex size-[26px] items-center justify-center rounded-full bg-cream transition-transform duration-300 group-hover:rotate-45">
                      <Image src={images.arrowUpRight} alt="" width={14} height={14} />
                    </span>
                    {step < 2 ? "Continue" : loading ? "Sending…" : "Confirm RSVP"}
                  </motion.button>
                </div>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
