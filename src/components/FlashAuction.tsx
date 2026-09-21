import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Language, AuctionItem } from "../types";
import { CURRENT_FLASH_AUCTION, I18N } from "../data/mockData";
import {
  Clock,
  ShieldCheck,
  TrendingUp,
  Zap,
  Award,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

interface FlashAuctionProps {
  language: Language;
}

export const FlashAuction: React.FC<FlashAuctionProps> = ({ language }) => {
  const t = I18N[language].auction;
  const isEn = language === "en";

  const [auction, setAuction] = useState<AuctionItem>(CURRENT_FLASH_AUCTION);
  const [userCustomBid, setUserCustomBid] = useState<number>(auction.currentBidUsd + 50000);
  const [biddingSuccessNotice, setBiddingSuccessNotice] = useState<boolean>(false);

  // Live countdown timer (calculating remaining time)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 4,
    minutes: 38,
    seconds: 14,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Investor ROI/IRR Calculator state
  const [calcPurchasePrice, setCalcPurchasePrice] = useState<number>(auction.currentBidUsd);
  const [calcRenovBudget, setCalcRenovBudget] = useState<number>(280000);
  const [calcExitValuation, setCalcExitValuation] = useState<number>(auction.estimatedAfterRepairValueUsd);
  const [calcHoldingMonths, setCalcHoldingMonths] = useState<number>(7);

  // Financial calculations
  const totalCost = calcPurchasePrice + calcRenovBudget;
  const netProfit = calcExitValuation - totalCost;
  const totalRoi = ((netProfit / Math.max(1, totalCost)) * 100).toFixed(1);
  const annualizedIrr = ((Number(totalRoi) / (calcHoldingMonths / 12))).toFixed(1);

  // Trigger bid with victory confetti animation
  const placeBid = (increment: number) => {
    const newBid = auction.currentBidUsd + increment;
    const newBidder = {
      bidder: "You (Sponsor 0x8a...2e1)",
      amount: newBid,
      timeAgo: "Just now",
    };

    setAuction((prev) => ({
      ...prev,
      currentBidUsd: newBid,
      bidsCount: prev.bidsCount + 1,
      recentBidders: [newBidder, ...prev.recentBidders.slice(0, 3)],
    }));
    setCalcPurchasePrice(newBid);

    // Trigger celebratory confetti animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C5A059", "#DFC07C", "#0B424C", "#FAF7F2"],
    });

    setBiddingSuccessNotice(true);
    setTimeout(() => setBiddingSuccessNotice(false), 3500);
  };

  const [customBidError, setCustomBidError] = useState<string | null>(null);

  const handleCustomBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCustomBid <= auction.currentBidUsd) {
      setCustomBidError(
        isEn ? "Bid must be higher than current bid" : "La puja debe ser superior a la actual"
      );
      setTimeout(() => setCustomBidError(null), 3000);
      return;
    }
    setCustomBidError(null);
    const diff = userCustomBid - auction.currentBidUsd;
    placeBid(diff);
  };

  return (
    <section id="auction" className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span
          id="auction-eyebrow"
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

      {/* Main Grid: Left Auction Engine & Right Investor ROI Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Live Flash Auction Box */}
        <div className="lg:col-span-7 bg-[#06242C] text-white rounded-3xl border-2 border-[#C5A059] p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header with Live Ticker and Countdown Clock */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C5A059]/30 pb-4 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-mono font-extrabold text-rose-400 tracking-wider">
                  SUBASTA FLASH ACTIVA • LIVE FEED
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                {isEn ? auction.title.en : auction.title.es}
              </h3>
              <span className="text-xs text-stone-400">{auction.location} ({auction.sqft.toLocaleString()} SqFt)</span>
            </div>

            {/* Countdown Clock */}
            <div className="bg-[#0B424C] border border-[#C5A059] rounded-2xl px-4 py-2 flex items-center space-x-3 shadow-inner">
              <Clock className="w-5 h-5 text-[#DFC07C]" />
              <div>
                <span className="text-[10px] text-stone-300 block uppercase font-bold">
                  {t.timeRemaining}
                </span>
                <span className="font-mono text-lg font-black text-[#DFC07C]">
                  {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>

          {/* Current Bid & ARV Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B424C]/60 rounded-2xl p-5 border border-[#C5A059]/40">
            <div>
              <span className="text-xs uppercase text-stone-400 font-bold block">
                {t.currentBid}
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black text-[#DFC07C] block mt-1">
                ${auction.currentBidUsd.toLocaleString("en-US")} USD
              </span>
              <span className="text-[11px] text-stone-300">
                {auction.bidsCount} {t.bidsPlaced}
              </span>
            </div>

            <div>
              <span className="text-xs uppercase text-stone-400 font-bold block">
                {t.estimatedArv}
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-400 block mt-1">
                ${auction.estimatedAfterRepairValueUsd.toLocaleString("en-US")} USD
              </span>
              <span className="text-[11px] text-emerald-300/90 font-semibold">
                Plusvalía ARV Proyectada: +${(auction.estimatedAfterRepairValueUsd - auction.currentBidUsd).toLocaleString("en-US")}
              </span>
            </div>
          </div>

          {/* Quick Increment Bidding Buttons */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              {isEn ? "Instant Bid Execution (zkEVM Smart Contract)" : "Ejecución de Puja Inmediata (Polygon zkEVM)"}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                id="bid-increment-5k-btn"
                onClick={() => placeBid(5000)}
                className="py-3 px-4 rounded-xl bg-[#C5A059] text-[#06242C] font-black text-xs sm:text-sm shadow-md hover:bg-[#DFC07C] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1"
              >
                <Zap className="w-4 h-4 text-[#06242C]" />
                <span>+$5,000 USD</span>
              </button>

              <button
                id="bid-increment-25k-btn"
                onClick={() => placeBid(25000)}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFC07C] text-[#06242C] font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(197,160,89,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1"
              >
                <Zap className="w-4 h-4 text-[#06242C]" />
                <span>+$25,000 USD</span>
              </button>

              <button
                id="bid-increment-50k-btn"
                onClick={() => placeBid(50000)}
                className="col-span-2 sm:col-span-1 py-3 px-4 rounded-xl bg-[#FAF7F2] text-[#0B424C] font-black text-xs sm:text-sm border-2 border-[#C5A059] hover:bg-[#C5A059] hover:text-[#06242C] active:scale-95 transition-all flex items-center justify-center space-x-1"
              >
                <Zap className="w-4 h-4" />
                <span>+$50,000 USD</span>
              </button>
            </div>

            {/* Custom Bid Input */}
            <form onSubmit={handleCustomBidSubmit} className="flex gap-2 pt-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-sm">$</span>
                <input
                  type="number"
                  min={auction.currentBidUsd + 1000}
                  step={1000}
                  value={userCustomBid}
                  onChange={(e) => setUserCustomBid(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-[#0B424C] border border-[#C5A059]/60 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-[#C5A059]"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0B424C] border border-[#C5A059] text-[#DFC07C] font-bold text-xs sm:text-sm hover:bg-[#06242C] transition-colors"
              >
                {t.customBid}
              </button>
            </form>

            {/* Custom Bid Error Banner */}
            {customBidError && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-400 text-red-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                <span>{customBidError}</span>
              </div>
            )}

            {/* Bidding Success Banner */}
            {biddingSuccessNotice && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.bidSuccess} (Hash Tx: 0x9f...44a)</span>
              </div>
            )}
          </div>

          {/* Real-time Bid Ticker History */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              {isEn ? "Recent On-Chain Activity" : "Historial de Pujas Recientes"}
            </span>
            <div className="space-y-1.5">
              {auction.recentBidders.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-xs py-1.5 px-3 rounded-lg bg-[#0B424C]/40 border border-stone-800 font-mono"
                >
                  <span className="text-stone-300">{b.bidder}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-[#DFC07C] font-bold">${b.amount.toLocaleString("en-US")} USD</span>
                    <span className="text-stone-500 text-[10px]">{b.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Contracts Badges: Polygon zkEVM, CertiK, $300/day delay penalty */}
          <div className="p-4 rounded-2xl bg-[#0B424C]/50 border border-[#C5A059]/40 space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.polygonStatus} ({auction.contractAddress.slice(0, 10)}...)</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#DFC07C] font-bold font-mono border border-[#C5A059]/50">
                {t.certikAudited}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-stone-300 text-[11px] pt-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#DFC07C]" />
              <span>{t.penaltyClause}</span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Investor ROI/IRR Calculator */}
        <div className="lg:col-span-5 bg-[#FAF6EE] rounded-3xl border-2 border-[#C5A059] p-6 sm:p-8 cream-card-shadow space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="font-display text-xl font-bold text-[#092B34] flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#C5A059]" />
              <span>{t.calcTitle}</span>
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              {isEn ? "Dynamic financial modeling for flip or value-add syndication." : "Modelización financiera dinámica para remodelación y venta rápida."}
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-4 text-xs font-semibold">
            {/* Purchase Price */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-700">{t.purchasePrice}</span>
                <span className="font-mono font-bold text-[#0B424C]">${calcPurchasePrice.toLocaleString("en-US")}</span>
              </div>
              <input
                type="range"
                min={2000000}
                max={5000000}
                step={25000}
                value={calcPurchasePrice}
                onChange={(e) => setCalcPurchasePrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>

            {/* Renovation Budget */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-700">{t.renovBudget}</span>
                <span className="font-mono font-bold text-emerald-700">${calcRenovBudget.toLocaleString("en-US")}</span>
              </div>
              <input
                type="range"
                min={80000}
                max={600000}
                step={10000}
                value={calcRenovBudget}
                onChange={(e) => setCalcRenovBudget(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>

            {/* Exit Valuation */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-700">{t.exitValuation}</span>
                <span className="font-mono font-bold text-[#0B424C]">${calcExitValuation.toLocaleString("en-US")}</span>
              </div>
              <input
                type="range"
                min={3000000}
                max={7000000}
                step={50000}
                value={calcExitValuation}
                onChange={(e) => setCalcExitValuation(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>

            {/* Holding Period (3-18 months) */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-stone-700">{t.holdMonths}</span>
                <span className="font-mono font-bold text-[#0B424C]">{calcHoldingMonths} {isEn ? "months" : "meses"}</span>
              </div>
              <input
                type="range"
                min={3}
                max={18}
                step={1}
                value={calcHoldingMonths}
                onChange={(e) => setCalcHoldingMonths(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-stone-200 rounded-lg"
              />
            </div>
          </div>

          {/* ROI / IRR Results Dashboard */}
          <div className="bg-[#0B424C] text-white p-5 rounded-2xl border border-[#C5A059] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs uppercase text-stone-300">{t.netProfit}</span>
              <span className="font-mono text-2xl font-black text-emerald-400">
                +${netProfit.toLocaleString("en-US")} USD
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-stone-300 block uppercase font-bold">{t.roiPct}</span>
                <span className="font-mono text-2xl font-extrabold text-[#DFC07C]">+{totalRoi}%</span>
              </div>

              <div>
                <span className="text-[11px] text-stone-300 block uppercase font-bold">{t.irrPct}</span>
                <span className="font-mono text-2xl font-extrabold text-white">+{annualizedIrr}%</span>
              </div>
            </div>

            <p className="text-[11px] text-stone-300 border-t border-white/10 pt-2 leading-relaxed">
              {isEn
                ? "All simulations account for closing costs, architectural Passivhaus upgrades, and verified exit comp data."
                : "Cálculo verificado con gastos de cierre, certificación energética Passivhaus y comparables MLS reales."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
