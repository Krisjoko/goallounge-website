import Nav from "@/components/Nav";
import CustomCursor from "@/components/CustomCursor";
import LiveClock from "@/components/LiveClock";
import HeroSection from "@/components/sections/HeroSection";
import TrustStripSection from "@/components/sections/TrustStripSection";
import SoundFamiliarSection from "@/components/sections/SoundFamiliarSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import WhenToWorkSection from "@/components/sections/WhenToWorkSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <HeroSection />
        <TrustStripSection />
        <SoundFamiliarSection />
        <HowWeWorkSection />
        <WhenToWorkSection />
        <SelectedWorkSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <footer className="border-t border-[#4A4740]/30 px-6 py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="font-mono text-[10px] tracking-widest text-[#4A4740] uppercase">
            Goallounge, Strategic Creative Studio
          </p>
          <a
            href="https://www.linkedin.com/company/goallounge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#4A4740] transition-colors hover:text-[#E0DDD8]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </footer>
      <LiveClock />
    </>
  );
}
