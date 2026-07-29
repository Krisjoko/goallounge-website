"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import CircleCta from "@/components/ui/CircleCta";
import posthog from "posthog-js";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/B1w7htWiKWX8UD2J6";

const HeroLogoMark = dynamic(() => import("@/components/HeroLogoMark"), {
  ssr: false,
});

const TRUST_BRAND_GROUPS = [
  ["Liverpool FC", "Discovery", "Vitality", "TikTok"],
  ["Yoco", "Absa", "Nedbank", "Dischem"],
  ["Superside", "Liberty", "Standard Bank", "Supersport"],
  ["ESL FACEIT Group", "Superbalist", "Shell", "Funding Frontier"],
];
const TICKER_INTERVAL_MS = 4500;

export default function HeroSection() {
  const [groupIdx, setGroupIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setGroupIdx((i) => (i + 1) % TRUST_BRAND_GROUPS.length);
    }, TICKER_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col overflow-hidden px-6 pt-14 pb-14"
    >
      {/* Vertically-centered content block */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          {/* Logo mark */}
          <div className="relative mb-8 flex h-[180px] w-[180px] items-center justify-center md:h-[220px] md:w-[220px]">
            <HeroLogoMark
              svgUrl="/images/LogoMarkWhite.svg"
              materialStyle="Metallic"
              color="#E0DDD8"
              metalness={1.0}
              roughness={0.2}
              extrudeDepth={15}
              bevelSize={2}
              autoRotate={false}
              logoScale={1}
              backgroundColor="rgba(0,0,0,0)"
              className="h-full w-full"
            />
          </div>

          {/* Headline */}
          <h1 className="font-hero-serif mb-12 leading-[0.95] tracking-[-0.02em] text-balance text-[#E0DDD8]" style={{ fontSize: 'clamp(40px, 10vw, 98px)' }}>
            Positioning and design,
            <br />
            built as <span className="text-[#FF4822]">one</span>
          </h1>

          {/* CTAs */}
          <div className="mb-6 flex items-center gap-6">
            <CircleCta
              href={BOOKING_URL}
              label="Book a 30-Minute Call"
              variant="primary"
              onClick={() => posthog.capture("hero_cta_clicked", { destination: "booking" })}
            />
            <CircleCta
              href="#selected-work"
              label="See the Work"
              variant="secondary"
              onClick={() => posthog.capture("hero_see_work_clicked")}
            />
          </div>

          {/* Trust block — fixed orange label + slow-fade brand ticker on its own line */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#FF4822]">
              Trusted by teams at:
            </p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#8A857C]">
              <span
                key={groupIdx}
                className="hero-trust-fade inline-block"
                aria-hidden="true"
              >
                {TRUST_BRAND_GROUPS[groupIdx].join(" · ")}
              </span>
              <span className="sr-only">
                {TRUST_BRAND_GROUPS.flat().join(", ")}.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
