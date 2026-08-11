"use client";

import { useState, useEffect } from "react";
import { fetchMods } from "@/config/firebase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ModCard from "@/components/ModCard";
import DetailsOverlay from "@/components/DetailsOverlay";
import AdBanner from "@/components/AdBanner";

export default function Home() {
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMod, setSelectedMod] = useState(null);

  // Fetch mods data from Firebase RTDB on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchMods();
        let list = [];
        
        if (data && typeof data === "object") {
          // If it has a root "mods" key (like our template), extract from it
          const rawMods = data.mods ? data.mods : data;
          
          list = Object.entries(rawMods).map(([key, value]) => ({
            id: key,
            ...value,
          }));
        } else if (Array.isArray(data)) {
          list = data.filter(Boolean);
        }
        
        setMods(list);
      } catch (err) {
        console.error("Failed to load mods data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter mods based on search query
  const filteredMods = mods.filter((mod) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = mod.title?.toLowerCase().includes(query);
    const descMatch = mod.description?.toLowerCase().includes(query);
    const tagMatch = mod.tags?.some((tag) => tag.toLowerCase().includes(query));
    return titleMatch || descMatch || tagMatch;
  });

  // Section 1: Dev's Suggestions (latest uploads flagged with isDevSuggestion: true)
  const devSuggestions = filteredMods.filter((mod) => mod.isDevSuggestion);

  // Section 2: Most Popular (all other mods that are NOT in Dev's Suggestions)
  const mostPopular = filteredMods.filter((mod) => !mod.isDevSuggestion);

  return (
    <div className="flex-wrapper" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header (Contains Search input and text logo) */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Page Area */}
      <main className="app-container" style={{ flex: 1 }}>
        
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">VortexForge Altered</h1>
          <p className="hero-subtitle">
            Discover and install premium web scripts, custom game mods, and automation rules crafted by Vortex Forge.
          </p>
        </section>

        {/* Adsterra Header Banner */}
        <AdBanner placement="topBanner" />

        {/* --- DEV'S SUGGESTIONS SECTION --- */}
        <section className="section-container" style={{ marginTop: "20px" }}>
          <div className="section-header">
            <h2 className="section-title">
              Dev&apos;s Suggestions
              <span className="section-title-badge">Latest Uploads</span>
            </h2>
          </div>

          {loading ? (
            <div className="mods-grid">
              {[1, 2].map((n) => (
                <div key={n} className="ad-skeleton" style={{ height: "350px", borderRadius: "16px" }} />
              ))}
            </div>
          ) : devSuggestions.length > 0 ? (
            <div className="mods-grid">
              {devSuggestions.map((mod) => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onSelect={(selected) => setSelectedMod(selected)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No suggestions found</h3>
              <p>Try searching for a different keyword or check back later!</p>
            </div>
          )}
        </section>

        {/* Adsterra Mid Section Banner */}
        <AdBanner placement="midBanner" />

        {/* --- MOST POPULAR SECTION --- */}
        <section className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Most Popular
              <span className="section-title-badge">Top Hits</span>
            </h2>
          </div>

          {loading ? (
            <div className="mods-grid">
              {[1, 2].map((n) => (
                <div key={n} className="ad-skeleton" style={{ height: "350px", borderRadius: "16px" }} />
              ))}
            </div>
          ) : mostPopular.length > 0 ? (
            <div className="mods-grid">
              {mostPopular.map((mod) => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onSelect={(selected) => setSelectedMod(selected)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🎮</div>
              <h3>No items found in popular</h3>
              <p>Try searching for a different keyword or check back later!</p>
            </div>
          )}
        </section>

      </main>

      {/* Footer (Contains copyright and about/privacy models) */}
      <Footer />

      {/* --- DETAILS OVERLAY MODAL --- */}
      {selectedMod && (
        <DetailsOverlay
          mod={selectedMod}
          onClose={() => setSelectedMod(null)}
        />
      )}
    </div>
  );
}
