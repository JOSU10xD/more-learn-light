// src/components/MapEmbed.tsx
import React from "react";

type Props = {
  embedUrl?: string; // full google maps embed URL (iframe src)
  height?: string;   // CSS height (e.g. "400px" or "60vh")
  className?: string;
  title?: string;
};

export default function MapEmbed({
  embedUrl,
  height = "400px",
  className = "",
  title = "Location map",
}: Props) {
  const src =
    embedUrl ||
    (process.env.REACT_APP_MAP_EMBED_URL as string) ||
    "https://maps.google.com/maps?q=12.9716,77.5946&z=15&output=embed"; // fallback

  return (
    <div
      className={`map-embed-wrapper ${className}`}
      style={{ width: "100%", height, minHeight: "200px" }}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
