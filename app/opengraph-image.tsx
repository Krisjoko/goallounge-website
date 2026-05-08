import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Goallounge — Positioning and Design, Built as One";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            "linear-gradient(180deg, #1C1C1C 0%, #0A0A0A 100%)",
          color: "#E0DDD8",
          padding: "96px",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#FF4822",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 32,
            display: "flex",
          }}
        >
          Goallounge
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Positioning and design,</span>
          <span>
            built as <span style={{ color: "#FF4822" }}>one</span>
          </span>
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#8A857C",
            marginTop: 48,
            display: "flex",
          }}
        >
          Strategic creative studio for ambitious founders.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
