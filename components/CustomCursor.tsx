"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let x = -100;
    let y = -100;
    let raf: number;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      if (dot) {
        dot.style.transform = `translate(${x - 5}px, ${y - 5}px)`;
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-white mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}
