import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-hero-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Goallounge — Positioning and Design, Built as One",
  description:
    "Strategic creative studio for ambitious founders. Brand, design, and digital product work that positions and converts.",
  openGraph: {
    title: "Goallounge — Positioning and Design, Built as One",
    description:
      "Strategic creative studio for ambitious founders. Brand, design, and digital product work that positions and converts.",
    siteName: "Goallounge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goallounge — Positioning and Design, Built as One",
    description: "Strategic creative studio for ambitious founders.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} ${bebasNeue.variable}`}
    >
      <body className="min-h-screen text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
