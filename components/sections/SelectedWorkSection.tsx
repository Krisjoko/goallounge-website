"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { PROJECTS, DISCIPLINES } from "@/lib/constants";
import type { Discipline } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";
const CARD_W = 680;
const GAP = 24;

type Tab = "All" | Discipline;
const TABS: Tab[] = ["All", ...DISCIPLINES];

function ArrowBtn({
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
      aria-label={dir === "prev" ? "Previous project" : "Next project"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        disabled
          ? "border-[#2A2A2A] text-[#2A2A2A]"
          : "border-[#4A4740] text-[#706D66] hover:border-[#706D66] hover:text-[#E0DDD8]"
      }`}
    >
      {dir === "prev" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

export default function SelectedWorkSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [idx, setIdx] = useState(0);
  const [openId, setOpenId] = useState<number | null>(null);
  const [drag, setDrag] = useState({ on: false, sx: 0, dx: 0 });

  const filtered =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.discipline === activeTab);

  useEffect(() => { setIdx(0); }, [activeTab]);

  const openProject = openId != null ? filtered.find((p) => p.id === openId) ?? null : null;
  const openIdx = openProject ? filtered.findIndex((p) => p.id === openId) : -1;

  useEffect(() => {
    if (!openProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowLeft" && openIdx > 0) setOpenId(filtered[openIdx - 1].id);
      if (e.key === "ArrowRight" && openIdx < filtered.length - 1)
        setOpenId(filtered[openIdx + 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openProject, openIdx, filtered]);

  const go = useCallback(
    (d: number) => setIdx((i) => Math.max(0, Math.min(filtered.length - 1, i + d))),
    [filtered.length]
  );

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDrag({ on: true, sx: x, dx: 0 });
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drag.on) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDrag((d) => ({ ...d, dx: x - d.sx }));
  };
  const onUp = () => {
    if (!drag.on) return;
    if (drag.dx > 70) go(-1);
    else if (drag.dx < -70) go(1);
    setDrag({ on: false, sx: 0, dx: 0 });
  };

  return (
    <section id="selected-work" className="overflow-hidden py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <div className="section-label mb-4">Selected Work</div>
          <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
            Work we are proud to walk you through.
          </h2>
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
            Each project is listed with the business outcome that mattered, not the deliverable.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                activeTab === tab
                  ? "bg-[#FF4822] text-white"
                  : "border border-[#4A4740] text-[#706D66] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Index markers */}
      <div className="mx-auto mb-5 flex max-w-7xl justify-center gap-60 px-6 font-mono text-[10px] tracking-widest text-[#4A4740]">
        {filtered[idx - 1] && <span>{String(idx).padStart(2, "0")}</span>}
        <span className="flex flex-col items-center gap-1 text-[#FF4822]">
          <span>{String(idx + 1).padStart(2, "0")}</span>
          <span className="h-px w-5 bg-[#FF4822]" />
        </span>
        {filtered[idx + 1] && <span>{String(idx + 2).padStart(2, "0")}</span>}
      </div>

      {/* Carousel track */}
      <div
        className={`relative h-[460px] w-full select-none ${drag.on ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onTouchStart={onDown}
        onTouchMove={onMove}
        onTouchEnd={onUp}
      >
        {filtered.map((p, i) => {
          const offset = i - idx;
          const abs = Math.abs(offset);
          const translateX = offset * (CARD_W + GAP) + (drag.on ? drag.dx * 0.8 : 0);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.72;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.18;
          const zIndex = 10 - abs;

          return (
            <div
              key={p.id}
              onClick={() => {
                if (Math.abs(drag.dx) < 5) {
                  if (abs === 0) setOpenId(p.id);
                  else setIdx(i);
                }
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: CARD_W,
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                transition: drag.on
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s",
                opacity,
                zIndex,
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
            >
              <div
                className="overflow-hidden rounded-2xl border border-[#4A4740]/40 bg-[#1E1E1E]"
                style={{ boxShadow: abs === 0 ? "0 30px 80px rgba(0,0,0,0.5)" : "none" }}
              >
                {/* Image / placeholder area */}
                <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F]">
                  {/* top-right arrow */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740]/50 bg-[#1A1A1A]/80 text-[#E0DDD8] backdrop-blur-sm">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path
                        d="M3 8L8 3M8 3H4M8 3V7"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {p.images[0] ? (
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      className="object-cover"
                      onError={() => {}}
                    />
                  ) : null}
                  <span className="font-hero-serif select-none text-[96px] leading-none text-[#3A3A3A] tracking-[.06em]">
                    {p.placeholder}
                  </span>
                  <span className="absolute bottom-3.5 left-3.5 font-mono text-[9px] tracking-[.2em] text-[#4A4740] uppercase">
                    Image
                  </span>
                </div>

                {/* Meta bar */}
                <div className="flex items-center gap-3 border-t border-[#4A4740]/30 bg-[#181818] px-5 py-3.5">
                  <span className="font-mono text-[10px] tracking-[.22em] text-[#FF4822] uppercase">
                    {p.name}
                  </span>
                  <span className="flex gap-0.5 text-[#4A4740]">
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                  </span>
                  <span className="flex-1 font-mono text-[10px] tracking-[.22em] text-[#706D66] uppercase">
                    {p.discipline}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#706D66]">
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none">
                      <path
                        d="M6 10C6 10 1 7 1 3.5C1 2 2.2 1 3.5 1C4.5 1 5.5 1.8 6 2.5C6.5 1.8 7.5 1 8.5 1C9.8 1 11 2 11 3.5C11 7 6 10 6 10Z"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {10 + i}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6">
        <div className="flex gap-2">
          <ArrowBtn dir="prev" onClick={() => go(-1)} disabled={idx === 0} />
          <ArrowBtn dir="next" onClick={() => go(1)} disabled={idx >= filtered.length - 1} />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  height: 4,
                  width: i === idx ? 28 : 12,
                  borderRadius: 999,
                  background: i === idx ? "#FF4822" : "#4A4740",
                  border: "none",
                  padding: 0,
                  transition: "all 0.25s",
                }}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[#4A4740]">
            {String(idx + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
        <CircleCta href={BOOKING_URL} label="Book a Walkthrough" variant="primary" />
      </div>

      {/* Modal */}
      {openProject && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#111111] backdrop-blur-sm">
          <button
            onClick={() => setOpenId(null)}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1L11 11M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {openIdx > 0 && (
            <button
              onClick={() => setOpenId(filtered[openIdx - 1].id)}
              aria-label="Previous project"
              className="absolute left-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {openIdx < filtered.length - 1 && (
            <button
              onClick={() => setOpenId(filtered[openIdx + 1].id)}
              aria-label="Next project"
              className="absolute right-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 4L10 8L6 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <div className="flex flex-1 items-center justify-center overflow-hidden px-20 pt-16 pb-4">
            <div className="flex h-full w-full max-w-[1100px] items-center justify-center rounded-xl bg-[#2A2A2A]">
              <span className="font-hero-serif select-none text-[180px] leading-none text-[#4A4740]">
                {openProject.placeholder}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-8 border-t border-[#4A4740]/30 px-20 py-8">
            <div>
              <h3 className="font-hero-serif text-2xl font-normal text-[#E0DDD8] md:text-3xl">
                {openProject.name}
              </h3>
              <p className="mt-1 font-sans text-sm text-[#706D66]">{openProject.category}</p>
            </div>
            <div className="max-w-sm text-right">
              <p className="mb-3 font-sans text-sm leading-relaxed text-[#706D66]">
                {openProject.description}
              </p>
              <span className="inline-block rounded-full border border-[#4A4740] px-3 py-1 font-mono text-[10px] tracking-widest text-[#706D66] uppercase">
                {openProject.discipline}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
