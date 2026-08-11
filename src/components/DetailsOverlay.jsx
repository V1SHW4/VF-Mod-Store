"use client";

import AdBanner from "./AdBanner";

// Simple custom Markdown parser for rendering installation guides safely and lightweight
function parseMarkdown(text) {
  if (!text) return "";
  
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Parse Headers
  html = html.replace(/^### (.*?)$/gm, "<h4>$1</h4>");
  html = html.replace(/^## (.*?)$/gm, "<h3>$1</h3>");
  html = html.replace(/^# (.*?)$/gm, "<h2>$1</h2>");

  // Parse Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  // Parse Italics
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  // Parse Links - support both absolute and protocol-relative links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, (match, linkText, url) => {
    const cleanUrl = url.replace(/&amp;/g, "&");
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
  });

  // Parse lists
  html = html.replace(/^\s*[-*]\s+(.*?)$/gm, "<li>$1</li>");
  html = html.replace(/^\s*\d+\.\s+(.*?)$/gm, "<li>$1</li>"); // numeric list parsing

  // Split into paragraphs for standard text lines
  const lines = html.split("\n");
  const processed = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return "";
    
    // If it's already a header or list item, return as is
    if (trimmed.startsWith("<h") || trimmed.startsWith("<li")) {
      return line;
    }
    
    return `<p>${line}</p>`;
  });

  return processed.join("");
}

export default function DetailsOverlay({ mod, onClose }) {
  if (!mod) return null;

  const {
    title,
    description,
    thumbnail,
    downloadUrl,
    installationGuide,
    tags = [],
    version = "v1.0.0",
    fileSize = "N/A",
    downloads = "100+",
    rating = "4.8"
  } = mod;

  const guideHtml = parseMarkdown(installationGuide);

  return (
    <div className="details-overlay" onClick={onClose}>
      
      {/* Container card */}
      <div className="details-content-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Floating Close Button */}
        <button className="close-overlay-btn" onClick={onClose} aria-label="Close details">
          &times;
        </button>

        {/* Thumbnail Image Section */}
        <div className="details-header-img">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`${title} banner`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          ) : (
            <div className="card-image-placeholder" />
          )}
        </div>

        {/* Details Information */}
        <div className="details-body">
          
          {/* Header Row */}
          <div className="details-title-row">
            <div className="card-tags">
              {tags.map((tag, idx) => (
                <span key={idx} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="details-title">{title}</h1>
          </div>

          {/* Adsterra Top Banner Inside Modal */}
          <AdBanner placement="detailBanner" />

          {/* Quick Specs Bar (Play Store inspired) */}
          <div className="specs-bar">
            <div className="spec-pill">
              <span className="spec-label">Rating</span>
              <span className="spec-value">★ {rating}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">Downloads</span>
              <span className="spec-value">{downloads}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">File Size</span>
              <span className="spec-value">{fileSize}</span>
            </div>
            <div className="spec-pill">
              <span className="spec-label">Version</span>
              <span className="spec-value">{version}</span>
            </div>
          </div>

          {/* Description */}
          <div className="details-description">
            <p>{description}</p>
          </div>

          {/* Highlighted Installation Guide Section */}
          <div className="guide-container">
            <div className="guide-header">
              <span className="guide-icon">i</span>
              <span>Installation Instructions</span>
            </div>
            <div 
              className="guide-body"
              dangerouslySetInnerHTML={{ __html: guideHtml }}
            />
          </div>

          {/* Bottom Adsterra Banner inside Modal */}
          <div style={{ margin: "20px 0" }}>
            <AdBanner placement="midBanner" />
          </div>

          {/* Modal Actions */}
          <div className="details-actions">
            {downloadUrl && (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-download-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download &amp; Install
              </a>
            )}
            <button className="btn-close-secondary" onClick={onClose}>
              Close Details
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
