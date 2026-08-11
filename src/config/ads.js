// Adsterra Ads Configuration
// Change these placeholders to your actual Adsterra script settings.
// Read the guide at the bottom of this file on how to get codes and activate them.

export const ADS_CONFIG = {
  // Toggle ads globally (true to show ads, false to hide during testing)
  enabled: true,

  // 1. POPUNDER AD (Global Popunder - usually loaded once in the main layout)
  popunderSrc: "https://pl30802397.effectivecpmnetwork.com/d5/0c/3e/d50c3e7cdff1a84ef1e6a02ee7021674.js",

  // 2. SOCIAL BAR AD (Global floating notification ad - loaded in layout)
  socialBarSrc: "https://pl30802399.effectivecpmnetwork.com/29/95/a5/2995a5abe5bfa093409922069746f417.js",

  // 3. BANNER ADS
  banners: {
    // Top Leaderboard (728x90 desktop / 320x50 mobile)
    topBanner: {
      id: "top-ad-placement",
      key: "a1b2c3d4e5f67890a1b2c3d4e5f67890", // Replace this when you get your 728x90 banner hash code
      format: "iframe",
      width: 728,
      height: 90,
      fallbackText: "Banner Ad Space (728x90)"
    },

    // Mid Banner (Between suggestions and popular items - configured with Native Banner)
    midBanner: {
      id: "container-f3a54c554dd66a5904906044e5f9aa56",
      key: "f3a54c554dd66a5904906044e5f9aa56",
      domain: "pl30802398.effectivecpmnetwork.com",
      format: "script",
      width: 468,
      height: 60,
      fallbackText: "Native Banner Ad Space"
    },

    // Detail Page Side/Bottom Banner (Displayed inside full-screen modal)
    detailBanner: {
      id: "container-f3a54c554dd66a5904906044e5f9aa56",
      key: "f3a54c554dd66a5904906044e5f9aa56",
      domain: "pl30802398.effectivecpmnetwork.com",
      format: "script",
      width: 300,
      height: 250,
      fallbackText: "Native Banner Ad Space"
    }
  }
};

/**
 * ADSTERRA SETUP GUIDE FOR USER:
 * 
 * 1. Log in to your Adsterra Publisher Dashboard.
 * 2. Click "Add Website". Enter your Vercel deployment URL (e.g., https://vortexforge-altered.vercel.app).
 * 3. Choose a category and select the ad types you want (e.g. Popunder, Banner 728x90, Banner 300x250).
 * 4. Once approved, click "Get Code" for each ad unit.
 * 
 * --- FOR POPUNDER / SOCIAL BAR ---
 * - Adsterra will give you a script tag like:
 *   <script type='text/javascript' src='//pl123456.highrateprofit.com/...'></script>
 * - Copy the 'src' attribute value (e.g. '//pl123456.highrateprofit.com/...js')
 * - Paste it in `popunderSrc` or `socialBarSrc` variables in this file.
 * 
 * --- FOR BANNER ADS ---
 * - Adsterra will give you a code snippet containing:
 *   atOptions = { 'key' : 'abcdef...', 'format' : 'iframe', ... }
 * - Copy the value of 'key' (a 32-char string) and paste it into the respective key field above (topBanner, midBanner, detailBanner).
 * - The `AdBanner.jsx` component will handle injecting this configuration script and placeholder on the page automatically.
 */
