import React from "react";
import { Language } from "../types";
import { I18N } from "../data/mockData";
import { InvestLogo } from "./InvestLogo";
import { ShieldCheck, MapPin, Building, Lock, ArrowUp } from "lucide-react";

interface FooterProps {
  language: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const isEn = language === "en";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#06242C] text-stone-300 border-t-2 border-[#C5A059] pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Col 1: Brand & Emblem */}
          <div className="md:col-span-4 space-y-4">
            <InvestLogo size="lg" />

            <p className="text-xs text-stone-400 leading-relaxed">
              {isEn
                ? "PropTech 3D architecture, digital twin intelligence, flash auctions, and institutional syndicate capital structuring for luxury residential and commercial assets."
                : "Plataforma PropTech de arquitectura 3D, gemelos digitales, subastas flash y sindicación bancaria institucional en activos inmobiliarios de alta rentabilidad."}
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-[#DFC07C] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Polygon zkEVM Verified • Passivhaus Certified</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              {isEn ? "PropTech Modules" : "Módulos de la Plataforma"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate("hero")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Home & US Market Simulator" : "Inicio & Simulador de Rentabilidad"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("studio")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Studio IA 3D Remodeling" : "Studio IA 3D de Remodelación por Foto"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("marketplace")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Real Estate Marketplace & 360° Tours" : "Marketplace Inmobiliario & Tours 360°"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("capital")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Invest Capital & US Bank Syndicates" : "Invest Capital & Sindicación Bancaria EE. UU."}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("auction")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Flash Auctions & On-Chain Bids" : "Venta & Subasta Flash en Tiempo Real"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("recovery")}
                  className="hover:text-[#DFC07C] transition-colors"
                >
                  {isEn ? "Space Recovery & Structural Analysis" : "Recuperación de Espacios & Algoritmo de Valor Oculto"}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Offices */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              {isEn ? "Institutional Headquarters" : "Sedes Institucionales"}
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Madrid Financial District</span>
                  <span className="text-stone-400">Paseo de la Castellana 95, Planta 18, 28046 Madrid, España</span>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Miami US Capital Desk</span>
                  <span className="text-stone-400">1200 Brickell Bay Drive, Suite 2400, Miami, FL 33131, USA</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0B424C] border border-[#C5A059]/40 text-xs font-bold text-[#DFC07C] hover:bg-[#06242C] transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isEn ? "Back to top" : "Subir al inicio"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Regulatory Bottom Bar */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} Invest Network Inc. Todos los derechos reservados.
            Arquitectura de precisión y sindicación respaldada por gemelos digitales.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <span>Passivhaus Standard</span>
            <span>•</span>
            <span>SEC Reg D 506(c) Compliant</span>
            <span>•</span>
            <span>Términos de Servicio</span>
            <span>•</span>
            <span>Privacidad de Datos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
