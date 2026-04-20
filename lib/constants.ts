export const NAV_ITEMS = [
  { label: "Sound Familiar?", href: "#sound-familiar" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "When To Work", href: "#when-to-work" },
  { label: "Selected Work", href: "#selected-work" },
  { label: "Our Story", href: "#our-story" },
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
      "The design team has not seen the strategy deck — and the strategy team has not seen the designs.",
  },
  {
    number: "02",
    title: "Design keeps changing direction.",
    quote:
      "We are on round seven of feedback and further from the answer than when we started.",
  },
  {
    number: "03",
    title: "Senior advisors advise. Nobody builds.",
    quote:
      "The consultant gave us a strategy deck. Now we need someone who will actually roll up their sleeves and make it happen.",
  },
  {
    number: "04",
    title: "Internal echo chambers kill fresh thinking.",
    quote:
      "We have been looking at this for so long, we can not see it anymore. The internal team keeps landing in the same place.",
  },
  {
    number: "05",
    title: "Decision fatigue stalls everything.",
    quote:
      "Twelve stakeholders need to approve a colour palette — nobody wants to make the call.",
  },
  {
    number: "06",
    title: "You built the product. Nobody planned how to sell it.",
    quote:
      "We launched. Then we looked at each other and asked — Now what?",
  },
  {
    number: "07",
    title: "Handoffs kill momentum.",
    quote:
      "The strategist wrote the brief. The designer read it differently. The developer built something else.",
  },
  {
    number: "08",
    title: "Poor scoping means you are spending the budget before the real problem is defined.",
    quote:
      "We need a full rebrand, but we do not know what that involves, what to prioritise, or what resources we actually need.",
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
    title: "You need fresh eyes",
    body: "The internal team has been looking at this for so long they keep landing in the same place. You need someone who will see what they can not.",
  },
  {
    id: 5,
    title: "Your internal team needs a senior partner, not another advisor",
    body: "You do not need a deck. You need someone in the room who will build alongside your team and raise the bar while they are at it.",
  },
  {
    id: 6,
    title: "You are hiring designers and strategists separately",
    body: "And you are starting to suspect that is the reason nothing connects.",
  },
];

export const DISCIPLINES = [
  "Brand Identity Design",
  "Logos",
  "Product Design",
  "Growth Marketing",
  "Strategy",
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export const PROJECTS = [
  {
    id: 1,
    name: "Dis-Chem",
    category: "Brand & Design System",
    discipline: "Brand Identity Design" as Discipline,
    image: "/images/projects/dischem.jpg",
  },
  {
    id: 2,
    name: "Yoco",
    category: "Product Design, Packaging, UI/UX",
    discipline: "Product Design" as Discipline,
    image: "/images/projects/yoco.jpg",
  },
  {
    id: 3,
    name: "Value Prop",
    category: "Brand Identity & Website",
    discipline: "Brand Identity Design" as Discipline,
    image: "/images/projects/valueprop.jpg",
  },
  {
    id: 4,
    name: "X,bigly",
    category: "Design System",
    discipline: "Logos" as Discipline,
    image: "/images/projects/xbigly.jpg",
  },
  {
    id: 5,
    name: "GLTV Platform",
    category: "Product Design",
    discipline: "Product Design" as Discipline,
    image: "/images/projects/gltv.jpg",
  },
  {
    id: 6,
    name: "Coming Soon",
    category: "Growth Marketing",
    discipline: "Growth Marketing" as Discipline,
    image: "/images/projects/placeholder.jpg",
  },
  {
    id: 7,
    name: "Coming Soon",
    category: "Strategy",
    discipline: "Strategy" as Discipline,
    image: "/images/projects/placeholder.jpg",
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
