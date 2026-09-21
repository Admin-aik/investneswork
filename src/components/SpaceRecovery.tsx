import React, { useState, useRef } from "react";
import { Language } from "../types";
import { I18N } from "../data/mockData";
import {
  Sparkles,
  Layers,
  Sun,
  Activity,
  Award,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Building,
} from "lucide-react";

interface SpaceRecoveryProps {
  language: Language;
  onConsultAdvisor: () => void;
}

export const SpaceRecovery: React.FC<SpaceRecoveryProps> = ({
  language,
  onConsultAdvisor,
}) => {
  const t = I18N[language].recovery;
  const isEn = language === "en";

  // Before / After Slider state (0 - 100)
  const [splitPos, setSplitPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Recovery projects selection
  const PROJECTS = [
    {
      id: "industrial",
      title: {
        es: "Antigua Fábrica Textil de 1890 → Ático Bioclimático",
        en: "1890 Textile Warehouse → Bioclimatic Sky Loft",
      },
      city: "Barcelona / Poble Nou",
      beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      stats: {
        luxGain: "+240% Lux",
        envelope: "Passivhaus A++",
        valueUnlock: "+$890,000 USD",
        loadViability: "98.4%",
      },
      details: {
        es: "Recuperación de cerchas originales de fundición, aislamiento térmico exterior de corcho natural y apertura de lucernarios cenitales con vidrio electrocrómico.",
        en: "Restoration of cast-iron trusses, natural cork exterior thermal envelope, and electrochromic skylights for natural cross-ventilation.",
      },
    },
    {
      id: "palacete",
      title: {
        es: "Palacete Decimonónico en Ruinas → Residencia Contemporánea",
        en: "Dilapidated 19th Century Mansion → Contemporary Masterpiece",
      },
      city: "Madrid / Chamberí",
      beforeImg: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80",
      afterImg: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      stats: {
        luxGain: "+180% Lux",
        envelope: "Passivhaus Premium",
        valueUnlock: "+$1,420,000 USD",
        loadViability: "99.1%",
      },
      details: {
        es: "Consolidación de muros de mampostería histórica, eliminación de muros no portantes y forjado colaborante ligero de última generación.",
        en: "Consolidation of historic masonry walls, partition demolition for open layout, and high-performance lightweight concrete decking.",
      },
    },
  ];

  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSplitPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <section id="recovery" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span
          id="recovery-eyebrow"
          className="px-3 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-[#C5A059]/20 text-[#06242C] border border-[#C5A059] inline-block mb-3"
        >
          {t.eyebrow}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#092B34] tracking-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-stone-700 text-sm sm:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#C5A059] p-6 sm:p-8 cream-card-shadow space-y-10">
        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center space-x-2">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeProject.id === proj.id
                    ? "bg-[#0B424C] text-white border-[#C5A059] shadow-md"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]"
                }`}
              >
                {isEn ? proj.title.en.split("→")[0] : proj.title.es.split("→")[0]}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono font-bold text-[#0B424C] bg-[#C5A059]/20 px-3 py-1 rounded-lg border border-[#C5A059]">
            {activeProject.city}
          </span>
        </div>

        {/* Split Slider for Space Recovery */}
        <div
          ref={containerRef}
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onMouseUp={() => setIsDragging(false)}
          onTouchMove={(e) => e.touches.length === 1 && handleMove(e.touches[0].clientX)}
          className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-[#C5A059] select-none shadow-2xl cursor-ew-resize"
        >
          {/* After image (Fully restored) */}
          <img
            src={activeProject.afterImg}
            alt="Restored Space"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Before image (Degraded ruin) clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${splitPos}%` }}
          >
            <img
              src={activeProject.beforeImg}
              alt="Degraded Condition"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                maxWidth: "none",
              }}
            />
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-lg bg-[#06242C]/85 border border-stone-500/50 backdrop-blur-md text-white text-xs font-extrabold tracking-wider">
              {t.sliderBefore}
            </div>
          </div>

          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-lg bg-[#C5A059] text-[#06242C] font-extrabold text-xs tracking-wider shadow-lg">
            {t.sliderAfter}
          </div>

          {/* Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-[#C5A059] pointer-events-none"
            style={{ left: `${splitPos}%` }}
          >
            <div
              onMouseDown={() => setIsDragging(true)}
              className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.7)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
            >
              <div className="flex items-center space-x-1 text-[#0B424C]">
                <span className="text-[10px] font-bold">◀</span>
                <span className="text-[10px] font-bold">▶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Potential Algorithm Breakdown Card */}
        <div
          id="hidden-potential-algorithm-card"
          className="bg-[#06242C] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#C5A059] shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C5A059]/30 pb-4 gap-2">
            <div>
              <span className="text-[10px] font-extrabold font-mono text-[#DFC07C] uppercase tracking-widest block">
                ALGORITMO DE DETECCIÓN DE VALOR OCULTO (INVEST NETWORK ENGINE)
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                {t.algorithmTitle}
              </h3>
            </div>

            <button
              onClick={onConsultAdvisor}
              className="px-4 py-2 rounded-xl bg-[#C5A059] text-[#06242C] font-extrabold text-xs shadow hover:bg-[#DFC07C] transition-all flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <span>{isEn ? "Audit My Property" : "Auditar Mi Propiedad"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Quantitative Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Structural Viability */}
            <div className="p-4 rounded-xl bg-[#0B424C]/70 border border-[#C5A059]/40 space-y-1">
              <Activity className="w-5 h-5 text-[#DFC07C]" />
              <span className="text-[10px] uppercase text-stone-300 font-bold block">
                {t.metricViability}
              </span>
              <span className="font-mono text-xl font-black text-white">
                {activeProject.stats.loadViability}
              </span>
              <span className="text-[10px] text-stone-400 block">Capacidad portante verificada</span>
            </div>

            {/* Lux Gain */}
            <div className="p-4 rounded-xl bg-[#0B424C]/70 border border-[#C5A059]/40 space-y-1">
              <Sun className="w-5 h-5 text-[#DFC07C]" />
              <span className="text-[10px] uppercase text-stone-300 font-bold block">
                {t.metricLux}
              </span>
              <span className="font-mono text-xl font-black text-amber-300">
                {activeProject.stats.luxGain}
              </span>
              <span className="text-[10px] text-stone-400 block">Luz natural cenital y cruzada</span>
            </div>

            {/* Energy Envelope */}
            <div className="p-4 rounded-xl bg-[#0B424C]/70 border border-[#C5A059]/40 space-y-1">
              <Award className="w-5 h-5 text-emerald-400" />
              <span className="text-[10px] uppercase text-stone-300 font-bold block">
                {t.metricEnvelope}
              </span>
              <span className="font-mono text-xl font-black text-emerald-400">
                {activeProject.stats.envelope}
              </span>
              <span className="text-[10px] text-stone-400 block">Aislamiento hermético n50</span>
            </div>

            {/* Value Unlock */}
            <div className="p-4 rounded-xl bg-[#0B424C]/70 border border-[#C5A059]/40 space-y-1">
              <Sparkles className="w-5 h-5 text-[#DFC07C]" />
              <span className="text-[10px] uppercase text-stone-300 font-bold block">
                {t.metricValueUnlock}
              </span>
              <span className="font-mono text-xl font-black text-[#DFC07C]">
                {activeProject.stats.valueUnlock}
              </span>
              <span className="text-[10px] text-stone-400 block">Plusvalía neta generada</span>
            </div>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed border-t border-[#C5A059]/20 pt-4">
            {isEn ? activeProject.details.en : activeProject.details.es}
          </p>
        </div>
      </div>
    </section>
  );
};
