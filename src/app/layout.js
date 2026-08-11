import Script from "next/script";
import { ADS_CONFIG } from "@/config/ads";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "VortexForge Altered - Web Scripts and Mod Store",
  description: "Download verified web scripts, custom game mods, and automation tools curated by Vortex Forge.",
  keywords: "Vortex Forge, VortexForge Altered, web scripts, mods, tampermonkey scripts, game config mods, free scripts",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Adsterra Popunder Ad Script */}
        {ADS_CONFIG.enabled && ADS_CONFIG.popunderSrc && (
          <Script 
            src={ADS_CONFIG.popunderSrc} 
            strategy="afterInteractive" 
            id="adsterra-popunder"
          />
        )}
        
        {/* Adsterra Social Bar Ad Script */}
        {ADS_CONFIG.enabled && ADS_CONFIG.socialBarSrc && (
          <Script 
            src={ADS_CONFIG.socialBarSrc} 
            strategy="afterInteractive" 
            id="adsterra-socialbar"
          />
        )}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
