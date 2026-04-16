"use client";

import { useRef, useState } from "react";
import { PROBLEM_CARDS } from "@/lib/constants";

export default function SoundFamiliarSection() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3;
  const maxIndex = PROBLEM_CARDS.length - visibleCount;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section id="sound-familiar" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="section-label mb-4">Sound Familiar?</div>
            <h2 className="font-display mb-2 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
              Sound familiar?
            </h2>
            <p className="font-sans text-sm text-[#706D66]">
              We&apos;ve heard this before.
            </p>
            <p className="font-sans text-sm text-[#706D66]">
              These are the signals that bring customers to us.
            </p>
          </div>

          {/* Arrows */}
          <div className="mt-1 flex shrink-0 items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="overflow-hidden" ref={trackRef}>
          <div
            className="flex gap-4 transition-transform duration-400 ease-in-out"
            style={{ transform: `translateX(calc(-${index} * (calc(100% / ${visibleCount} + 5.3px))))` }}
          >
            {PROBLEM_CARDS.map((card) => (
              <div
                key={card.number}
                className="flex min-w-[calc(33.333%-11px)] flex-col justify-between rounded-xl bg-[#222222] p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F86223]" />
                    <span className="font-mono text-[10px] text-[#F86223]">
                      #{card.number}
                    </span>
                  </div>
                  <h3 className="mb-6 font-sans text-base font-medium leading-snug text-[#E0DDD8]">
                    {card.title}
                  </h3>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[9px] tracking-[0.15em] uppercase text-[#F86223]">
                    Sounds Like
                  </p>
                  <p className="font-sans text-sm italic leading-relaxed text-[#706D66]">
                    &ldquo;{card.quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 border-t border-[#4A4740]/30 pt-12 text-center">
          <p className="font-display mx-auto max-w-3xl text-2xl font-normal leading-snug text-[#E0DDD8] md:text-3xl">
            When strategy, positioning and design don&rsquo;t speak the same language,
            everything costs more and lands softer.
          </p>
        </div>
      </div>
    </section>
  );
}
