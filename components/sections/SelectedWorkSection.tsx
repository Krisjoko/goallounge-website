"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { WORK_CATEGORIES } from "@/lib/constants";
import type { WorkCategory } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

function NavBtn({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
        disabled
          ? "border-[#2A2A2A] text-[#2A2A2A]"
          : "border-[#4A4740] text-[#706D66] hover:border-[#706D66] hover:text-[#E0DDD8]"
      }`}
    >
      {dir === "prev" ? (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

function CategoryCarousel({ category }: { category: WorkCategory }) {
  const [shownIdx, setShownIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const brand = category.brands[shownIdx];
  const total = category.brands.length;

  function go(target: number) {
    if (busyRef.current) return;
    if (target === shownIdx || target < 0 || target >= total) return;
    busyRef.current = true;

    const el = cardRef.current;
    if (!el) {
      busyRef.current = false;
      return;
    }

    // Phase 1: flip away (top edge tips toward viewer, card rotates down and away)
    el.style.transition = "transform 0.14s ease-in";
    el.style.transform = "rotateX(-82deg)";

    setTimeout(() => {
      // Swap content
      setShownIdx(target);
      // Instantly position card behind (rotated up, about to come forward)
      el.style.transition = "none";
      el.style.transform = "rotateX(76deg)";

      // Phase 2: flip into view
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "transform 0.14s ease-out";
          el.style.transform = "rotateX(0deg)";
          setTimeout(() => {
            busyRef.current = false;
          }, 150);
        });
      });
    }, 150);
  }

  return (
    <div>
      {/* Category header + nav */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="section-label mb-1.5">{category.name}</div>
          <p className="font-sans text-xs text-[#706D66]">{category.tagline}</p>
        </div>
        {total > 1 && (
          <div className="flex shrink-0 items-center gap-2">
            <span className="font-mono text-[10px] tracking-widest text-[#4A4740]">
              {String(shownIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <NavBtn
              dir="prev"
              onClick={() => go(shownIdx - 1)}
              disabled={shownIdx === 0}
            />
            <NavBtn
              dir="next"
              onClick={() => go(shownIdx + 1)}
              disabled={shownIdx >= total - 1}
            />
          </div>
        )}
      </div>

      {/* Rolodex flip card */}
      <div style={{ perspective: "900px" }}>
        <div
          ref={cardRef}
          style={{ transformOrigin: "center 40%", willChange: "transform" }}
        >
          <div
            className="overflow-hidden rounded-2xl border border-[#4A4740]/40 bg-[#1E1E1E]"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}
          >
            {/* Visual area */}
            <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F]">
              {/* Placeholder letters */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-hero-serif select-none text-[100px] leading-none tracking-[.06em] text-[#3A3A3A] md:text-[160px]">
                  {brand.placeholder}
                </span>
              </div>

              {/* Project image (when available) */}
              {brand.image && (
                <Image
                  src={brand.image}
                  alt={brand.client}
                  fill
                  className="object-cover opacity-40"
                  onError={() => {}}
                />
              )}

              {/* Outcome overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent px-5 pb-5 pt-12">
                <p className="font-sans text-sm leading-snug text-[#E0DDD8]">
                  {brand.outcome}
                </p>
              </div>
            </div>

            {/* Meta bar */}
            <div className="flex items-center justify-between border-t border-[#4A4740]/30 bg-[#181818] px-5 py-3.5">
              <span className="font-mono text-[10px] tracking-[.22em] uppercase text-[#FF4822]">
                {category.name}
              </span>
              {total > 1 && (
                <div className="flex gap-1.5">
                  {category.brands.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i)}
                      aria-label={`Go to item ${i + 1}`}
                      style={{
                        height: 4,
                        width: i === shownIdx ? 20 : 8,
                        borderRadius: 999,
                        background: i === shownIdx ? "#FF4822" : "#4A4740",
                        border: "none",
                        padding: 0,
                        transition: "all 0.25s",
                        cursor: i === shownIdx ? "default" : "pointer",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section id="selected-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label mb-4">Selected Work</div>
          <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
            Work we are proud to walk you through.
          </h2>
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
            Each project is listed with the business outcome that mattered, not
            the deliverable.
          </p>
        </div>

        {/* Category carousels */}
        <div className="space-y-20">
          {WORK_CATEGORIES.map((cat) => (
            <CategoryCarousel key={cat.id} category={cat} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 rounded-xl bg-[#222222] p-6 md:flex-row md:items-center">
          <p className="max-w-xl font-sans text-sm leading-relaxed text-[#706D66]">
            We walk you through the work live. Projects, process, outcomes — in
            a 30-minute call.
          </p>
          <CircleCta
            href={BOOKING_URL}
            label="Book a Walkthrough"
            variant="primary"
            className="shrink-0"
          />
        </div>
      </div>
    </section>
  );
}
