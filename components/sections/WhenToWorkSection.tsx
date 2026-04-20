"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WHEN_TO_WORK_NODES, buildMailto } from "@/lib/constants";

const CONNECTIONS: [number, number][] = [
  [1, 2], [2, 3],
  [4, 5], [5, 6],
  [1, 4], [2, 5], [3, 6],
];

const INITIAL_PERCENT = [
  { id: 1, left: 0,  top: 4  },
  { id: 2, left: 30, top: 0  },
  { id: 3, left: 62, top: 8  },
  { id: 4, left: 5,  top: 50 },
  { id: 5, left: 35, top: 52 },
  { id: 6, left: 62, top: 48 },
];

const CARD_W = 288; // w-72

type Pos = { x: number; y: number };

export default function WhenToWorkSection() {
  const [checked, setChecked] = useState<number[]>([]);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const dragging = useRef<{
    id: number;
    startX: number;
    startY: number;
    startPosX: number;
    startPosY: number;
  } | null>(null);

  // Initialise pixel positions from container dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    const init: Record<number, Pos> = {};
    INITIAL_PERCENT.forEach(({ id, left, top }) => {
      init[id] = {
        x: (left / 100) * width,
        y: (top / 100) * height,
      };
    });
    setPositions(init);
  }, []);

  // Global drag handlers
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const { id, startX, startY, startPosX, startPosY } = dragging.current;
      setPositions((prev) => ({
        ...prev,
        [id]: {
          x: startPosX + e.clientX - startX,
          y: startPosY + e.clientY - startY,
        },
      }));
    };
    const onUp = () => {
      dragging.current = null;
      setIsDragging(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handleMouseDown = useCallback(
    (id: number, e: React.MouseEvent) => {
      e.preventDefault();
      const pos = positions[id];
      if (!pos) return;
      dragging.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        startPosX: pos.x,
        startPosY: pos.y,
      };
      setIsDragging(true);
    },
    [positions]
  );

  const toggle = (id: number) => {
    if (dragging.current) return; // don't toggle during drag
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Compute card center from DOM ref relative to container
  const getCenter = (id: number): Pos => {
    const card = cardRefs.current[id];
    const container = containerRef.current;
    if (!card || !container) return { x: 0, y: 0 };
    const cr = card.getBoundingClientRect();
    const co = container.getBoundingClientRect();
    return {
      x: cr.left - co.left + cr.width / 2,
      y: cr.top - co.top + cr.height / 2,
    };
  };

  const mailtoUrl = buildMailto(
    WHEN_TO_WORK_NODES.filter((n) => checked.includes(n.id)).map((n) => n.title)
  );

  const hasPositions = Object.keys(positions).length === WHEN_TO_WORK_NODES.length;

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

        {/* Desktop: draggable node canvas */}
        <div
          ref={containerRef}
          className={`relative hidden min-h-[700px] md:block ${isDragging ? "select-none" : ""}`}
        >
          {/* SVG connection lines */}
          {hasPositions && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {CONNECTIONS.map(([a, b]) => {
                const ca = getCenter(a);
                const cb = getCenter(b);
                const bothChecked = checked.includes(a) && checked.includes(b);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={ca.x}
                    y1={ca.y}
                    x2={cb.x}
                    y2={cb.y}
                    stroke={bothChecked ? "#F86223" : "#4A4740"}
                    strokeWidth={bothChecked ? 1.5 : 1}
                    opacity={bothChecked ? 1 : 0.5}
                    strokeDasharray={bothChecked ? undefined : "4 4"}
                  />
                );
              })}
            </svg>
          )}

          {/* Cards */}
          {WHEN_TO_WORK_NODES.map((node) => {
            const pos = positions[node.id];
            const isChecked = checked.includes(node.id);
            return (
              <div
                key={node.id}
                ref={(el) => { cardRefs.current[node.id] = el; }}
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                onClick={() => toggle(node.id)}
                style={{
                  position: "absolute",
                  left: pos ? pos.x : 0,
                  top: pos ? pos.y : 0,
                  width: CARD_W,
                  opacity: pos ? 1 : 0,
                }}
                className={`rounded-xl border p-5 text-left transition-colors duration-200 ${
                  isDragging && dragging.current?.id === node.id
                    ? "cursor-grabbing"
                    : "cursor-grab"
                } ${
                  isChecked
                    ? "border-[#F86223]/60 bg-[#222222]"
                    : "border-[#4A4740]/50 bg-[#1E1E1E] hover:border-[#4A4740] hover:bg-[#222222]"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      isChecked ? "border-[#F86223] bg-[#F86223]" : "border-[#4A4740]"
                    }`}
                  >
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-[#4A4740]">0{node.id}</span>
                </div>
                <p className="mb-2 font-sans text-sm font-medium leading-snug text-[#E0DDD8]">
                  {node.title}
                </p>
                <p className="font-sans text-xs leading-relaxed text-[#706D66]">
                  {node.body}
                </p>
              </div>
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
                      isChecked ? "border-[#F86223] bg-[#F86223]" : "border-[#4A4740]"
                    }`}
                  >
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-[#4A4740]">0{node.id}</span>
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
