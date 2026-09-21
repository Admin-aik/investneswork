import React, { useState } from "react";
import {
  DsButton,
  DsBadge,
  DsCard,
  DsKpiCard,
  DsAlert,
  DsModal,
  DsInput,
  DsSelect,
  DsToggle,
  DsTabs,
  DsBreadcrumb,
  DsPagination,
  DsEmptyState,
  InvesTokens,
} from "../design-system";
import {
  Palette,
  Type,
  MousePointerClick,
  Layers,
  Sparkles,
  Search,
  Check,
  Shield,
  Building2,
  DollarSign,
  TrendingUp,
  Sliders,
  FileCode2,
  X,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export interface InvesDesignSystemShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvesDesignSystemShowcase: React.FC<InvesDesignSystemShowcaseProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>("angular");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [toggleState, setToggleState] = useState(true);
  const [demoInput, setDemoInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState(true);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [selectedAngularComp, setSelectedAngularComp] = useState<string>("button");
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const showcaseTabs = [
    { id: "angular", label: "Angular Components", icon: <FileCode2 className="w-4 h-4 text-[#dd0031]" /> },
    { id: "buttons", label: "Button System", icon: <MousePointerClick className="w-4 h-4" /> },
    { id: "badges", label: "Badges & States", icon: <Shield className="w-4 h-4" /> },
    { id: "colors", label: "Color Palette & Tokens", icon: <Palette className="w-4 h-4" /> },
    { id: "typography", label: "Typography (Montserrat)", icon: <Type className="w-4 h-4" /> },
    { id: "cards", label: "Cards & KPI", icon: <Layers className="w-4 h-4" /> },
    { id: "forms", label: "Form Controls", icon: <Sliders className="w-4 h-4" /> },
    { id: "feedback", label: "Feedback & Dialogs", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0f2a43]/70 backdrop-blur-md flex flex-col justify-end sm:justify-center p-0 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-[var(--ds-surface-body)] w-full max-w-7xl max-h-[95vh] rounded-t-3xl sm:rounded-3xl border border-[var(--ds-border-default)] shadow-2xl flex flex-col overflow-hidden mx-auto">
        {/* Showcase Top Bar */}
        <div className="px-6 py-4 border-b border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)] flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#084c61] text-[#c9a050] flex items-center justify-center font-extrabold text-sm border-2 border-[#c9a050] shadow-sm">
              IN
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-display font-extrabold text-lg sm:text-xl text-[#0f2a43] leading-tight">
                  InvesNetwork Design System
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#c9a050]/25 text-[#0f2a43] border border-[#c9a050]">
                  v1.0 Ready
                </span>
              </div>
              <p className="text-xs text-[#6b7280]">
                Official Brand Tokens • Montserrat Typography • Component Architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6b7280] hover:text-[#0f2a43] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Cerrar Showcase"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-[var(--ds-border-default)] bg-[var(--ds-surface-body)] overflow-x-auto">
          <DsTabs
            tabs={showcaseTabs}
            activeId={activeTab}
            onChange={setActiveTab}
            variant="pills"
          />
        </div>

        {/* Tab Body Contents */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8">
          {/* TAB 1: BUTTON SYSTEM */}
          {activeTab === "buttons" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Button System (v1.0 InvesNetwork Spec)
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Botones interactivos diseñados para transacciones institucionales y portales de inversión.
                </p>
              </div>

              {/* Sizes Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Escala de Tamaños (sm / md / lg)
                </h4>
                <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[var(--ds-surface-muted)]/50 border border-[var(--ds-border-default)]">
                  <DsButton size="sm">Button Small (sm)</DsButton>
                  <DsButton size="md">Button Medium (md - default)</DsButton>
                  <DsButton size="lg">Button Large (lg)</DsButton>
                </div>
              </div>

              {/* Variants Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Variantes de Color & Rol Institucional
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="primary"</span>
                    <DsButton variant="primary" fullWidth>Petroleum Teal</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="accent"</span>
                    <DsButton variant="accent" fullWidth>Champagne Gold</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="contrast"</span>
                    <DsButton variant="contrast" fullWidth>Deep Forest</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="dark"</span>
                    <DsButton variant="dark" fullWidth>Deep Navy</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="outline"</span>
                    <DsButton variant="outline" fullWidth>Teal Outline</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="outline-accent"</span>
                    <DsButton variant="outline-accent" fullWidth>Gold Outline</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="success"</span>
                    <DsButton variant="success" fullWidth>Success Green</DsButton>
                  </div>
                  <div className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white space-y-2 text-center">
                    <span className="text-[11px] font-bold text-[#6b7280] block">variant="danger"</span>
                    <DsButton variant="danger" fullWidth>Danger Red</DsButton>
                  </div>
                </div>
              </div>

              {/* Special States Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Estados Interactivos & Acciones
                </h4>
                <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[var(--ds-surface-muted)]/50 border border-[var(--ds-border-default)]">
                  <DsButton variant="primary" iconLeft={<Sparkles className="w-4 h-4" />}>
                    With Left Icon
                  </DsButton>
                  <DsButton variant="accent" iconRight={<ChevronRight className="w-4 h-4" />}>
                    With Right Arrow
                  </DsButton>
                  <DsButton variant="primary" isLoading>
                    Cargando...
                  </DsButton>
                  <DsButton variant="primary" disabled>
                    Disabled State
                  </DsButton>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BADGES & STATES */}
          {activeTab === "badges" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Badges, Tags & Operational States (§13)
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Indicadores de estado de inversión, permisos y disponibilidad.
                </p>
              </div>

              {/* Subtle Badges */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Formato Sutil (Subtle / Soft)
                </h4>
                <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-white border border-[var(--ds-border-default)]">
                  <DsBadge variant="primary" dot>Primary Teal</DsBadge>
                  <DsBadge variant="accent" dot>Accent Gold</DsBadge>
                  <DsBadge variant="contrast" dot>Deep Forest</DsBadge>
                  <DsBadge variant="success" dot>Success Active</DsBadge>
                  <DsBadge variant="warning" dot>Warning Pending</DsBadge>
                  <DsBadge variant="danger" dot>Danger Rejected</DsBadge>
                  <DsBadge variant="info" dot>Info Verification</DsBadge>
                  <DsBadge variant="neutral" dot>Neutral Inactive</DsBadge>
                </div>
              </div>

              {/* Operational State Badges from Spec */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Estados Operacionales Específicos (§13 Design System)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl border border-[var(--ds-border-default)] bg-white flex flex-col gap-1.5">
                    <span className="text-[10px] text-[#6b7280] font-semibold">Permission Restricted</span>
                    <DsBadge variant="locked" dot>Locked (#8B5CF6)</DsBadge>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[var(--ds-border-default)] bg-white flex flex-col gap-1.5">
                    <span className="text-[10px] text-[#6b7280] font-semibold">Pending Decision</span>
                    <DsBadge variant="awaiting" dot>Awaiting (#38BDF8)</DsBadge>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[var(--ds-border-default)] bg-white flex flex-col gap-1.5">
                    <span className="text-[10px] text-[#6b7280] font-semibold">Halted Process</span>
                    <DsBadge variant="blocked" dot>Blocked (#EC4899)</DsBadge>
                  </div>
                  <div className="p-3.5 rounded-xl border border-[var(--ds-border-default)] bg-white flex flex-col gap-1.5">
                    <span className="text-[10px] text-[#6b7280] font-semibold">Disconnected</span>
                    <DsBadge variant="offline" dot>Offline (#64748B)</DsBadge>
                  </div>
                </div>
              </div>

              {/* Solid & Outline Formats */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Formatos Sólidos & Outline
                </h4>
                <div className="flex flex-wrap gap-2.5 p-4 rounded-2xl bg-white border border-[var(--ds-border-default)]">
                  <DsBadge variant="primary" format="solid">Primary Solid</DsBadge>
                  <DsBadge variant="accent" format="solid">Accent Solid</DsBadge>
                  <DsBadge variant="contrast" format="solid">Forest Solid</DsBadge>
                  <DsBadge variant="dark" format="solid">Navy Solid</DsBadge>
                  <DsBadge variant="primary" format="outline">Primary Outline</DsBadge>
                  <DsBadge variant="accent" format="outline">Accent Outline</DsBadge>
                  <DsBadge variant="danger" format="outline">Danger Outline</DsBadge>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLORS & TOKENS */}
          {activeTab === "colors" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Brand Color Palette & Design Tokens
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Haz clic en cualquier muestra de color para copiar el código HEX oficial al portapapeles.
                </p>
              </div>

              {copiedToken && (
                <div className="p-2.5 rounded-xl bg-[#16a34a]/15 text-[#16a34a] text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Código {copiedToken} copiado al portapapeles.</span>
                </div>
              )}

              {/* Main Brand Anchors */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Colores Ancla Institucionales (InvesNetwork)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Brand Primary (Teal)",
                      hex: InvesTokens.colors.brand.primary,
                      usage: "Superficies maestras, monograma, botones principales",
                    },
                    {
                      name: "Brand Accent (Gold)",
                      hex: InvesTokens.colors.brand.accent,
                      usage: "Trazas de monograma, highlights, badges, CTAs",
                    },
                    {
                      name: "Brand Contrast (Deep Forest)",
                      hex: InvesTokens.colors.brand.contrast,
                      usage: "Textos de alto contraste sobre fondos crema",
                    },
                    {
                      name: "Brand Dark (Deep Navy)",
                      hex: InvesTokens.colors.brand.dark,
                      usage: "Fondos profundos, modo oscuro, textos sobre dorado",
                    },
                  ].map((color) => (
                    <div
                      key={color.hex}
                      onClick={() => copyHex(color.hex)}
                      className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div
                        className="w-full h-20 rounded-xl mb-3 border border-black/10 flex items-end p-2.5 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="text-[11px] font-mono font-bold text-white px-1.5 py-0.5 rounded bg-black/40">
                          {color.hex}
                        </span>
                      </div>
                      <p className="font-bold text-xs text-[#0f2a43] group-hover:text-[#084c61]">
                        {color.name}
                      </p>
                      <p className="text-[10px] text-[#6b7280] mt-0.5 leading-snug">
                        {color.usage}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surface & Background Tokens */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Superficies y Fondos Semánticos
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => copyHex(InvesTokens.colors.surface.bodyLight)}
                    className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white shadow-sm cursor-pointer"
                  >
                    <div
                      className="w-full h-16 rounded-xl mb-2.5 border border-stone-200"
                      style={{ backgroundColor: InvesTokens.colors.surface.bodyLight }}
                    />
                    <p className="font-bold text-xs text-[#0f2a43]">Surface Body Light (#FAF7F2)</p>
                    <span className="text-[11px] font-mono text-[#6b7280]">--ds-surface-body</span>
                  </div>
                  <div
                    onClick={() => copyHex(InvesTokens.colors.surface.mutedLight)}
                    className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white shadow-sm cursor-pointer"
                  >
                    <div
                      className="w-full h-16 rounded-xl mb-2.5 border border-stone-200"
                      style={{ backgroundColor: InvesTokens.colors.surface.mutedLight }}
                    />
                    <p className="font-bold text-xs text-[#0f2a43]">Surface Muted (#F3ECE0)</p>
                    <span className="text-[11px] font-mono text-[#6b7280]">--ds-surface-muted</span>
                  </div>
                  <div
                    onClick={() => copyHex(InvesTokens.colors.surface.borderLight)}
                    className="p-4 rounded-2xl border border-[var(--ds-border-default)] bg-white shadow-sm cursor-pointer"
                  >
                    <div
                      className="w-full h-16 rounded-xl mb-2.5 border border-stone-300"
                      style={{ backgroundColor: InvesTokens.colors.surface.borderLight }}
                    />
                    <p className="font-bold text-xs text-[#0f2a43]">Border Default (#E2D7C3)</p>
                    <span className="text-[11px] font-mono text-[#6b7280]">--ds-border-default</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TYPOGRAPHY */}
          {activeTab === "typography" && (
            <div className="space-y-8 animate-in fade-in duration-200 font-sans">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Typography Scale — Montserrat Variable
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Familia tipográfica oficial de InvesNetwork con escala modular equilibrada.
                </p>
              </div>

              <div className="space-y-6 p-6 rounded-2xl bg-white border border-[var(--ds-border-default)]">
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] font-mono font-bold text-[#6b7280]">Display 1 (2rem / 32px) - 800 ExtraBold</span>
                  <p className="text-3xl font-extrabold text-[#0f2a43] tracking-tight mt-1">
                    Inversión Inmobiliaria Inteligente en EE. UU.
                  </p>
                </div>
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] font-mono font-bold text-[#6b7280]">Heading 1 (1.125rem / 18px) - 700 Bold</span>
                  <h1 className="text-lg font-bold text-[#0f2a43] mt-1">
                    Portafolio de Activos Residenciales Costeros
                  </h1>
                </div>
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] font-mono font-bold text-[#6b7280]">Heading 2 (1rem / 16px) - 700 Bold</span>
                  <h2 className="text-base font-bold text-[#084c61] mt-1">
                    Retornos Garantizados con Fideicomisos Bancarios
                  </h2>
                </div>
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] font-mono font-bold text-[#6b7280]">Body Regular (0.75rem / 12px) - 400 Regular</span>
                  <p className="text-xs text-[#0f2a43] leading-relaxed mt-1 max-w-2xl">
                    InvesNetwork proporciona una infraestructura unificada de tokenización, sindicación y
                    remodelación arquitectónica con estándares Passivhaus A++ para inversionistas globales.
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#6b7280]">Caption / Label (0.625rem / 10px) - 600 SemiBold</span>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#38563c] mt-1">
                    ESTÁNDAR CERTIFICADO • RETORNO ANUAL ESTIMADO: 14.8% APY
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CARDS & KPI */}
          {activeTab === "cards" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Cards, Containers & KPI Grids
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Superficies elevadas para mostrar métricas financieras, propiedades y paneles de control.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  KPI Metrics Cards (InvesNetwork Dashboard)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <DsKpiCard
                    label="Volumen Administrado"
                    value="$148.5M"
                    change={24.8}
                    trend="up"
                    icon={<DollarSign className="w-4 h-4" />}
                    subtitle="12 Ciudades Clave"
                  />
                  <DsKpiCard
                    label="TIR Media Anual"
                    value="16.4%"
                    change={3.2}
                    trend="up"
                    icon={<TrendingUp className="w-4 h-4" />}
                    subtitle="Certificado por KPMG"
                  />
                  <DsKpiCard
                    label="Activos en Subasta"
                    value="18"
                    change="-2"
                    trend="down"
                    icon={<Building2 className="w-4 h-4" />}
                    subtitle="4 con cierre hoy"
                  />
                  <DsKpiCard
                    label="Inversores Activos"
                    value="1,420"
                    change={12.5}
                    trend="up"
                    icon={<Shield className="w-4 h-4" />}
                    subtitle="KYC / AML Verificado"
                  />
                </div>
              </div>

              {/* Surface Card Styles */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Variantes de Card (Default / Elevated / Interactive)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DsCard variant="default">
                    <h5 className="font-bold text-sm text-[#0f2a43] mb-1">Default Card</h5>
                    <p className="text-xs text-[#6b7280] leading-relaxed">
                      Borde estándar `--ds-border-default` con elevación suave de lectura.
                    </p>
                  </DsCard>
                  <DsCard variant="elevated">
                    <h5 className="font-bold text-sm text-[#084c61] mb-1">Elevated Card</h5>
                    <p className="text-xs text-[#6b7280] leading-relaxed">
                      Sombra con tinte de marca `--ds-shadow-brand-md` para elementos destacados.
                    </p>
                  </DsCard>
                  <DsCard variant="interactive">
                    <h5 className="font-bold text-sm text-[#0f2a43] mb-1">Interactive Card</h5>
                    <p className="text-xs text-[#6b7280] leading-relaxed">
                      Hover dinámico con elevación y borde dorado reactivo al cursor.
                    </p>
                  </DsCard>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FORM CONTROLS */}
          {activeTab === "forms" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Form Controls (Inputs, Selects & Toggles)
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Controles de formulario diseñados con los tokens de radio, borde y foco de InvesNetwork.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white border border-[var(--ds-border-default)]">
                <DsInput
                  label="Nombre de Propiedad"
                  placeholder="Ej: Balboa Island Ocean Residence"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  leftIcon={<Building2 className="w-4 h-4" />}
                  hint="Introduce el título oficial para la ficha técnica."
                />

                <DsInput
                  label="Monto de Inversión (USD)"
                  placeholder="100,000"
                  type="number"
                  leftIcon={<DollarSign className="w-4 h-4" />}
                  hint="Monto mínimo sindicado por ticket: $50,000 USD."
                />

                <DsSelect
                  label="Ciudad / Mercado MLS"
                  options={[
                    { value: "newport", label: "Newport Beach, CA (MLS 92661)" },
                    { value: "brickell", label: "Miami Brickell, FL (MLS 33131)" },
                    { value: "austin", label: "Austin Downtown, TX (MLS 78701)" },
                  ]}
                  hint="Mercados autorizados para sindicación bancaria."
                />

                <div className="pt-2">
                  <DsToggle
                    checked={toggleState}
                    onChange={setToggleState}
                    label="Autenticación en 2 Pasos (2FA Bancario)"
                    description="Requiere confirmación biométrica antes de autorizar firmas notariales."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FEEDBACK & DIALOGS */}
          {activeTab === "feedback" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f2a43] mb-1">
                  Feedback, Alerts & Modals
                </h3>
                <p className="text-xs sm:text-sm text-[#6b7280]">
                  Mensajes de confirmación, estados del sistema y diálogos de confirmación.
                </p>
              </div>

              {/* Alert Variants */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Alertas del Sistema (Info / Success / Warning / Danger)
                </h4>
                <div className="space-y-3">
                  {showAlert && (
                    <DsAlert
                      variant="info"
                      title="Sincronización MLS en Tiempo Real"
                      onClose={() => setShowAlert(false)}
                    >
                      Las tasas de rentabilidad CAP y plusvalía se actualizan cada 60 segundos contra el MLS oficial.
                    </DsAlert>
                  )}
                  <DsAlert variant="success" title="Inversión Aprobada con Éxito">
                    Los fondos han sido transferidos a la cuenta fiduciaria bajo custodia de JPMorgan Chase.
                  </DsAlert>
                  <DsAlert variant="warning" title="Documentación Pendiente">
                    Por favor adjunta la prueba de acreditación de inversionista antes de las 18:00 UTC.
                  </DsAlert>
                  <DsAlert variant="danger" title="Límite de Tiempo en Subasta Flash">
                    Quedan menos de 10 minutos para pujar por la propiedad costera en Balboa Island.
                  </DsAlert>
                </div>
              </div>

              {/* Modal Trigger Demo */}
              <div className="p-6 rounded-2xl bg-white border border-[var(--ds-border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[#0f2a43]">Diálogo Modal del Design System</h4>
                  <p className="text-xs text-[#6b7280]">
                    Prueba el modal con backdrop difuminado, cabecera con marca y botones de acción.
                  </p>
                </div>
                <DsButton variant="accent" onClick={() => setIsDemoModalOpen(true)}>
                  Abrir Modal Demo
                </DsButton>
              </div>

              {/* Pagination Demo */}
              <div className="p-6 rounded-2xl bg-white border border-[var(--ds-border-default)] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Paginación de Resultados
                </h4>
                <DsPagination
                  currentPage={currentPage}
                  totalPages={5}
                  onPageChange={setCurrentPage}
                />
              </div>

              {/* Empty State Demo */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#38563c]">
                  Estado Vacío (Empty State)
                </h4>
                <DsEmptyState
                  title="No se encontraron oportunidades en este rango"
                  description="Ajusta los filtros de rentabilidad o explora propiedades en otros distritos costeros."
                  action={
                    <DsButton variant="outline" size="sm" onClick={() => setActiveTab("buttons")}>
                      Restablecer Filtros
                    </DsButton>
                  }
                />
              </div>
            </div>
          )}

          {/* TAB 8: ANGULAR ARCHITECTURE & SOURCE CODE */}
          {activeTab === "angular" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Angular Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#084c61]/15 via-[#c9a050]/10 to-[#38563c]/10 border border-[#084c61]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#dd0031] text-white">
                      Angular 17 / 18 / 19
                    </span>
                    <span className="text-xs font-bold text-[#084c61]">
                      Standalone Component Architecture
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f2a43]">
                    Biblioteca Angular Oficial de InvesNetwork
                  </h3>
                  <p className="text-xs text-[#6b7280] max-w-2xl leading-relaxed">
                    Todos los componentes del Design System están implementados con arquitectura Angular Standalone, OnPush ChangeDetection, formularios reactivos (ControlValueAccessor) y tipado estricto en <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[#084c61]">src/angular-design-system/</code>.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-[var(--ds-border-default)] shadow-xs text-xs font-mono text-[#0f2a43]">
                    13 Componentes Standalone
                  </div>
                </div>
              </div>

              {/* Component selector pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "button", label: "ds-button", file: "components/button/ds-button.component.ts" },
                  { id: "badge", label: "ds-badge", file: "components/badge/ds-badge.component.ts" },
                  { id: "kpi", label: "ds-kpi-card", file: "components/card/ds-kpi-card.component.ts" },
                  { id: "modal", label: "ds-modal", file: "components/modal/ds-modal.component.ts" },
                  { id: "input", label: "ds-input", file: "components/form/ds-input.component.ts" },
                  { id: "advisor", label: "inves-advisor-drawer", file: "components/advisor/advisor-drawer.component.ts" },
                  { id: "public-api", label: "public-api.ts", file: "public-api.ts" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedAngularComp(item.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedAngularComp === item.id
                        ? "bg-[#084c61] text-white shadow-sm"
                        : "bg-[var(--ds-surface-muted)] text-[#0f2a43] hover:bg-black/5 border border-[var(--ds-border-default)]"
                    }`}
                  >
                    &lt;{item.label}&gt;
                  </button>
                ))}
              </div>

              {/* Code viewer card */}
              <div className="rounded-2xl border border-[var(--ds-border-default)] bg-[#071725] text-white overflow-hidden shadow-xl">
                <div className="px-4 py-3 bg-[#0d243a] border-b border-[#173854] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#eab308]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                    <span className="text-xs font-mono text-[#9ca3af] ml-2">
                      src/angular-design-system/
                      {selectedAngularComp === "button" && "components/button/ds-button.component.ts"}
                      {selectedAngularComp === "badge" && "components/badge/ds-badge.component.ts"}
                      {selectedAngularComp === "kpi" && "components/card/ds-kpi-card.component.ts"}
                      {selectedAngularComp === "modal" && "components/modal/ds-modal.component.ts"}
                      {selectedAngularComp === "input" && "components/form/ds-input.component.ts"}
                      {selectedAngularComp === "advisor" && "components/advisor/advisor-drawer.component.ts"}
                      {selectedAngularComp === "public-api" && "public-api.ts"}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#173854] hover:bg-[#1e4b70] text-[#c9a050] transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Template Usage Preview */}
                <div className="px-4 py-2.5 bg-[#0a1e30] border-b border-[#173854] text-xs font-mono text-[#c9a050] flex items-center gap-2 overflow-x-auto">
                  <span className="text-[#64748b] shrink-0">Uso en Template Angular:</span>
                  <code className="text-emerald-400">
                    {selectedAngularComp === "button" && `<ds-button variant="primary" size="md" (clicked)="onInvest()">Invertir en Sindicación</ds-button>`}
                    {selectedAngularComp === "badge" && `<ds-badge variant="locked" [dot]="true">Bloqueado</ds-badge>`}
                    {selectedAngularComp === "kpi" && `<ds-kpi-card label="TIR Media" value="14.8%" change="+2.4%" trend="up"></ds-kpi-card>`}
                    {selectedAngularComp === "modal" && `<ds-modal [isOpen]="isModalOpen" title="Confirmación" (close)="isModalOpen = false">...</ds-modal>`}
                    {selectedAngularComp === "input" && `<ds-input [(ngModel)]="amount" label="Monto USD" placeholder="10,000"></ds-input>`}
                    {selectedAngularComp === "advisor" && `<inves-advisor-drawer [isOpen]="isAdvisorOpen" language="es" (close)="isAdvisorOpen = false"></inves-advisor-drawer>`}
                    {selectedAngularComp === "public-api" && `import { DsButtonComponent, DsBadgeComponent } from './angular-design-system/public-api';`}
                  </code>
                </div>

                {/* Code body */}
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[420px] text-gray-200 leading-relaxed">
                  {selectedAngularComp === "button" && `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsButtonVariant = 'primary' | 'accent' | 'contrast' | 'dark' | 'outline' | 'ghost' | 'danger' | 'success';
export type DsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <button
      [type]="type"
      [disabled]="disabled || isLoading"
      (click)="onClick($event)"
      [ngClass]="[
        'inline-flex items-center justify-center font-sans transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        fullWidth ? 'w-full' : '',
        sizeClasses[size],
        variantClasses[variant]
      ]"
    >
      <span *ngIf="isLoading" class="animate-spin shrink-0 mr-2">...</span>
      <ng-content select="[slot=icon-left]"></ng-content>
      <span class="whitespace-nowrap"><ng-content></ng-content></span>
      <ng-content select="[slot=icon-right]"></ng-content>
    </button>
  \`
})
export class DsButtonComponent {
  @Input() variant: DsButtonVariant = 'primary';
  @Input() size: DsButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() clicked = new EventEmitter<MouseEvent>();
}`}

                  {selectedAngularComp === "badge" && `import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsBadgeVariant = 'primary' | 'accent' | 'contrast' | 'dark' | 'success' | 'danger' | 'locked' | 'awaiting' | 'blocked' | 'offline';
export type DsBadgeFormat = 'subtle' | 'solid' | 'outline';

@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <span [ngClass]="['inline-flex items-center font-bold tracking-wider rounded-full uppercase', sizeClasses[size], formatVariantClasses[format][variant]]">
      <span *ngIf="dot" [ngClass]="['w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant]]"></span>
      <ng-content select="[slot=icon]"></ng-content>
      <span class="whitespace-nowrap"><ng-content></ng-content></span>
    </span>
  \`
})
export class DsBadgeComponent {
  @Input() variant: DsBadgeVariant = 'primary';
  @Input() format: DsBadgeFormat = 'subtle';
  @Input() dot: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';
}`}

                  {selectedAngularComp === "kpi" && `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsCardComponent } from './ds-card.component';

@Component({
  selector: 'ds-kpi-card',
  standalone: true,
  imports: [CommonModule, DsCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <ds-card [variant]="interactive ? 'interactive' : 'default'" padding="md">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#38563c]">{{ label }}</span>
        <div class="w-8 h-8 rounded-lg bg-[#084c61]/10 text-[#084c61] flex items-center justify-center">
          <ng-content select="[slot=icon]"></ng-content>
        </div>
      </div>
      <div class="text-3xl font-extrabold font-mono text-[#0f2a43] mb-2">{{ value }}</div>
      <div *ngIf="change" class="flex items-center justify-between text-xs pt-1 border-t border-[var(--ds-border-default)]">
        <span [ngClass]="trend === 'up' ? 'text-green-600' : 'text-red-600'">{{ change }}</span>
        <span *ngIf="subtitle" class="text-gray-500">{{ subtitle }}</span>
      </div>
    </ds-card>
  \`
})
export class DsKpiCardComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() change?: string | number;
  @Input() trend: 'up' | 'down' | 'neutral' = 'up';
  @Input() subtitle?: string;
  @Input() interactive: boolean = false;
  @Output() clicked = new EventEmitter<MouseEvent>();
}`}

                  {selectedAngularComp === "modal" && `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div *ngIf="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" (click)="onBackdropClick($event)">
      <div class="bg-[var(--ds-surface-body)] border rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col" (click)="$event.stopPropagation()">
        <div class="px-6 py-4 border-b flex items-center justify-between bg-[var(--ds-surface-muted)]">
          <h3 class="font-extrabold text-[#0f2a43]">{{ title }}</h3>
          <button (click)="closeModal()" class="text-gray-500 hover:text-black">&times;</button>
        </div>
        <div class="px-6 py-5 overflow-y-auto"><ng-content></ng-content></div>
        <div class="px-6 py-4 border-t flex justify-end gap-3"><ng-content select="[slot=footer]"></ng-content></div>
      </div>
    </div>
  \`
})
export class DsModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title?: string;
  @Output() close = new EventEmitter<void>();
  closeModal() { this.close.emit(); }
  onBackdropClick(e: MouseEvent) { this.closeModal(); }
}`}

                  {selectedAngularComp === "input" && `import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsInputComponent), multi: true }],
  template: \`
    <div class="w-full flex flex-col gap-1.5">
      <label *ngIf="label" class="text-xs font-bold uppercase text-[#38563c]">{{ label }}</label>
      <input [type]="type" [value]="value" [placeholder]="placeholder" (input)="onInput($event)"
             class="w-full px-3.5 py-2.5 rounded-xl border border-[var(--ds-border-default)] text-[#0f2a43]" />
      <p *ngIf="error" class="text-xs text-red-600">{{ error }}</p>
    </div>
  \`
})
export class DsInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() error?: string;
  value: string = '';
  onChange = (_val: string) => {};
  writeValue(val: any) { this.value = val || ''; }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) {}
  onInput(e: Event) { this.value = (e.target as HTMLInputElement).value; this.onChange(this.value); }
}`}

                  {selectedAngularComp === "advisor" && `import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DsButtonComponent } from '../button/ds-button.component';
import { DsBadgeComponent } from '../badge/ds-badge.component';

@Component({
  selector: 'inves-advisor-drawer',
  standalone: true,
  imports: [CommonModule, FormsModule, DsButtonComponent, DsBadgeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div *ngIf="isOpen" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" (click)="closeDrawer()">
      <aside class="fixed inset-y-0 right-0 w-screen max-w-md bg-[var(--ds-surface-body)] shadow-2xl flex flex-col" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="p-6 border-b flex justify-between items-center bg-[var(--ds-surface-muted)]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-[#084c61] text-[#c9a050] flex items-center justify-center font-bold">IN</div>
            <div>
              <h3 class="font-extrabold text-[#0f2a43]">InvesAdvisor <ds-badge variant="accent" format="solid" size="sm">IA</ds-badge></h3>
              <p class="text-xs text-gray-500">Copiloto de Inversión Inmobiliaria</p>
            </div>
          </div>
          <button (click)="closeDrawer()">&times;</button>
        </div>

        <!-- Chat history -->
        <div class="flex-1 p-6 overflow-y-auto space-y-4">
          <div *ngFor="let msg of messages" [ngClass]="msg.sender === 'user' ? 'text-right' : 'text-left'">
            <div [ngClass]="msg.sender === 'user' ? 'bg-[#084c61] text-white' : 'bg-[var(--ds-surface-muted)] text-[#0f2a43]'"
                 class="inline-block rounded-2xl p-4 text-xs sm:text-sm">{{ msg.text }}</div>
          </div>
        </div>

        <!-- Input -->
        <div class="p-4 border-t flex gap-2">
          <input [(ngModel)]="inputText" (keyup.enter)="sendMessage()" placeholder="Pregunta sobre TIR, LTV o proyectos..."
                 class="flex-1 px-4 py-2 border rounded-xl text-xs" />
          <ds-button variant="primary" (clicked)="sendMessage()">Enviar</ds-button>
        </div>
      </aside>
    </div>
  \`
})
export class AdvisorDrawerComponent {
  @Input() isOpen: boolean = false;
  @Input() language: 'es' | 'en' = 'es';
  @Output() close = new EventEmitter<void>();
  inputText = '';
  messages = [{ sender: 'ai', text: 'Hola, soy tu asesor financiero inmobiliario.' }];
  closeDrawer() { this.close.emit(); }
  sendMessage() {
    if (!this.inputText.trim()) return;
    this.messages.push({ sender: 'user', text: this.inputText });
    this.inputText = '';
  }
}`}

                  {selectedAngularComp === "public-api" && `/**
 * InvesNetwork Design System — Angular Public API
 * Ready for Angular 17, 18, 19 standalone component usage.
 */

// Design Tokens
export * from './tokens';

// Components
export * from './components/button/ds-button.component';
export * from './components/badge/ds-badge.component';
export * from './components/card/ds-card.component';
export * from './components/card/ds-kpi-card.component';
export * from './components/alert/ds-alert.component';
export * from './components/modal/ds-modal.component';
export * from './components/form/ds-input.component';
export * from './components/form/ds-select.component';
export * from './components/form/ds-toggle.component';
export * from './components/navigation/ds-tabs.component';
export * from './components/navigation/ds-breadcrumb.component';
export * from './components/navigation/ds-pagination.component';
export * from './components/advisor/advisor-drawer.component';`}
                </pre>
              </div>

              {/* Instructions on how to use in Angular */}
              <div className="p-5 rounded-2xl bg-[var(--ds-surface-muted)] border border-[var(--ds-border-default)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0f2a43]">
                    ¿Cómo integrar la biblioteca en tu proyecto Angular?
                  </h4>
                  <p className="text-xs text-[#6b7280] mt-0.5">
                    Copia la carpeta <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[#084c61]">src/angular-design-system</code> en tu app o librería Angular e importa los componentes directamente en el array <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[#084c61]">imports: [...]</code> de cualquier componente Standalone.
                  </p>
                </div>
                <DsButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedAngularComp("public-api");
                  }}
                >
                  Ver Public API
                </DsButton>
              </div>
            </div>
          )}
        </div>

        {/* Showcase Footer */}
        <div className="px-6 py-3.5 border-t border-[var(--ds-border-default)] bg-[var(--ds-surface-muted)]/60 flex items-center justify-between text-xs text-[#6b7280]">
          <span>© 2026 InvesNetwork Design System v1.0</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[#084c61] font-bold">#084C61 (Primary)</span>
            <span className="font-mono text-[#c9a050] font-bold">#C9A050 (Accent)</span>
            <DsButton size="sm" variant="outline" onClick={onClose}>
              Cerrar Galería
            </DsButton>
          </div>
        </div>
      </div>

      {/* Demo Modal Dialog */}
      <DsModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Confirmación de Sindicación Inmobiliaria"
        subtitle="InvesNetwork Capital Pool • Balboa Island"
        footer={
          <>
            <DsButton variant="ghost" size="sm" onClick={() => setIsDemoModalOpen(false)}>
              Cancelar
            </DsButton>
            <DsButton variant="accent" size="sm" onClick={() => setIsDemoModalOpen(false)}>
              Confirmar Inversión
            </DsButton>
          </>
        }
      >
        <div className="space-y-4 text-xs sm:text-sm text-[#0f2a43]">
          <p>
            Estás a punto de comprometer una participación sindicada con custodia bancaria en Estados Unidos.
          </p>
          <div className="p-3 rounded-xl bg-[var(--ds-surface-muted)] border border-[var(--ds-border-default)] space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Propiedad:</span>
              <span className="font-bold">Balboa Island 4-Bed Luxury</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">Ticket Sindicado:</span>
              <span className="font-bold text-[#084c61]">$100,000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6b7280]">TIR Estimada:</span>
              <span className="font-bold text-[#16a34a]">+17.2% Anual</span>
            </div>
          </div>
        </div>
      </DsModal>
    </div>
  );
};
