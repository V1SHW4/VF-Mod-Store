// Adsterra Ads Configuration
// Change these placeholders to your actual Adsterra script settings.
// Read the guide at the bottom of this file on how to get codes and activate them.

export const ADS_CONFIG = {
  // Toggle ads globally (true to show ads, false to hide during testing)
  enabled: true,

  // 1. POPUNDER AD (Global Popunder - usually loaded once in the main layout)
  // Put your Adsterra Popunder script URL here
  // Example: '//pl22345678.highrateprofit.com/ab/cd/ef/abcdef0123456789.js'
  popunderSrc: "",

  // 2. SOCIAL BAR AD (Global floating notification ad - loaded in layout)
  // Put your Adsterra Social Bar script URL here
  // Example: '//pl12345678.effectivecpmgate.com/ab/cd/ef/abcdef0123456789.js'
  socialBarSrc: "",

  // 3. BANNER ADS
  // If you use standard banners (e.g. 728x90 or 300x250 or 468x60), Adsterra provides 
  // a combination of a configuration script and a placeholder div.
  // Insert your respective placement properties below.
  banners: {
    // Top Leaderboard (728x90 desktop / 320x50 mobile)
    topBanner: {
      id: "top-ad-placement",
      key: "a1b2c3d4e5f67890a1b2c3d4e5f67890", // Your 32-character Adsterra hash code
      format: "iframe", // 'iframe' or 'script'
      width: 728,
      height: 90,
      // You can define a fallback image or text if ads are blocked or during local testing
      fallbackText: "Sponsored Ad Space"
    },

    // Mid Banner (Between suggestions and popular items)
    midBanner: {
      id: "mid-ad-placement",
      key: "b2c3d4e5f67890a1b2c3d4e5f67890a1",
      format: "iframe",
      width: 468,
      height: 60,
      fallbackText: "Promoted Tools & Scripts"
    },

    // Detail Page Side/Bottom Banner (Displayed inside full-screen modal)
    detailBanner: {
      id: "detail-ad-placement",
      key: "c3d4e5f67890a1b2c3d4e5f67890a1b2",
      format: "iframe",
      width: 300,
      height: 250,
      fallbackText: "Featured Advertiser"
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
