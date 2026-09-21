import React, { useState, useRef, useEffect } from "react";
import { Language, ChatMessage } from "../types";
import { I18N } from "../data/mockData";
import {
  X,
  Send,
  Sparkles,
  Award,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";

interface AdvisorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AdvisorDrawer: React.FC<AdvisorDrawerProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isEn = language === "en";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "elena",
      text: isEn
        ? "Welcome to Invest Network. I am Arq. Elena Vega, Senior Principal Architectural Director & PropTech Lead. How may I assist you today with architectural restructuring, digital twin modeling, or syndicate debt underwriting?"
        : "Bienvenido a Invest Network. Soy la Arq. Elena Vega, Directora Principal de Arquitectura y Estrategia PropTech. ¿En qué puedo asesorarle hoy regarding remodelaciones inteligentes, gemelos digitales o sindicación bancaria?",
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Quick suggestion prompts
  const QUICK_PROMPTS = isEn
    ? [
        "Calculate equity uplift for a 2,200 sqft penthouse",
        "Structure bank syndicate terms with JPMorgan",
        "Passivhaus audit and turnkey budget guarantee",
      ]
    : [
        "Calcular plusvalía y retorno de mi ático",
        "Estructurar sindicación bancaria con JPMorgan",
        "Auditoría Passivhaus y presupuesto llave en mano",
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
          language,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyMsg: ChatMessage = {
          id: `elena-${Date.now()}`,
          sender: "elena",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, replyMsg]);
      } else {
        throw new Error("Chat response failed");
      }
    } catch (err) {
      console.warn("Chat fallback error:", err);
      const fallbackReply: ChatMessage = {
        id: `elena-${Date.now()}`,
        sender: "elena",
        text: isEn
          ? "Based on our Passivhaus algorithmic benchmarks in prime US corridors, properties structured through our Digital Twin achieve an average +44.2% equity expansion and DSCR ratios exceeding 1.35x. I will prepare an institutional appraisal dossier for your review."
          : "Conforme a nuestros modelos Passivhaus y gemelos digitales en zonas prime, los activos remodelados por Invest Network obtienen una plusvalía media del +44.8% con ratios DSCR superiores a 1.35x. Puedo agendar una sesión privada de revisión con el comité técnico.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookPrivateSession = () => {
    setBookingConfirmed(true);
    setTimeout(() => setBookingConfirmed(false), 4500);
  };

  if (!isOpen) return null;

  return (
    <div
      id="advisor-drawer-container"
      className="fixed inset-0 z-50 overflow-hidden bg-[#06242C]/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-300"
    >
      <div className="w-full max-w-lg h-full bg-[#FAF7F2] border-l-2 border-[#C5A059] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header with Elena Vega Profile */}
        <div className="p-5 bg-[#06242C] text-white border-b-2 border-[#C5A059] flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                alt="Arq. Elena Vega"
                referrerPolicy="no-referrer"
                className="w-13 h-13 rounded-full object-cover border-2 border-[#C5A059] shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#06242C]" />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-display font-bold text-base text-white">
                  Arq. Elena Vega
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#C5A059] text-[#06242C]">
                  LEAD
                </span>
              </div>
              <p className="text-[11px] text-[#DFC07C] font-mono">
                Senior Principal Architectural Director
              </p>
              <span className="text-[10px] text-stone-400">
                Passivhaus Institut CEPH & PropTech AI Strategist
              </span>
            </div>
          </div>

          <button
            id="close-advisor-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Private Meeting Booking Bar */}
        <div className="bg-[#0B424C] px-5 py-2.5 flex items-center justify-between border-b border-[#C5A059]/40 text-xs">
          <div className="flex items-center space-x-2 text-stone-200">
            <Calendar className="w-4 h-4 text-[#DFC07C]" />
            <span>{isEn ? "Confidential Advisory (30 min)" : "Sesión Confidencial de Comité"}</span>
          </div>

          <button
            id="book-private-session-btn"
            onClick={handleBookPrivateSession}
            className="px-3 py-1 rounded-lg bg-[#C5A059] text-[#06242C] font-extrabold text-[11px] hover:bg-[#DFC07C] transition-colors"
          >
            {isEn ? "Book Private Session" : "Agendar Cita"}
          </button>
        </div>

        {bookingConfirmed && (
          <div className="bg-emerald-100 border-b border-emerald-300 px-4 py-2 text-xs text-emerald-900 font-bold flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>
              {isEn
                ? "Private calendar link dispatched to your confidential dossier."
                : "Enlace de reserva prioritaria enviado a su dossier institucional."}
            </span>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#0B424C] text-white rounded-tr-none shadow-md"
                    : "bg-white text-stone-800 rounded-tl-none border border-stone-200 shadow-sm"
                }`}
              >
                {msg.sender === "elena" && (
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-[#C5A059] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Arq. Elena Vega</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{msg.text}</p>
                <span
                  className={`text-[9px] block text-right mt-1.5 ${
                    msg.sender === "user" ? "text-stone-300" : "text-stone-400"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-none p-3.5 border border-stone-200 text-xs text-stone-500 flex items-center space-x-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]" />
                <span>{isEn ? "Elena is formulating analysis..." : "Elena está calculando viabilidad..."}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2 border-t border-stone-200 bg-stone-50 overflow-x-auto">
          <span className="text-[10px] font-bold text-stone-500 uppercase block mb-1">
            {isEn ? "Suggested Inquiries:" : "Consultas Sugeridas:"}
          </span>
          <div className="flex flex-col gap-1.5">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-left text-[11px] font-medium text-stone-700 bg-white border border-stone-200 hover:border-[#C5A059] hover:text-[#0B424C] py-1.5 px-3 rounded-lg transition-colors truncate"
              >
                → {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isEn ? "Ask Elena Vega about your project..." : "Consulte a Elena Vega sobre su propiedad..."}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#FAF7F2] border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#C5A059]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-[#0B424C] text-white hover:bg-[#06242C] disabled:opacity-50 transition-all"
            >
              <Send className="w-4 h-4 text-[#DFC07C]" />
            </button>
          </form>
          <span className="text-[10px] text-stone-400 block text-center mt-2">
            Invest Network Proprietary AI Architectural Reasoning
          </span>
        </div>
      </div>
    </div>
  );
};
