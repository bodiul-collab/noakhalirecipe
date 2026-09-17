import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  Search,
  ExternalLink,
  Loader2,
  BookOpen,
} from "lucide-react";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRecipe?: (slug: string) => void;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: Array<{ title: string; url: string; type: "web" | "maps" }>;
  searchQueries?: string[];
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      text: "Salam and welcome to Noakhali Kitchen! I'm your dedicated Halal culinary & kitchen assistant. Ask me about authentic recipes, Halal ingredient verification (gelatin, enzymes, E-codes), cooking techniques, or spice substitutions with live Google Search grounding.",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          mode: "search",
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "I found culinary information for your request.",
        sources: data.groundingSources || [],
        searchQueries: data.searchQueries || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-err-${Date.now()}`,
          role: "assistant",
          text: "I experienced a temporary connection issue. You can still explore our verified recipe index, culinary guides, and kitchen tools directly on the site!",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "Is vanilla extract Halal or does it contain alcohol?",
    "What is a good Halal substitute for mirin or cooking wine?",
    "What can I substitute for non-halal gelatin in baking?",
    "How do I make tender beef bhuna without burning spices?",
    "What is the authentic ratio for Bengali Panch Phoron spice blend?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 print:hidden">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-[#E6E1D8] flex flex-col h-[85vh] max-h-[720px] overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-[#30302F] text-white flex items-center justify-between border-b border-[#242423]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E97520] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold tracking-wide">Noakhali Kitchen Assistant</h3>
                <span className="text-[10px] bg-[#2D7A52] text-white font-semibold uppercase px-1.5 py-0.5 rounded">
                  Culinary AI
                </span>
              </div>
              <p className="text-[11px] text-[#E6E1D8]">
                Google Search Grounded &bull; Halal Cooking &amp; Ingredients
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E6E1D8] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational Sub-Bar */}
        <div className="px-4 py-2 bg-[#FFF9F0] border-b border-[#F8CD78]/40 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#3F3C38]">
            <BookOpen className="w-3.5 h-3.5 text-[#E97520]" />
            <span className="font-medium">Culinary Knowledge Base:</span>
            <span className="text-[#77736D]">
              Authentic Bengali, South Asian &amp; Global Halal Cooking
            </span>
          </div>
        </div>

        {/* Chat Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FAF9F6]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#30302F] text-white rounded-br-none"
                    : "bg-white border border-[#E6E1D8] text-[#30302F] rounded-bl-none shadow-2xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounding Sources */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-[#E6E1D8]/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A857E] block mb-1.5">
                      Grounding References:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-[#FAF9F6] border border-[#E6E1D8] text-[#30302F] hover:text-[#E97520] hover:border-[#E97520] px-2 py-1 rounded transition-colors"
                        >
                          <Search className="w-3 h-3 text-[#E7A52B]" />
                          <span className="truncate max-w-[200px]">{src.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <span
                  className={`text-[10px] block mt-1.5 ${
                    msg.role === "user" ? "text-white/60 text-right" : "text-[#8A857E]"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-3 bg-white border border-[#E6E1D8] rounded-lg max-w-sm text-xs text-[#77736D] animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-[#E97520]" />
              <span>Consulting verified culinary &amp; Halal sources...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        {messages.length < 3 && (
          <div className="px-4 py-2.5 bg-white border-t border-[#F3F2EE] overflow-x-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A857E] block mb-1.5">
              Popular Culinary Questions:
            </span>
            <div className="flex gap-2 pb-1">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap text-xs bg-[#FAF9F6] hover:bg-[#FFF9F0] border border-[#E6E1D8] hover:border-[#F8CD78] text-[#3F3C38] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-white border-t border-[#E6E1D8] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Halal recipes, ingredients, cooking techniques, spice blends..."
            disabled={loading}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[#FAF9F6] border border-[#E6E1D8] rounded focus:outline-none focus:border-[#30302F] text-[#30302F]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-[#E97520] hover:bg-[#D75D17] disabled:opacity-50 text-white rounded text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="hidden sm:inline">Ask</span>
          </button>
        </form>
      </div>
    </div>
  );
};
