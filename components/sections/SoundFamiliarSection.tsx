"use client";

import { useRef, useState } from "react";
import { PROBLEM_CARDS } from "@/lib/constants";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4822] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]";

type Card = (typeof PROBLEM_CARDS)[number];

function ProblemCardItem({ card, inCarousel }: { card: Card; inCarousel: boolean }) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl bg-[#222222] p-6 ${
        inCarousel ? "min-w-[calc(33.333%-11px)]" : ""
      }`}
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FF4822]" />
          <span className="font-mono text-[10px] text-[#FF4822]">
            #{card.number}
          </span>
        </div>
        <h3 className="mb-6 font-sans text-base font-medium leading-snug text-[#E0DDD8]">
          {card.title}
        </h3>
      </div>
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.15em] uppercase text-[#FF4822]">
          Sounds Like
        </p>
        <p className="font-sans text-sm italic leading-relaxed text-[#8A857C]">
          &ldquo;{card.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function SoundFamiliarSection() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const visibleCount = 3;
  const maxIndex = PROBLEM_CARDS.length - visibleCount;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section id="sound-familiar" className="px-6 py-16 md:py-20 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="section-label mb-4">Sound Familiar?</div>
            <h2 className="font-hero-serif mb-2 text-4xl font-normal leading-[1.1] text-[#E0DDD8] md:text-5xl">
              These are the patterns
              <br />
              we keep seeing.
            </h2>
          </div>

          {/* Arrows — desktop carousel only */}
          <div className="mt-1 hidden shrink-0 items-center gap-2 lg:flex">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous"
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#8A857C] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30 ${focusRing}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next"
              className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#8A857C] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30 ${focusRing}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile + tablet: stacked grid (1 col below md, 2 col at md) */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
          {PROBLEM_CARDS.map((card) => (
            <ProblemCardItem key={card.number} card={card} inCarousel={false} />
          ))}
        </div>

        {/* Desktop: 3-up carousel */}
        <div className="hidden overflow-hidden lg:block" ref={trackRef}>
          <div
            className="flex gap-4 transition-transform duration-400 ease-in-out"
            style={{ transform: `translateX(calc(-${index} * (calc(100% / ${visibleCount} + 5.3px))))` }}
          >
            {PROBLEM_CARDS.map((card) => (
              <ProblemCardItem key={card.number} card={card} inCarousel={true} />
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-12 text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-4 block h-1.5 w-1.5 rounded-full bg-[#FF4822]"
          />
          <p className="font-hero-serif mx-auto max-w-xl text-2xl font-normal leading-tight text-[#E0DDD8] md:text-3xl">
            It costs more. It lands later.
          </p>
          <a
            href="#how-we-work"
            className={`mt-3 inline-flex items-center gap-2 rounded font-sans text-sm text-[#8A857C] transition-colors hover:text-[#E0DDD8] md:text-base ${focusRing}`}
          >
            <span>We built Goallounge to stop both.</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
