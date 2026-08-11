"use client";

import Image from "next/image";

export default function ModCard({ mod, onSelect }) {
  const {
    title,
    description,
    thumbnail,
    tags = [],
    downloads = "1K+",
    rating = "4.7"
  } = mod;

  return (
    <div className="card-widget" onClick={() => onSelect(mod)}>
      
      {/* Thumbnail Container (16:9 Aspect Ratio) */}
      <div className="card-thumbnail-container">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${title} thumbnail`}
            className="card-image"
            loading="lazy"
          />
        ) : (
          <div className="card-image-placeholder" />
        )}
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        {/* Tags */}
        <div className="card-tags">
          {tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="card-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="card-title">{title}</h3>

        {/* Description */}
        <p className="card-description">{description}</p>

        {/* Play Store metadata row */}
        <div className="card-meta-row">
          <div className="meta-item">
            <span className="meta-rating-star">★</span>
            <strong>{rating}</strong>
          </div>
          <div className="meta-item">
            <span>{downloads} downloads</span>
          </div>
        </div>

        {/* Install Button */}
        <button 
          className="install-btn"
          onClick={(e) => {
            e.stopPropagation(); // Avoid double action if card container onClick fires
            onSelect(mod);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '2px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Install
        </button>

      </div>

    </div>
  );
}
