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

// ─── Rolodex image flipper ────────────────────────────────────────────────────

function FlipImages({
  images,
  name,
  placeholder,
  active,
  objectFit = "cover",
  onExpand,
}: {
  images: string[];
  name: string;
  placeholder: string;
  active: boolean;
  objectFit?: "cover" | "contain";
  onExpand: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const idxRef = useRef(0);
  idxRef.current = imgIdx;
  const total = images.length;

  const flipTo = useCallback(
    (target: number) => {
      if (busyRef.current || !innerRef.current) return;
      const next = ((target % total) + total) % total;
      if (next === idxRef.current) return;
      busyRef.current = true;
      const el = innerRef.current;

      el.style.transition = "transform 0.13s ease-in";
      el.style.transform = "rotateX(-86deg)";

      setTimeout(() => {
        setImgIdx(next);
        idxRef.current = next;
        el.style.transition = "none";
        el.style.transform = "rotateX(74deg)";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = "transform 0.13s ease-out";
            el.style.transform = "rotateX(0deg)";
            setTimeout(() => {
              busyRef.current = false;
            }, 140);
          });
        });
      }, 140);
    },
    [total]
  );

  const flipToRef = useRef(flipTo);
  flipToRef.current = flipTo;

  useEffect(() => {
    if (!active || total <= 1) return;
    const id = setInterval(() => {
      flipToRef.current((idxRef.current + 1) % total);
    }, 2200);
    return () => clearInterval(id);
  }, [active, total]);

  useEffect(() => {
    if (!active) {
      setImgIdx(0);
      idxRef.current = 0;
    }
  }, [active]);

  const src = images[imgIdx];
  const useDots = total <= 6;

  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden ${objectFit === "contain" ? "bg-[#0A0A0A]" : "bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F]"}`}
      style={{ perspective: "900px" }}
    >
      {/* Rotating layer */}
      <div
        ref={innerRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformOrigin: "center 40%", willChange: "transform" }}
      >
        {src && (
          objectFit === "contain" ? (
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div className="relative h-full w-full">
                <Image
                  src={src}
                  alt={name}
                  fill
                  className="object-contain"
                  onError={() => {}}
                />
              </div>
            </div>
          ) : (
            <Image
              src={src}
              alt={name}
              fill
              className="object-cover"
              onError={() => {}}
            />
          )
        )}
        <span className="font-hero-serif select-none text-[96px] leading-none tracking-[.06em] text-[#3A3A3A]">
          {placeholder}
        </span>
      </div>

      {/* Expand button */}
      <button
        onClick={onExpand}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#4A4740]/50 bg-[#1A1A1A]/80 text-[#E0DDD8] backdrop-blur-sm"
        aria-label="Expand"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path
            d="M3 8L8 3M8 3H4M8 3V7"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Image indicator: dots for small sets, counter for large */}
      {total > 1 && (
        <div className="absolute bottom-3.5 right-4 z-10 flex items-center gap-1.5">
          {useDots ? (
            images.map((_, i) => (
              <button
                key={i}
                onClick={() => flipTo(i)}
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
                onClick={() => flipTo(imgIdx - 1)}
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
                onClick={() => flipTo(imgIdx + 1)}
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

// ─── Full-screen flip (modal) ─────────────────────────────────────────────────

function ModalFlipImages({
  images,
  name,
  placeholder,
  objectFit = "cover",
}: {
  images: string[];
  name: string;
  placeholder: string;
  objectFit?: "cover" | "contain";
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const idxRef = useRef(0);
  idxRef.current = imgIdx;
  const total = images.length;

  const flipTo = useCallback(
    (target: number) => {
      if (busyRef.current || !innerRef.current) return;
      const next = ((target % total) + total) % total;
      if (next === idxRef.current) return;
      busyRef.current = true;
      const el = innerRef.current;
      el.style.transition = "transform 0.16s ease-in";
      el.style.transform = "rotateX(-88deg)";
      setTimeout(() => {
        setImgIdx(next);
        idxRef.current = next;
        el.style.transition = "none";
        el.style.transform = "rotateX(80deg)";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = "transform 0.16s ease-out";
            el.style.transform = "rotateX(0deg)";
            setTimeout(() => { busyRef.current = false; }, 170);
          });
        });
      }, 170);
    },
    [total]
  );

  const flipToRef = useRef(flipTo);
  flipToRef.current = flipTo;

  useEffect(() => {
    if (total <= 1) return;
    const id = setInterval(() => {
      flipToRef.current((idxRef.current + 1) % total);
    }, 2200);
    return () => clearInterval(id);
  }, [total]);

  const src = images[imgIdx];

  return (
    // perspective tightened to 480px for a more pronounced flip arc
    <div className="relative flex-1 overflow-hidden" style={{ perspective: "480px" }}>
      <div
        ref={innerRef}
        className="absolute inset-0"
        style={{ transformOrigin: "center 45%", willChange: "transform" }}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#222222] to-[#181818]" />

        {/* Placeholder — sits behind image */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-hero-serif select-none text-[200px] leading-none tracking-[.06em] text-[#2A2A2A] md:text-[260px]">
            {placeholder}
          </span>
        </div>

        {/* Image */}
        {src && (
          <div className={`absolute ${objectFit === "contain" ? "inset-16 md:inset-20" : "inset-0"}`}>
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={name}
                fill
                className={objectFit === "contain" ? "object-contain" : "object-cover"}
                onError={() => {}}
              />
            </div>
          </div>
        )}
      </div>

      {/* Image counter — centered at bottom */}
      {total > 1 && (
        <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
          <button
            onClick={() => flipTo(imgIdx - 1)}
            disabled={imgIdx === 0}
            aria-label="Previous image"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-20"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6 8L4 5L6 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="font-mono text-[11px] tracking-widest text-[#4A4740]">
            {String(imgIdx + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(total).padStart(2, "0")}
          </span>
          <button
            onClick={() => flipTo(imgIdx + 1)}
            disabled={imgIdx >= total - 1}
            aria-label="Next image"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8] disabled:opacity-20"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M4 2L6 5L4 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
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
  const [openId, setOpenId] = useState<number | null>(null);
  const [drag, setDrag] = useState({ on: false, sx: 0, dx: 0 });

  const filtered =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.discipline === activeTab);

  useEffect(() => {
    setIdx(0);
  }, [activeTab]);

  const openProject =
    openId != null ? filtered.find((p) => p.id === openId) ?? null : null;
  const openIdx = openProject
    ? filtered.findIndex((p) => p.id === openId)
    : -1;

  useEffect(() => {
    if (!openProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
      if (e.key === "ArrowLeft" && openIdx > 0)
        setOpenId(filtered[openIdx - 1].id);
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
                  onExpand={() => {
                    if (isActive) setOpenId(p.id);
                  }}
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
      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6">
        <div className="flex gap-2">
          <ArrowBtn dir="prev" onClick={() => go(-1)} disabled={idx === 0} />
          <ArrowBtn
            dir="next"
            onClick={() => go(1)}
            disabled={idx >= filtered.length - 1}
          />
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
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(filtered.length).padStart(2, "0")}
          </span>
        </div>
        <CircleCta
          href={BOOKING_URL}
          label="Book a Walkthrough"
          variant="primary"
        />
      </div>

      {/* Full-screen modal */}
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
          <ModalFlipImages
            images={openProject.images}
            name={openProject.name}
            placeholder={openProject.placeholder}
            objectFit={openProject.discipline === "Logo Design" ? "contain" : "cover"}
          />
          <div className="flex items-end justify-between gap-8 border-t border-[#4A4740]/30 px-10 py-6">
            <div>
              <h3 className="font-hero-serif text-2xl font-normal text-[#E0DDD8] md:text-3xl">
                {openProject.name}
              </h3>
              <p className="mt-1 font-sans text-sm text-[#706D66]">
                {openProject.category}
              </p>
            </div>
            <div className="max-w-sm text-right">
              <p className="mb-3 font-sans text-sm leading-relaxed text-[#706D66]">
                {openProject.description}
              </p>
              <span className="inline-block rounded-full border border-[#4A4740] px-3 py-1 font-mono text-[10px] tracking-widest uppercase text-[#706D66]">
                {openProject.discipline}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
