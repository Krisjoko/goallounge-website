"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[activeIndex];
  const accentColor = current.person === "claudio" ? "#F86223" : "#22A6FF";

  return (
    <section id="client-stories" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">Client Stories</div>
        <h2 className="font-display mb-10 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          What people say
        </h2>

        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Card */}
          <div className="flex-1 overflow-hidden rounded-xl border border-[#4A4740]/40 bg-[#222222] p-8 md:p-10">
            {/* Quote mark */}
            <svg
              width="36"
              height="28"
              viewBox="0 0 36 28"
              fill="none"
              className="mb-6"
              aria-hidden
            >
              <path
                d="M0 28V16.8C0 12.24 1.12 8.48 3.36 5.52C5.68 2.56 9.04 0.72 13.44 0L15.12 3.12C12.24 3.84 10.08 5.2 8.64 7.2C7.2 9.12 6.48 11.36 6.48 13.92H13.44V28H0ZM20.88 28V16.8C20.88 12.24 22 8.48 24.24 5.52C26.56 2.56 29.92 0.72 34.32 0L36 3.12C33.12 3.84 30.96 5.2 29.52 7.2C28.08 9.12 27.36 11.36 27.36 13.92H34.32V28H20.88Z"
                fill={accentColor}
              />
            </svg>

            {/* Quote */}
            <p className="mb-8 font-sans text-base leading-relaxed text-[#E0DDD8] md:text-lg">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Attribution */}
            <div className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <div>
                <p className="font-sans text-sm font-medium text-[#E0DDD8]">
                  {current.name}
                </p>
                <p className="font-sans text-xs text-[#706D66]">{current.role}</p>
                <p className="font-mono text-[9px] tracking-wide text-[#4A4740] uppercase">
                  {current.company}
                </p>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dots + counter */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-200"
                style={{
                  width: i === activeIndex ? "24px" : "6px",
                  backgroundColor:
                    i === activeIndex
                      ? t.person === "claudio"
                        ? "#F86223"
                        : "#22A6FF"
                      : "#4A4740",
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-[#4A4740]">
            {activeIndex + 1} / {TESTIMONIALS.length}
          </span>
        </div>
      </div>
    </section>
  );
}
