import React, { useState, useEffect } from "react";
import { Language } from "./types";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { StudioRemodel } from "./components/StudioRemodel";
import { Marketplace } from "./components/Marketplace";
import { InvestCapital } from "./components/InvestCapital";
import { FlashAuction } from "./components/FlashAuction";
import { SpaceRecovery } from "./components/SpaceRecovery";
import { AdvisorDrawer } from "./components/AdvisorDrawer";
import { Footer } from "./components/Footer";
import { InvesDesignSystemShowcase } from "./components/InvesDesignSystemShowcase";

export default function App() {
  // Global bilingual language state with persistence
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("invest_network_lang");
    return saved === "en" ? "en" : "es";
  });

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("invest_network_lang", lang);
  };

  // Advisor Drawer state
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  // Design System Showcase state
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState(false);
  const [marketplaceSearch, setMarketplaceSearch] = useState<string>("");

  // Smooth navigation helper
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigateToMarketplace = (city?: string) => {
    if (city) {
      setMarketplaceSearch(city);
    }
    scrollToSection("marketplace");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0f2a43] flex flex-col selection:bg-[#c9a050]/30 selection:text-[#084c61]">
      {/* Top Fixed Header with Brand Emblem, Switcher, and Drawer Trigger */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col space-y-8 lg:space-y-16">
        {/* PAGE 1: Hero & US Profitability Simulator + 3D Penthouse */}
        <HeroSection
          language={language}
          onNavigateToAuction={() => scrollToSection("auction")}
          onNavigateToStudio={() => scrollToSection("studio")}
          onNavigateToMarketplace={handleNavigateToMarketplace}
        />

        {/* PAGE 2: Studio IA 3D de Remodelación por Fotografía */}
        <StudioRemodel language={language} />

        {/* MODULE 3: Marketplace Inmobiliario & Tours 360° con Puntos Espaciales */}
        <Marketplace
          language={language}
          initialSearchCity={marketplaceSearch}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
        />

        {/* MODULE 4: Invest Capital (US Banking & Fundraising Portal) */}
        <InvestCapital language={language} />

        {/* MODULE 5: Venta & Subasta Flash en Tiempo Real */}
        <FlashAuction language={language} />

        {/* MODULE 6: Recuperación de Espacios & Análisis Estructural */}
        <SpaceRecovery
          language={language}
          onConsultAdvisor={() => setIsAdvisorOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer language={language} onNavigate={scrollToSection} />

      {/* Arq. Elena Vega AI Advisor Drawer */}
      <AdvisorDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        language={language}
      />

      {/* InvesNetwork Living Design System Showcase & Component Gallery */}
      <InvesDesignSystemShowcase
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
      />
    </div>
  );
}
