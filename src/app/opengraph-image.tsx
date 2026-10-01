import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Aarambh Infinity: Web Development, AI Automation & Custom Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image for every page (Open Graph; twitter-image.tsx re-exports it). */
export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo/aarambh-infinity-dark.svg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(70% 90% at 90% 10%, rgba(255,90,31,0.28), #000000 70%)",
          color: "#ffffff",
        }}
      >
        <img src={`data:image/svg+xml;base64,${logo}`} width={254} height={160} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 980 }}>
            Web Development, AI Automation & Custom Software
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#ff5a1f" }}>
            Web • Mobile • AI • Automation • Software
          </div>
        </div>
      </div>
    ),
    size
  );
}
