"use client";

import { useState } from "react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'about' | 'privacy' | null

  const closeModal = () => setActiveModal(null);

  return (
    <footer className="footer">
      <div className="app-container">
        
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">VortexForge Altered</div>
            <p className="footer-desc">
              Your premium destination for web scripts, browser extensions, automation rules, and gaming modifications. Vetted and prepared by Vortex Forge developers for smooth and safe implementation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-nav">
            <div className="footer-nav-title">Explore</div>
            <button className="footer-link" onClick={() => setActiveModal("about")}>About Store</button>
            <button className="footer-link" onClick={() => setActiveModal("privacy")}>Privacy Policy</button>
          </div>


        </div>

        {/* Footer Bottom containing ownership claim */}
        <div className="footer-bottom">
          <div className="footer-claim">
            <strong>Ownership Claim:</strong> VortexForge Altered Mods and Scripts are proprietary designs and curatorships by <strong>Vortex Forge</strong>. All rights reserved.
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} VortexForge Altered. Curated with excellence.
          </div>
        </div>

      </div>

      {/* --- ABOUT US OVERLAY MODAL --- */}
      {activeModal === "about" && (
        <div className="text-overlay" onClick={closeModal}>
          <div className="text-overlay-card" onClick={(e) => e.stopPropagation()}>
            <div className="text-overlay-header">
              <h2 className="text-overlay-title">About VortexForge Altered</h2>
              <button className="text-overlay-close" onClick={closeModal} aria-label="Close modal">
                &times;
              </button>
            </div>
            <div className="text-overlay-content">
              <p>
                Welcome to <strong>VortexForge Altered</strong>, the premier hub for custom Web Scripts and Mods curated and created by <strong>Vortex Forge</strong>.
              </p>
              <p>
                We specialize in creating lightweight, powerful enhancements that help developers, gamers, and web enthusiasts optimize their workflows and entertainment experiences. Whether you are looking for automated scripts to bypass links, custom style sheets, or game configuration files, we have it all.
              </p>
              <h3>Why Choose VortexForge Altered?</h3>
              <ul>
                <li><strong>Verified Safe:</strong> Every script and mod hosted here is thoroughly inspected for malware, tracking codes, and stability issues.</li>
                <li><strong>Detailed Guides:</strong> We provide structured, clear installation manuals for all our items so you can get started in seconds.</li>
                <li><strong>High Quality Assets:</strong> All mods are optimized to ensure they run with minimal system overhead, maintaining high frame rates and quick load times.</li>
              </ul>
              <p>
                Thank you for supporting Vortex Forge. Stay tuned to our official channels for direct tutorials, showcases, and development updates!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- PRIVACY POLICY OVERLAY MODAL --- */}
      {activeModal === "privacy" && (
        <div className="text-overlay" onClick={closeModal}>
          <div className="text-overlay-card" onClick={(e) => e.stopPropagation()}>
            <div className="text-overlay-header">
              <h2 className="text-overlay-title">Privacy Policy</h2>
              <button className="text-overlay-close" onClick={closeModal} aria-label="Close modal">
                &times;
              </button>
            </div>
            <div className="text-overlay-content">
              <p>Last updated: August 2026</p>
              <p>
                At VortexForge Altered, accessible from our Vercel web address, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information we collect and how we utilize it.
              </p>
              <h3>1. Personal Information We Collect</h3>
              <p>
                VortexForge Altered does not directly host any authentication systems or require user accounts. We do not collect names, email addresses, or phone numbers. All data fetched to compile mod directories is retrieved from public, non-sensitive read-only Firebase Realtime Databases.
              </p>
              <h3>2. Adsterra and Third-Party Advertising</h3>
              <p>
                We partner with <strong>Adsterra</strong> to monetize our platform. Adsterra uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on VortexForge Altered. These technologies are sent directly to users' browsers and automatically capture your IP address, browser type, device information, and browsing history to measure the effectiveness of advertising campaigns and customize ad content.
              </p>
              <p>
                Note that VortexForge Altered has no access to or control over cookies used by third-party advertisers. We recommend consulting Adsterra's official Privacy Policy for detailed opt-out instructions.
              </p>
              <h3>3. External Download Links</h3>
              <p>
                Our site contains links to external download platforms and file hosting services. We are not responsible for the privacy practices, content, or cookie policies of these external sites.
              </p>
              <h3>4. Consent</h3>
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
