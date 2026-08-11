// Firebase RTDB configuration & fetching helper
// This helper uses Firebase Realtime Database REST API to keep the bundle size small.

const DEFAULT_MOCK_MODS = {};


const DATABASE_URL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "";

export async function fetchMods() {
  if (!DATABASE_URL || DATABASE_URL.includes("YOUR_DATABASE_NAME")) {
    console.warn("Firebase RTDB URL is not configured. Falling back to default mock data.");
    return DEFAULT_MOCK_MODS;
  }

  try {
    // Add trailing slash and .json for Firebase RTDB REST API compliance
    const cleanUrl = DATABASE_URL.endsWith("/") ? DATABASE_URL : `${DATABASE_URL}/`;
    const response = await fetch(`${cleanUrl}mods.json`, {
      next: { revalidate: 30 } // Revalidate cache every 30 seconds for quick updates
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch database data: ${response.status}`);
    }

    const data = await response.json();
    if (!data) {
      console.warn("Database returned empty node. Using defaults.");
      return DEFAULT_MOCK_MODS;
    }

    // Convert object or return as-is
    return data;
  } catch (error) {
    console.error("Firebase fetch error, using default mock data:", error);
    return DEFAULT_MOCK_MODS;
  }
}
