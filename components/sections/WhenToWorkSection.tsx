"use client";

import { useState } from "react";
import { WHEN_TO_WORK_NODES, buildMailto } from "@/lib/constants";

export default function WhenToWorkSection() {
  const [checked, setChecked] = useState<number[]>([]);

  const toggle = (id: number) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const mailtoUrl = buildMailto(
    WHEN_TO_WORK_NODES.filter((n) => checked.includes(n.id)).map((n) => n.title)
  );

  const positions = [
    { left: "0%", top: "5%" },
    { left: "30%", top: "0%" },
    { left: "62%", top: "10%" },
    { left: "8%", top: "52%" },
    { left: "35%", top: "55%" },
    { left: "62%", top: "50%" },
  ];

  return (
    <section id="when-to-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">When To Work With Us</div>
        <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          You will know it is time when&hellip;
        </h2>
        <p className="mb-14 font-sans text-sm text-[#706D66]">
          Select the ones that resonate. We will pre-fill your email.
        </p>

        {/* Desktop: absolute positioned stagger */}
        <div className="relative hidden min-h-[440px] md:block">
          {WHEN_TO_WORK_NODES.map((node, i) => {
            const pos = positions[i];
            const isChecked = checked.includes(node.id);
            return (
              <button
                key={node.id}
                onClick={() => toggle(node.id)}
                className={`absolute w-[30%] rounded-xl border p-5 text-left transition-all duration-200 ${
                  isChecked
                    ? "border-[#F86223]/60 bg-[#222222]"
                    : "border-[#4A4740]/50 bg-[#1E1E1E] hover:border-[#4A4740] hover:bg-[#222222]"
                }`}
                style={{ left: pos.left, top: pos.top }}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked
                        ? "border-[#F86223] bg-[#F86223]"
                        : "border-[#4A4740]"
                    }`}
                  >
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-[#4A4740]">
                    0{node.id}
                  </span>
                </div>
                <p className="mb-2 font-sans text-sm font-medium leading-snug text-[#E0DDD8]">
                  {node.title}
                </p>
                <p className="font-sans text-xs leading-relaxed text-[#706D66]">
                  {node.body}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
          {WHEN_TO_WORK_NODES.map((node) => {
            const isChecked = checked.includes(node.id);
            return (
              <button
                key={node.id}
                onClick={() => toggle(node.id)}
                className={`rounded-xl border p-5 text-left transition-all duration-200 ${
                  isChecked
                    ? "border-[#F86223]/60 bg-[#222222]"
                    : "border-[#4A4740]/50 bg-[#1E1E1E] hover:border-[#4A4740] hover:bg-[#222222]"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked
                        ? "border-[#F86223] bg-[#F86223]"
                        : "border-[#4A4740]"
                    }`}
                  >
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-[#4A4740]">
                    0{node.id}
                  </span>
                </div>
                <p className="mb-2 font-sans text-sm font-medium leading-snug text-[#E0DDD8]">
                  {node.title}
                </p>
                <p className="font-sans text-xs leading-relaxed text-[#706D66]">
                  {node.body}
                </p>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        {checked.length > 0 && (
          <div className="mt-10 flex justify-center">
            <a
              href={mailtoUrl}
              className="rounded-full bg-[#B8400E] px-8 py-3 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            >
              Pre-fill my email ({checked.length} selected)
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
