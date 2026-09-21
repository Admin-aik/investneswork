import React, { useState } from "react";
import { Language, BankSyndicate } from "../types";
import { BANK_SYNDICATES, I18N } from "../data/mockData";
import {
  Building2,
  PieChart,
  ShieldCheck,
  Download,
  CheckCircle2,
  TrendingUp,
  Percent,
  Compass,
  Sparkles,
  Layers,
  FileText,
} from "lucide-react";

interface InvestCapitalProps {
  language: Language;
}

export const InvestCapital: React.FC<InvestCapitalProps> = ({ language }) => {
  const t = I18N[language].capital;
  const isEn = language === "en";

  // Selected Bank Syndicate
  const [selectedBank, setSelectedBank] = useState<BankSyndicate>(BANK_SYNDICATES[0]);

  // Capital Stack Modeler State
  const [totalProjectCostUsd, setTotalProjectCostUsd] = useState<number>(4500000);
  const [seniorDebtPct, setSeniorDebtPct] = useState<number>(65);
  const [mezzaninePct, setMezzaninePct] = useState<number>(15);
  // Remainder is Investor Equity
  const equityPct = Math.max(0, 100 - seniorDebtPct - mezzaninePct);

  // Net Operating Income (NOI) for DSCR calculation
  const [projectedNoiUsd, setProjectedNoiUsd] = useState<number>(380000);

  // Download simulation state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // 360 AI Property Simulator Room selection
  const SUITES = [
    {
      id: "miami",
      title: "Miami Brickell Sky Penthouse",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      stats: { capRate: "8.4%", exitUsd: "$3,620,000", irr: "21.4%" },
    },
    {
      id: "nyc",
      title: "NYC Highline Architectural Suite",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      stats: { capRate: "6.9%", exitUsd: "$6,900,000", irr: "19.8%" },
    },
    {
      id: "austin",
      title: "Austin South Congress Rooftop",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      stats: { capRate: "8.8%", exitUsd: "$2,750,000", irr: "23.1%" },
    },
  ];
  const [activeSuite, setActiveSuite] = useState(SUITES[0]);

  // Calculations
  const seniorDebtUsd = Math.round((totalProjectCostUsd * seniorDebtPct) / 100);
  const mezzanineUsd = Math.round((totalProjectCostUsd * mezzaninePct) / 100);
  const equityUsd = Math.round((totalProjectCostUsd * equityPct) / 100);

  // Annual Debt Service estimation (Assuming ~7.2% all-in interest)
  const estimatedAnnualDebtService = seniorDebtUsd * 0.068 + mezzanineUsd * 0.105;
  const dscrRatio = (projectedNoiUsd / Math.max(1, estimatedAnnualDebtService)).toFixed(2);
  const isDscrCompliant = Number(dscrRatio) >= selectedBank.dscrRequirement;

  // Term Sheet PDF Generation simulation
  const handleDownloadTermSheet = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Create downloadable text / summary file
      const summaryContent = `===============================================================
INVEST NETWORK — INSTITUTIONAL SYNDICATE TERM SHEET
PROPTECH 3D & DIGITAL TWIN STRUCTURING
Date: ${new Date().toLocaleDateString()}
Bank Syndicate: ${selectedBank.name} (${selectedBank.rating})
===============================================================

CAPITAL STACK SUMMARY:
- Total Project Cost Basis: $${totalProjectCostUsd.toLocaleString("en-US")} USD
- Senior Debt (${seniorDebtPct}%): $${seniorDebtUsd.toLocaleString("en-US")} USD (${selectedBank.spreadRate})
- Mezzanine Debt (${mezzaninePct}%): $${mezzanineUsd.toLocaleString("en-US")} USD
- Sponsor / Investor Equity (${equityPct}%): $${equityUsd.toLocaleString("en-US")} USD

UNDERWRITING RATIOS:
- Max Approved LTV: ${selectedBank.maxLtv}%
- Projected DSCR: ${dscrRatio}x (Required: ${selectedBank.dscrRequirement}x) -> Status: ${isDscrCompliant ? "APPROVED" : "CONDITIONED"}
- Facility Horizon: ${selectedBank.termMonths} Months
- Minimum Ticket: $${selectedBank.minTicketUsd.toLocaleString("en-US")} USD

PASSIVHAUS & SMART CONTRACT CLAUSES:
- Digital Twin BIM LOD 400 Milestones Enforced
- Polygon zkEVM Verified Drawdowns
- Delay penalty: $300 USD / Day

Invest Network Institutional Capital Markets Desk
Paseo de la Castellana 95, Madrid / Brickell Ave, Miami
===============================================================`;

      const blob = new Blob([summaryContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `InvestNetwork_TermSheet_${selectedBank.logoShort}_${Date.now()}.txt`;
      link.click();
      URL.revokeObjectURL(url);

      setDownloadNotice(t.termSheetDownloaded);
      setTimeout(() => setDownloadNotice(null), 4000);
    }, 1200);
  };

  return (
    <section id="capital" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span
          id="capital-eyebrow"
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
        {/* Module 4A: US Commercial Bank Syndicate Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-3">
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#092B34] flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-[#C5A059]" />
              <span>{t.selectBankTitle}</span>
            </h3>
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              {isEn ? "Tier-1 Commercial Partners" : "Socios Bancarios Institucionales"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {BANK_SYNDICATES.map((bank) => {
              const isSelected = selectedBank.id === bank.id;
              return (
                <div
                  key={bank.id}
                  onClick={() => setSelectedBank(bank)}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#0B424C] text-white border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.3)] scale-[1.02]"
                      : "bg-white text-stone-800 border-stone-200 hover:border-[#C5A059]/70"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
                          isSelected ? "bg-[#C5A059] text-[#06242C]" : "bg-[#FAF7F2] text-[#0B424C] border border-[#C5A059]/40"
                        }`}
                      >
                        {bank.logoShort}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold ${
                          isSelected ? "text-[#DFC07C]" : "text-stone-500"
                        }`}
                      >
                        LTV {bank.maxLtv}%
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xs sm:text-sm line-clamp-2">
                      {bank.name}
                    </h4>

                    <p
                      className={`text-[11px] mt-2 line-clamp-3 leading-relaxed ${
                        isSelected ? "text-stone-300" : "text-stone-600"
                      }`}
                    >
                      {isEn ? bank.description.en : bank.description.es}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-stone-100/30 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? "text-[#DFC07C]" : "text-[#0B424C] font-bold"}>
                      {bank.spreadRate}
                    </span>
                    <span className={isSelected ? "text-stone-300" : "text-stone-400"}>
                      DSCR ≥ {bank.dscrRequirement}x
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 4B: Capital Stack Modeler */}
        <div className="bg-[#06242C] text-white p-6 sm:p-8 rounded-2xl border-2 border-[#C5A059] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C5A059]/30 pb-4 gap-2">
            <div>
              <h3 className="font-display text-xl font-bold text-white flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-[#DFC07C]" />
                <span>{t.capitalStackTitle}</span>
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                {isEn ? "Parametric equity and debt optimization for commercial bank syndicates." : "Optimización paramétrica de deuda senior y equity para sindicación bancaria."}
              </p>
            </div>

            {/* Selected Bank Banner */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0B424C] border border-[#C5A059] text-xs font-mono text-[#DFC07C]">
              Syndicate Lead: {selectedBank.name.split(" ")[0]} ({selectedBank.spreadRate})
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Total Project Cost */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-stone-300">Coste Total del Proyecto</span>
                <span className="text-[#DFC07C] font-mono">${totalProjectCostUsd.toLocaleString("en-US")}</span>
              </div>
              <input
                type="range"
                min={1000000}
                max={15000000}
                step={250000}
                value={totalProjectCostUsd}
                onChange={(e) => setTotalProjectCostUsd(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#0B424C] rounded-lg"
              />
              <span className="text-[10px] text-stone-400 font-mono block">Adquisición + Remodelación Passivhaus</span>
            </div>

            {/* Senior Debt % (Bank) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-stone-300">{t.seniorDebt}</span>
                <span className="text-white font-mono font-extrabold">
                  {seniorDebtPct}% (${seniorDebtUsd.toLocaleString("en-US")})
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={selectedBank.maxLtv}
                step={1}
                value={seniorDebtPct}
                onChange={(e) => setSeniorDebtPct(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#0B424C] rounded-lg"
              />
              <span className="text-[10px] text-stone-400 font-mono block">
                {selectedBank.name.split(" ")[0]} • LTV Máx: {selectedBank.maxLtv}%
              </span>
            </div>

            {/* Mezzanine % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-stone-300">{t.mezzanineDebt}</span>
                <span className="text-white font-mono font-extrabold">
                  {mezzaninePct}% (${mezzanineUsd.toLocaleString("en-US")})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={mezzaninePct}
                onChange={(e) => setMezzaninePct(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#0B424C] rounded-lg"
              />
              <span className="text-[10px] text-stone-400 font-mono block">Tramo puente para aceleración de obra</span>
            </div>
          </div>

          {/* Capital Stack Visual Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono font-bold text-stone-300">
              <span>Senior Debt: {seniorDebtPct}%</span>
              <span>Mezzanine: {mezzaninePct}%</span>
              <span className="text-emerald-400 font-bold">Equity Sponsor: {equityPct}% (${equityUsd.toLocaleString("en-US")})</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden flex bg-stone-800 border border-stone-700">
              <div
                style={{ width: `${seniorDebtPct}%` }}
                className="bg-[#C5A059] h-full"
                title={`Senior Debt: ${seniorDebtPct}%`}
              />
              <div
                style={{ width: `${mezzaninePct}%` }}
                className="bg-[#DFC07C]/60 h-full"
                title={`Mezzanine: ${mezzaninePct}%`}
              />
              <div
                style={{ width: `${equityPct}%` }}
                className="bg-emerald-500 h-full"
                title={`Equity: ${equityPct}%`}
              />
            </div>
          </div>

          {/* Financial Ratios & DSCR Check */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-[#0B424C]/60 rounded-xl p-4 border border-[#C5A059]/40">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                {t.dscrCoverage}
              </span>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-xl font-mono font-extrabold text-white">{dscrRatio}x</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                    isDscrCompliant
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/50"
                      : "bg-rose-500/20 text-rose-400 border border-rose-400/50"
                  }`}
                >
                  {isDscrCompliant ? "COMPLIANT" : "TIGHT"}
                </span>
              </div>
              <span className="text-[10px] text-stone-400 block font-mono">
                Req. {selectedBank.dscrRequirement}x por {selectedBank.logoShort}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                Equity Requerido
              </span>
              <span className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5 block">
                ${equityUsd.toLocaleString("en-US")}
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                {equityPct}% del Total
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-semibold">
                Línea Sindicada Senior
              </span>
              <span className="text-xl font-mono font-extrabold text-[#DFC07C] mt-0.5 block">
                ${seniorDebtUsd.toLocaleString("en-US")}
              </span>
              <span className="text-[10px] text-stone-400 block font-mono">
                Plazo: {selectedBank.termMonths} Meses
              </span>
            </div>

            {/* Download Term Sheet Button */}
            <div className="flex flex-col justify-center">
              <button
                id="download-term-sheet-btn"
                onClick={handleDownloadTermSheet}
                disabled={isDownloading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C5A059] text-[#06242C] font-extrabold text-xs shadow-lg hover:bg-[#DFC07C] active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? "Generando PDF..." : t.downloadTermSheet}</span>
              </button>
              {downloadNotice && (
                <span className="text-[10px] text-emerald-400 font-semibold text-center mt-1">
                  ✓ {downloadNotice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Module 4C: 360° AI Property Simulator */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C5A059]/30 pb-3 gap-2">
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#092B34] flex items-center space-x-2">
              <Compass className="w-5 h-5 text-[#C5A059]" />
              <span>{t.roomSimulatorTitle}</span>
            </h3>

            {/* Suite buttons */}
            <div className="flex items-center space-x-2">
              {SUITES.map((suite) => (
                <button
                  key={suite.id}
                  onClick={() => setActiveSuite(suite)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    activeSuite.id === suite.id
                      ? "bg-[#0B424C] text-white border-[#C5A059] shadow-sm"
                      : "bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]"
                  }`}
                >
                  {suite.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-[#C5A059] shadow-xl group">
            <img
              src={activeSuite.image}
              alt={activeSuite.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06242C] via-transparent to-black/30" />

            {/* Title & Floating stats HUD */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#0B424C] border border-[#C5A059] shadow-md">
                {activeSuite.title}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="flex items-center space-x-4 bg-[#06242C]/85 border border-[#C5A059]/40 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono">
                <div>
                  <span className="text-stone-400 block text-[10px]">Cap Rate</span>
                  <span className="text-emerald-400 font-bold">{activeSuite.stats.capRate}</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Exit Value</span>
                  <span className="text-[#DFC07C] font-bold">{activeSuite.stats.exitUsd}</span>
                </div>
                <div>•</div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Projected IRR</span>
                  <span className="text-white font-bold">{activeSuite.stats.irr}</span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#DFC07C] bg-[#06242C]/90 px-3 py-1.5 rounded-lg border border-[#C5A059]/50">
                AI SPATIAL GEMELO DIGITAL VERIFICADO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
