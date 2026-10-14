import { ImageResponse } from "next/og";
import { site } from "@/content";

// Allow `output: "export"` builds; the route is static either way.
export const dynamic = "force-static";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a0b",
          color: "#f2f0ea",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(to right, rgba(242,240,234,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,240,234,0.07) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#8f8f98" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff5a1f" }} />
          <span>{site.role.toUpperCase()}</span>
          <span style={{ color: "#5a5a62" }}>·</span>
          <span>@{site.handle}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, fontWeight: 600, letterSpacing: -8, lineHeight: 0.95 }}>
            {site.name}
          </div>
          <div style={{ marginTop: 36, fontSize: 32, color: "#b4b4bb", maxWidth: 900, lineHeight: 1.3 }}>
            {site.positioning}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
