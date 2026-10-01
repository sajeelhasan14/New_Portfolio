import { ImageResponse } from "next/og";
import { PROFILE } from "@/data/portfolio";

export const alt = `${PROFILE.name} — ${PROFILE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#141414",
          position: "relative",
        }}
      >
        {/* Accent glow, matching the site's hero */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,76,35,0.55) 0%, rgba(20,20,20,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(204,45,0,0.7) 0%, rgba(20,20,20,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#F96C4A",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            &gt; {PROFILE.availability}
          </div>

          <div style={{ display: "flex", color: "#A8A6A0", fontSize: 56, lineHeight: 1.1 }}>
            Mohammad
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              background: "linear-gradient(90deg, #F96C4A 0%, #E84C23 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Sajeel Hasan
          </div>

          <div style={{ display: "flex", color: "#F3F2EE", fontSize: 32, marginTop: 36 }}>
            {PROFILE.tagline}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 48,
              color: "#77756F",
              fontSize: 24,
            }}
          >
            <span>{PROFILE.location}</span>
            <span style={{ color: "#E84C23" }}>•</span>
            <span>React · Next.js · Node · Flutter</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
