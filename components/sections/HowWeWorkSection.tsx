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
        className="mb-5 h-16 w-16 overflow-hidden rounded-xl"
        style={{ outline: `2px solid ${accentColor}`, outlineOffset: "2px" }}
      >
        <div className="relative h-full w-full bg-[#333]">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover object-top"
          />
        </div>
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
        <p className="mb-5 font-sans text-xs italic leading-relaxed text-[#4A4740]">
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
        <div className="section-label mb-4">How We Work</div>
        <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          No gap between strategy and design.
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
          Every engagement is led by two senior practitioners — one shaping the
          strategy, one building the work. No account managers, no handoffs, no
          translation layers between thinking and making.
        </p>

        {/* Person cards */}
        <div className="flex flex-col gap-4 md:flex-row">
          <PersonCard
            name="Claudio"
            role="Product Design & Systems"
            bio="Claudio architects the interfaces and design systems that hold up under real product pressure. Scalable, opinionated, and ready to ship."
            bullets={CLAUDIO_BULLETS}
            footnote="Claudio's portfolio is always scaling and growing. Happy to walk you through it live on a call."
            cta="Book a Walkthrough →"
            ctaHref={BOOKING_URL}
            accentColor="#F86223"
            photo="/images/claudio.jpg"
          />
          <PersonCard
            name="Kristy"
            role="Positioning, GTM & Project Leadership"
            bio="Kristy shapes the story and drives it forward. She translates ambiguous business challenges into sharp strategy, then makes sure it lands."
            bullets={KRISTY_BULLETS}
            cta="View Portfolio →"
            ctaHref="#"
            accentColor="#22A6FF"
            photo="/images/kristy.jpg"
          />
        </div>

        {/* Bottom statement */}
        <div className="mt-12 border-t border-[#4A4740]/30 pt-8 text-center">
          <p className="font-display text-xl font-normal text-[#E0DDD8] md:text-2xl">
            Strategy and design, built together from day one.
          </p>
          <p className="mt-1 font-sans text-sm text-[#706D66]">
            No briefing chains, no feedback spirals, no layers between the
            decision and the work.
          </p>
        </div>
      </div>
    </section>
  );
}
