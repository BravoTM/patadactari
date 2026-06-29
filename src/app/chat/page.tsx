"use client";
import { useState, useRef, useEffect } from "react";
import { useLang } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import EmergencyScreen from "@/components/EmergencyScreen";

type Message = {
  role: "bot" | "user";
  text: string;// moved inside component — delete this line and the const below it
};

const WELCOME_MESSAGE: Message = {
  role: "bot",
  text: "Habari! I'm PataDaktari...",
};

export default function ChatPage() {
  const { lang } = useLang();
const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([
  { role: "bot", text: t.chatWelcome },
]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (data.type === "emergency") {
        setEmergency(true);
      } else if (data.type === "triage") {
        setMessages((prev) => [...prev, { role: "bot", text: data.response }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: t.chatGenericError }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: t.chatError }
      ]);
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

  if (emergency) {
    return <EmergencyScreen onBack={() => setEmergency(false)} />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 flex flex-col gap-4">

      {/* Chat box */}
      <div className="bg-white border border-teal-100 rounded-3xl overflow-hidden flex flex-col" style={{ minHeight: "520px" }}>

        {/* Header */}
        <div className="bg-teal-700 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
            🩺
          </div>
          <div>
            <h2 className="text-sm font-medium text-white">PataDaktari</h2>
            <p className="text-xs text-teal-200">
              Grounded in MoH Kenya Guidelines · Not a doctor
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-sm shrink-0 mt-0.5">
                {msg.role === "bot" ? "🩺" : "👤"}
              </div>
              <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "bot"
                    ? "bg-teal-50 text-teal-900 rounded-bl-sm"
                    : "bg-teal-700 text-white rounded-br-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2.5 self-start">
              <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-sm shrink-0">
                🩺
              </div>
              <div className="bg-teal-50 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
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

        {/* Input */}
        <div className="px-4 py-3 border-t border-teal-50 flex gap-2 items-end">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={t.chatPlaceholder}
            rows={1}
            className="flex-1 bg-teal-50 border border-teal-100 rounded-2xl px-4 py-2.5 text-sm text-teal-900 placeholder:text-teal-400 resize-none outline-none focus:border-teal-300 transition-colors"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 disabled:opacity-40 flex items-center justify-center shrink-0 transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Emergency strip */}
      <div className="bg-red-50 border border-red-100 rounded-2xl px-5 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            </svg>
          </div>
         {t.chatEmergency} <span className="font-bold">999</span> {t.chatEmergencyNow}
        </div>
        <a
          href="tel:999"
          className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition-colors shrink-0"
        >
       {t.chatCall}
        </a>
      </div>

    </div>
  );
}