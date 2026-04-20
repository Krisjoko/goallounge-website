"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#4A4740]/40 bg-[#1A1A1A]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5 group">
          <Image src="/images/Image%20(GLTV%20Logo).svg" width={28} height={28} alt="Goallounge" className="object-contain" unoptimized />
          <span className="font-display text-xs tracking-[0.15em] text-[#E0DDD8] uppercase">
            Goallounge
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-sans text-xs text-[#706D66] transition-colors hover:text-[#E0DDD8]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#get-in-touch"
          className="rounded-full bg-[#B8400E] px-5 py-2 font-mono text-[10px] tracking-widest text-white uppercase transition-opacity hover:opacity-90"
        >
          Get In Touch
        </a>
      </nav>
    </header>
  );
}
