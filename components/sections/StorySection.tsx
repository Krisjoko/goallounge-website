import Image from "next/image";

export default function StorySection() {
  return (
    <section id="our-story" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-10">Our Story</div>
        <div className="flex flex-col items-start gap-10 md:flex-row md:gap-16">
          {/* Text */}
          <div className="flex-1">
            <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
              It started with football.
            </h2>
            <p className="mb-8 font-sans text-sm text-[#706D66]">
              Six years later, the work is what stuck.
            </p>
            <p className="font-sans text-base italic leading-relaxed text-[#E0DDD8] md:text-lg">
              Goallounge started in football. Claudio was building broadcast
              identity and digital products for GLTV, a global football media
              brand, while Kristy was leading positioning and go-to-market for
              companies navigating rapid growth. They kept arriving at the same
              problem: strategy and design treated as separate workstreams,
              passed between teams with no shared language. Positioning and
              design should not be separate disciplines handed off between teams.
              They should be built together, by people who understand systems,
              not silos.
            </p>
          </div>

          {/* Image — anchored to bottom of text column */}
          <div className="flex w-full flex-col justify-end md:w-[42%]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#222222]">
              <Image
                src="/images/Story.png"
                alt="Goallounge team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
