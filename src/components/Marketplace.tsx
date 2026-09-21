import React, { useState, useEffect } from "react";
import { PropertyListing, Language } from "../types";
import { PROPERTIES_DATA, I18N } from "../data/mockData";
import { Panorama360Viewer } from "./Panorama360Viewer";
import { ErrorBoundary } from "./ErrorBoundary";
import {
  Search,
  MapPin,
  Eye,
  PlusCircle,
  TrendingUp,
  CheckCircle,
  X,
  Upload,
  Heart,
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
} from "lucide-react";

interface MarketplaceProps {
  language: Language;
  initialSearchCity?: string;
  onOpenAdvisor?: () => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  language,
  initialSearchCity = "",
  onOpenAdvisor,
}) => {
  const t = I18N[language].marketplace;
  const isEn = language === "en";

  const [properties, setProperties] = useState<PropertyListing[]>(PROPERTIES_DATA);
  const [activeTab, setActiveTab] = useState<"all" | "sale" | "demand">("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "roi" | "price-asc" | "price-desc">("featured");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchCity);

  // Favorite property IDs
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // 360 Viewer active property
  const [viewing360Property, setViewing360Property] = useState<PropertyListing | null>(null);

  // Submit Modal state
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submitType, setSubmitType] = useState<"sale" | "demand">("sale");
  const [submitTitle, setSubmitTitle] = useState<string>("");
  const [submitCity, setSubmitCity] = useState<string>("Dallas");
  const [submitPrice, setSubmitPrice] = useState<number>(1850000);
  const [submitSqft, setSubmitSqft] = useState<number>(3800);
  const [submitAddress, setSubmitAddress] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Active image index for each card
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (initialSearchCity) {
      setSelectedCity(initialSearchCity);
      setSearchQuery(initialSearchCity);
    }
  }, [initialSearchCity]);

  const filterCities = [
    "all",
    "Dallas",
    "Miami",
    "Austin",
    "Los Angeles",
    "New York",
    "Scottsdale",
    "Hamptons",
    "Atlanta",
  ];

  const propertyTypes = [
    "all",
    "Single Family",
    "Luxury Villa",
    "Architectural Estate",
    "Townhouse",
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleNextImage = (propId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) + 1) % totalImages,
    }));
  };

  const handlePrevImage = (propId: string, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({
      ...prev,
      [propId]: ((prev[propId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  // Filter listings
  const filteredListings = properties
    .filter((prop) => {
      if (activeTab !== "all" && prop.type !== activeTab) return false;
      if (selectedCity !== "all" && prop.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
      if (selectedPropertyType !== "all" && prop.propertyType !== selectedPropertyType) return false;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const titleStr = `${prop.title.es} ${prop.title.en} ${prop.city} ${prop.state} ${prop.zipCode || ""} ${prop.address} ${prop.neighborhood || ""}`.toLowerCase();
        if (!titleStr.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "roi") {
        const roiA = parseFloat(a.projectedRoi.replace(/[^0-9.]/g, "")) || 0;
        const roiB = parseFloat(b.projectedRoi.replace(/[^0-9.]/g, "")) || 0;
        return roiB - roiA;
      }
      if (sortBy === "price-asc") return a.priceUsd - b.priceUsd;
      if (sortBy === "price-desc") return b.priceUsd - a.priceUsd;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp: PropertyListing = {
      id: `prop-${Date.now()}`,
      title: { es: submitTitle, en: submitTitle },
      city: submitCity,
      state: submitCity === "Miami" ? "FL" : submitCity === "New York" ? "NY" : submitCity === "Dallas" ? "TX" : "CA",
      address: submitAddress || `${submitCity} Prime Corridor`,
      coordinates: { lat: 32.8336, lng: -96.7925 },
      priceUsd: submitPrice,
      originalValuationUsd: Math.round(submitPrice * 0.75),
      projectedExitUsd: Math.round(submitPrice * 1.45),
      projectedRoi: "+46.5%",
      sqft: submitSqft,
      sqm: Math.round(submitSqft * 0.0929),
      bedrooms: 4,
      bathrooms: 4.5,
      yearBuilt: 2022,
      propertyType: "Single Family",
      estMonthlyMortgageUsd: Math.round(submitPrice * 0.005),
      investEstimateUsd: Math.round(submitPrice * 1.05),
      priceChange30d: "+2.0%",
      statusBadge: { es: "Nueva Propiedad", en: "New Listing" },
      passivhausScore: "A++ Certificado",
      energyRating: "A++ Passivhaus",
      type: submitType,
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      ],
      panoramaImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
      hotspots: [],
      features: {
        es: ["Inspección Passivhaus Aprobada", "MLS Certificado", "Garantía Decenal"],
        en: ["Passivhaus Inspection Passed", "MLS Certified", "10-Year Warranty"],
      },
    };

    setProperties([newProp, ...properties]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setSubmitTitle("");
      setSubmitAddress("");
    }, 1800);
  };

  return (
    <section id="marketplace" className="w-full py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header section with marketplace styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#C5A059] shadow-sm mb-2.5">
            <Home className="w-3.5 h-3.5 text-[#0B424C]" />
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B424C]">
              {isEn ? "BUY, SELL & ACTIVE DEMANDS" : "COMPRA, VENTA Y DEMANDAS ACTIVAS EE. UU."}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#06242C] tracking-tight">
            {isEn ? "Buy, Sell & Institutional Demands in the USA" : "Compra, Venta y Demandas Inmobiliarias en EE. UU."}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-1 max-w-2xl">
            {isEn
              ? "6 Curated luxury properties for sale and 6 pre-funded institutional buyer demands across top US metros with verified Passivhaus metrics."
              : "6 Propiedades seleccionadas en venta directa y 6 demandas institucionales con fondos garantizados en los principales mercados de EE. UU."}
          </p>
        </div>

        {/* Action Button: Post Listing / Demand */}
        <button
          id="marketplace-create-listing-btn"
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#0B424C] text-[#DFC07C] font-extrabold text-xs sm:text-sm border border-[#C5A059] shadow-md hover:bg-[#06242C] hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 self-start md:self-auto shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-[#DFC07C]" />
          <span>{isEn ? "List Your Property" : "Publicar mi Propiedad"}</span>
        </button>
      </div>

      {/* Filter Omnibar */}
      <div className="bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl border-2 border-[#DFC07C]/60 shadow-sm mb-8 space-y-4">
        {/* Row 1: Search Input & Core Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search by address, city, ZIP, or keywords..." : "Buscar por dirección, ciudad, código postal..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-medium text-[#0A2E35] placeholder-stone-400 focus:outline-none focus:border-[#C5A059] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* City Selector */}
          <div className="lg:col-span-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-bold text-[#0A2E35] focus:outline-none focus:border-[#C5A059] shadow-sm cursor-pointer"
            >
              <option value="all">{isEn ? "All US Metros" : "Todas las Ciudades (EE. UU.)"}</option>
              {filterCities.filter((c) => c !== "all").map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="lg:col-span-3">
            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-bold text-[#0A2E35] focus:outline-none focus:border-[#C5A059] shadow-sm cursor-pointer"
            >
              <option value="all">{isEn ? "All Property Types" : "Todos los Tipos de Vivienda"}</option>
              {propertyTypes.filter((p) => p !== "all").map((ptype) => (
                <option key={ptype} value={ptype}>
                  {ptype}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm font-bold text-[#0A2E35] focus:outline-none focus:border-[#C5A059] shadow-sm cursor-pointer"
            >
              <option value="featured">{isEn ? "Featured First" : "Destacadas Primero"}</option>
              <option value="roi">{isEn ? "Highest ROI" : "Mayor Plusvalía (ROI)"}</option>
              <option value="price-asc">{isEn ? "Price: Low to High" : "Precio: Menor a Mayor"}</option>
              <option value="price-desc">{isEn ? "Price: High to Low" : "Precio: Mayor a Menor"}</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Tabs & Result Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#DFC07C]/40">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-[#0B424C] text-[#DFC07C] shadow-sm"
                  : "bg-white text-stone-700 hover:bg-[#F0E9DC]"
              }`}
            >
              {isEn ? `All Opportunities (${properties.length})` : `Todas las Oportunidades (${properties.length})`}
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "sale"
                  ? "bg-[#0B424C] text-[#DFC07C] shadow-sm"
                  : "bg-white text-stone-700 hover:bg-[#F0E9DC]"
              }`}
            >
              {isEn ? "For Sale Direct (6)" : "En Venta Directa (6)"}
            </button>
            <button
              onClick={() => setActiveTab("demand")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "demand"
                  ? "bg-[#0B424C] text-[#DFC07C] shadow-sm"
                  : "bg-white text-stone-700 hover:bg-[#F0E9DC]"
              }`}
            >
              {isEn ? "Buyer Demands (6)" : "Demandas de Compra (6)"}
            </button>
          </div>

          <div className="text-xs text-stone-600 font-semibold">
            {isEn
              ? `Showing ${filteredListings.length} homes in the United States`
              : `Mostrando ${filteredListings.length} casas disponibles en EE. UU.`}
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      {filteredListings.length === 0 ? (
        <div className="bg-[#FAF6EE] rounded-3xl border-2 border-dashed border-[#DFC07C] p-12 text-center space-y-4">
          <Home className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-display text-xl font-bold text-[#06242C]">
            {isEn ? "No properties match your filter" : "No encontramos propiedades con estos filtros"}
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            {isEn
              ? "Try resetting your search query or choosing another US metro area."
              : "Intenta restablecer los términos de búsqueda o selecciona otra ciudad de EE. UU."}
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCity("all");
              setSelectedPropertyType("all");
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0B424C] text-[#DFC07C] font-bold text-xs"
          >
            {isEn ? "Reset Filters" : "Restablecer Filtros"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredListings.map((prop) => {
            const currentImgIdx = activeImageIndexes[prop.id] || 0;
            const displayImg = prop.images[currentImgIdx] || prop.images[0];
            const isFav = favoriteIds.has(prop.id);

            return (
              <div
                key={prop.id}
                id={`property-card-${prop.id}`}
                className="bg-white rounded-2xl border border-[#DFC07C]/50 overflow-hidden cream-card-shadow hover:shadow-xl hover:border-[#C5A059] transition-all duration-300 flex flex-col group"
              >
                {/* Image & Photo Gallery Container */}
                <div className="relative aspect-[16/10] bg-[#06242C] overflow-hidden">
                  <img
                    src={displayImg}
                    alt={isEn ? prop.title.en : prop.title.es}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Left Badges: Status Badge & Passivhaus Energy Rating */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#0B424C] text-[#DFC07C] border border-[#C5A059]/60 shadow-md">
                      {isEn ? prop.statusBadge?.en || "FOR SALE" : prop.statusBadge?.es || "EN VENTA"}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06242C]/90 text-emerald-400 border border-emerald-500/50 backdrop-blur-md">
                      {prop.energyRating}
                    </span>
                  </div>

                  {/* Top Right: Favorite Button */}
                  <button
                    onClick={(e) => toggleFavorite(prop.id, e)}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-md"
                    title={isFav ? "Remove Favorite" : "Save Property"}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isFav ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>

                  {/* Image Navigation Arrows */}
                  {prop.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevImage(prop.id, prop.images.length, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(prop.id, prop.images.length, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Photo Gallery Carousel Indicator Dots */}
                  {prop.images.length > 1 && (
                    <div className="absolute bottom-3 left-3 z-10 flex space-x-1.5 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                      {prop.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndexes((prev) => ({ ...prev, [prop.id]: idx }));
                          }}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            currentImgIdx === idx ? "bg-[#DFC07C] w-3" : "bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Trigger 360 Tour Floating Button */}
                  <button
                    onClick={() => setViewing360Property(prop)}
                    className="absolute bottom-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-[#FAF6EE]/95 text-[#0B424C] font-extrabold text-xs border border-[#C5A059] shadow-lg hover:bg-[#0B424C] hover:text-[#DFC07C] transition-all flex items-center space-x-1.5 backdrop-blur-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isEn ? "360° Digital Twin" : "Recorrido 360°"}</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Price & Trend Tag */}
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-display font-extrabold text-2xl text-[#06242C] tracking-tight">
                          ${prop.priceUsd.toLocaleString("en-US")}
                        </span>
                        {prop.priceChange30d && (
                          <span className="text-xs font-bold text-emerald-700 font-mono">
                            {prop.priceChange30d} 30d
                          </span>
                        )}
                      </div>

                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {prop.projectedRoi} ROI
                      </span>
                    </div>

                    {/* Core Spec Line: Beds, Baths, SqFt, Property Type */}
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-stone-700 font-bold mb-2">
                      <span>{prop.bedrooms} bds</span>
                      <span className="text-stone-300">•</span>
                      <span>{prop.bathrooms} ba</span>
                      <span className="text-stone-300">•</span>
                      <span>{prop.sqft.toLocaleString()} sqft</span>
                      <span className="text-stone-300">•</span>
                      <span className="text-[#0B424C] font-semibold">{prop.propertyType || "Single Family"}</span>
                    </div>

                    {/* Address & ZIP */}
                    <div className="text-xs text-stone-600 flex items-start space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">
                        {prop.address}, {prop.city}, {prop.state} {prop.zipCode || ""}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-sm text-[#092B34] mt-2 group-hover:text-[#0B424C] transition-colors line-clamp-1">
                      {isEn ? prop.title.en : prop.title.es}
                    </h3>

                    {/* Feature Chips */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {(isEn ? prop.features.en : prop.features.es).slice(0, 2).map((feat, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#FAF6EE] text-stone-700 border border-[#DFC07C]/40"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Invest-Estimate & Mortgage Simulator (Horizontal Layout at Bottom) */}
                    <div className="mt-3 bg-[#FAF6EE] rounded-xl p-2.5 border border-[#DFC07C]/60 grid grid-cols-2 gap-2 text-[11px] shadow-sm">
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                          Invest-Estimate®
                        </span>
                        <span className="font-mono font-extrabold text-[#0B424C] text-xs">
                          ${(prop.investEstimateUsd || Math.round(prop.priceUsd * 1.03)).toLocaleString("en-US")}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center border-l border-[#DFC07C]/40 pl-2.5">
                        <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                          {isEn ? "Est. Mortgage" : "Hipoteca Est."}
                        </span>
                        <span className="font-mono font-bold text-stone-800 text-xs">
                          ${(prop.estMonthlyMortgageUsd || Math.round(prop.priceUsd * 0.0048)).toLocaleString("en-US")}/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100 gap-2">
                    <button
                      onClick={() => setViewing360Property(prop)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-[#FAF6EE] text-[#0B424C] font-bold text-xs border border-[#DFC07C]/80 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{isEn ? "360° Tour" : "Tour 360°"}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenAdvisor) onOpenAdvisor();
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#0B424C] hover:bg-[#06242C] text-[#DFC07C] font-bold text-xs border border-[#C5A059]/40 transition-colors flex items-center justify-center space-x-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#DFC07C]" />
                      <span>{isEn ? "Inquire" : "Consultar"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 360 Panoramic Viewer Modal (Triggered on any property) */}
      {viewing360Property && (
        <ErrorBoundary
          fallbackTitle={isEn ? "360° Panoramic Tour" : "Tour Panorámico 360°"}
          fallbackMessage={
            isEn
              ? "Spatial tour display stabilized for your environment."
              : "Visualizador espacial estabilizado para su entorno."
          }
        >
          <Panorama360Viewer
            property={viewing360Property}
            language={language}
            onClose={() => setViewing360Property(null)}
          />
        </ErrorBoundary>
      )}

      {/* Offer / Demand Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#06242C]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-3xl border-2 border-[#C5A059] w-full max-w-lg p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-[#0B424C] font-display text-xl font-bold mb-1">
              <PlusCircle className="w-5 h-5 text-[#C5A059]" />
              <span>{isEn ? "Publish US Property Listing" : "Publicar Propiedad en EE. UU."}</span>
            </div>
            <p className="text-xs text-stone-600 mb-6">
              {isEn
                ? "Submit an American estate for AI valuation, 3D twin generation, and syndication."
                : "Envía una propiedad en EE. UU. para valoración algorítmica con IA y gemelo digital."}
            </p>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-[#092B34]">
                  {isEn ? "Listing Created Successfully!" : "¡Propiedad Publicada con Éxito!"}
                </h4>
                <p className="text-xs text-stone-600">
                  {isEn
                    ? "Our Passivhaus engineers are compiling the 3D digital twin."
                    : "Nuestros arquitectos están compilando el gemelo digital 3D."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {isEn ? "Listing Title" : "Título de la Publicación"}
                  </label>
                  <input
                    type="text"
                    required
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                    placeholder={isEn ? "e.g. Modern Highland Park Estate with Pool" : "ej. Villa Moderna en Highland Park con Piscina"}
                    className="w-full p-2.5 rounded-xl bg-white border border-stone-300 focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {isEn ? "City" : "Ciudad"}
                    </label>
                    <select
                      value={submitCity}
                      onChange={(e) => setSubmitCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-stone-300 focus:border-[#C5A059] focus:outline-none"
                    >
                      <option value="Dallas">Dallas, TX</option>
                      <option value="Miami">Miami, FL</option>
                      <option value="Austin">Austin, TX</option>
                      <option value="Los Angeles">Los Angeles, CA</option>
                      <option value="New York">New York, NY</option>
                      <option value="Scottsdale">Scottsdale, AZ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1">
                      {t.surfaceArea} (SqFt)
                    </label>
                    <input
                      type="number"
                      required
                      value={submitSqft}
                      onChange={(e) => setSubmitSqft(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl bg-white border border-stone-300 focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {t.priceInUsd}
                  </label>
                  <input
                    type="number"
                    required
                    value={submitPrice}
                    onChange={(e) => setSubmitPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-stone-300 focus:border-[#C5A059] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    {isEn ? "Street Address & ZIP" : "Dirección y Código Postal"}
                  </label>
                  <input
                    type="text"
                    value={submitAddress}
                    onChange={(e) => setSubmitAddress(e.target.value)}
                    placeholder="4520 Beverly Dr, Dallas, TX 75205"
                    className="w-full p-2.5 rounded-xl bg-white border border-stone-300 focus:border-[#C5A059] focus:outline-none"
                  />
                </div>

                {/* Photo Drag & Drop area */}
                <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center bg-white">
                  <Upload className="w-6 h-6 text-[#C5A059] mx-auto mb-1" />
                  <span className="text-stone-600 block text-[11px]">
                    {isEn ? "Drag property photos or architectural plans here" : "Arrastra planos arquitectónicos o fotos aquí"}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0B424C] text-[#DFC07C] font-extrabold text-sm shadow-md hover:bg-[#06242C] transition-all border border-[#C5A059]"
                >
                  {isEn ? "Confirm and Submit Listing" : "Confirmar y Publicar Oportunidad"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
