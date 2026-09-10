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
          background: "#0A0A0A",
          position: "relative",
        }}
      >
        {/* Purple glow, matching the site's hero */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,50,250,0.55) 0%, rgba(10,10,10,0) 70%)",
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
            background: "radial-gradient(circle, rgba(70,15,118,0.7) 0%, rgba(10,10,10,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#B45CFF",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 32,
            }}
          >
            &gt; {PROFILE.availability}
          </div>

          <div style={{ display: "flex", color: "#A29CAE", fontSize: 56, lineHeight: 1.1 }}>
            Mohammad
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              background: "linear-gradient(90deg, #B45CFF 0%, #9B32FA 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Sajeel Hasan
          </div>

          <div style={{ display: "flex", color: "#EDEAF2", fontSize: 32, marginTop: 36 }}>
            {PROFILE.tagline}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 48,
              color: "#6E687A",
              fontSize: 24,
            }}
          >
            <span>{PROFILE.location}</span>
            <span style={{ color: "#9B32FA" }}>•</span>
            <span>React · Next.js · Node · Flutter</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
