import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/B1w7htWiKWX8UD2J6";

const CLAUDIO_BULLETS = [
  "Interface Systems that scale",
  "Design Operations & tooling",
  "Component Architecture end-to-end",
  "Visual identity and brand expression",
];

const KRISTY_BULLETS = [
  "Strategic Positioning & Narrative",
  "Go-to-Market architecture",
  "Decision Frameworks & delivery",
  "Growth Marketing",
];

function PersonCard({
  name,
  role,
  bio,
  bullets,
  footnote,
  cta,
  ctaHref,
  accentColor,
}: {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  footnote?: string;
  cta: string;
  ctaHref: string;
  accentColor: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-[#222222] p-6 md:p-10">
      {/* Name + role */}
      <h3 className="mb-1 font-hero-serif text-lg text-[#E0DDD8]">{name}</h3>
      <p className="mb-5 font-hero-serif text-lg text-[#FF4822]">{role}</p>

      {/* Bio */}
      <p className="mb-5 font-sans text-sm leading-normal text-[#E0DDD8]">
        {bio}
      </p>

      {/* Bullets */}
      <ul className="mb-6 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 font-sans text-xs text-[#706D66]">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#4A4740]" />
            {b}
          </li>
        ))}
      </ul>

      {/* Footnote */}
      {footnote && (
        <p className="mb-5 font-sans text-xs italic leading-normal text-[#E0DDD8]">
          {footnote}
        </p>
      )}

      {/* CTA */}
      <CircleCta
        href={ctaHref}
        label={cta}
        variant={accentColor === "#FF4822" ? "primary" : "secondary"}
        className="mt-auto"
      />
    </div>
  );
}

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="px-6 py-24 md:py-[120px] lg:py-40 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-6 md:mb-8">How We Work</div>
        <h2 className="font-hero-serif mb-3 text-4xl font-normal leading-[0.95] tracking-[-0.02em] text-balance text-[#E0DDD8] md:text-5xl">
          Two senior practitioners.
          <br />
          One engagement.
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-sm leading-normal text-[#706D66]">
          Every project is led by the two of us. One shapes the strategy. One
          builds the work. You get both in the room from the first brief to
          the final handover.
        </p>

        {/* Person cards */}
        <div className="flex flex-col gap-4 md:flex-row">
          <PersonCard
            name="Claudio"
            role="Product Design & Systems"
            bio="Claudio architects the interfaces and design systems that hold up under real product pressure. Scalable, opinionated and production-ready."
            bullets={CLAUDIO_BULLETS}
            footnote="Claudio's portfolio is always scaling and growing. Happy to walk you through it live on a call."
            cta="Book a Walkthrough →"
            ctaHref={BOOKING_URL}
            accentColor="#FF4822"
          />
          <PersonCard
            name="Kristy"
            role="Positioning, GTM & Project Leadership"
            bio="Kristy builds the positioning and narrative that give the work somewhere to stand. Clear, commercial and ready for market."
            bullets={KRISTY_BULLETS}
            cta="View Portfolio →"
            ctaHref="https://bit.ly/KristyCunningham_Goallounge"
            accentColor="#22A6FF"
          />
        </div>

        {/* Origin story */}
        <div className="mt-16 border-t border-[#4A4740]/30 pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-4 justify-center">How We Got Here</div>
            <p className="font-sans text-base leading-normal text-[#E0DDD8] md:text-lg">
              Between us, we bring two decades across design and strategy —
              two disciplines that almost never talk to each other. Together
              we built GLTV, a football platform with a global audience, where
              running design and go-to-market as one conversation was not a
              methodology, it was just how we worked. When we saw how much
              money and time companies were losing by keeping those two
              disciplines apart, Goallounge became the obvious next move.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
