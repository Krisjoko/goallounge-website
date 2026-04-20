"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col overflow-hidden px-6 pt-14"
    >
      {/* Centered content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          {/* Logo mark */}
          <div className={`mb-6 ${mounted ? "gltv-mark" : "opacity-0"}`}>
            <Image
              src="/images/LogoMarkWhite.svg"
              width={120}
              height={120}
              alt="Goallounge"
              className="h-[120px] w-[120px] object-contain"
              unoptimized
            />
          </div>

          {/* Label */}
          <p className="mb-5 font-mono text-[10px] tracking-[0.25em] text-[#706D66] uppercase">
            <span className="text-[#F86223]">●</span> Strategic Creative Studio
          </p>

          {/* Headline */}
          <h1 className="font-display mb-5 text-5xl font-normal leading-[1.08] tracking-tight text-[#E0DDD8] md:text-7xl">
            Positioning and design,
            <br />
            built as{" "}
            <span className="text-[#F86223]">one.</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-xl font-sans text-base leading-relaxed text-[#E0DDD8] md:text-lg">
            A two-person studio. Kristy shapes the strategy. Claudio builds the work. No handoffs.
          </p>

          {/* CTAs */}
          <div className="mb-6 flex items-center gap-3">
            <a
              href="#selected-work"
              className="rounded-full border border-[#4A4740] px-7 py-2.5 font-mono text-[10px] tracking-widest text-[#E0DDD8] uppercase transition-colors hover:border-[#706D66] hover:text-white"
            >
              See the Work
            </a>
            <a
              href={BOOKING_URL}
              target={BOOKING_URL.startsWith("http") ? "_blank" : undefined}
              rel={BOOKING_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full bg-[#B8400E] px-7 py-2.5 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            >
              Book a 30-Minute Call
            </a>
          </div>

          {/* Trust line */}
          <p className="font-mono text-[10px] tracking-widest text-[#706D66] uppercase">
            Trusted by teams at Liverpool FC · Discovery · TikTok · Yoco · Absa
          </p>
        </div>
      </div>
    </section>
  );
}
