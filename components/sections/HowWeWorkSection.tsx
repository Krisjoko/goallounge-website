import Image from "next/image";

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

function PersonCard({
  name,
  role,
  bio,
  bullets,
  footnote,
  cta,
  ctaHref,
  accentColor,
  photo,
}: {
  name: string;
  role: string;
  bio: string;
  bullets: string[];
  footnote?: string;
  cta: string;
  ctaHref: string;
  accentColor: string;
  photo: string;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-xl bg-[#222222] p-6">
      {/* Photo */}
      <div
        className="relative mb-5 block aspect-square overflow-hidden rounded-xl"
        style={{
          width: "72px",
          height: "72px",
          border: `1px solid ${accentColor}33`,
          backgroundColor: "#1A1A1A",
        }}
      >
        <Image
          src={photo}
          alt={name}
          fill
          sizes="72px"
          className="object-cover object-center"
          style={{
            filter: "saturate(0.4) brightness(0.85) contrast(0.9)",
          }}
        />
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
      <a
        href={ctaHref}
        target={ctaHref.startsWith("http") ? "_blank" : undefined}
        rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className="mt-auto font-mono text-[10px] tracking-widest uppercase transition-opacity hover:opacity-70"
        style={{ color: accentColor }}
      >
        {cta}
      </a>
    </div>
  );
}

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">The Goallounge Model</div>
        <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
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
            accentColor="#F86223"
            photo="/images/ClaudioDoodleProfilePic.png"
          />
          <PersonCard
            name="Kristy"
            role="Positioning, GTM & Project Leadership"
            bio="Kristy builds the positioning and narrative that give the work somewhere to stand. Clear, commercial and ready for market."
            bullets={KRISTY_BULLETS}
            cta="View Portfolio →"
            ctaHref="https://bit.ly/KristyCunningham_Goallounge"
            accentColor="#22A6FF"
            photo="/images/KristyDoodleProfilePic.png"
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
