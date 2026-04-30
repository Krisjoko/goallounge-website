import CircleCta from "@/components/ui/CircleCta";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "#get-in-touch";

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

function GenderSymbol({ kind, color }: { kind: "male" | "female"; color: string }) {
  if (kind === "male") {
    return (
      <svg
        viewBox="0 0 100 120"
        width="100%"
        height="100%"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="42" cy="76" r="26" />
        <line x1="60.4" y1="57.6" x2="86" y2="32" />
        <polyline points="70,32 86,32 86,48" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 100 120"
      width="100%"
      height="100%"
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="50" cy="42" r="26" />
      <line x1="50" y1="68" x2="50" y2="112" />
      <line x1="34" y1="94" x2="66" y2="94" />
    </svg>
  );
}

function PersonCard({
  name,
  role,
  bio,
  bullets,
  footnote,
  cta,
  ctaHref,
  accentColor,
  symbol,
}: {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  footnote?: string;
  cta: string;
  ctaHref: string;
  accentColor: string;
  symbol: "male" | "female";
}) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-[#222222] p-6">
      {/* Mars / Venus brand mark with accent glow */}
      <div
        className="mb-5 flex items-center justify-center"
        style={{
          width: "56px",
          height: "56px",
          filter: `drop-shadow(0 6px 24px ${accentColor}33)`,
        }}
      >
        <GenderSymbol kind={symbol} color={accentColor} />
      </div>

      {/* Name + role */}
      <p
        className="mb-0.5 font-mono text-[10px] tracking-widest uppercase"
        style={{ color: accentColor }}
      >
        {name}
      </p>
      <p className="mb-4 font-sans text-xs text-[#706D66]">{role}</p>

      {/* Bio */}
      <p className="mb-5 font-sans text-sm leading-relaxed text-[#E0DDD8]">
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
        <p className="mb-5 font-sans text-xs italic leading-relaxed text-[#E0DDD8]">
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
    <section id="how-we-work" className="px-6 py-16 md:py-20 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">The Goallounge Model</div>
        <h2 className="font-hero-serif mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          Two senior practitioners.
          <br />
          One engagement.
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
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
            symbol="male"
          />
          <PersonCard
            name="Kristy"
            role="Positioning, GTM & Project Leadership"
            bio="Kristy builds the positioning and narrative that give the work somewhere to stand. Clear, commercial and ready for market."
            bullets={KRISTY_BULLETS}
            cta="View Portfolio →"
            ctaHref="https://bit.ly/KristyCunningham_Goallounge"
            accentColor="#22A6FF"
            symbol="female"
          />
        </div>

        {/* Origin story strip (replaces StorySection) */}
        <div className="mt-16 border-t border-[#4A4740]/30 pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-4 justify-center">How We Got Here</div>
            <p className="font-sans text-base leading-relaxed text-[#E0DDD8] md:text-lg">
              We met building GLTV, a football platform with a global
              audience. Claudio was running product design. Kristy was running
              go-to-market. We kept arriving at the same problem from different
              sides: strategy and design were being built in separate rooms, by
              separate people, at separate times. Goallounge is what we built
              to fix that.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
