"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { isEmergency } from "@/lib/emergency";
import { getFirstAidRedirect, getFirstAidHref, getFirstAidRedirectMessage } from "@/lib/firstAidRouting";
import EmergencyScreen from "@/components/EmergencyScreen";

type Message = { role: "bot" | "user"; text: string };

function goToFirstAid(href: string) {
  window.location.assign(href);
}

export default function ChatPage() {
  const { lang } = useLang();
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: t.chatWelcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    setMessages([{ role: "bot", text: t.chatWelcome }]);
    setEmergency(false);
  }, [lang, t.chatWelcome]);

  function handleFirstAidRedirect(text: string, guideId?: string, response?: string) {
    const href = getFirstAidHref(guideId);
    const botText = response ?? getFirstAidRedirectMessage(lang, guideId);
    setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    goToFirstAid(href);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      if (isEmergency(text)) {
        setEmergency(true);
        return;
      }

      const firstAid = getFirstAidRedirect(text);
      if (firstAid) {
        handleFirstAidRedirect(text, firstAid.guideId);
        return;
      }

      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setMessages((prev) => [...prev, { role: "bot", text: t.chatError }]);
        return;
      }

      if (data.type === "emergency") {
        setEmergency(true);
      } else if (data.type === "firstaid" || data.href) {
        handleFirstAidRedirect(text, data.guideId ?? undefined, data.response);
      } else if (data.type === "triage" && data.response) {
        setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: t.chatGenericError }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: t.chatError }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (emergency) return <EmergencyScreen onBack={() => setEmergency(false)} />;

  return (
    <div className="page-container-narrow flex flex-col gap-4 pb-8 animate-fade-up">
      <div className="glass-card overflow-hidden flex flex-col shadow-lg shadow-teal-900/5" style={{ minHeight: "560px" }}>
        <div className="bg-gradient-to-r from-teal-700 to-teal-900 px-5 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center text-xl">
            🩺
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">PataDaktari</h2>
            <p className="text-xs text-teal-200/90">{t.chatSubtitle}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3 bg-white/40">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 max-w-[88%] animate-fade-up ${
                msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-sm shrink-0">
                {msg.role === "bot" ? "🩺" : "👤"}
              </div>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "bot"
                    ? "bg-white/90 text-teal-900 rounded-bl-md shadow-sm border border-teal-100/50"
                    : "bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-br-md shadow-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2.5 self-start">
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-sm">🩺</div>
              <div className="bg-white/90 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1 border border-teal-100/50">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="px-4 py-3 border-t border-teal-100/50 bg-white/60 flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t.chatPlaceholder}
            rows={1}
            className="flex-1 bg-white/80 border border-teal-100 rounded-2xl px-4 py-2.5 text-sm text-teal-900 placeholder:text-teal-400 resize-none outline-none focus:ring-2 focus:ring-teal-500/30 transition-shadow"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-700 hover:to-teal-900 disabled:opacity-40 flex items-center justify-center shrink-0 transition-all shadow-md shadow-teal-700/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="glass-card bg-red-50/50 border-red-100/60 px-5 py-3 flex items-center justify-between gap-3">
        <p className="text-xs text-red-700 font-medium">
          {t.chatEmergency} <span className="font-bold">999</span> {t.chatEmergencyNow}
        </p>
        <a href="tel:999" className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-colors shrink-0">
          {t.chatCall}
        </a>
      </div>
    </div>
  );
}
