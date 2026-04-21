"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { WHEN_TO_WORK_NODES, buildMailto } from "@/lib/constants";

// All 15 possible pairs with pre-defined bezier bend values (perpendicular offset px)
const ALL_CONNECTIONS: [number, number, number][] = [
  [1, 2, -40], [1, 3, -70], [1, 4,  50], [1, 5, -80], [1, 6, -110],
  [2, 3, -30], [2, 4,  80], [2, 5, -50], [2, 6,  90],
  [3, 4, 110], [3, 5,  70], [3, 6,  50],
  [4, 5,  40], [4, 6,  60],
  [5, 6,  30],
];

const INITIAL_PERCENT = [
  { id: 1, left: 0,  top: 4  },
  { id: 2, left: 30, top: 0  },
  { id: 3, left: 62, top: 8  },
  { id: 4, left: 5,  top: 50 },
  { id: 5, left: 35, top: 52 },
  { id: 6, left: 62, top: 48 },
];

const DRIFT_PHASE = [0, 1.3, 2.6, 3.9, 5.1, 0.7];
const DRIFT_AMP   = 5;
const DRIFT_SPEED = 0.00035;

const CARD_W = 288;

type Pos = { x: number; y: number };

function qBez(a: Pos, b: Pos, bend: number): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const cpx = mx + (-dy / len) * bend;
  const cpy = my + (dx  / len) * bend;
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

export default function WhenToWorkSection() {
  const [checked, setChecked]     = useState<number[]>([]);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<Record<number, HTMLDivElement | null>>({});
  const ctaRef       = useRef<HTMLAnchorElement>(null);
  const basePos      = useRef<Record<number, Pos>>({});
  const animFrame    = useRef<number>(0);
  const dragging     = useRef<{
    id: number; startX: number; startY: number; startPosX: number; startPosY: number;
  } | null>(null);

  // ── Init positions ──────────────────────────────────────────────────────────
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const { width, height } = c.getBoundingClientRect();
    const init: Record<number, Pos> = {};
    INITIAL_PERCENT.forEach(({ id, left, top }) => {
      init[id] = { x: (left / 100) * width, y: (top / 100) * height };
    });
    setPositions(init);
    basePos.current = { ...init };
  }, []);

  // ── Continuous drift animation ──────────────────────────────────────────────
  useEffect(() => {
    const tick = (t: number) => {
      setPositions(prev => {
        const next: Record<number, Pos> = {};
        for (let id = 1; id <= 6; id++) {
          if (dragging.current?.id === id) {
            next[id] = prev[id] ?? { x: 0, y: 0 };
          } else {
            const base = basePos.current[id];
            if (!base) { next[id] = prev[id] ?? { x: 0, y: 0 }; continue; }
            const ph = DRIFT_PHASE[id - 1];
            next[id] = {
              x: base.x + Math.sin(t * DRIFT_SPEED + ph) * DRIFT_AMP,
              y: base.y + Math.cos(t * DRIFT_SPEED * 0.75 + ph) * DRIFT_AMP * 0.8,
            };
          }
        }
        return next;
      });
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  // ── Global drag handlers ────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const { id, startX, startY, startPosX, startPosY } = dragging.current;
      setPositions(prev => ({
        ...prev,
        [id]: { x: startPosX + e.clientX - startX, y: startPosY + e.clientY - startY },
      }));
    };
    const onUp = () => {
      if (dragging.current) {
        const id = dragging.current.id;
        setPositions(prev => {
          basePos.current[id] = prev[id];
          return prev;
        });
      }
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

  const handleMouseDown = useCallback((id: number, e: React.MouseEvent) => {
    e.preventDefault();
    const pos = positions[id];
    if (!pos) return;
    dragging.current = { id, startX: e.clientX, startY: e.clientY, startPosX: pos.x, startPosY: pos.y };
    setIsDragging(true);
  }, [positions]);

  const toggle = (id: number) => {
    if (dragging.current) return;
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getCenter = (id: number): Pos => {
    const card = cardRefs.current[id];
    const cont = containerRef.current;
    if (!card || !cont) return { x: 0, y: 0 };
    const cr = card.getBoundingClientRect();
    const co = cont.getBoundingClientRect();
    return { x: cr.left - co.left + cr.width / 2, y: cr.top - co.top + cr.height / 2 };
  };

  const ctaCenter = (): Pos => {
    const btn = ctaRef.current;
    const cont = containerRef.current;
    if (!btn || !cont) return { x: 0, y: 0 };
    const br = btn.getBoundingClientRect();
    const co = cont.getBoundingClientRect();
    return { x: br.left - co.left + br.width / 2, y: br.top - co.top + br.height / 2 };
  };

  const hasPositions = Object.keys(positions).length === WHEN_TO_WORK_NODES.length;
  const selectionKey = checked.slice().sort().join(",");
  const mailtoUrl = buildMailto(
    WHEN_TO_WORK_NODES.filter(n => checked.includes(n.id)).map(n => n.title)
  );

  return (
    <section id="when-to-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">When To Work With Us</div>
        <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          You will know it is time when&hellip;
        </h2>
        <p className="mb-14 font-sans text-sm text-[#706D66]">
          Select the signals that sound like you. We will pre-fill the email.
        </p>

        {/* ── Desktop: node canvas ── */}
        <div
          ref={containerRef}
          className={`relative hidden min-h-[660px] md:block ${isDragging ? "select-none" : ""}`}
        >
          {/* Layer 1 — Bezier connection lines (below cards) */}
          {hasPositions && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              {ALL_CONNECTIONS.map(([a, b, bend]) => {
                const ca = getCenter(a);
                const cb = getCenter(b);
                const both = checked.includes(a) && checked.includes(b);
                const color = both ? "#F86223" : "#706D66";
                const d = qBez(ca, cb, bend);
                return (
                  <g key={`${a}-${b}`}>
                    {/* Wide glow halo — only when active */}
                    <path d={d} stroke={color} strokeWidth={both ? 18 : 0}
                          fill="none" strokeLinecap="round"
                          opacity={both ? 0.12 : 0}
                          className={both ? "wtw-glow-active" : ""} />
                    {/* Mid glow — only when active */}
                    <path d={d} stroke={color} strokeWidth={both ? 6 : 0}
                          fill="none" strokeLinecap="round"
                          opacity={both ? 0.18 : 0} />
                    {/* Main line */}
                    <path d={d} stroke={color} strokeWidth={both ? 1.5 : 0.8}
                          fill="none" strokeLinecap="round"
                          opacity={both ? 1 : 0.10}
                          className={both ? "wtw-line-active" : ""}
                          strokeDasharray={both ? undefined : "2 14"} />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Layer 2 — Cards */}
          {WHEN_TO_WORK_NODES.map(node => {
            const pos = positions[node.id];
            const isChecked = checked.includes(node.id);
            return (
              <div
                key={node.id}
                ref={el => { cardRefs.current[node.id] = el; }}
                onMouseDown={e => handleMouseDown(node.id, e)}
                onClick={() => toggle(node.id)}
                style={{
                  position: "absolute",
                  left: pos ? pos.x : 0,
                  top:  pos ? pos.y : 0,
                  width: CARD_W,
                  opacity: pos ? 1 : 0,
                }}
                className={`rounded-xl border p-5 text-left transition-colors duration-300 ${
                  isDragging && dragging.current?.id === node.id ? "cursor-grabbing" : "cursor-grab"
                } ${
                  isChecked
                    ? "border-[#F86223]/60 bg-[#222222] shadow-[0_0_24px_rgba(248,98,35,0.12)]"
                    : "border-[#4A4740]/40 bg-[#1C1C1C] hover:border-[#4A4740] hover:bg-[#222222]"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    isChecked ? "border-[#F86223] bg-[#F86223]" : "border-[#4A4740]"
                  }`}>
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
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

          {/* Layer 3 — Flow lines from selected nodes to CTA button */}
          {hasPositions && checked.length > 0 && (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
              {checked.map(id => {
                const from = getCenter(id);
                const to = ctaCenter();
                if (!to.x && !to.y) return null;
                const bend = id % 2 === 0 ? 40 : -40;
                const d = qBez(from, to, bend);
                return (
                  <g key={`flow-${id}-${selectionKey}`}>
                    {/* Glow */}
                    <path d={d} stroke="#F86223" strokeWidth={8}
                          fill="none" strokeLinecap="round"
                          strokeDasharray="1000" className="wtw-draw-in"
                          opacity={0.08} />
                    {/* Main draw-in line */}
                    <path d={d} stroke="#F86223" strokeWidth={1.2}
                          fill="none" strokeLinecap="round"
                          strokeDasharray="1000" className="wtw-draw-in"
                          opacity={0.75} />
                  </g>
                );
              })}
            </svg>
          )}

          {/* CTA button — inside canvas, positioned at bottom center */}
          {checked.length > 0 && (
            <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
              <a
                ref={ctaRef}
                href={mailtoUrl}
                className="rounded-full bg-[#B8400E] px-8 py-3 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
              >
                Pre-fill my email ({checked.length} selected)
              </a>
            </div>
          )}
        </div>

        {/* ── Mobile: 2-col grid ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
          {WHEN_TO_WORK_NODES.map(node => {
            const isChecked = checked.includes(node.id);
            return (
              <button key={node.id} onClick={() => toggle(node.id)}
                className={`rounded-xl border p-5 text-left transition-all duration-200 ${
                  isChecked
                    ? "border-[#F86223]/60 bg-[#222222]"
                    : "border-[#4A4740]/50 bg-[#1E1E1E] hover:border-[#4A4740] hover:bg-[#222222]"
                }`}>
                <div className="mb-3 flex items-start justify-between gap-2">
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    isChecked ? "border-[#F86223] bg-[#F86223]" : "border-[#4A4740]"
                  }`}>
                    {isChecked && (
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="font-mono text-[9px] text-[#4A4740]">0{node.id}</span>
                </div>
                <p className="mb-2 font-sans text-sm font-medium leading-snug text-[#E0DDD8]">{node.title}</p>
                <p className="font-sans text-xs leading-relaxed text-[#706D66]">{node.body}</p>
              </button>
            );
          })}
        </div>

        {/* Mobile CTA */}
        {checked.length > 0 && (
          <div className="mt-10 flex justify-center md:hidden">
            <a href={mailtoUrl}
               className="rounded-full bg-[#B8400E] px-8 py-3 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90">
              Pre-fill my email ({checked.length} selected)
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
