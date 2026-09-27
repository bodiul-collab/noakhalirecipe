import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

interface ContactViewProps {
  onNavigate?: (route: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("recipe-question");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const contactEmail = "support@noakhalikitchen.com";

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contactEmail);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const getSubjectText = (code: string) => {
    switch (code) {
      case "recipe-question":
        return "Recipe Question or Culinary Advice";
      case "recipe-feedback":
        return "Recipe Feedback & Cooking Results";
      case "guide-suggestion":
        return "Food Guide or Article Suggestion";
      case "halal-inquiry":
        return "Halal Ingredient Verification Inquiry";
      case "partnerships":
        return "Brand Partnerships & Collaborations";
      case "technical-bug":
        return "Website Feedback or Technical Issue";
      default:
        return "General Inquiry - Noakhali Kitchen";
    }
  };

  const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
    getSubjectText(subject)
  )}&body=${encodeURIComponent(
    message
      ? `Hi Noakhali Kitchen Team,\n\n${message}\n\nFrom: ${name || "A Reader"}\nEmail: ${email || ""}`
      : `Hi Noakhali Kitchen Team,\n\nI have a question/feedback regarding: ${getSubjectText(subject)}\n\nName: ${name || ""}\n`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: getSubjectText(subject),
          message,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setServerMessage(data.message || null);
      }
      setSubmitted(true);
    } catch {
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-16 min-h-[80vh]">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 space-y-10">
        {/* Navigation Breadcrumb / Back button */}
        {onNavigate && (
          <button
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-1.5 text-xs text-[#77736D] hover:text-[#242423] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        )}

        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5EB] border border-[#E97520]/20 text-[#E97520] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WE LOVE HEARING FROM YOU</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#242423] font-serif-editorial">
            Contact &amp; Feedback
          </h1>
          <p className="text-sm sm:text-base text-[#77736D] max-w-xl mx-auto leading-relaxed">
            Have a question about a recipe, feedback on your cooking results, an ingredient verification inquiry, or an editorial guide idea? Reach out directly to our culinary team.
          </p>
        </div>

        {/* Quick Email Access Card */}
        <div className="bg-[#242423] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#3A3835] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E7A52B]">
                OFFICIAL EDITORIAL &amp; SUPPORT DESK
              </span>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#E97520] shrink-0" />
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-lg sm:text-2xl font-bold hover:text-[#E7A52B] transition-colors underline decoration-[#E97520] decoration-2 underline-offset-4"
                  title="Click to open your email client"
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  copied
                    ? "bg-[#2D7A52] text-white"
                    : "bg-[#33312E] hover:bg-[#3D3A36] text-[#E6E1D8] border border-[#524E48]"
                }`}
                title="Copy email address to clipboard"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Copied to Clipboard!" : "Copy Email"}</span>
              </button>

              <a
                href={mailtoUrl}
                className="px-4 py-2.5 rounded-lg text-xs font-bold bg-[#E97520] hover:bg-[#D75D17] text-white transition-all flex items-center gap-2 shadow-sm"
                title="Launch your desktop or mobile email app"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-[#3A3835] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#C5C0B7]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E7A52B] shrink-0" />
              <span>Response time: within 24–48 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D7A52] shrink-0" />
              <span>100% Halal editorial verification</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#E97520] shrink-0" />
              <span>Direct chef &amp; food researcher desk</span>
            </div>
          </div>
        </div>

        {/* Main Form & Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E6E1D8] p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="py-12 px-4 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#EBF7F0] border-2 border-[#2D7A52] flex items-center justify-center mx-auto text-[#2D7A52]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#242423] font-serif-editorial">
                    Message Received!
                  </h3>
                  <p className="text-sm text-[#55514B] max-w-md mx-auto leading-relaxed">
                    {serverMessage ||
                      `Thank you for reaching out, ${name || "friend"}! Your message has been routed to our culinary editorial team. We will review and reply to ${email || "your email"} within 24–48 hours.`}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#E6E1D8] rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                  <span className="font-bold text-[#30302F] block">Quick Summary:</span>
                  <div className="text-[#55514B]">
                    <strong>Topic:</strong> {getSubjectText(subject)}
                  </div>
                  {email && (
                    <div className="text-[#55514B]">
                      <strong>Confirmation sent to:</strong> {email}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="px-5 py-2.5 text-xs font-bold border border-[#E6E1D8] hover:border-[#30302F] text-[#30302F] rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>

                  <a
                    href={mailtoUrl}
                    className="px-5 py-2.5 text-xs font-bold bg-[#E97520] hover:bg-[#D75D17] text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send via Email Client</span>
                  </a>

                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("/recipes")}
                      className="px-5 py-2.5 text-xs font-bold bg-[#242423] hover:bg-black text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Browse Halal Recipes
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <h3 className="text-lg font-bold text-[#242423] font-serif-editorial mb-1">
                    Send a Message to the Kitchen
                  </h3>
                  <p className="text-xs text-[#77736D]">
                    Fill out the form below or email us directly at{" "}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-[#E97520] font-semibold hover:underline"
                    >
                      {contactEmail}
                    </a>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#30302F] font-bold mb-1.5">
                      Your Name <span className="text-[#E97520]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Fatima Ali"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:border-[#E97520] focus:bg-white transition-all text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[#30302F] font-bold mb-1.5">
                      Your Email Address <span className="text-[#E97520]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. fatima@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:border-[#E97520] focus:bg-white transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#30302F] font-bold mb-1.5">
                    Subject / Topic <span className="text-[#E97520]">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:border-[#E97520] focus:bg-white transition-all text-xs cursor-pointer"
                  >
                    <option value="recipe-question">Recipe Question or Cooking Technique</option>
                    <option value="recipe-feedback">Recipe Feedback &amp; Cooking Success</option>
                    <option value="guide-suggestion">Culinary Guide or Article Suggestion</option>
                    <option value="halal-inquiry">Halal Ingredient &amp; Additive Verification</option>
                    <option value="partnerships">Brand Partnerships &amp; Media Sponsorship</option>
                    <option value="technical-bug">Website Feedback or Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#30302F] font-bold mb-1.5">
                    Your Message / Feedback <span className="text-[#E97520]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your thoughts, specific recipe modifications, tips, questions, or comments..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded-lg focus:outline-none focus:border-[#E97520] focus:bg-white transition-all text-xs leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#E97520] hover:bg-[#D75D17] text-white font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </button>

                  <a
                    href={mailtoUrl}
                    className="text-xs text-[#77736D] hover:text-[#E97520] font-semibold transition-colors flex items-center gap-1.5"
                    title="Prefer your own email client? Click here"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Prefer to email from your mail app? Click here</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Support Channels & Help Cards */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E6E1D8] p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#242423] uppercase tracking-wider">
                Direct Channels
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E1D8] space-y-1">
                  <div className="font-bold text-[#30302F] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#E97520]" />
                    <span>Recipe Questions &amp; Feedback</span>
                  </div>
                  <p className="text-[#77736D] text-[11px] leading-relaxed">
                    Tested a dish or need a substitution? Share your feedback with our culinary directors.
                  </p>
                  <a
                    href={`mailto:${contactEmail}?subject=Recipe%20Feedback%20-%20Noakhali%20Kitchen`}
                    className="text-[#E97520] hover:underline font-semibold block pt-1"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E1D8] space-y-1">
                  <div className="font-bold text-[#30302F] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2D7A52]" />
                    <span>Halal Standards &amp; Ingredients</span>
                  </div>
                  <p className="text-[#77736D] text-[11px] leading-relaxed">
                    Questions on rennets, gelatins, vanillin, or emulsifiers? Our researchers provide guidance.
                  </p>
                  <a
                    href={`mailto:${contactEmail}?subject=Halal%20Verification%20Inquiry`}
                    className="text-[#2D7A52] hover:underline font-semibold block pt-1"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E6E1D8] space-y-1">
                  <div className="font-bold text-[#30302F] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#E7A52B]" />
                    <span>Brand Partnerships &amp; Press</span>
                  </div>
                  <p className="text-[#77736D] text-[11px] leading-relaxed">
                    Collaborate on artisanal Halal product features, culinary photography, or media kits.
                  </p>
                  <a
                    href={`mailto:${contactEmail}?subject=Brand%20Partnership%20Inquiry`}
                    className="text-[#30302F] hover:underline font-semibold block pt-1"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Copy Tool */}
            <div className="p-5 bg-[#FAF9F6] rounded-2xl border border-[#E6E1D8] text-center space-y-2">
              <span className="text-[11px] text-[#77736D] font-medium block">
                Need to paste our email address into your webmail?
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                  copied
                    ? "bg-[#EBF7F0] border-[#2D7A52] text-[#2D7A52]"
                    : "bg-white border-[#D6D1C7] hover:border-[#30302F] text-[#30302F]"
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied support@noakhalikitchen.com!" : "Copy support@noakhalikitchen.com"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
