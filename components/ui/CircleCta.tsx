import type { AnchorHTMLAttributes } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: "primary" | "secondary";
}

export default function CircleCta({
  label,
  variant = "primary",
  className = "",
  href = "#",
  ...props
}: Props) {
  const isExt = href.startsWith("http");

  const circleClass =
    variant === "primary"
      ? "border-[#B8400E] text-[#F86223] group-hover:border-[#F86223]"
      : "border-[#4A4740] text-[#706D66] group-hover:border-[#706D66]";

  const labelClass =
    variant === "primary"
      ? "text-[#E0DDD8] group-hover:text-white"
      : "text-[#706D66] group-hover:text-[#E0DDD8]";

  return (
    <a
      href={href}
      target={isExt ? "_blank" : undefined}
      rel={isExt ? "noopener noreferrer" : undefined}
      {...props}
      className={`group flex items-center gap-3 ${className}`}
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
      <span
        className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${labelClass}`}
      >
        {label}
      </span>
    </a>
  );
}
