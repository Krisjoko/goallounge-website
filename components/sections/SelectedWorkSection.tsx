"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/constants";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

export default function SelectedWorkSection() {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = PROJECTS.length - visibleCount;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section id="selected-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="section-label mb-4">Selected Work</div>
            <h2 className="font-display text-4xl font-normal text-[#E0DDD8] md:text-5xl">
              Work we&rsquo;re proud to walk you through.
            </h2>
          </div>
          <div className="mt-1 flex shrink-0 items-center gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              aria-label="Previous project"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              aria-label="Next project"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-400 ease-in-out"
            style={{
              transform: `translateX(calc(-${index} * (calc(100% / ${visibleCount} + 5.3px))))`,
            }}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="group relative min-w-[calc(33.333%-11px)] overflow-hidden rounded-xl bg-[#222222]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full bg-[#2A2A2A]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => {}}
                  />
                  {/* Fallback label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-widest text-[#4A4740] uppercase">
                      Image
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-sans text-base font-medium text-[#E0DDD8]">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-wide text-[#706D66]">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IP bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl bg-[#222222] p-6 md:flex-row md:items-center">
          <p className="max-w-xl font-sans text-sm leading-relaxed text-[#706D66]">
            To protect our clients&rsquo; IP, we share work in person. Book a
            30-minute walkthrough, and we will share live screen recordings of
            projects, processes, and outcomes.
          </p>
          <a
            href={BOOKING_URL}
            target={BOOKING_URL.startsWith("http") ? "_blank" : undefined}
            rel={BOOKING_URL.startsWith("http") ? "noopener noreferrer" : undefined}
            className="shrink-0 rounded-full border border-[#4A4740] px-6 py-2.5 font-mono text-[10px] tracking-widest text-[#E0DDD8] uppercase transition-colors hover:border-[#706D66]"
          >
            Book a Walkthrough →
          </a>
        </div>
      </div>
    </section>
  );
}
