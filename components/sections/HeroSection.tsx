"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/constants";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

function LogoTicker() {
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="ticker-mask overflow-hidden">
      <div
        className="flex items-center gap-12"
        style={{ animation: "logo-scroll 35s linear infinite", width: "max-content" }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="relative flex h-12 w-32 flex-shrink-0 items-center justify-center opacity-40 grayscale transition-opacity hover:opacity-70"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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
              src="/images/Image%20(GLTV%20Logo).svg"
              width={320}
              height={320}
              alt="Goallounge"
              className="h-80 w-80 object-contain"
              unoptimized
            />
          </div>

          {/* Section label */}
          <div className="section-label mb-5">Strategic Creative Studio</div>

          {/* Headline */}
          <h1 className="font-display mb-4 text-5xl font-normal leading-[1.08] tracking-tight text-[#E0DDD8] md:text-7xl">
            Positioning and design,
            <br />
            built as{" "}
            <span className="text-[#F86223]">one.</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 font-sans text-sm text-[#706D66]">
            From first funding to full rebrand.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:general@goallounge.tv"
              className="rounded-full border border-[#4A4740] px-7 py-2.5 font-mono text-[10px] tracking-widest text-[#E0DDD8] uppercase transition-colors hover:border-[#706D66] hover:text-white"
            >
              Email Us
            </a>
            <a
              href={BOOKING_URL}
              target={BOOKING_URL.startsWith("http") ? "_blank" : undefined}
              rel={BOOKING_URL.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full bg-[#B8400E] px-7 py-2.5 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
            >
              Let&rsquo;s Meet
            </a>
          </div>
        </div>
      </div>

      {/* Logo ticker — always anchored to bottom */}
      <div className="border-t border-[#4A4740]/30 py-6">
        <LogoTicker />
      </div>
    </section>
  );
}
