"use client";

import { useEffect, useRef } from "react";

const SIZE = 28;

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
      el.style.background = hovered ? "#FF4822" : "transparent";
      el.style.borderColor = hovered ? "#FF4822" : "rgba(255,255,255,0.35)";
    };

    const render = () => {
      el.style.transform = `translate(${x - SIZE / 2}px, ${y - SIZE / 2}px) scale(${hovered ? 1.15 : 1})`;
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
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.35)",
        background: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
        transition: "background 0.12s ease, border-color 0.12s ease, transform 0.12s ease",
      }}
    />
  );
}
