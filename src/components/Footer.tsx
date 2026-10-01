import React, { useState } from "react";
import { Utensils, Send, CheckCircle2, ShieldCheck, Mail, Copy, Check, AlertCircle } from "lucide-react";
import { NoakhaliLogo } from "./NoakhaliLogo";

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeSuccessMsg, setSubscribeSuccessMsg] = useState<string | null>(null);
  const [subscribeErrorMsg, setSubscribeErrorMsg] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const contactEmail = "support@noakhalikitchen.com";
  const web3FormsAccessKey = "fa330ffe-3dee-46a9-834a-f312bd21b10b";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contactEmail);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = contactEmail;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubscribing(true);
    setSubscribeErrorMsg(null);
    setSubscribeSuccessMsg(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          subscriber_email: email,
          email: email,
          subject: "New Weekly Halal Table Signup",
          from_name: "Weekly Halal Table Newsletter",
          message: `New Weekly Halal Table newsletter subscription from subscriber email: ${email}`,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setSubscribed(true);
        setSubscribeSuccessMsg(
          data.message || "Thank you! Welcome to the Weekly Halal Table family."
        );
        setEmail("");
      } else {
        setSubscribeErrorMsg(
          data.message ||
            `Subscription failed (Status ${response.status}). Please try again.`
        );
      }
    } catch (err: any) {
      setSubscribeErrorMsg(
        err?.message || "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubscribing(false);
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
                  Kitchen Tools &amp; Pantry Hub
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
                  className="hover:text-[#E7A52B] transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Feedback
                </button>
              </li>
              <li>
                <div className="flex items-center gap-1.5">
                  <a
                    href={`mailto:${contactEmail}?subject=Noakhali%20Kitchen%20Recipe%20Feedback`}
                    className="hover:text-[#E7A52B] transition-colors inline-flex items-center gap-1.5"
                    title="Send an email to support@noakhalikitchen.com"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#E7A52B]" />
                    <span>{contactEmail}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-[#8A857E] hover:text-[#E7A52B] transition-colors cursor-pointer rounded"
                    title="Copy email address"
                  >
                    {emailCopied ? (
                      <Check className="w-3 h-3 text-[#2D7A52]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                {emailCopied && (
                  <span className="text-[10px] text-[#2D7A52] block font-semibold">
                    Copied to clipboard!
                  </span>
                )}
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
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2.5 rounded bg-[#242423] text-xs text-[#E7A52B] border border-[#2D7A52]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#2D7A52] shrink-0 mt-0.5" />
                  <span className="leading-snug">{subscribeSuccessMsg || "Thank you! Welcome to the family."}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubscribed(false);
                    setSubscribeSuccessMsg(null);
                    setSubscribeErrorMsg(null);
                  }}
                  className="text-[11px] text-[#A8A49E] hover:text-[#E7A52B] transition-colors underline cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    name="subscriber_email"
                    required
                    disabled={isSubscribing}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs bg-[#242423] border border-[#77736D]/40 rounded-l text-white placeholder-[#8A857E] focus:outline-none focus:border-[#E7A52B] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-3.5 py-2 bg-[#E97520] hover:bg-[#D75D17] text-white text-xs font-bold uppercase tracking-wider rounded-r transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center min-w-[42px]"
                    title="Subscribe to Weekly Halal Table"
                  >
                    {isSubscribing ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                {subscribeErrorMsg && (
                  <div className="p-2 rounded bg-[#3D2626] border border-[#DC2626]/50 text-[#FCA5A5] text-[11px] flex items-start gap-1.5 leading-snug">
                    <AlertCircle className="w-3.5 h-3.5 text-[#EF4444] shrink-0 mt-0.5" />
                    <span>{subscribeErrorMsg}</span>
                  </div>
                )}
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
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${contactEmail}?subject=Noakhali%20Kitchen%20Inquiry%20%26%20Feedback`}
                className="hover:text-[#E7A52B] transition-colors inline-flex items-center gap-1 text-white"
                title="Send email to support@noakhalikitchen.com"
              >
                <Mail className="w-3 h-3 text-[#E7A52B]" />
                <span>{contactEmail}</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="text-[#8A857E] hover:text-[#E7A52B] transition-colors cursor-pointer p-0.5"
                title="Copy email address"
              >
                {emailCopied ? (
                  <Check className="w-3 h-3 text-[#2D7A52]" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
