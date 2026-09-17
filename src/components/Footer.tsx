import React, { useState } from "react";
import { Utensils, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { NoakhaliLogo } from "./NoakhaliLogo";

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#30302F] text-[#F3F2EE] pt-14 pb-10 border-t border-[#242423] print:hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <div className="inline-block p-2 rounded-xl bg-white shadow-xs">
              <NoakhaliLogo size="sm" />
            </div>

            <p className="text-xs text-[#E6E1D8] leading-relaxed">
              Authentic Halal recipes, trusted food guidance, regional culinary heritage,
              and modern cooking guides for the Halal kitchen.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#E7A52B] pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Strictly 100% Pork-Free Recipes</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242423] pb-2">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#E6E1D8]">
              <li>
                <button
                  onClick={() => onNavigate("/recipes")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  All Halal Recipes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/category")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Recipe Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/guides")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Cooking Guides Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/culture")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Food Culture &amp; Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/pantry")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Halal Pantry &amp; Nutrition
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Food Guides & Kitchen */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242423] pb-2">
              Culinary Guides &amp; Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#E6E1D8]">
              <li>
                <button
                  onClick={() => onNavigate("/guides")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Mastery Cooking Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools/equipment")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Kitchen Equipment Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/pantry")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Halal Pantry Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/tools")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Recipe Scaler &amp; Unit Converter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/blog")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Editorial Food Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242423] pb-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#E6E1D8]">
              <li>
                <button
                  onClick={() => onNavigate("/about")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  About Noakhali Kitchen
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/contact")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Contact &amp; Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/privacy")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/terms")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("/affiliate-disclosure")}
                  className="hover:text-[#E7A52B] transition-colors"
                >
                  Affiliate Disclosure
                </button>
              </li>
              <li className="pt-1">
                <a
                  href="/api/download-zip"
                  download="noakhali-kitchen-app.zip"
                  className="inline-flex items-center gap-1.5 text-xs text-[#E7A52B] hover:text-[#F8CD78] font-semibold transition-colors"
                >
                  Download Source (ZIP)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#242423] pb-2">
              Weekly Halal Table
            </h4>
            <p className="text-xs text-[#E6E1D8]">
              Get fresh Halal recipes, cooking tips, food guides, and verified community
              discoveries in your inbox.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#242423] text-xs text-[#E7A52B]">
                <CheckCircle2 className="w-4 h-4 text-[#2D7A52]" />
                <span>Thank you! Welcome to the family.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs bg-[#242423] border border-[#77736D]/40 rounded-l text-white placeholder-[#8A857E] focus:outline-none focus:border-[#E7A52B]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold uppercase tracking-wider rounded-r transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#8A857E] block">
                  No spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Affiliate and Legal Disclosures */}
        <div className="pt-8 border-t border-[#242423] space-y-3 text-[11px] text-[#8A857E] leading-relaxed">
          <p>
            <strong className="text-[#E6E1D8]">Amazon Affiliate Disclosure:</strong> As an
            Amazon Associate, Noakhali Kitchen may earn from qualifying purchases. Some links on
            this website may be affiliate links; if you purchase through one of these links, we
            may earn a small commission at no additional cost to you. We only recommend kitchen
            tools, ingredients, and cookware that we thoroughly trust and use.
          </p>
          <p>
            <strong className="text-[#E6E1D8]">Halal Verification Disclaimer:</strong> For
            restaurant, butcher, and commercial food product Halal status, information is
            gathered from public certifications, community verification, and manufacturer
            statements. Always verify directly with the respective establishment or certifying
            body when strictly required.
          </p>
        </div>

        {/* Bottom Rights Line */}
        <div className="mt-8 pt-6 border-t border-[#242423] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A857E] gap-3">
          <span>&copy; {new Date().getFullYear()} Noakhali Kitchen. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onNavigate("/privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate("/terms")}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
            <span>&bull;</span>
            <button
              onClick={() => onNavigate("/contact")}
              className="hover:text-white transition-colors"
            >
              support@noakhalikitchen.com
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
