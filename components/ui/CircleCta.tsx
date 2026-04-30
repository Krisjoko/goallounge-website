import type { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  sublabel?: string;
  variant?: "primary" | "secondary";
}

export default function CircleCta({
  label,
  sublabel,
  variant = "primary",
  className = "",
  href = "#",
  ...props
}: Props) {
  const isExt = href.startsWith("http");

  const circleClass =
    variant === "primary"
      ? "border-[#706D66] text-[#706D66] group-hover:bg-[#FF4822] group-hover:border-[#FF4822] group-hover:text-white"
      : "border-[#4A4740] text-[#706D66] group-hover:bg-[#E0DDD8] group-hover:border-[#E0DDD8] group-hover:text-[#1A1A1A]";

  const labelClass =
    variant === "primary"
      ? "text-[#E0DDD8] group-hover:text-[#FF4822]"
      : "text-[#706D66] group-hover:text-[#E0DDD8]";

  return (
    <a
      href={href}
      target={isExt ? "_blank" : undefined}
      rel={isExt ? "noopener noreferrer" : undefined}
      {...props}
      className={`group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4822] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] ${className}`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${circleClass}`}
        aria-hidden
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d="M2 5H8M8 5L5 2M8 5L5 8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${labelClass}`}
        >
          {label}
        </span>
        {sublabel && (
          <span className="mt-0.5 font-mono text-[9px] tracking-wider text-[#8A857C]">
            {sublabel}
          </span>
        )}
      </span>
    </a>
  );
}
