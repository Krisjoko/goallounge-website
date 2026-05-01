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

function DesignIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      width="100%"
      height="100%"
      fill="none"
      stroke="#8A857C"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M26 6L34 14L16 36L6 36L6 26Z" />
      <path d="M22 10L30 18" />
      <line x1="6" y1="26" x2="16" y2="36" />
    </svg>
  );
}

function StrategyIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      width="100%"
      height="100%"
      fill="none"
      stroke="#8A857C"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5"  y="26" width="7" height="9"  rx="1" />
      <rect x="17" y="18" width="7" height="17" rx="1" />
      <rect x="29" y="9"  width="7" height="26" rx="1" />
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
  icon,
}: {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  footnote?: string;
  cta: string;
  ctaHref: string;
  accentColor: string;
  icon: "design" | "strategy";
}) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-[#222222] p-6">
      {/* Craft icon */}
      <div
        className="mb-5 flex items-center justify-center"
        style={{ width: "56px", height: "56px" }}
      >
        {icon === "design" ? <DesignIcon /> : <StrategyIcon />}
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
            icon="design"
          />
          <PersonCard
            name="Kristy"
            role="Positioning, GTM & Project Leadership"
            bio="Kristy builds the positioning and narrative that give the work somewhere to stand. Clear, commercial and ready for market."
            bullets={KRISTY_BULLETS}
            cta="View Portfolio →"
            ctaHref="https://bit.ly/KristyCunningham_Goallounge"
            accentColor="#22A6FF"
            icon="strategy"
          />
        </div>

        {/* Origin story */}
        <div className="mt-16 border-t border-[#4A4740]/30 pt-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="section-label mb-4 justify-center">How We Got Here</div>
            <p className="font-sans text-base leading-relaxed text-[#E0DDD8] md:text-lg">
              Between us, we bring two decades across design and strategy —
              two disciplines that almost never talk to each other. We are
              married, and together we built GLTV: a football platform with a
              global audience, where running design and go-to-market as one
              conversation wasn&apos;t a methodology, it was just how we
              worked. When we saw how much money and time companies were losing
              by keeping those two disciplines apart, Goallounge became the
              obvious next move.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
