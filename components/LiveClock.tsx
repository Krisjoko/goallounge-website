"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date, timeZone: string) {
  return date.toLocaleTimeString("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function LiveClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const ldn = formatTime(now, "Europe/London");
  const utc = formatTime(now, "UTC");

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-[#4A4740] bg-[#222222]/90 px-5 py-3 backdrop-blur-sm">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#FF4822]">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
            <circle cx="4.5" cy="4.5" r="3.5" stroke="#FF4822" strokeWidth="1" />
            <line x1="4.5" y1="2" x2="4.5" y2="4.5" stroke="#FF4822" strokeWidth="1" strokeLinecap="round" />
            <line x1="4.5" y1="4.5" x2="6.5" y2="4.5" stroke="#FF4822" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {ldn} <span className="opacity-50">LDN</span>
        </span>
        <span className="h-3 w-px bg-[#4A4740]" />
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#706D66]">
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
            <circle cx="4.5" cy="4.5" r="3.5" stroke="#706D66" strokeWidth="1" />
            <line x1="4.5" y1="2" x2="4.5" y2="4.5" stroke="#706D66" strokeWidth="1" strokeLinecap="round" />
            <line x1="4.5" y1="4.5" x2="6.5" y2="4.5" stroke="#706D66" strokeWidth="1" strokeLinecap="round" />
          </svg>
          {utc} <span className="opacity-50">UTC</span>
        </span>
      </div>
    </div>
  );
}
