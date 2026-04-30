export const NAV_ITEMS = [
  { label: "Sound Familiar?", href: "#sound-familiar" },
  { label: "The Model", href: "#how-we-work" },
  { label: "Work With Us", href: "#when-to-work" },
  { label: "Selected Work", href: "#selected-work" },
  { label: "Process", href: "#process" },
  { label: "Client Stories", href: "#client-stories" },
];

const logo = (filename: string) =>
  `/images/logos/${encodeURIComponent(filename)}`;

export const CLIENT_LOGOS = [
  { name: "Liverpool FC",      src: logo("Property 1=LFC, Property 2=80, Property 3=N200.png") },
  { name: "Absa",             src: logo("Property 1=Absa, Property 2=80, Property 3=N200.png") },
  { name: "Discovery",        src: logo("Property 1=Discovery, Property 2=80, Property 3=N200.png") },
  { name: "TikTok",           src: logo("Property 1=TikTok, Property 2=N200.png") },
  { name: "Liberty",          src: logo("Property 1=Liberty, Property 2=80, Property 3=N200.png") },
  { name: "Nedbank",          src: logo("Property 1=Nedbank, Property 2=80, Property 3=N200.png") },
  { name: "ESL",              src: logo("Property 1= ESL, Property 2=N200 (1).png") },
  { name: "Shell",            src: logo("Property 1=Shell, Property 2=80, Property 3=N200.png") },
  { name: "Standard Bank",    src: logo("Property 1=StandardBank, Property 2=80, Property 3=N200.png") },
  { name: "Superbalist",      src: logo("Property 1=Superbalist-2, Property 2=80, Property 3=N200.png") },
  { name: "SuperSport",       src: logo("Property 1=SuperSport, Property 2=80, Property 3=N200.png") },
  { name: "Yoco",             src: logo("Property 1=Yoco, Property 2=80, Property 3=N200.png") },
  { name: "Chicken Lickin",   src: logo("Property 1=Chicken Lickin, Property 2=N200.png") },
  { name: "Funding Frontier", src: logo("Property 1= Funding Frontier, Property 2=N200-1.png") },
  { name: "Freethinking",     src: logo("Property 1=Freethinking, Property 2=80, Property 3=N200.png") },
  { name: "Vitality",         src: logo("Property 1=Vitality-2, Property 2=80, Property 3=N200.png") },
];

export const PROBLEM_CARDS = [
  {
    number: "01",
    title: "Siloed teams mean your product and positioning never align.",
    quote:
      "We shipped the campaign before the positioning was finalised. The sales team found out when they read our own press release.",
  },
  {
    number: "02",
    title: "Design keeps changing direction.",
    quote:
      "We are three months in and version fourteen is heading back toward version three. Nobody can explain why we did not stay there.",
  },
  {
    number: "03",
    title: "Senior advisors advise. Nobody builds.",
    quote:
      "We have a strategy deck, a brand audit, and two sets of workshop notes. What we do not have is anything we can show a customer.",
  },
  {
    number: "04",
    title: "Your brief has twelve sign-offs and still does not say anything.",
    quote:
      "Every stakeholder approved it. Nobody challenged it. We are eight weeks in and the work is a well-designed version of the original problem.",
  },
  {
    number: "05",
    title: "Decision fatigue stalls everything.",
    quote:
      "We spent four weeks getting approval on a typeface. The same group still needs to sign off on the tagline.",
  },
  {
    number: "06",
    title: "You built the product. Nobody planned how to sell it.",
    quote:
      "We launched. Then we looked at each other. Nobody had planned what came next.",
  },
  {
    number: "07",
    title: "Handoffs kill momentum.",
    quote:
      "The strategy was signed off on a Friday. By Monday, the designer had a different brief. By Wednesday, the developer had a third version.",
  },
  {
    number: "08",
    title: "Poor scoping means you are spending the budget before the real problem is defined.",
    quote:
      "We said we needed a rebrand. Sixteen weeks and three agencies later, we are still not sure that was the right brief.",
  },
];

export const WHEN_TO_WORK_NODES = [
  {
    id: 1,
    title: "Your product is ready but your story is not",
    body: "You have built something that works. Now it needs to look and sound like the company you are becoming.",
  },
  {
    id: 2,
    title: "You have just raised and need to move fast",
    body: "The funding is in. The pressure is on. You need positioning and design to happen together, not sequentially.",
  },
  {
    id: 3,
    title: "Your rebrand keeps stalling",
    body: "You have tried agencies. You have tried freelancers. The work is either beautiful but disconnected, or strategic but never executed.",
  },
  {
    id: 4,
    title: "Your pitch keeps getting the same objection and your team has run out of angles.",
    body: "You have refined the narrative, sharpened the deck, and tightened the messaging. The same question is still stopping the conversation.",
  },
  {
    id: 5,
    title: "Your internal team is strong, but the work keeps arriving late and losing shape.",
    body: "You need someone in the room who will build alongside your team and raise the bar while they are there.",
  },
  {
    id: 6,
    title: "You are hiring designers and strategists separately.",
    body: "And the result is that the design looks like one company, the messaging reads like another, and nothing reaches the market as a single clear statement.",
  },
];

export const DISCIPLINES = [
  "Brand Identity Design",
  "Logo Design",
  "UI/UX Design",
  "Illustrations",
  "Growth Marketing & Strategy",
  "Graphic Facilitation",
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export const PROJECTS = [
  {
    id: 1,
    name: "Brand Work",
    category: "Brand Identity Design",
    discipline: "Brand Identity Design" as Discipline,
    outcome: "Identity systems across fintech, hospitality, wellness and business strategy.",
    description: "Brand identity and design systems built for startups and established businesses across multiple sectors.",
    images: [
      "/images/projects/1.FundingFrontier1.png",
      "/images/projects/2.FundingFrontier_2.png",
      "/images/projects/3.FundingFrontier_3.png",
      "/images/projects/4.FundingFrontier_4.png",
      "/images/projects/5.FundingFrontier_5.png",
      "/images/projects/6.FundingFrontier_6.png",
      "/images/projects/Bloom_1.png",
      "/images/projects/Bloom2.png",
      "/images/projects/Bloom3.png",
      "/images/projects/Bloom4.png",
      "/images/projects/Bloom5.png",
      "/images/projects/Bloom6.png",
      "/images/projects/Bloom7.png",
      "/images/projects/Merchant%20Capital%201.webp",
      "/images/projects/Merchant%20Capital%202.webp",
      "/images/projects/Merchant%20Capital%203.webp",
      "/images/projects/Merchant%20Capital%204.webp",
      "/images/projects/Nku1.webp",
      "/images/projects/Nku2.webp",
      "/images/projects/TASHAS_MAC1_.webp",
      "/images/projects/TASHAS_MAC2_.webp",
      "/images/projects/TASHAS_MAC3_.webp",
      "/images/projects/TASHAS_MAC3_%20(1).webp",
      "/images/projects/TASHAS_MAC6_.webp",
      "/images/projects/TASHAS_MAC7_.webp",
      "/images/projects/TASHAS_MAC8_.webp",
      "/images/projects/Ten4_1.png",
      "/images/projects/Ten4_2.png",
      "/images/projects/Ten4_3.png",
      "/images/projects/Ten4_5.png",
      "/images/projects/Ten4_7.png",
    ],
    placeholder: "BI",
  },
  {
    id: 2,
    name: "Logo Work",
    category: "Logo Design",
    discipline: "Logo Design" as Discipline,
    outcome: "Identity marks across fintech, sport, wellness and creative studios.",
    description: "Logo and identity systems built for startups, scale-ups and established brands across multiple sectors.",
    images: [
      "/Aerium-1.png",
      "/CB-1.png",
      "/EMH-1.png",
      "/EMH-2.png",
      "/F2-1.png",
      "/FF-1.png",
      "/FF-2.png",
      "/FF-3.png",
      "/FF-4.png",
      "/GLTV-1.png",
      "/HybridRisk-1.png",
      "/NovoFX-1.png",
      "/NovoFX-2.png",
      "/NovoFX-3.png",
      "/OhSoNiche-1.png",
      "/OhSoNiche-2.png",
      "/Source-1.png",
      "/Source-2.png",
      "/SpotOn-1.png",
      "/SpotOn-2.png",
      "/SpotOn-3.png",
      "/SpotOn-4.png",
      "/Superfluid-1.png",
      "/TEN4-1.png",
      "/TEN4-2.png",
      "/TEN4-3.png",
      "/WinningEdge-1.png",
      "/XRC-1.png",
      "/YadaSllim-1.png",
      "/YadaSllim-2.png",
      "/YadaSllim-3.png",
      "/Yvonee-1.png",
    ],
    imageLabels: [
      "Aerium",
      "Claudio Barreiro",
      "EMH 01",
      "EMH 02",
      "Formula 2",
      "Funding Frontier (Opt 1)",
      "Funding Frontier (Opt 2)",
      "Funding Frontier (Opt 3)",
      "Funding Frontier (Opt 4)",
      "Goallounge",
      "Hybrid Risk",
      "Novo FX (Opt 1)",
      "Novo FX (Opt 2)",
      "Novo FX (Opt 3)",
      "Oh So Niche (Opt 1)",
      "Oh So Niche (Opt 2)",
      "Source (Opt 1)",
      "Source (Opt 2)",
      "SpotOn (Opt 1)",
      "SpotOn (Opt 2)",
      "SpotOn (Opt 3)",
      "SpotOn (Opt 4)",
      "Superfluid",
      "TEN4 (Opt 1)",
      "TEN4 (Opt 2)",
      "TEN4 (Opt 3)",
      "Winning Edge",
      "XRC",
      "YadaSllim (Opt 1)",
      "YadaSllim (Opt 2)",
      "YadaSllim (Opt 3)",
      "Yvonee",
    ],
    placeholder: "LG",
  },
  {
    id: 3,
    name: "Value Prop",
    category: "UI/UX Design",
    discipline: "UI/UX Design" as Discipline,
    outcome: "Repositioned from service agency to product strategy firm.",
    description: "Brand identity and website for a B2B consultancy that needed to look and sound as sharp as their thinking.",
    images: [
      "/images/projects/valueprop-01.jpg",
      "/images/projects/valueprop-02.jpg",
      "/images/projects/valueprop-03.jpg",
    ],
    placeholder: "VP",
  },
  {
    id: 4,
    name: "X,bigly",
    category: "Illustrations",
    discipline: "Illustrations" as Discipline,
    outcome: "Scaled one mark across 14 sub-brands without a rebuild.",
    description: "A scalable logo and identity system designed to flex across brand, product and digital without losing coherence.",
    images: [
      "/images/projects/xbigly-01.jpg",
      "/images/projects/xbigly-02.jpg",
      "/images/projects/xbigly-03.jpg",
    ],
    placeholder: "XB",
  },
  {
    id: 5,
    name: "GLTV Platform",
    category: "Growth Marketing & Strategy",
    discipline: "Growth Marketing & Strategy" as Discipline,
    outcome: "Launched with 120,000 viewers in week one.",
    description: "Platform design for GLTV, a football content product built from the ground up with a global audience in mind.",
    images: [
      "/images/projects/gltv-01.jpg",
      "/images/projects/gltv-02.jpg",
      "/images/projects/gltv-03.jpg",
    ],
    placeholder: "GL",
  },
  {
    id: 6,
    name: "Facilitation",
    category: "Graphic Facilitation",
    discipline: "Graphic Facilitation" as Discipline,
    outcome: "Visual frameworks that move meetings to decisions.",
    description: "Live visual facilitation and illustrated outputs for strategy sessions, workshops and leadership offsites.",
    images: [
      "/images/projects/facilitation-01.jpg",
      "/images/projects/facilitation-02.jpg",
      "/images/projects/facilitation-03.jpg",
    ],
    placeholder: "GF",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Week 1",
    title: "Positioning audit",
    body: "We map what you are saying, what the market hears, and where the gap is.",
  },
  {
    step: "02",
    phase: "Weeks 2 to 4",
    title: "Strategy and design, in parallel",
    body: "Kristy writes the story. Claudio builds the system. Weekly reviews. No handoff.",
  },
  {
    step: "03",
    phase: "Weeks 5 to 8",
    title: "Build and ship",
    body: "Whatever the output is, brand, product or website, we take it to shippable.",
  },
  {
    step: "04",
    phase: "Handover",
    title: "Your team, equipped",
    body: "You leave with the strategy doc, the design system and the files. We stay on for 30 days of support.",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    person: "claudio",
    quote:
      "Claudio is that rare blend of analytical and creative. His ability to see the big picture, while also getting caught up in the detail, is inspiring. He improved the quality of our work, and the mood of his colleagues in equal measure.",
    name: "Nick Hunt-Davis",
    role: "UX Engineering Manager",
    company: "Accenture",
  },
  {
    id: 2,
    person: "kristy",
    quote:
      "She did not wait for the strategy to arrive fully formed. She constructed it, tested it and pushed it forward through every obstacle the organisation put in her way. The stamina she brought to getting that business off the ground was exactly the kind of rare commitment that actually moves something from concept to commercial reality.",
    name: "Manuel Dornetshuber",
    role: "VP Marketing & Business Development",
    company: "Coloplast",
  },
  {
    id: 3,
    person: "claudio",
    quote:
      "He is equally brilliant at the building blocks of design, all the way up to defining vision. A leader who can hold the vision in his mind and communicate it to different team members to execute it. Working well with business strategy stakeholders. Including CEO's and high-level managers.",
    name: "Jacqueline Fouche",
    role: "Head of Research & Insights",
    company: "X,bigly Design",
  },
  {
    id: 4,
    person: "kristy",
    quote:
      "Kristy managed the Discovery Leadership Summit with a level of care and operational precision that is genuinely rare. The calibre of speakers demanded absolute reliability, not just in logistics, but in judgment.",
    name: "Adrian Gore",
    role: "Founder & CEO",
    company: "Discovery Group",
  },
  {
    id: 5,
    person: "claudio",
    quote:
      "Claudio's work speaks for itself. What is behind an incredible portfolio is his passionate work ethic and approach to leading through culture and inspiration. He navigates politics and barriers so deftly he makes it look easy. Highly collaborative with design, product, executives, end-users and technology.",
    name: "Katherine Farrell",
    role: "Director of Design",
    company: "Visa / Australia",
  },
];

export const FUNDING_STAGES = [
  "Pre-seed",
  "Seed",
  "Series A",
  "Enterprise",
  "Established Rebrand",
];

export function buildMailto(checked: string[]): string {
  if (checked.length === 0) return "mailto:general@goallounge.tv";
  const body = `Hi,\n\nI am reaching out because the following resonates with where we are right now:\n\n${checked.map((i) => `• ${i}`).join("\n")}\n\nWould love to explore how Goallounge can help.\n\nBest,`;
  return `mailto:general@goallounge.tv?subject=Let%E2%80%99s%20Talk&body=${encodeURIComponent(body)}`;
}
