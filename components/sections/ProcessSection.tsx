"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "@/lib/constants";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4822] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]";

export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const total = PROCESS_STEPS.length;

  return (
    <section id="process" className="overflow-hidden px-6 py-16 md:py-20 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">How a Project Runs</div>
        <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          A shape you can plan around.
        </h2>
        <p className="mb-16 max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
          Eight weeks on average. Strategy and design in parallel from day one.
          No discovery phase that goes nowhere, no handover that loses the
          thread.
        </p>

        {/* ── Desktop: horizontal timeline ── */}
        <div className="hidden md:block">
          <div className="flex items-start gap-4">

            {/* Prev button */}
            <button
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
              aria-label="Previous step"
              className={`-mt-[3px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${focusRing} ${
                active === 0
                  ? "border-[#2A2A2A] text-[#2A2A2A]"
                  : "border-[#4A4740] text-[#8A857C] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Track + nodes */}
            <div className="relative flex-1">
              {/* Horizontal track line — sits at the centre of the node circles */}
              <div className="absolute left-0 right-0 top-[13px] h-px bg-[#4A4740]/40" />

              <div className="relative grid grid-cols-4">
                {PROCESS_STEPS.map((s, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={s.step}
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={`${s.step} — ${s.title}`}
                      className={`flex flex-col items-start pr-8 text-left ${focusRing}`}
                    >
                      {/* Node */}
                      <span
                        className={`relative z-10 mb-5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[#FF4822] bg-[#FF4822] shadow-[0_0_14px_rgba(255,72,34,0.45)]"
                            : "border-[#4A4740] bg-[#1A1A1A] hover:border-[#706D66]"
                        }`}
                      >
                        {/* Inner pip for inactive nodes */}
                        {!isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#4A4740]" />
                        )}
                      </span>

                      {/* Phase */}
                      <span
                        className={`mb-1.5 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                          isActive ? "text-[#FF4822]" : "text-[#4A4740]"
                        }`}
                      >
                        {s.phase}
                      </span>

                      {/* Step */}
                      <span
                        className={`mb-2 font-mono text-[9px] tracking-widest uppercase transition-colors duration-200 ${
                          isActive ? "text-[#706D66]" : "text-[#2A2A2A]"
                        }`}
                      >
                        {s.step}
                      </span>

                      {/* Title */}
                      <h3
                        className={`mb-3 font-hero-serif text-xl font-normal leading-snug transition-colors duration-200 ${
                          isActive ? "text-[#E0DDD8]" : "text-[#4A4740]"
                        }`}
                      >
                        {s.title}
                      </h3>

                      {/* Body — always in the DOM to avoid layout shift; opacity fades */}
                      <p
                        className={`font-sans text-xs leading-relaxed transition-all duration-300 ${
                          isActive
                            ? "text-[#8A857C] opacity-100"
                            : "text-[#4A4740] opacity-40"
                        }`}
                      >
                        {s.body}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={() => setActive((i) => Math.min(total - 1, i + 1))}
              disabled={active === total - 1}
              aria-label="Next step"
              className={`-mt-[3px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${focusRing} ${
                active === total - 1
                  ? "border-[#2A2A2A] text-[#2A2A2A]"
                  : "border-[#4A4740] text-[#8A857C] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="flex flex-col md:hidden">
          {PROCESS_STEPS.map((s, i) => (
            <div key={s.step} className="relative flex gap-5 pb-10 last:pb-0">
              {/* Left: track + node */}
              <div className="flex flex-col items-center">
                <span
                  className={`relative z-10 mt-0.5 flex h-3 w-3 shrink-0 rounded-full border ${
                    i === 0
                      ? "border-[#FF4822] bg-[#FF4822]"
                      : "border-[#4A4740] bg-[#1A1A1A]"
                  }`}
                />
                {i < total - 1 && (
                  <span className="mt-1 w-px flex-1 bg-[#4A4740]/40" />
                )}
              </div>
              {/* Right: content */}
              <div className="pb-1">
                <span className="mb-0.5 block font-mono text-[9px] tracking-widest uppercase text-[#4A4740]">
                  {s.phase}
                </span>
                <span className="mb-2 block font-mono text-[10px] tracking-widest uppercase text-[#FF4822]">
                  {s.step}
                </span>
                <h3 className="mb-2 font-hero-serif text-lg font-normal leading-snug text-[#E0DDD8]">
                  {s.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-[#706D66]">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
