import { PROBLEM_CARDS } from "@/lib/constants";

type Card = (typeof PROBLEM_CARDS)[number];

function ProblemCardItem({ card }: { card: Card }) {
  return (
    <div className="flex flex-col justify-between rounded-xl bg-[#222222] p-6 md:p-10">
      <h3 className="mb-6 font-sans text-base font-medium leading-snug text-[#E0DDD8]">
        {card.title}
      </h3>
      <div>
        <p className="mb-2 font-mono text-[9px] tracking-[0.15em] uppercase text-[#706D66]">
          Sounds Like
        </p>
        <p className="font-sans text-sm italic leading-normal text-[#8A857C]">
          &ldquo;{card.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function SoundFamiliarSection() {
  return (
    <section id="sound-familiar" className="px-6 py-24 md:py-[120px] lg:py-40 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-6 md:mb-8">Sound Familiar?</div>
        <h2 className="font-hero-serif mb-10 text-4xl font-normal leading-[0.95] tracking-[-0.02em] text-balance text-[#E0DDD8] md:text-5xl">
          These are the patterns
          <br />
          we keep seeing.
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_CARDS.map((card) => (
            <ProblemCardItem key={card.number} card={card} />
          ))}
        </div>

        {/* Bridge line — maximum breathing room */}
        <div className="mt-28 mb-4 text-center md:mt-40">
          <p className="font-hero-serif mx-auto max-w-2xl text-2xl font-normal leading-snug text-[#E0DDD8] md:text-3xl">
            When strategy, positioning and design do not speak the same language, everything costs more and lands softer.
          </p>
        </div>
      </div>
    </section>
  );
}
