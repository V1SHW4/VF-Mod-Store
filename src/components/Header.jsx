"use client";

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="header">
      <div className="app-container header-inner">
        
        {/* Logo and Brand */}
        <div className="logo-container" onClick={() => setSearchQuery("")}>
          <div className="logo-text">
            <span className="logo-prefix">VF</span>
            <span className="logo-suffix">Altered</span>
            <span className="logo-dot"></span>
          </div>
          <div className="logo-subheading">
            Web Scripts and Mod Store
          </div>
        </div>

        {/* Play Store Floating Search Bar */}
        <div className="search-wrapper">
          <div className="search-input-container">
            <span className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search apps, scripts, and mods..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
