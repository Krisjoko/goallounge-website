"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CircleCta from "@/components/ui/CircleCta";

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
          {/* Logo mark — layered halos + spin entrance */}
          <div className="relative mb-6 flex h-[200px] w-[200px] items-center justify-center">
            {mounted && (
              <>
                {/* Outer textile halo — rotating conic gradient */}
                <div className="hero-halo-out absolute inset-0 rounded-full" aria-hidden />
                {/* Inner textile halo — reverse rotation */}
                <div className="hero-halo-in absolute inset-4 rounded-full" aria-hidden />
                {/* Radial bloom */}
                <div className="hero-bloom absolute inset-0 rounded-full" aria-hidden />
                {/* Sonar rings — one-shot on mount */}
                <div
                  className="hero-sonar absolute inset-0 rounded-full"
                  style={{ animationDelay: "0.3s" }}
                  aria-hidden
                />
                <div
                  className="hero-sonar absolute inset-0 rounded-full"
                  style={{ animationDelay: "0.8s" }}
                  aria-hidden
                />
              </>
            )}

            {/* Logo: bolt-in wrapper → idle slow-spin wrapper → image */}
            <div className={mounted ? "hero-mark-bolt relative z-10" : "relative z-10 opacity-0"}>
              <div className={mounted ? "hero-mark-idle" : ""}>
                <Image
                  src="/images/LogoMarkWhite.svg"
                  width={120}
                  height={120}
                  alt="Goallounge"
                  className="h-[120px] w-[120px] object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Label */}
          <p className="mb-5 font-mono text-[10px] tracking-[0.25em] text-[#706D66] uppercase">
            <span className="text-[#FF4822]">●</span> Strategic Creative Studio
          </p>

          {/* Headline */}
          <h1 className="font-hero-serif mb-10 leading-[1.0] text-[#E0DDD8]" style={{ fontSize: 'clamp(52px, 10vw, 98px)' }}>
            <span className="whitespace-nowrap">Positioning and design,</span>
            <br />
            built as <span className="text-[#FF4822]">one.</span>
          </h1>

          {/* CTAs */}
          <div className="mb-6 flex items-center gap-6">
            <CircleCta href={BOOKING_URL} label="Book a 30-Minute Call" variant="primary" />
            <CircleCta href="#selected-work" label="See the Work" variant="secondary" />
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
