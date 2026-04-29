"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { PROJECTS, DISCIPLINES } from "@/lib/constants";
import type { Discipline } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";
const CARD_W = 680;
const GAP = 24;
const SLIDE_MS = 900;
const HOLD_MS = 4500;

type Tab = "All" | Discipline;
const TABS: Tab[] = ["All", ...DISCIPLINES];

// ─── Reel image slider ────────────────────────────────────────────────────────

function FlipImages({
  images,
  name,
  placeholder,
  active,
  objectFit = "cover",
}: {
  images: string[];
  name: string;
  placeholder: string;
  active: boolean;
  objectFit?: "cover" | "contain";
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const busyRef = useRef(false);
  const idxRef = useRef(0);
  idxRef.current = imgIdx;
  const total = images.length;

  const slideTo = useCallback(
    (target: number) => {
      if (busyRef.current) return;
      const next = ((target % total) + total) % total;
      if (next === idxRef.current) return;
      busyRef.current = true;

      setPrevIdx(idxRef.current);
      setImgIdx(next);
      idxRef.current = next;

      setTimeout(() => {
        setPrevIdx(null);
        busyRef.current = false;
      }, SLIDE_MS);
    },
    [total]
  );

  const slideToRef = useRef(slideTo);
  slideToRef.current = slideTo;

  useEffect(() => {
    if (!active || paused || total <= 1) return;
    const id = setInterval(() => {
      slideToRef.current((idxRef.current + 1) % total);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [active, paused, total]);

  useEffect(() => {
    if (!active) {
      setImgIdx(0);
      setPrevIdx(null);
      idxRef.current = 0;
      setPaused(false);
    }
  }, [active]);

  const renderImage = (idx: number) => {
    const src = images[idx];
    if (!src) return null;
    return objectFit === "contain" ? (
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div className="relative h-full w-full">
          <Image src={src} alt={name} fill className="object-contain" onError={() => {}} />
        </div>
      </div>
    ) : (
      <Image src={src} alt={name} fill className="object-cover" onError={() => {}} />
    );
  };

  const useDots = total <= 6;

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden ${objectFit === "contain" ? "bg-[#0A0A0A]" : "bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F]"}`}
    >
      {/* Outgoing image — slides off to the left */}
      {prevIdx !== null && (
        <div key={`prev-${prevIdx}-${imgIdx}`} className="absolute inset-0 reel-slide-out">
          {renderImage(prevIdx)}
        </div>
      )}

      {/* Incoming / current image — slides in from the right */}
      <div
        key={`current-${imgIdx}`}
        className={`absolute inset-0 ${prevIdx !== null ? "reel-slide-in" : ""}`}
      >
        {renderImage(imgIdx)}
      </div>

      {/* Pause / play toggle */}
      <button
        onClick={() => setPaused((p) => !p)}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740]/50 bg-[#1A1A1A]/80 text-[#E0DDD8] backdrop-blur-sm transition-colors hover:border-[#706D66]"
        aria-label={paused ? "Resume" : "Pause"}
      >
        {paused ? (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M2 1L9 5L2 9V1Z" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <rect x="2" y="1" width="2" height="8" rx="0.5" />
            <rect x="6" y="1" width="2" height="8" rx="0.5" />
          </svg>
        )}
      </button>

      {/* Image indicator: dots for small sets, counter for large */}
      {total > 1 && (
        <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-1.5">
          {useDots ? (
            images.map((_, i) => (
              <button
                key={i}
                onClick={() => slideTo(i)}
                aria-label={`Image ${i + 1}`}
                style={{
                  height: 3,
                  width: i === imgIdx ? 14 : 5,
                  borderRadius: 999,
                  background: i === imgIdx ? "#E0DDD8" : "#4A4740",
                  border: "none",
                  padding: 0,
                  transition: "all 0.2s",
                  cursor: i === imgIdx ? "default" : "pointer",
                }}
              />
            ))
          ) : (
            <>
              <button
                onClick={() => slideTo(imgIdx - 1)}
                disabled={imgIdx === 0}
                className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4740]/60 bg-[#1A1A1A]/80 text-[#706D66] disabled:opacity-30"
                aria-label="Previous image"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M5 6L3 4L5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="font-mono text-[9px] tracking-widest text-[#706D66]">
                {String(imgIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
              </span>
              <button
                onClick={() => slideTo(imgIdx + 1)}
                disabled={imgIdx >= total - 1}
                className="flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4740]/60 bg-[#1A1A1A]/80 text-[#706D66] disabled:opacity-30"
                aria-label="Next image"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M3 2L5 4L3 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Arrow button ─────────────────────────────────────────────────────────────

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
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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

// ─── Main section ─────────────────────────────────────────────────────────────

export default function SelectedWorkSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [idx, setIdx] = useState(0);
  const [drag, setDrag] = useState({ on: false, sx: 0, dx: 0 });

  const filtered =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.discipline === activeTab);

  useEffect(() => {
    setIdx(0);
  }, [activeTab]);

  const go = useCallback(
    (d: number) =>
      setIdx((i) => Math.max(0, Math.min(filtered.length - 1, i + d))),
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
    <section
      id="selected-work"
      className="overflow-hidden py-20 md:py-28 scroll-mt-14"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <div className="section-label mb-4">Selected Work</div>
          <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
            Work we are proud to walk you through.
          </h2>
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
            Each project is listed with the business outcome that mattered, not
            the deliverable.
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
        {filtered[idx - 1] && (
          <span>{String(idx).padStart(2, "0")}</span>
        )}
        <span className="flex flex-col items-center gap-1 text-[#FF4822]">
          <span>{String(idx + 1).padStart(2, "0")}</span>
          <span className="h-px w-5 bg-[#FF4822]" />
        </span>
        {filtered[idx + 1] && (
          <span>{String(idx + 2).padStart(2, "0")}</span>
        )}
      </div>

      {/* Carousel track */}
      <div
        className={`relative h-[460px] w-full select-none ${
          drag.on ? "cursor-grabbing" : "cursor-grab"
        }`}
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
          const translateX =
            offset * (CARD_W + GAP) + (drag.on ? drag.dx * 0.8 : 0);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.86 : 0.72;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0.18;
          const zIndex = 10 - abs;
          const isActive = abs === 0;

          return (
            <div
              key={p.id}
              onClick={() => {
                if (Math.abs(drag.dx) < 5 && abs !== 0) setIdx(i);
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
                style={{
                  boxShadow: isActive
                    ? "0 30px 80px rgba(0,0,0,0.5)"
                    : "none",
                }}
              >
                <FlipImages
                  images={p.images}
                  name={p.name}
                  placeholder={p.placeholder}
                  active={isActive}
                  objectFit={p.discipline === "Logo Design" ? "contain" : "cover"}
                />

                {/* Meta bar */}
                <div className="flex items-center gap-3 border-t border-[#4A4740]/30 bg-[#181818] px-5 py-3.5">
                  <span className="font-mono text-[10px] tracking-[.22em] uppercase text-[#FF4822]">
                    {p.name}
                  </span>
                  <span className="flex gap-0.5 text-[#4A4740]">
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                    <span className="h-[3px] w-[3px] rounded-full bg-current" />
                  </span>
                  <span className="flex-1 font-mono text-[10px] tracking-[.22em] uppercase text-[#706D66]">
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
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-3 items-center gap-4 px-6">
        <div />
        <div className="flex justify-center gap-2">
          <ArrowBtn dir="prev" onClick={() => go(-1)} disabled={idx === 0} />
          <ArrowBtn
            dir="next"
            onClick={() => go(1)}
            disabled={idx >= filtered.length - 1}
          />
        </div>
        <div className="flex justify-end">
          <CircleCta
            href={BOOKING_URL}
            label="Book a Walkthrough"
            variant="primary"
          />
        </div>
      </div>

    </section>
  );
}
