"use client";

import { useEffect, useRef } from "react";

const SIZE = 28;

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    let x = -200;
    let y = -200;
    let hovered = false;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      hovered = !!target.closest('a, button, [role="button"], input, label, select');
      ring.style.background = hovered ? "#FF4822" : "transparent";
      ring.style.borderColor = hovered ? "#FF4822" : "rgba(255,255,255,0.45)";
    };

    const render = () => {
      ring.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) scale(${hovered ? 1.15 : 1})`;
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.45)",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transition: "background 0.15s ease, border-color 0.15s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#E0DDD8",
        }}
      />
    </div>
  );
}
