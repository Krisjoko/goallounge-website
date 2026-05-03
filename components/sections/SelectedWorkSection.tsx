"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { PROJECTS, DISCIPLINES } from "@/lib/constants";
import type { Discipline } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/B1w7htWiKWX8UD2J6";
const GAP = 24;
const SLIDE_MS = 700;
const HOLD_MS = 4500;

// Shared focus-visible ring (orange against the page bg).
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4822] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]";

type Tab = "All" | Discipline;
const TABS: Tab[] = ["All", ...DISCIPLINES];

type Project = (typeof PROJECTS)[number];

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  active,
  initialLikes,
}: {
  project: Project;
  active: boolean;
  initialLikes: number;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const busyRef = useRef(false);
  const idxRef = useRef(0);
  idxRef.current = imgIdx;
  const total = project.images.length;

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
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
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

  const toggleLike = () => {
    setLiked((prev) => {
      setLikes((n) => n + (prev ? -1 : 1));
      return !prev;
    });
  };

  const renderImage = (i: number) => {
    const src = project.images[i];
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={project.name}
        fill
        className="object-cover"
        onError={() => {}}
      />
    );
  };

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#4A4740]/40 bg-[#1E1E1E]"
      style={{ boxShadow: active ? "0 30px 80px rgba(0,0,0,0.5)" : "none" }}
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0A0A0A]">
        {prevIdx !== null && (
          <div
            key={`prev-${prevIdx}-${imgIdx}`}
            className="absolute inset-0 reel-slide-out"
          >
            {renderImage(prevIdx)}
          </div>
        )}
        <div
          key={`current-${imgIdx}`}
          className={`absolute inset-0 ${prevIdx !== null ? "reel-slide-in" : ""}`}
        >
          {renderImage(imgIdx)}
        </div>

        {/* Pause / play toggle */}
        <button
          onClick={() => setPaused((p) => !p)}
          className={`group/pause absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740]/50 bg-[#1A1A1A]/80 text-[#E0DDD8] backdrop-blur-sm transition-colors hover:border-[#706D66] ${focusRing}`}
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
        >
          <span className="sr-only" aria-live="polite">
            {paused ? "Paused" : "Playing"}
          </span>
          {paused ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M2 1L9 5L2 9V1Z" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="2" height="8" rx="0.5" />
              <rect x="6" y="1" width="2" height="8" rx="0.5" />
            </svg>
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-10 top-1.5 hidden whitespace-nowrap rounded bg-[#0A0A0A]/90 px-2 py-1 font-mono text-[10px] text-[#E0DDD8] group-hover/pause:block group-focus-visible/pause:block"
          >
            {paused ? "Play" : "Pause"}
          </span>
        </button>
      </div>

      {/* Meta bar */}
      <div className="flex items-center gap-3 border-t border-[#4A4740]/30 bg-[#181818] px-5 py-3.5">
        <span className="truncate font-mono text-[10px] tracking-[.22em] uppercase text-[#FF4822]">
          {(project as { imageLabels?: string[] }).imageLabels?.[imgIdx] ?? project.name}
        </span>
        <span aria-hidden="true" className="flex gap-0.5 text-[#4A4740]">
          <span className="h-[3px] w-[3px] rounded-full bg-current" />
          <span className="h-[3px] w-[3px] rounded-full bg-current" />
          <span className="h-[3px] w-[3px] rounded-full bg-current" />
        </span>
        <span className="flex-1 font-mono text-[10px] tracking-[.22em] uppercase text-[#8A857C]">
          {project.discipline}
        </span>

        {/* Image counter — only when more than one image */}
        {total > 1 && (
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#8A857C]">
            <button
              onClick={() => slideTo(imgIdx - 1)}
              aria-label="Previous image"
              className={`flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4740]/60 transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] ${focusRing}`}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path
                  d="M5 6L3 4L5 2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="tabular-nums">
              {String(imgIdx + 1).padStart(2, "0")}
              <span className="opacity-60">/</span>
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={() => slideTo(imgIdx + 1)}
              aria-label="Next image"
              className={`flex h-5 w-5 items-center justify-center rounded-full border border-[#4A4740]/60 transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] ${focusRing}`}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path
                  d="M3 2L5 4L3 6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </span>
        )}

        {/* Heart — interactive toggle */}
        <button
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={liked ? "Unlike project" : "Like project"}
          className={`flex items-center gap-1.5 font-mono text-[10px] transition-colors ${
            liked ? "text-[#FF4822]" : "text-[#8A857C] hover:text-[#FF4822]"
          } ${focusRing}`}
        >
          <svg
            width="12"
            height="11"
            viewBox="0 0 12 11"
            fill={liked ? "#FF4822" : "none"}
            aria-hidden="true"
          >
            <path
              d="M6 10C6 10 1 7 1 3.5C1 2 2.2 1 3.5 1C4.5 1 5.5 1.8 6 2.5C6.5 1.8 7.5 1 8.5 1C9.8 1 11 2 11 3.5C11 7 6 10 6 10Z"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="tabular-nums">{likes}</span>
        </button>
      </div>
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
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${focusRing} ${
        disabled
          ? "border-[#2A2A2A] text-[#2A2A2A]"
          : "border-[#4A4740] text-[#8A857C] hover:border-[#706D66] hover:text-[#E0DDD8]"
      }`}
    >
      {dir === "prev" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
  const [cardW, setCardW] = useState(680);

  useEffect(() => {
    const computeWidth = () => {
      const w = window.innerWidth;
      if (w < 640) return Math.min(w - 48, 360);
      if (w < 1024) return 540;
      return 680;
    };
    const onResize = () => setCardW(computeWidth());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
      className="overflow-hidden py-24 md:py-[120px] lg:py-40 scroll-mt-14"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <div className="section-label mb-6 md:mb-8">Selected Work</div>
          <h2 className="font-hero-serif mb-3 text-4xl font-normal leading-[0.95] tracking-[-0.02em] text-balance text-[#E0DDD8] md:text-5xl">
            Work we are proud to walk you through.
          </h2>
          <p className="max-w-2xl font-sans text-sm leading-normal text-[#8A857C]">
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
              className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${focusRing} ${
                activeTab === tab
                  ? "bg-[#FF4822] text-white"
                  : "border border-[#4A4740] text-[#8A857C] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Index markers */}
      <div className="mx-auto mb-2 flex max-w-7xl justify-center gap-60 px-6 font-mono text-[10px] tracking-widest text-[#6F6B62]">
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

      {/* Helper: project count + drag affordance */}
      <p className="mx-auto mb-5 max-w-7xl px-6 text-center font-mono text-[10px] tracking-widest text-[#6F6B62]">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} · drag to browse
      </p>

      {/* Carousel track */}
      <div
        className={`relative h-[300px] w-full select-none sm:h-[380px] lg:h-[460px] ${
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
            offset * (cardW + GAP) + (drag.on ? drag.dx * 0.8 : 0);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.7 : 0.55;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.32 : 0.1;
          const zIndex = 10 - abs;
          const isActive = abs === 0;

          return (
            <div
              key={p.id}
              onClick={() => {
                if (Math.abs(drag.dx) < 5 && abs !== 0) setIdx(i);
              }}
              className={!isActive ? "md:[filter:blur(1px)]" : ""}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: cardW,
                transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                transition: drag.on
                  ? "none"
                  : "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s",
                opacity,
                zIndex,
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
            >
              <ProjectCard
                project={p}
                active={isActive}
                initialLikes={10 + i}
              />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 items-center gap-6 px-6 sm:grid-cols-3 sm:gap-4">
        <div className="flex justify-center sm:justify-start">
          <CircleCta
            href={BOOKING_URL}
            label="Book a Walkthrough"
            sublabel="30 min · we share the screen"
            variant="primary"
          />
        </div>
        <div className="flex justify-center gap-2">
          <ArrowBtn dir="prev" onClick={() => go(-1)} disabled={idx === 0} />
          <ArrowBtn
            dir="next"
            onClick={() => go(1)}
            disabled={idx >= filtered.length - 1}
          />
        </div>
        <div className="hidden sm:block" />
      </div>

    </section>
  );
}
