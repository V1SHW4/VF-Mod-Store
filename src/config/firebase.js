// Firebase RTDB configuration & fetching helper
// This helper uses Firebase Realtime Database REST API to keep the bundle size small.

const DEFAULT_MOCK_MODS = {
  "mod1": {
    "id": "mod1",
    "title": "Bypass Shortener Script",
    "description": "Automatically bypass common link shorteners and direct you to the final page instantly. Works in all major browsers.",
    "thumbnail": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    "isDevSuggestion": true,
    "isPopular": false,
    "downloadUrl": "https://example.com/download/bypass-script",
    "installationGuide": "### Installation Guide\n\n1. **Prerequisite**: Install a user script manager extension like [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) on your web browser.\n2. **Installation**: Click the **Download / Install** button above. Your script manager will automatically detect the `.user.js` file and prompt you to install it.\n3. **Confirmation**: Enable the script in your extension dashboard.\n4. **Usage**: Visit any shortener link. The script will run in the background, skip timers, and redirect you directly to the destination.\n\n*If you face issues with a specific shortener site, try clearing your browser cache or updating the script to the latest version.*",
    "tags": ["Script", "Automation", "Tampermonkey"],
    "version": "v2.1.0",
    "fileSize": "45 KB",
    "downloads": "12.4K",
    "rating": "4.8"
  },
  "mod2": {
    "id": "mod2",
    "title": "Retro Runner Unlimited Keys Mod",
    "description": "Unlock infinite coins, diamonds, and keys in Retro Runner. Play with all character skins unlocked from the beginning.",
    "thumbnail": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    "isDevSuggestion": true,
    "isPopular": true,
    "downloadUrl": "https://example.com/download/retro-runner-mod",
    "installationGuide": "### Installation Guide\n\n1. **Uninstall Original App**: First, completely uninstall the official Retro Runner game from your Android/iOS device to prevent package signature conflicts.\n2. **Download Mod APK**: Click the **Install** button to download the signed mod package (.apk / .ipa).\n3. **Enable Unknown Sources**: Go to **Settings** > **Security** > and enable **Install Apps from Unknown Sources**.\n4. **Install**: Open your file explorer, locate the downloaded file, and tap it to install.\n5. **Launch**: Open the game. You will see infinite balance indicators in the main menu.\n\n*WARNING: Do not connect your official Google Play Games / Game Center account to avoid potential server-side bans.*",
    "tags": ["Mod", "Game", "APK"],
    "version": "v1.8.2",
    "fileSize": "85.4 MB",
    "downloads": "89.2K",
    "rating": "4.9"
  },
  "mod3": {
    "id": "mod3",
    "title": "Ad-Blocker Pro DNS Script",
    "description": "Block native video ads, sponsored banners, and tracking scripts system-wide without draining battery or CPU.",
    "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    "isDevSuggestion": false,
    "isPopular": true,
    "downloadUrl": "https://example.com/download/adblock-dns",
    "installationGuide": "### System Setup Instructions\n\nThis script runs locally as a proxy filter on your router or system DNS settings.\n\n#### For Windows/macOS:\n1. Open your connection settings.\n2. Locate the **IPv4 / DNS Properties** section.\n3. Paste the DNS IP addresses listed in the config download.\n4. Save settings and clear your browser DNS cache.\n\n#### For Mobile (Android/iOS):\n1. Go to **Network Settings** > **Private DNS**.\n2. Set the private DNS provider hostname to the address provided in our files.\n3. Save configuration. Enjoy ad-free browsing across all apps.",
    "tags": ["Script", "Security", "Ad-Block"],
    "version": "v4.0.1",
    "fileSize": "12 KB",
    "downloads": "250.5K",
    "rating": "5.0"
  },
  "mod4": {
    "id": "mod4",
    "title": "FPS Booster Config for Sandbox 3D",
    "description": "Optimize engine textures, adjust CPU thread allocation, and fix rendering stutters to boost FPS by up to 60%.",
    "thumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60",
    "isDevSuggestion": false,
    "isPopular": true,
    "downloadUrl": "https://example.com/download/fps-booster",
    "installationGuide": "### Configuration Guide\n\n1. Download the booster config file (`engine.ini`).\n2. Open your device's file manager and locate the directory:\n   `Android/data/com.sandbox3d.game/files/settings/` or your platform equivalent.\n3. Backup your existing `engine.ini` file by renaming it to `engine.ini.bak`.\n4. Paste the downloaded `engine.ini` into the directory.\n5. Launch the game and navigate to Graphics settings to see new unlocked high-performance profiles.\n\n*Note: If graphics appear too blurry, you can adjust the resolution scale value manually inside the file using any text editor.*",
    "tags": ["Mod", "Graphics", "Config"],
    "version": "v3.1",
    "fileSize": "18 KB",
    "downloads": "34.1K",
    "rating": "4.7"
  }
};

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
