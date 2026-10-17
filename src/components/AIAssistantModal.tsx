import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  ExternalLink,
  ChefHat,
  Compass,
  Search,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

interface GroundingSource {
  title: string;
  url: string;
  type: "web";
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: GroundingSource[];
  timestamp: string;
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRecipe?: (slug: string) => void;
}

const QUICK_PROMPTS = [
  "How do I balance whole spices in beef bhuna?",
  "Substitute for raw papaya in Kacchi Biryani?",
  "How to tell if mustard oil is properly smoked?",
  "What is the difference between Radhuni and Ajwain?",
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigateToRecipe,
}) => {
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Assalamu Alaikum! I am your Noakhali Kitchen Culinary Assistant. Ask me anything about authentic Halal cooking, regional Bengali heritage, traditional spice blending, or ingredient verification.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (queryToSend?: string) => {
    const query = (queryToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          mode: "general",
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.text || "I am glad to help. Please let me know if you have more questions!",
        sources: data.groundingSources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("AI Assistant request failed:", err);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I encountered a momentary connection issue. Our kitchen knowledge base is always available. Please feel free to try your question again or explore our curated recipe catalog!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation reset. How may I assist your culinary journey today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-[#1E1E1C] rounded-2xl shadow-2xl border border-[#E6E1D8] dark:border-[#33322E] flex flex-col h-[85vh] max-h-[720px] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Noakhali Kitchen AI Culinary Assistant"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#FAF9F6] dark:bg-[#181816] border-b border-[#E6E1D8] dark:border-[#33322E] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E97520]/10 border border-[#F8CD78]/50 flex items-center justify-center text-[#E97520]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-[#242423] dark:text-[#EDE8DF] font-heading">
                  AI Culinary Assistant
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D7A52] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  100% Halal Grounded
                </span>
              </div>
              <p className="text-xs text-[#77736D] dark:text-[#A8A49E]">
                Powered by Gemini with live culinary web grounding
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearChat}
              title="Reset conversation"
              className="p-2 text-[#77736D] hover:text-[#30302F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Close modal"
              className="p-2 text-[#77736D] hover:text-[#30302F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm bg-white dark:bg-[#1E1E1C]">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#FAF9F6] dark:bg-[#252422] border border-[#E6E1D8] dark:border-[#33322E] flex items-center justify-center text-[#E97520] shrink-0 mt-0.5">
                    <ChefHat className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                    isUser
                      ? "bg-[#30302F] dark:bg-[#E97520] text-white rounded-br-xs"
                      : "bg-[#FAF9F6] dark:bg-[#252422] text-[#3F3C38] dark:text-[#EDE8DF] border border-[#E6E1D8] dark:border-[#33322E] rounded-bl-xs"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-xs sm:text-sm">{msg.content}</p>

                  {/* Grounding Web Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#E6E1D8] dark:border-[#33322E] space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49E] block">
                        Verified Web Sources:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.sources.map((src, sIdx) => (
                          <a
                            key={sIdx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#E97520] hover:underline bg-white dark:bg-[#1E1E1C] px-2 py-0.5 rounded border border-[#E6E1D8] dark:border-[#33322E]"
                          >
                            <span className="truncate max-w-[180px]">{src.title}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[10px] mt-1.5 ${
                      isUser ? "text-white/70 text-right" : "text-[#8A857E] dark:text-[#77736D]"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-[#77736D] text-xs">
              <div className="w-7 h-7 rounded-full bg-[#FAF9F6] dark:bg-[#252422] border border-[#E6E1D8] dark:border-[#33322E] flex items-center justify-center text-[#E97520]">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="italic">Consulting Halal culinary knowledge base & grounding...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts (if chat is short) */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-4 py-2 bg-[#FAF9F6] dark:bg-[#181816] border-t border-[#E6E1D8] dark:border-[#33322E]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49E] block mb-1.5">
              Suggested Questions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  className="text-xs bg-white dark:bg-[#252422] text-[#30302F] dark:text-[#EDE8DF] border border-[#E6E1D8] dark:border-[#33322E] hover:border-[#E97520] dark:hover:border-[#E97520] px-2.5 py-1 rounded-full text-left transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#FAF9F6] dark:bg-[#181816] border-t border-[#E6E1D8] dark:border-[#33322E]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask a question about spices, recipes, techniques, or Halal cooking..."
              disabled={isLoading}
              className="flex-1 bg-white dark:bg-[#252422] text-[#30302F] dark:text-[#EDE8DF] placeholder-[#8A857E] border border-[#E6E1D8] dark:border-[#33322E] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#E97520] transition-colors"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="bg-[#E97520] hover:bg-[#D75D17] disabled:opacity-40 disabled:hover:bg-[#E97520] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
