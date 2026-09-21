import React, { useState, useRef, useEffect } from "react";
import { Language, DegradedRoomPreset } from "../types";
import { I18N, DEGRADED_ROOM_PRESETS } from "../data/mockData";
import {
  Camera,
  Upload,
  Sparkles,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  Maximize,
} from "lucide-react";

interface StudioRemodelProps {
  language: Language;
}

export const StudioRemodel: React.FC<StudioRemodelProps> = ({ language }) => {
  const t = I18N[language].studio;
  const isEn = language === "en";

  // Ingestion Source State
  const [selectedPreset, setSelectedPreset] = useState<DegradedRoomPreset>(DEGRADED_ROOM_PRESETS[0]);
  const [customBeforeImage, setCustomBeforeImage] = useState<string | null>(null);
  const [customAfterImage, setCustomAfterImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Specs Selectors
  const [style, setStyle] = useState<string>("Contemporáneo Cálido");
  const [scope, setScope] = useState<string>("Open Concept");
  const [material, setMaterial] = useState<string>("Calacatta Marble");
  const [budgetUsd, setBudgetUsd] = useState<number>(selectedPreset.estimatedBudgetUsd);

  // Split Slider state (0 to 100)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  // AI Scanning state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const STYLES = [
    { id: "Contemporáneo Cálido", es: "Contemporáneo Cálido", en: "Warm Contemporary" },
    { id: "Minimalismo Blanco & Oro", es: "Minimalismo Blanco & Oro", en: "White & Gold Minimalism" },
    { id: "Japandi Orgánico", es: "Japandi Orgánico", en: "Organic Japandi" },
  ];

  const SCOPES = [
    { id: "Open Concept", es: "Open Concept (Derribo Tabiquería)", en: "Open Concept (Wall Removal)" },
    { id: "Master Suite Spa", es: "Master Suite Spa", en: "Master Suite Spa Retreat" },
    { id: "Terraza Solárium", es: "Terraza Solárium Bioclimática", en: "Bioclimatic Solarium Terrace" },
  ];

  const MATERIALS = [
    { id: "Calacatta Marble", es: "Mármol Calacatta Bookmatched", en: "Bookmatched Calacatta Marble" },
    { id: "Microcement", es: "Microcemento Continuo Mineral", en: "Continuous Mineral Microcement" },
    { id: "Natural Oak", es: "Roble Francés Natural Fumé", en: "Smoked Natural French Oak" },
  ];

  // Active images to show
  const activeBefore = customBeforeImage || selectedPreset.beforeImage;
  const activeAfter = customAfterImage || selectedPreset.afterImage;

  // Handle Drag / Split Slider
  const handleSplitMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDraggingSlider(true);
  const handleMouseUp = () => setIsDraggingSlider(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSlider) {
      handleSplitMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      handleSplitMove(e.touches[0].clientX);
    }
  };

  // Webcam handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera access denied or unavailable", err);
      alert(isEn ? "Could not access webcam. Please check permissions." : "No se pudo acceder a la cámara. Revisa los permisos.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setCustomBeforeImage(dataUrl);
      // Generate immediate luxury proposal placeholder
      setCustomAfterImage(selectedPreset.afterImage);
      stopCamera();
      triggerAiScan();
    }
  };

  // File Upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setCustomBeforeImage(result);
      setCustomAfterImage(selectedPreset.afterImage);
      triggerAiScan();
    };
    reader.readAsDataURL(file);
  };

  // Trigger AI Neural Scan & API analysis
  const triggerAiScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/analyze-remodel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: customBeforeImage ? "Custom Uploaded Room" : selectedPreset.name,
          style,
          scope,
          budget: budgetUsd,
          language,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data.analysis);
      }
    } catch (err) {
      console.error("AI remodel scan error:", err);
    } finally {
      setTimeout(() => {
        setIsScanning(false);
      }, 1400);
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <section id="studio" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
        <span
          id="studio-eyebrow"
          className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-widest uppercase bg-[#C5A059]/20 text-[#06242C] border border-[#C5A059] inline-block mb-3"
        >
          {t.eyebrow}
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#092B34] tracking-tight leading-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base lg:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Main Studio Interactive Container - Expanded Canvas */}
      <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#C5A059] p-6 sm:p-8 lg:p-10 cream-card-shadow space-y-8">
        {/* Multi-Source Ingestion Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-5 rounded-2xl border border-[#DFC07C]/60 shadow-sm">
          {/* Preset Buttons */}
          <div className="md:col-span-6 space-y-2">
            <span className="text-xs font-extrabold text-[#092B34] uppercase tracking-wider block">
              {t.presetsLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {DEGRADED_ROOM_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCustomBeforeImage(null);
                    setCustomAfterImage(null);
                    setBudgetUsd(preset.estimatedBudgetUsd);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    !customBeforeImage && selectedPreset.id === preset.id
                      ? "bg-[#0B424C] text-white border-[#C5A059] shadow-md"
                      : "bg-white text-stone-700 border-stone-300 hover:border-[#C5A059]"
                  }`}
                >
                  {preset.name.split("•")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Trigger & Upload Dropzone */}
          <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-3">
            {/* Live Camera Trigger */}
            {!isCameraActive ? (
              <button
                id="trigger-camera-btn"
                onClick={startCamera}
                className="px-4 py-2.5 rounded-xl bg-[#0B424C] text-white font-bold text-xs sm:text-sm border border-[#C5A059]/50 hover:bg-[#06242C] transition-all flex items-center space-x-2 shadow-sm"
              >
                <Camera className="w-4 h-4 text-[#DFC07C]" />
                <span>{t.liveCamera}</span>
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="px-4 py-2.5 rounded-xl bg-rose-700 text-white font-bold text-xs sm:text-sm transition-all"
              >
                {t.stopCamera}
              </button>
            )}

            {/* File Upload Trigger */}
            <label
              id="upload-dropzone-btn"
              className="cursor-pointer px-4 py-2.5 rounded-xl bg-[#C5A059] text-[#06242C] font-extrabold text-xs sm:text-sm shadow-md hover:bg-[#DFC07C] transition-all flex items-center space-x-2"
            >
              <Upload className="w-4 h-4 text-[#06242C]" />
              <span>{isEn ? "Upload Photo" : "Subir Foto"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Live Camera View (When active) */}
        {isCameraActive && (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[420px] mx-auto border-2 border-[#C5A059] flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <div className="absolute bottom-4 flex items-center space-x-3">
              <button
                onClick={captureCameraPhoto}
                className="px-6 py-3 rounded-full bg-[#C5A059] text-[#06242C] font-black text-sm shadow-xl hover:scale-105 transition-transform flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>{t.takePhoto}</span>
              </button>
            </div>
          </div>
        )}

        {/* Specs Selectors: Architectural Styles, Scope, Materials, Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
          {/* Architectural Styles */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              {t.styleLabel}
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-stone-300 font-semibold text-xs sm:text-sm text-[#092B34] focus:border-[#C5A059] focus:outline-none"
            >
              {STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {isEn ? s.en : s.es}
                </option>
              ))}
            </select>
          </div>

          {/* Scope */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              {t.scopeLabel}
            </label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-stone-300 font-semibold text-xs sm:text-sm text-[#092B34] focus:border-[#C5A059] focus:outline-none"
            >
              {SCOPES.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {isEn ? sc.en : sc.es}
                </option>
              ))}
            </select>
          </div>

          {/* Materials */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              {t.materialsLabel}
            </label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-stone-300 font-semibold text-xs sm:text-sm text-[#092B34] focus:border-[#C5A059] focus:outline-none"
            >
              {MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {isEn ? m.en : m.es}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-700 uppercase">{t.budgetLabel}</span>
              <span className="font-mono font-extrabold text-[#0B424C]">${budgetUsd.toLocaleString("en-US")}</span>
            </div>
            <input
              type="range"
              min={30000}
              max={250000}
              step={5000}
              value={budgetUsd}
              onChange={(e) => setBudgetUsd(Number(e.target.value))}
              className="w-full accent-[#C5A059] cursor-pointer h-2 bg-stone-200 rounded-lg"
            />
            <span className="text-[10px] text-stone-500 block">
              Llave en mano garantizado
            </span>
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center">
          <button
            id="studio-generate-scan-btn"
            onClick={triggerAiScan}
            disabled={isScanning}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0B424C] to-[#06242C] text-white font-extrabold text-sm sm:text-base border border-[#C5A059] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          >
            {isScanning ? (
              <RefreshCw className="w-5 h-5 text-[#DFC07C] animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-[#DFC07C]" />
            )}
            <span>{isScanning ? t.scanning : t.btnGenerate}</span>
          </button>
        </div>

        {/* Neural Render & Split Slider Container - Generous Architectural Scale */}
        <div
          ref={sliderContainerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[520px] sm:h-[640px] lg:h-[740px] xl:h-[820px] rounded-3xl overflow-hidden border-2 border-[#C5A059] select-none shadow-2xl cursor-ew-resize"
        >
          {/* Background Image: AFTER (AI Remodel Proposal) */}
          <img
            src={activeAfter}
            alt="AI Luxury Remodel Proposal"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Foreground Image: BEFORE (Current degraded condition) clipped by slider */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={activeBefore}
              alt="Current condition"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : "100%",
                maxWidth: "none",
              }}
            />

            {/* Before Label */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#06242C]/85 border border-stone-500/50 backdrop-blur-md text-white text-xs font-extrabold tracking-wider shadow-lg">
              {t.before}
            </div>
          </div>

          {/* After Label */}
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-[#C5A059] text-[#06242C] font-extrabold text-xs tracking-wider shadow-xl">
            {t.after}
          </div>

          {/* Draggable Divider Line & Golden Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1.5 bg-[#C5A059] pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              onMouseDown={handleMouseDown}
              className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] shadow-[0_0_25px_rgba(197,160,89,0.8)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
            >
              <div className="flex items-center space-x-1 text-[#0B424C]">
                <span className="text-xs font-black">◀</span>
                <span className="text-xs font-black">▶</span>
              </div>
            </div>
          </div>

          {/* AI Neural Scan overlay animation during scanning */}
          {isScanning && (
            <div className="absolute inset-0 z-30 pointer-events-none bg-[#0B424C]/25 backdrop-blur-[2px] flex flex-col items-center justify-center">
              <div className="w-full h-1.5 bg-[#DFC07C] shadow-[0_0_25px_#DFC07C] animate-pulse" />
              <div className="px-6 py-3 rounded-full bg-[#06242C]/90 border border-[#C5A059] text-[#DFC07C] font-mono text-xs sm:text-sm mt-4 shadow-xl">
                NEURAL MESH CALIBRATION • BIM RECONSTRUCTION
              </div>
            </div>
          )}

          {/* Bottom Badges: Passivhaus stamp & Equity gains */}
          <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            {/* Passivhaus Certification Stamp */}
            <div className="pointer-events-auto px-4 py-2.5 rounded-xl bg-[#FAF7F2]/95 border-2 border-[#C5A059] shadow-xl backdrop-blur-md flex items-center space-x-2.5">
              <Award className="w-5 h-5 text-[#C5A059] shrink-0" />
              <div>
                <span className="text-[10px] font-extrabold text-[#0B424C] block uppercase tracking-wider">
                  {t.passivhausStamp}
                </span>
                <span className="text-[11px] font-bold text-stone-700">
                  Consumo: 7.8 kWh/m²a • Estanqueidad n50 ≤ 0.6 h⁻¹
                </span>
              </div>
            </div>

            {/* Equity Gain Badge (+45%) */}
            <div className="pointer-events-auto px-4 py-2.5 rounded-xl bg-[#06242C]/95 border border-[#C5A059] shadow-xl backdrop-blur-md flex items-center space-x-2.5 text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-[#DFC07C] block uppercase font-bold">
                  {t.equityGainBadge}
                </span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  {selectedPreset.projectedGain} (+${Math.round(budgetUsd * 1.85).toLocaleString("en-US")} USD)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Space Selector Thumbnail Strip under Photo */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DFC07C]/60 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-[#06242C] uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>{isEn ? "Compare Spaces & Architectural Transformations:" : "Explorar Espacios y Transformaciones Arquitectónicas:"}</span>
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              {isEn ? "Click any space to load high-resolution comparison" : "Haz clic en cualquier espacio para cargar la comparación"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DEGRADED_ROOM_PRESETS.map((preset) => {
              const isSelected = !customBeforeImage && selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCustomBeforeImage(null);
                    setCustomAfterImage(null);
                    setBudgetUsd(preset.estimatedBudgetUsd);
                  }}
                  className={`flex items-center space-x-3 p-3 rounded-xl border transition-all text-left ${
                    isSelected
                      ? "bg-[#FAF6EE] border-[#C5A059] ring-2 ring-[#C5A059]/50 shadow-md"
                      : "bg-white border-stone-200 hover:border-[#C5A059]/60 hover:bg-stone-50"
                  }`}
                >
                  <img
                    src={preset.afterImage}
                    alt={preset.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded-lg object-cover border border-stone-200 shrink-0 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isSelected ? "text-[#0B424C]" : "text-stone-800"}`}>
                      {preset.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono font-semibold">
                      {preset.projectedGain} • Est. ${preset.estimatedBudgetUsd.toLocaleString("en-US")}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Structural Insights Panel */}
        {aiAnalysis && (
          <div className="p-5 rounded-2xl bg-white border border-[#C5A059]/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <h3 className="font-display font-bold text-base text-[#092B34]">
                  {aiAnalysis.title || "Auditoría Arquitectónica Gemini AI"}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {aiAnalysis.estimatedRoi} ROI Proyectado
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="font-bold text-[#0B424C] block mb-1">
                  {isEn ? "Interventions" : "Intervenciones Estructurales"}
                </span>
                <ul className="space-y-1 text-stone-600">
                  {aiAnalysis.structuralRecommendations?.map((rec: string, i: number) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#C5A059]">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="font-bold text-[#0B424C] block mb-1">
                  {isEn ? "Material Specifications" : "Especificaciones de Materiales"}
                </span>
                <ul className="space-y-1 text-stone-600">
                  {aiAnalysis.materialsSpec?.map((mat: string, i: number) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#C5A059]">✓</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="font-bold text-[#0B424C] block mb-1">
                  {isEn ? "Bankability & Timeline" : "Financiabilidad Institucional"}
                </span>
                <p className="text-stone-700 font-semibold">{aiAnalysis.bankabilityScore}</p>
                <p className="text-stone-500 mt-1">
                  {isEn ? "Execution Window:" : "Plazo estimado de obra:"} {aiAnalysis.projectedTimelineMonths} {isEn ? "months" : "meses"}
                </p>
                <p className="text-emerald-700 font-bold mt-1">
                  Passivhaus: {aiAnalysis.passivhausScore}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Guarantee text */}
        <p className="text-center text-xs text-stone-600 flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span>{t.guaranteeText}</span>
        </p>
      </div>
    </section>
  );
};
