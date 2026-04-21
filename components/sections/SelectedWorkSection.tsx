"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { PROJECTS, DISCIPLINES } from "@/lib/constants";
import type { Discipline } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

type Tab = "All" | Discipline;
const TABS: Tab[] = ["All", ...DISCIPLINES];
type Project = (typeof PROJECTS)[number];

function ImageMosaic({ images, name }: { images: string[]; name: string }) {
  if (images.length === 1) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#2A2A2A]">
        <Image src={images[0]} alt={name} fill className="object-cover" onError={() => {}} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[10px] tracking-widest text-[#4A4740] uppercase">Image</span>
        </div>
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div className="grid h-full grid-cols-2 gap-2">
        {images.map((src, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl bg-[#2A2A2A]">
            <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" onError={() => {}} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid h-full grid-cols-[2fr_1fr] gap-2">
      <div className="relative overflow-hidden rounded-xl bg-[#2A2A2A]">
        <Image src={images[0]} alt={name} fill className="object-cover" onError={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        {images.slice(1, 4).map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden rounded-xl bg-[#2A2A2A]">
            <Image src={src} alt={`${name} ${i + 2}`} fill className="object-cover" onError={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#111111] backdrop-blur-sm">
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous project"
          className="absolute left-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={onNext}
          aria-label="Next project"
          className="absolute right-6 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#4A4740] text-[#706D66] transition-colors hover:border-[#706D66] hover:text-[#E0DDD8]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Image mosaic */}
      <div className="relative flex-1 overflow-hidden px-20 pt-16 pb-4">
        <ImageMosaic images={project.images} name={project.name} />
      </div>

      {/* Bottom bar */}
      <div className="flex items-end justify-between gap-8 border-t border-[#4A4740]/30 px-20 py-8">
        <div>
          <h3 className="font-display text-3xl font-normal text-[#E0DDD8] md:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 font-sans text-sm text-[#706D66]">{project.category}</p>
        </div>
        <div className="max-w-sm text-right">
          <p className="mb-3 font-sans text-sm leading-relaxed text-[#706D66]">
            {project.description}
          </p>
          <span className="inline-block rounded-full border border-[#4A4740] px-3 py-1 font-mono text-[10px] tracking-widest text-[#706D66] uppercase">
            {project.discipline}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [openId, setOpenId] = useState<number | null>(null);

  const filtered =
    activeTab === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.discipline === activeTab);

  const openIndex = filtered.findIndex((p) => p.id === openId);
  const openProject = openIndex >= 0 ? filtered[openIndex] : null;

  useEffect(() => {
    if (openProject) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [openProject]);

  const close = useCallback(() => setOpenId(null), []);
  const prev = useCallback(() => {
    if (openIndex > 0) setOpenId(filtered[openIndex - 1].id);
  }, [openIndex, filtered]);
  const next = useCallback(() => {
    if (openIndex < filtered.length - 1) setOpenId(filtered[openIndex + 1].id);
  }, [openIndex, filtered]);

  return (
    <section id="selected-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="section-label mb-4">Selected Work</div>
          <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
            Work we are proud to walk you through.
          </h2>
          <p className="max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
            Each project is listed with the business outcome that mattered, not the deliverable.
          </p>
        </div>

        {/* Discipline filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                activeTab === tab
                  ? "bg-[#F86223] text-white"
                  : "border border-[#4A4740] text-[#706D66] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid — alternating wide/narrow pairs */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((project, i) => {
            const pairIndex = Math.floor(i / 2);
            const posInPair = i % 2;
            const isSolo = i === filtered.length - 1 && filtered.length % 2 !== 0;

            let colSpan: string;
            let aspect: string;
            if (isSolo) {
              colSpan = "col-span-3";
              aspect = "aspect-[21/9]";
            } else if (pairIndex % 2 === 0) {
              colSpan = posInPair === 0 ? "col-span-2" : "col-span-1";
              aspect = posInPair === 0 ? "aspect-[16/10]" : "aspect-[4/3]";
            } else {
              colSpan = posInPair === 0 ? "col-span-1" : "col-span-2";
              aspect = posInPair === 0 ? "aspect-[4/3]" : "aspect-[16/10]";
            }

            return (
              <div
                key={project.id}
                onClick={() => setOpenId(project.id)}
                className={`group cursor-pointer ${colSpan}`}
              >
                <div className={`relative overflow-hidden rounded-xl bg-[#2A2A2A] ${aspect}`}>
                  <Image
                    src={project.images[0]}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => {}}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-widest text-[#4A4740] uppercase">
                      Image
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                </div>
                <div className="mt-3 px-1">
                  <h3 className="font-sans text-sm font-medium text-[#E0DDD8]">
                    {project.name}
                  </h3>
                  <p className="mt-0.5 font-mono text-[10px] tracking-wide text-[#706D66]">
                    {project.category}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] tracking-wide text-[#F86223]">
                    {project.outcome}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* IP bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl bg-[#222222] p-6 md:flex-row md:items-center">
          <p className="max-w-xl font-sans text-sm leading-relaxed text-[#706D66]">
            We walk you through the work live. Projects, process, outcomes, in a 30-minute call.
          </p>
          <CircleCta href={BOOKING_URL} label="Book a Walkthrough" variant="primary" className="shrink-0" />
        </div>
      </div>

      {/* Modal */}
      {openProject && (
        <ProjectModal
          project={openProject}
          onClose={close}
          onPrev={prev}
          onNext={next}
          hasPrev={openIndex > 0}
          hasNext={openIndex < filtered.length - 1}
        />
      )}
    </section>
  );
}
