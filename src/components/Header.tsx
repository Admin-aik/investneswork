import React from "react";
import { Language } from "../types";
import { I18N } from "../data/mockData";
import { InvestLogo } from "./InvestLogo";
import { Sparkles, Heart, Palette } from "lucide-react";

interface HeaderProps {
  language: Language;
  setLanguage?: (lang: Language) => void;
  onLanguageChange?: (lang: Language) => void;
  activeSection?: string;
  setActiveSection?: (sec: string) => void;
  onOpenDrawer?: () => void;
  onOpenAdvisor?: () => void;
  onOpenDesignSystem?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  onLanguageChange,
  activeSection = "hero",
  setActiveSection,
  onOpenDrawer,
  onOpenAdvisor,
  onOpenDesignSystem,
}) => {
  const t = I18N[language].nav;
  const updateLanguage = (lang: Language) => {
    if (setLanguage) setLanguage(lang);
    if (onLanguageChange) onLanguageChange(lang);
  };
  const triggerAdvisor = () => {
    if (onOpenAdvisor) onOpenAdvisor();
    else if (onOpenDrawer) onOpenDrawer();
  };

  const navItems = [
    { id: "marketplace", label: language === "en" ? "Buy Real Estate" : "Comprar Propiedades" },
    { id: "studio", label: language === "en" ? "AI Remodeling" : "Remodelar con IA" },
    { id: "auction", label: language === "en" ? "Flash Auctions" : "Subastas Flash" },
    { id: "capital", label: language === "en" ? "Invest Capital" : "Financiamiento" },
    { id: "recovery", label: language === "en" ? "Spaces & Plans" : "Espacios y Diagnóstico" },
  ];

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-[var(--ds-surface-body)]/95 border-b border-[var(--ds-border-default)] text-[var(--ds-color-brand-dark)] shadow-sm backdrop-blur-md transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with InvestLogo component */}
        <div
          id="brand-logo-container"
          onClick={() => {
            if (setActiveSection) setActiveSection("hero");
            const el = document.getElementById("hero");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="cursor-pointer group flex items-center space-x-3 transition-transform hover:scale-[1.02]"
        >
          <InvestLogo variant="horizontal" theme="light" />
        </div>

        {/* Desktop Navigation Links - Modern Clean Menu */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  if (setActiveSection) setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#084c61] text-[#c9a050] shadow-sm font-bold"
                    : "text-[#0f2a43] hover:text-[#084c61] hover:bg-[#F3ECE0]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher, Saved Homes & Advisor */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Saved Link */}
          <button
            onClick={() => {
              const el = document.getElementById("marketplace");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0f2a43] hover:bg-[#F3ECE0] transition-colors"
            title="Ver Propiedades Guardadas"
          >
            <Heart className="w-4 h-4 text-[#c9a050]" />
            <span className="hidden md:inline">{language === "en" ? "Saved" : "Favoritos"}</span>
          </button>

          {/* Design System Showcase Button */}
          {onOpenDesignSystem && (
            <button
              id="open-design-system-btn"
              onClick={onOpenDesignSystem}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#c9a050]/20 text-[#084c61] border border-[#c9a050] text-xs font-bold hover:bg-[#c9a050] hover:text-[#0f2a43] transition-all cursor-pointer shadow-xs"
              title="Explorar el Design System de InvesNetwork (Angular & Tokens)"
            >
              <span className="w-2 h-2 rounded-full bg-[#dd0031]"></span>
              <span className="hidden md:inline">Design System (Angular)</span>
              <span className="md:hidden">DS Angular</span>
            </button>
          )}

          {/* Bilingual Switcher (ES / EN) */}
          <div
            id="language-switcher"
            className="flex items-center bg-[#F3ECE0] border border-[#c9a050]/50 rounded-lg p-0.5 shadow-inner"
          >
            <button
              id="lang-btn-es"
              onClick={() => updateLanguage("es")}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                language === "es"
                  ? "bg-[#084c61] text-[#c9a050] shadow-sm"
                  : "text-[#0f2a43] hover:text-[#084c61]"
              }`}
            >
              ES
            </button>
            <button
              id="lang-btn-en"
              onClick={() => updateLanguage("en")}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                language === "en"
                  ? "bg-[#084c61] text-[#c9a050] shadow-sm"
                  : "text-[#0f2a43] hover:text-[#084c61]"
              }`}
            >
              EN
            </button>
          </div>

          {/* Arq. Elena Vega Advisor / Contact Drawer button */}
          <button
            id="open-advisor-drawer-btn"
            onClick={triggerAdvisor}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#084c61] to-[#0f2a43] text-[#c9a050] font-bold text-xs sm:text-sm border border-[#c9a050]/60 shadow-[0_4px_12px_rgba(8,76,97,0.18)] hover:brightness-110 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#c9a050]" />
            <span className="hidden sm:inline">Arq. Elena Vega</span>
            <span className="sm:hidden">Elena</span>
          </button>
        </div>
      </div>
    </header>
  );
};
