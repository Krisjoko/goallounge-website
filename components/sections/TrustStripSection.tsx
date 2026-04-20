import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/constants";

export default function TrustStripSection() {
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      id="clients"
      className="border-t border-[#4A4740]/30 px-6 py-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-8">Clients We Have Built For</div>
        <div className="ticker-mask overflow-hidden">
          <div
            className="flex items-center gap-14"
            style={{
              animation: "logo-scroll 40s linear infinite",
              width: "max-content",
            }}
          >
            {doubled.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="relative flex h-14 w-36 flex-shrink-0 items-center justify-center opacity-60 grayscale transition-opacity hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
