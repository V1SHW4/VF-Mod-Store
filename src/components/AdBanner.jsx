"use client";

import { useEffect, useRef, useState } from "react";
import { ADS_CONFIG } from "@/config/ads";

export default function AdBanner({ placement, className = "" }) {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = ADS_CONFIG.banners[placement];

  if (!ADS_CONFIG.enabled || !config) {
    return null;
  }

  // Check if it's still using the default/placeholder key
  const isPlaceholder = config.key.includes("a1b2c3d4e") || config.key.includes("b2c3d4e5") || config.key.includes("c3d4e5f6");

  // Format styles based on dimensions
  const bannerStyle = {
    width: "100%",
    maxWidth: `${config.width}px`,
    height: `${config.height}px`,
    margin: "15px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  };

  if (!isClient) {
    return <div style={{ height: `${config.height}px` }} className="ad-skeleton" />;
  }

  // If it's a placeholder, render a beautiful professional widget to show where the ad goes
  if (isPlaceholder) {
    return (
      <div 
        style={{
          ...bannerStyle,
          border: "2px dashed rgba(2, 132, 199, 0.3)",
          borderRadius: "8px",
          background: "rgba(224, 242, 254, 0.4)",
          color: "#0369a1",
          fontSize: "0.85rem",
          fontWeight: "500",
          flexDirection: "column",
          gap: "4px"
        }}
        className={`ad-banner-placeholder ${className}`}
      >
        <span style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.6 }}>
          Adsterra Monetization Zone
        </span>
        <strong>{config.fallbackText} ({config.width}x{config.height})</strong>
        <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>
          Configure keys in src/config/ads.js
        </span>
      </div>
    );
  }

  // If actual keys are present:
  if (config.format === "iframe") {
    const iframeSrc = `https://www.highperformanceformat.com/watchnew?key=${config.key}`;
    return (
      <div style={bannerStyle} className={`ad-banner-iframe ${className}`}>
        <iframe
          src={iframeSrc}
          width={config.width}
          height={config.height}
          frameBorder="0"
          scrolling="no"
          style={{ border: "none", overflow: "hidden" }}
          title={`Adsterra Ad ${placement}`}
        />
      </div>
    );
  }

  // Script format (e.g. Native banner scripts with invoke.js and container div)
  // We use srcDoc in a sandboxed iframe to isolate the document.write script 
  // execution and allow multiple instances of the same ad unit key.
  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; overflow: hidden; background: transparent; }
          #container-${config.key} { width: 100%; height: auto; min-height: ${config.height}px; display: flex; justify-content: center; }
        </style>
      </head>
      <body>
        <div id="container-${config.key}"></div>
        <script async="async" data-cfasync="false" src="https://${config.domain}/${config.key}/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div style={bannerStyle} className={`ad-banner-script-iframe ${className}`}>
      <iframe
        srcDoc={srcDoc}
        width="100%"
        height={config.height}
        frameBorder="0"
        scrolling="no"
        style={{ border: "none", overflow: "hidden" }}
        title={`Adsterra Native Ad ${placement}`}
      />
    </div>
  );
}

