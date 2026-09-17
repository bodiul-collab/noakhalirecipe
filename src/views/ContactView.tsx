import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export const ContactView: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("recipe-question");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF9F6] py-10 sm:py-16">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E97520]">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#242423] font-serif-editorial">
            Contact Noakhali Kitchen
          </h1>
          <p className="text-sm text-[#77736D] max-w-lg mx-auto">
            Have a question about a recipe, want to suggest a culinary guide, or discuss a cooking collaboration? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E6E1D8] p-6 sm:p-10 shadow-xs space-y-6">
          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#2D7A52] mx-auto" />
              <h3 className="text-lg font-bold text-[#30302F] font-serif-editorial">
                Message Received!
              </h3>
              <p className="text-xs text-[#77736D] max-w-sm mx-auto">
                Thank you for contacting Noakhali Kitchen. Our editorial team will review your message and respond within 1-2 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#30302F] font-bold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fatima Ali"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
                  />
                </div>

                <div>
                  <label className="block text-[#30302F] font-bold mb-1">Your Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fatima@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#30302F] font-bold mb-1">Subject *</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none"
                >
                  <option value="recipe-question">Recipe Question or Feedback</option>
                  <option value="guide-suggestion">Food Guide or Article Suggestion</option>
                  <option value="halal-inquiry">Ingredient Verification Inquiry</option>
                  <option value="partnerships">Brand Partnerships &amp; Sponsorships</option>
                </select>
              </div>

              <div>
                <label className="block text-[#30302F] font-bold mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, recipe feedback, or listing details..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E97520] hover:bg-[#D75D17] text-white font-bold uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Message
                </button>
              </div>
            </form>
          )}

          <div className="pt-6 border-t border-[#F3F2EE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77736D] gap-2">
            <span>Direct inquiries: support@noakhalikitchen.com</span>
            <span>Response time: ~24–48 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};
