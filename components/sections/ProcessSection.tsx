import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section id="process" className="px-6 py-16 md:py-20 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">How a Project Runs</div>
        <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          A shape you can plan around.
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
          Eight weeks on average. Strategy and design in parallel from day one.
          No discovery phase that goes nowhere, no handover that loses the thread.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {PROCESS_STEPS.map((s) => (
            <div
              key={s.step}
              className="flex flex-col rounded-xl bg-[#222222] p-6"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-widest text-[#FF4822] uppercase">
                  {s.step}
                </span>
                <span className="font-mono text-[9px] tracking-wider text-[#4A4740] uppercase">
                  {s.phase}
                </span>
              </div>
              <h3 className="font-hero-serif mb-3 text-base font-normal leading-snug text-[#E0DDD8]">
                {s.title}
              </h3>
              <p className="font-sans text-xs leading-relaxed text-[#706D66]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
