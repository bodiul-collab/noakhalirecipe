import React, { useState } from "react";

interface LegalViewProps {
  initialTab?: "privacy" | "terms" | "affiliate";
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = "privacy" }) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms" | "affiliate">(
    initialTab
  );

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-16">
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E6E1D8] gap-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("privacy")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "privacy"
                ? "border-[#E97520] text-[#E97520]"
                : "border-transparent text-[#77736D] hover:text-[#30302F]"
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "terms"
                ? "border-[#E97520] text-[#E97520]"
                : "border-transparent text-[#77736D] hover:text-[#30302F]"
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab("affiliate")}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === "affiliate"
                ? "border-[#E97520] text-[#E97520]"
                : "border-transparent text-[#77736D] hover:text-[#30302F]"
            }`}
          >
            Affiliate Disclosure
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-10 text-xs sm:text-sm text-[#3F3C38] leading-relaxed space-y-6 shadow-xs">
          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#242423] font-serif-editorial">
                Privacy Policy
              </h1>
              <p className="text-[#8A857E] text-xs">
                Last updated: September 6, 2026
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                1. Information We Collect
              </h2>
              <p>
                Noakhali Kitchen collects minimal information necessary to deliver quality culinary content and verified directory listings. This includes newsletter subscription emails, recipe bookmarks stored locally in your browser, and optional geolocation data used exclusively to locate nearby Halal food and mosques when you explicitly activate the location feature.
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                2. Advertising &amp; Cookies
              </h2>
              <p>
                We may partner with third-party advertising networks, such as Google AdSense, to display non-intrusive advertisements that fund our continuous recipe testing and editorial work. These third parties may use cookies and web beacons to serve ads based on prior visits to this website. You may opt out of personalized advertising by visiting Google Ads Settings.
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                3. Your Rights &amp; Data Security
              </h2>
              <p>
                We never sell, trade, or distribute your email address to unauthorized parties. You may unsubscribe from our newsletter at any time via the link in each email or by contacting support@noakhalikitchen.com.
              </p>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#242423] font-serif-editorial">
                Terms of Service
              </h1>
              <p className="text-[#8A857E] text-xs">
                Last updated: September 6, 2026
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing Noakhali Kitchen, you agree to comply with and be bound by these terms. If you disagree with any part of these terms, please do not use our services.
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                2. Halal Verification &amp; Sourcing Disclaimer
              </h2>
              <p>
                While Noakhali Kitchen conducts thorough research, recipe testing, and community verification regarding Halal meats, restaurants, butchers, and food additives, food manufacturers regularly modify ingredient sourcing and restaurant ownership can change. Information is provided for educational and community assistance purposes. We strongly encourage users to inspect product packaging for official Halal certification logos or inquire directly with restaurant proprietors when strict personal verification is necessary.
              </p>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                3. Intellectual Property
              </h2>
              <p>
                All original recipes, editorial photography, culinary guides, and text published on Noakhali Kitchen are copyrighted property of Noakhali Kitchen unless otherwise noted. Personal home cooking use is warmly encouraged. Commercial reproduction without written consent is prohibited.
              </p>
            </div>
          )}

          {activeTab === "affiliate" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-[#242423] font-serif-editorial">
                Affiliate Disclosure &amp; Transparency
              </h1>
              <p className="text-[#8A857E] text-xs">
                Last updated: September 6, 2026
              </p>

              <div className="p-4 bg-[#FAF9F6] rounded-lg border border-[#E6E1D8] font-medium text-[#30302F]">
                "As an Amazon Associate, Noakhali Kitchen may earn from qualifying purchases."
              </div>

              <h2 className="text-base font-bold text-[#30302F] pt-2">
                Our Editorial Integrity Commitment
              </h2>
              <p>
                Noakhali Kitchen is dedicated to high editorial standards. Certain links on our website—particularly on our kitchen tools page and ingredient guides—may be affiliate links. When you click on an affiliate link and make a purchase, we may receive a modest commission from the merchant at <strong>absolutely no additional cost to you</strong>.
              </p>
              <p>
                We only recommend cookware, whole spices, rice varieties, and culinary equipment that our chefs and food testers have personally evaluated and found valuable in a real home kitchen. Our editorial opinions are never influenced by affiliate partnerships.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
