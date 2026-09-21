import React, { useState, useEffect } from "react";
import { Language } from "../types";
import { I18N } from "../data/mockData";
import {
  Search,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Calculator,
  ShieldCheck,
  Sparkles,
  Building2,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Eye,
  Camera,
  Flame,
} from "lucide-react";

interface HeroSectionProps {
  language: Language;
  onNavigateToAuction: () => void;
  onNavigateToStudio: () => void;
  onNavigateToMarketplace: (searchCity?: string) => void;
}

interface CityMarketParams {
  name: string;
  state: string;
  basePricePerSqft: number;
  avgCapRate: number;
  marketAppreciationRate: number;
  description: string;
}

const BALBOA_SLIDES = [
  {
    url: "/assets/balboa/balboa_island_cover_1789974350849.jpg",
    title: {
      es: "Fachada Principal & Patio de Fuego Crepuscular",
      en: "Front Facade & Twilight Fire Pit Patio",
    },
    subtitle: {
      es: "3 niveles de arquitectura moderna con olivos iluminados, ventanales retráctiles y terraza privada",
      en: "Contemporary 3-story coastal estate with illuminated olive trees, glass bi-folds & private patio",
    },
    tag: {
      es: "Fachada & Patio",
      en: "Facade & Patio",
    },
  },
  {
    url: "/assets/balboa/balboa_rooftop_deck_1789974365112.jpg",
    title: {
      es: "Full-Length Rooftop Deck con Vistas a la Bahía",
      en: "Full-Length Rooftop Deck with Newport Bay Views",
    },
    subtitle: {
      es: "Más de 110 m² de terraza panorámica con bar húmedo, chimenea de gas y vista a los yates",
      en: "Over 1,200 sq ft entertaining rooftop with wet bar, gas fire table & yacht harbor panoramas",
    },
    tag: {
      es: "Rooftop 360°",
      en: "Rooftop 360°",
    },
  },
  {
    url: "/assets/balboa/balboa_interior_living_1789974376990.jpg",
    title: {
      es: "Gran Sala & Cocina Chef en Mármol Calacatta",
      en: "Great Room & Calacatta Marble Chef's Kitchen",
    },
    subtitle: {
      es: "Diseño diáfano con isla de mármol en cascada y conexión fluida de piso a techo con el patio",
      en: "Open concept layout with waterfall marble island and seamless floor-to-ceiling indoor-outdoor flow",
    },
    tag: {
      es: "Interior & Cocina",
      en: "Interior & Kitchen",
    },
  },
];

const US_CITIES: Record<string, CityMarketParams> = {
  "Newport Beach": {
    name: "Newport Beach",
    state: "CA",
    basePricePerSqft: 1980,
    avgCapRate: 6.8,
    marketAppreciationRate: 0.15,
    description: "Balboa Island & Corona del Mar trophy waterfront with premier yacht harbor liquidity.",
  },
  Miami: {
    name: "Miami",
    state: "FL",
    basePricePerSqft: 750,
    avgCapRate: 7.8,
    marketAppreciationRate: 0.14,
    description: "Coconut Grove & Brickell luxury waterfront with high international liquidity.",
  },
  Dallas: {
    name: "Dallas",
    state: "TX",
    basePricePerSqft: 520,
    avgCapRate: 8.9,
    marketAppreciationRate: 0.13,
    description: "Highland Park & Preston Hollow estate properties with exceptional capital growth.",
  },
  Austin: {
    name: "Austin",
    state: "TX",
    basePricePerSqft: 620,
    avgCapRate: 8.4,
    marketAppreciationRate: 0.16,
    description: "Westlake Hills & Lake Austin tech executive villas with Net Zero capabilities.",
  },
  "Los Angeles": {
    name: "Los Angeles",
    state: "CA",
    basePricePerSqft: 1100,
    avgCapRate: 7.1,
    marketAppreciationRate: 0.12,
    description: "Beverly Hills & Trousdale Estates modern architectural estates.",
  },
  "New York": {
    name: "New York",
    state: "NY",
    basePricePerSqft: 1450,
    avgCapRate: 6.5,
    marketAppreciationRate: 0.11,
    description: "West Village & Tribeca historic brownstones and luxury loft conversions.",
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onNavigateToAuction,
  onNavigateToStudio,
  onNavigateToMarketplace,
}) => {
  const t = I18N[language].hero;
  const isEn = language === "en";

  // Omnibar Search Tabs
  const [activeOmniTab, setActiveOmniTab] = useState<"buy" | "rent" | "invest" | "remodel" | "auction">("buy");
  const [omniSearchText, setOmniSearchText] = useState<string>("");

  // Balboa Island Photo Slider state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isSliderHovered, setIsSliderHovered] = useState<boolean>(false);

  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BALBOA_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSliderHovered]);

  const handlePrevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? BALBOA_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % BALBOA_SLIDES.length);
  };

  // US Market Profitability Simulator States
  const [selectedCity, setSelectedCity] = useState<string>("Dallas");
  const [acquisitionPrice, setAcquisitionPrice] = useState<number>(1890000);
  const [sqft, setSqft] = useState<number>(4320);
  const [remodelBudget, setRemodelBudget] = useState<number>(185000);
  const [targetCapRate, setTargetCapRate] = useState<number>(8.4);
  const [holdingMonths, setHoldingMonths] = useState<number>(8);

  const cityData = US_CITIES[selectedCity] || US_CITIES["Dallas"];

  // Financial calculations
  const totalCostBasis = acquisitionPrice + remodelBudget;
  const remodelUpliftMultiplier = 1.48; // Invest Network benchmark +48%
  const projectedExitValuation = Math.round(
    acquisitionPrice * (1 + (cityData.marketAppreciationRate * holdingMonths) / 12) +
      remodelBudget * remodelUpliftMultiplier
  );
  const netEquityGain = projectedExitValuation - totalCostBasis;
  const totalRoi = ((netEquityGain / totalCostBasis) * 100).toFixed(1);
  const annualizedIrr = (Number(totalRoi) / (holdingMonths / 12)).toFixed(1);
  const pricePerSqftAcquisition = Math.round(acquisitionPrice / sqft);
  const pricePerSqftExit = Math.round(projectedExitValuation / sqft);

  // Format currency helper
  const formatUsd = (val: number) => `$${val.toLocaleString("en-US")}`;

  const handleOmniSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeOmniTab === "auction") {
      onNavigateToAuction();
    } else if (activeOmniTab === "remodel") {
      onNavigateToStudio();
    } else {
      onNavigateToMarketplace(omniSearchText);
    }
  };

  const handleQuickCityClick = (city: string) => {
    setOmniSearchText(city);
    onNavigateToMarketplace(city);
  };

  return (
    <section id="hero" className="w-full relative">
      {/* 1. Grand Cover Layout: Text and Omnibar side-by-side with Photography */}
      <div className="relative w-full bg-[#FAF6EE] border-b border-[#DFC07C]/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Text with Menu Typography & Omnibar Search */}
            <div className="lg:col-span-6 flex flex-col space-y-5">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#C5A059] shadow-sm self-start">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[#0B424C]">
                  {isEn ? "USA PROPTECH & ARCHITECTURAL INTELLIGENCE" : "PROPTECH INMOBILIARIA & REMODELACIÓN INTELIGENTE EE. UU."}
                </span>
              </div>

              {/* Title with menu typography ('Plus Jakarta Sans') and reduced size */}
              <div className="space-y-1.5">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#06242C] tracking-tight leading-snug">
                  {isEn ? "Find Your Next Property in the USA." : "Encuentra tu Próxima Propiedad en EE. UU."}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#0B424C] tracking-tight">
                  {isEn ? "Maximize Equity With AI." : "Multiplica su Plusvalía con IA."}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 font-medium pt-1 max-w-xl leading-relaxed">
                  {isEn
                    ? "Institutional marketplace with Passivhaus 3D digital twins, bank syndication, and certified ROI remodels."
                    : "Plataforma institucional con gemelos digitales 3D, remodelación bioclimática Passivhaus y sindicación bancaria."}
                </p>
              </div>

              {/* Interactive Search Omnibar */}
              <div className="w-full bg-[#FAF7F2] p-3 sm:p-4 rounded-2xl border-2 border-[#C5A059] shadow-lg">
                {/* Omnibar Category Tabs */}
                <div className="flex items-center space-x-1 sm:space-x-2 border-b border-[#DFC07C]/40 pb-2.5 mb-3 overflow-x-auto">
                  {[
                    { id: "buy", label: isEn ? "Buy" : "Comprar" },
                    { id: "rent", label: isEn ? "Rent" : "Alquilar" },
                    { id: "invest", label: isEn ? "Invest / Sell" : "Invertir / Vender" },
                    { id: "remodel", label: isEn ? "AI Remodel 3D" : "Remodelar con IA" },
                    { id: "auction", label: isEn ? "Flash Auctions" : "Subastas Flash" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveOmniTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        activeOmniTab === tab.id
                          ? "bg-[#0B424C] text-[#DFC07C] shadow-sm font-bold"
                          : "text-stone-700 hover:text-[#0B424C] hover:bg-[#EDE4D3]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Input Bar with Big CTA */}
                <form onSubmit={handleOmniSearch} className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="relative w-full flex-1">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A059]" />
                    <input
                      type="text"
                      value={omniSearchText}
                      onChange={(e) => setOmniSearchText(e.target.value)}
                      placeholder={
                        isEn
                          ? "City, neighborhood or ZIP (Dallas, Miami, 90210)..."
                          : "Ciudad, vecindario o código postal (Dallas, Miami, 90210)..."
                      }
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-xl bg-white border border-[#DFC07C]/60 text-xs sm:text-sm font-medium text-[#0A2E35] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059] shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl bg-[#0B424C] text-[#DFC07C] hover:bg-[#06242C] font-bold text-xs sm:text-sm border border-[#C5A059] shadow-md flex items-center justify-center space-x-1.5 transition-all active:scale-95 whitespace-nowrap"
                  >
                    <Search className="w-4 h-4 text-[#DFC07C]" />
                    <span>{isEn ? "Search Properties" : "Buscar Propiedades"}</span>
                  </button>
                </form>

                {/* Quick Cities Pill Filter Row */}
                <div className="flex items-center flex-wrap gap-1.5 pt-2.5 mt-1 text-xs">
                  <span className="text-stone-500 font-semibold text-[10px] uppercase tracking-wider mr-1">
                    {isEn ? "Trending:" : "Destacados:"}
                  </span>
                  {["Balboa Island, CA", "Dallas, TX", "Miami, FL", "Austin, TX", "Newport Beach, CA", "Beverly Hills, CA", "New York, NY"].map(
                    (cityTag) => (
                      <button
                        key={cityTag}
                        type="button"
                        onClick={() => handleQuickCityClick(cityTag.split(",")[0])}
                        className="px-2.5 py-0.5 rounded-full bg-white hover:bg-[#0B424C] hover:text-[#DFC07C] border border-[#DFC07C]/60 text-stone-700 font-medium text-[11px] transition-colors cursor-pointer"
                      >
                        {cityTag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Photo Slider for Balboa Island Luxury Home */}
            <div className="lg:col-span-6 relative">
              <div
                className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden border-2 border-[#C5A059] shadow-2xl group bg-[#06242C]"
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
              >
                {/* Images Layer with Cross-Fade */}
                {BALBOA_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.url}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? "opacity-100 z-0 scale-100" : "opacity-0 -z-10 scale-105 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={isEn ? slide.title.en : slide.title.es}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Atmospheric gradient accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06242C]/95 via-black/25 to-black/30 pointer-events-none" />

                {/* Top Badge: JamesEdition & Balboa Island */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-auto">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF6EE] text-[#0B424C] border border-[#C5A059] shadow-md backdrop-blur-sm">
                      JamesEdition • Balboa Island
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#06242C]/90 text-emerald-400 border border-emerald-500/50 backdrop-blur-md">
                      Passivhaus A++
                    </span>
                  </div>

                  {/* Slide Counter Badge */}
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow">
                    <Camera className="w-3.5 h-3.5 text-[#DFC07C]" />
                    <span>
                      {currentSlide + 1} / {BALBOA_SLIDES.length}
                    </span>
                  </div>
                </div>

                {/* Slider Navigation Arrows */}
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#0B424C] border border-[#C5A059] shadow-lg flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] text-[#0B424C] border border-[#C5A059] shadow-lg flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide Caption Pill (Upper Overlay) */}
                <div className="absolute top-14 left-3.5 z-10 max-w-[80%] pointer-events-none">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#0B424C]/85 text-[#DFC07C] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-[#C5A059]/40 mb-1">
                    {isEn ? BALBOA_SLIDES[currentSlide].tag.en : BALBOA_SLIDES[currentSlide].tag.es}
                  </span>
                  <p className="text-white text-xs font-semibold drop-shadow-md line-clamp-1">
                    {isEn ? BALBOA_SLIDES[currentSlide].subtitle.en : BALBOA_SLIDES[currentSlide].subtitle.es}
                  </p>
                </div>

                {/* Bottom Floating Info Card with Details & Mini Thumbnails */}
                <div className="absolute bottom-3 left-3 right-3 z-20 p-3 sm:p-3.5 rounded-2xl bg-[#FAF6EE]/95 border border-[#C5A059] backdrop-blur-md shadow-2xl space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        <span>Balboa Island • Newport Beach, CA 92662</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#06242C] leading-snug">
                        {isEn
                          ? "Balboa Island New Construction • 4 Bed Luxury Home"
                          : "Balboa Island Nueva Construcción • Residencia de Lujo"}
                      </h3>
                      <p className="text-[11px] text-stone-600 font-medium line-clamp-1">
                        {isEn
                          ? "Full-Length Rooftop Deck with Bay Views • Fire Pit Patio"
                          : "Rooftop Entertaining Deck con Vistas a la Bahía • Patio con Fogatero"}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-mono font-extrabold text-[#0B424C] block">
                        $6,850,000
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 block">
                        +44.2% ROI Est.
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Row + Fast Actions */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-[#DFC07C]/40">
                    <div className="flex items-center space-x-1.5">
                      {BALBOA_SLIDES.map((slide, idx) => (
                        <button
                          key={`thumb-${slide.url}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(idx);
                          }}
                          className={`relative w-12 sm:w-14 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === currentSlide
                              ? "border-[#C5A059] scale-105 shadow-sm ring-1 ring-[#C5A059]"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={slide.url}
                            alt="thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onNavigateToMarketplace("Newport Beach")}
                      className="px-3 py-1.5 rounded-lg bg-[#0B424C] text-[#DFC07C] hover:bg-[#06242C] text-[11px] font-bold border border-[#C5A059] shadow transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isEn ? "View Details" : "Ver Propiedad"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Trust & Verified Metrics Strip */}
      <div className="w-full bg-[#FAF6EE] border-y border-[#DFC07C]/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0B424C] block font-mono">
              $480M+
            </span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              {isEn ? "US Real Estate Transacted" : "Capital Transaccionado EE. UU."}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#C5A059] block font-mono">
              +43.8%
            </span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              {isEn ? "Average Value-Add Gain" : "Plusvalía Media Verificada"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-[#0B424C] block font-mono">
              8.4%
            </span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              {isEn ? "Average Net Cap Rate" : "Cap Rate Neto Promedio"}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-700 block font-mono">
              14 Días
            </span>
            <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
              {isEn ? "Average Bank Close Time" : "Tiempo Medio de Cierre"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Workspace: Balanced 3D Digital Twin & Spotlight on Top, Full-Width Horizontal Simulator Below */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-10">
        {/* Top Split: Architectural Highlights & Credentials (Left) + Spotlight Residence (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Platform Credentials & Value-Add Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase bg-[var(--ds-color-brand-accent)]/20 text-[var(--ds-color-brand-primary)] border border-[var(--ds-color-brand-accent)] inline-block">
                {isEn ? "INTELLIGENT VALUE-ADD PLATFORM" : "PROPTECH & INTELIGENCIA ARQUITECTÓNICA"}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--ds-color-brand-dark)] tracking-tight leading-tight">
                {isEn
                  ? "Architectural Precision Meets Institutional Yield"
                  : "Precisión Arquitectónica & Rentabilidad en EE. UU."}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {isEn
                  ? "Every property on Invest Network combines certified Passivhaus bioclimatic renovation, bank syndicate liquidity, and verified MLS valuations."
                  : "Cada activo en Invest Network combina remodelación bioclimática Passivhaus A++, liquidez por sindicación bancaria en 14 días y valuaciones MLS en tiempo real."}
              </p>

              {/* 3 Trust Feature Chips */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="bg-[var(--ds-surface-body)] p-3 rounded-xl border border-[var(--ds-border-default)] text-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[var(--ds-color-brand-primary)] mx-auto mb-1" />
                  <span className="text-[11px] font-extrabold text-[var(--ds-color-brand-dark)] block">Passivhaus A++</span>
                  <span className="text-[10px] text-stone-500 block">-75% Energía</span>
                </div>
                <div className="bg-[var(--ds-surface-body)] p-3 rounded-xl border border-[var(--ds-border-default)] text-center shadow-xs">
                  <TrendingUp className="w-5 h-5 text-[var(--ds-color-brand-accent)] mx-auto mb-1" />
                  <span className="text-[11px] font-extrabold text-[var(--ds-color-brand-dark)] block">+43.8% Plusvalía</span>
                  <span className="text-[10px] text-stone-500 block">ROI Certificado</span>
                </div>
                <div className="bg-[var(--ds-surface-body)] p-3 rounded-xl border border-[var(--ds-border-default)] text-center shadow-xs">
                  <Building2 className="w-5 h-5 text-[var(--ds-color-brand-primary)] mx-auto mb-1" />
                  <span className="text-[11px] font-extrabold text-[var(--ds-color-brand-dark)] block">Cierre 14 Días</span>
                  <span className="text-[10px] text-stone-500 block">Sindicación Bancaria</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Real US Home Spotlight (Balboa Island Newport Beach Luxury Home) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="bg-[var(--ds-surface-body)] rounded-3xl border-2 border-[var(--ds-color-brand-accent)]/80 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#084c61] text-[#c9a050] shadow-sm">
                  {isEn ? "Spotlight Coastal Residence" : "Propiedad Costera Destacada"}
                </span>
                <span className="text-xs font-mono font-bold text-stone-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-stone-200">
                  Newport Beach, CA 92662
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-[var(--ds-border-default)] shadow-md">
                  <img
                    src="/assets/balboa/balboa_rooftop_deck_1789974365112.jpg"
                    alt="Balboa Island New Construction with Rooftop Deck"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#084c61] text-[#c9a050] shadow">
                    A++ Passivhaus
                  </div>
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <h4 className="font-bold text-base sm:text-lg text-[var(--ds-color-brand-dark)] leading-snug">
                    Balboa Island New Construction • 4 Bed Luxury Home
                  </h4>
                  <p className="text-xs text-stone-600">
                    Balboa Island, Newport Beach, CA 92662
                  </p>
                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-xl font-extrabold font-mono text-[#084c61]">
                      $6,850,000
                    </span>
                    <span className="text-xs text-emerald-700 font-bold font-mono">
                      +44.2% ROI Est.
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-stone-600 pt-2 border-t border-stone-200">
                    <span>4 Beds</span>
                    <span>•</span>
                    <span>4.5 Baths</span>
                    <span>•</span>
                    <span>3,450 SqFt</span>
                    <span>•</span>
                    <span className="text-[#084c61] font-semibold">Rooftop Deck</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-200/80">
                <div className="text-xs text-stone-600">
                  <span className="font-semibold text-[#084c61]">Invest-Estimate: </span>
                  <span className="font-mono font-bold text-[var(--ds-color-brand-dark)]">$6,920,000 USD</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToMarketplace("Newport Beach")}
                  className="px-4 py-2 rounded-xl bg-[#084c61] text-[#c9a050] hover:bg-[#0f2a43] text-xs font-bold transition-all flex items-center space-x-1.5 shadow-md cursor-pointer hover:shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isEn ? "View Details" : "Ver Ficha Completa"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Horizontal US Real Estate Profitability Simulator */}
        <div
          id="us-profitability-simulator"
          className="w-full rounded-3xl bg-[var(--ds-color-brand-dark)] text-white p-6 sm:p-8 lg:p-9 border-2 border-[var(--ds-color-brand-accent)] shadow-2xl space-y-6"
        >
          {/* Header Row: Title, MLS Tag & City Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#C5A059]/30 pb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center border border-[#C5A059] shrink-0">
                <Calculator className="w-5 h-5 text-[#0B424C]" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-wide">
                    {isEn ? "US Value-Add Investment & Profitability Simulator" : "Simulador de Rentabilidad Inmobiliaria EE. UU."}
                  </h3>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#0B424C] border border-[#C5A059]/50 text-[10px] font-mono text-[#DFC07C]">
                    USD ($)
                  </span>
                </div>
                <p className="text-xs text-[#DFC07C]">
                  {isEn
                    ? "Interactive institutional financial model calibrated with real US MLS benchmarks"
                    : "Modelo institucional sincronizado con benchmarks MLS de EE. UU. y plusvalía Passivhaus"}
                </p>
              </div>
            </div>

            {/* City Selector Pills in Horizontal Bar */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider mr-1">
                {t.cityLabel}:
              </span>
              {Object.keys(US_CITIES).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    const target = US_CITIES[city];
                    setAcquisitionPrice(target.basePricePerSqft * sqft);
                  }}
                  className={`py-1.5 px-3 text-xs font-bold rounded-xl border transition-all text-center ${
                    selectedCity === city
                      ? "bg-[#C5A059] text-[#06242C] border-[#C5A059] shadow-md font-extrabold scale-105"
                      : "bg-[#0B424C]/60 text-stone-300 border-stone-700 hover:border-[#C5A059]/60 hover:text-white"
                  }`}
                >
                  {city} <span className="text-[10px] opacity-75 font-normal">({US_CITIES[city].state})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Controls Grid: 4 Sliders across the container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#0B424C]/50 p-5 sm:p-6 rounded-2xl border border-[#C5A059]/30">
            {/* Acquisition Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-semibold">{t.acquisitionLabel}</span>
                <span className="text-[#DFC07C] font-mono font-bold">{formatUsd(acquisitionPrice)}</span>
              </div>
              <input
                type="range"
                min={500000}
                max={6000000}
                step={25000}
                value={acquisitionPrice}
                onChange={(e) => setAcquisitionPrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#06242C] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Precio base</span>
                <span>{pricePerSqftAcquisition} $/sqft</span>
              </div>
            </div>

            {/* Surface Area (SqFt) */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-semibold">{t.sqftLabel}</span>
                <span className="text-[#DFC07C] font-mono font-bold">
                  {sqft.toLocaleString()} SqFt
                </span>
              </div>
              <input
                type="range"
                min={1200}
                max={7500}
                step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#06242C] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Superficie</span>
                <span>{Math.round(sqft * 0.0929)} m² const.</span>
              </div>
            </div>

            {/* Remodel Budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-semibold">{t.remodelBudgetLabel}</span>
                <span className="text-emerald-400 font-mono font-bold">{formatUsd(remodelBudget)}</span>
              </div>
              <input
                type="range"
                min={40000}
                max={500000}
                step={5000}
                value={remodelBudget}
                onChange={(e) => setRemodelBudget(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#06242C] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-emerald-400/80 font-mono">
                <span>Passivhaus A++</span>
                <span>+48% valor añadido</span>
              </div>
            </div>

            {/* Holding Period */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-300 font-semibold">{t.holdingPeriodLabel}</span>
                <span className="text-white font-mono font-bold">{holdingMonths} {t.months}</span>
              </div>
              <input
                type="range"
                min={3}
                max={24}
                step={1}
                value={holdingMonths}
                onChange={(e) => setHoldingMonths(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-2 bg-[#06242C] rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Plazo ejecución</span>
                <span>Cap Rate: {cityData.avgCapRate}%</span>
              </div>
            </div>
          </div>

          {/* Results Bar & Action Buttons in One Wide Horizontal Row */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 bg-[#0B424C]/80 rounded-2xl p-5 border border-[#C5A059]/40">
            {/* 4 Financial Outputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-300 block font-semibold">
                  {t.projectedExit}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#DFC07C] font-mono block">
                  {formatUsd(projectedExitValuation)}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">{pricePerSqftExit} $/sqft</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-300 block font-semibold">
                  {t.netEquity}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-emerald-400 font-mono block">
                  +{formatUsd(netEquityGain)}
                </span>
                <span className="text-[10px] text-emerald-300/80 font-mono">Ganancia Neta</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-300 block font-semibold">
                  {t.projectedRoi}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-white font-mono block">
                  +{totalRoi}%
                </span>
                <span className="text-[10px] text-stone-300 font-mono">Retorno Total</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-300 block font-semibold">
                  {t.annualIrr}
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-[#DFC07C] font-mono block">
                  {annualizedIrr}%
                </span>
                <span className="text-[10px] text-[#DFC07C]/80 font-mono">TIR Anual</span>
              </div>
            </div>

            {/* Actions Buttons side-by-side */}
            <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#C5A059]/40 lg:pl-5">
              <button
                onClick={onNavigateToAuction}
                className="py-3 px-5 rounded-xl bg-[#C5A059] text-[#06242C] font-extrabold text-xs sm:text-sm hover:bg-[#DFC07C] transition-all flex items-center justify-center space-x-1.5 shadow-md active:scale-95"
              >
                <span>{isEn ? "Flash Auctions" : "Ver Subastas"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToStudio}
                className="py-3 px-4 rounded-xl bg-[#0B424C] text-[#DFC07C] border border-[#C5A059]/60 hover:bg-[#06242C] text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#DFC07C]" />
                <span>{isEn ? "AI Remodel Studio" : "Studio IA 3D"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
