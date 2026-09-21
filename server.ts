import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Chatbot: Arq. Elena Vega (Invest Network)
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language = "es", context } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();
    if (!ai) {
      // Fallback realistic simulation if API key is not yet set
      const isEn = language === "en";
      const fallbackReply = isEn
        ? `Hello, I am Arch. Elena Vega, Lead Architect and PropTech Director at Invest Network. Regarding your inquiry on "${message.slice(0, 50)}...", our digital twin models project an average equity uplift of +42% to +48% in tier-1 US markets (Miami, Austin, NYC). We apply strict Passivhaus standards, Calacatta Gold marble integration, and non-bearing wall removals. Would you like to schedule a feasibility audit or review our active flash auctions?`
        : `Hola, soy la Arq. Elena Vega, Directora de Arquitectura y PropTech en Invest Network. Con respecto a tu consulta sobre "${message.slice(0, 50)}...", nuestros modelos de gemelos digitales proyectan una plusvalía media del +42% al +48% en mercados clave de EE. UU. (Miami, Austin, NYC). Aplicamos el estándar Passivhaus, mármol Calacatta y redistribución estructural para maximizar el Cap Rate. ¿Te gustaría agendar una auditoría técnica o simular un gemelo digital?`;

      return res.json({ reply: fallbackReply, source: "simulation" });
    }

    const systemInstruction = `You are Arq. Elena Vega (Licensed Architect COAM #19842, Senior Principal Architectural Director & PropTech Lead at 'Invest Network — Remodelación y Construcción Inteligente').
You represent an ultra-luxury, high-return PropTech platform that blends architectural remodeling, digital twins, Three.js 3D visualization, flash auctions, and institutional US bank fundraising (JPMorgan, BoA, Goldman Sachs).
All prices and valuations MUST be in USD ($).
Keep responses sophisticated, professional, concise, and structured. Tone: warm luxury, authoritative, editorial, high-precision.
Reply in the requested language: ${language === "en" ? "English" : "Spanish"}.
When asked about remodeling, always mention Passivhaus efficiency, structural optimization (non-bearing partition removals), high-end materials (Calacatta, natural oak, microcement), and Cap Rate / IRR metrics.
Context: ${JSON.stringify(context || {})}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Gracias por contactar con Invest Network.";
    return res.json({ reply, source: "gemini" });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    const isEn = req.body?.language === "en";
    return res.json({
      reply: isEn
        ? "Invest Network architecture advisory is momentarily calibrating our structural twin engine. Please connect directly via our contact drawer or WhatsApp for instant consultation."
        : "El servicio de asesoría técnica de Invest Network está calibrando el gemelo digital en tiempo real. Por favor contáctanos directamente a través del menú de contacto o WhatsApp para atención inmediata.",
      source: "fallback",
    });
  }
});

// AI Spatial Remodeling & Hidden Potential Analysis
app.post("/api/analyze-remodel", async (req, res) => {
  try {
    const { roomName, style, scope, budget, language = "es" } = req.body;
    const ai = getAIClient();

    const isEn = language === "en";

    if (!ai) {
      return res.json({
        analysis: {
          title: isEn ? `Smart Architectural Overhaul: ${roomName}` : `Intervención Integral Inteligente: ${roomName}`,
          estimatedRoi: "+44.8%",
          valueIncreaseUsd: Math.round((budget || 75000) * 1.85),
          passivhausScore: "A++ (8.4 kWh/m²a)",
          structuralRecommendations: [
            isEn ? "Demolition of non-bearing masonry partitions to generate continuous open-concept living" : "Demolición de tabiquería no portante para unificar el salón con luz perimetral continua",
            isEn ? "Restoration and elevation of original 3.2m coffered ceiling heights" : "Recuperación de techos originales con molduras artesanales a 3.20m de altura",
            isEn ? "Installation of triple-glazed Passivhaus certified thermal envelope with acoustic damping" : "Instalación de carpinterías con rotura de puente térmico y triple acristalamiento acústico",
          ],
          materialsSpec: [
            "Calacatta Gold Bookmatched Slabs",
            "Continuous Bone White Microcement",
            "Fumed Natural French Oak Flooring",
          ],
          projectedTimelineMonths: 3.5,
          bankabilityScore: "98/100 (Tier-1 Institutional DSCR > 1.45)",
        },
      });
    }

    const prompt = `Perform a high-level architectural and financial analysis for a luxury property remodeling project under Invest Network PropTech standard.
Room/Property: ${roomName || "Urban Penthouse"}
Style: ${style || "Contemporáneo Cálido"}
Scope: ${scope || "Open Concept & Master Suite Spa"}
Budget: $${budget || 85000} USD
Language: ${isEn ? "English" : "Spanish"}

Return a JSON object with:
- title: string
- estimatedRoi: string (e.g. "+46.2%")
- valueIncreaseUsd: number
- passivhausScore: string (e.g. "A++ (7.9 kWh/m²a)")
- structuralRecommendations: array of 3 strings
- materialsSpec: array of 3 strings
- projectedTimelineMonths: number
- bankabilityScore: string`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ analysis: parsed });
  } catch (error) {
    console.error("Error in /api/analyze-remodel:", error);
    return res.status(500).json({ error: "Failed to analyze remodeling" });
  }
});

// Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Invest Network server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
