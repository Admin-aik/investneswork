import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Eye, Layers, RotateCw, Compass, Sun, Sunset, Sparkles, Building2 } from "lucide-react";
import { isWebGLAvailable } from "../utils/webgl";

interface ThreePenthouseCanvasProps {
  onExploreClick?: () => void;
  language: "es" | "en";
}

export const ThreePenthouseCanvas: React.FC<ThreePenthouseCanvasProps> = ({
  onExploreClick,
  language,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(() => isWebGLAvailable());
  const [wireframeMode, setWireframeMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFloor, setActiveFloor] = useState<number>(3);
  const [lightingMode, setLightingMode] = useState<"day" | "sunset">("day");

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const penthouseGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  const isEn = language === "en";

  useEffect(() => {
    // If WebGL is not detected as available, do not attempt to construct WebGLRenderer
    if (!isWebGLAvailable()) {
      setWebglAvailable(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(14, 11, 16);
    camera.lookAt(0, 2, 0);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing - safely guarded with try...catch
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (error) {
      console.warn("Could not create WebGL context in this environment. Falling back to interactive 2.5D BIM Digital Twin:", error);
      setWebglAvailable(false);
      return;
    }

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff0d0, 2.5);
    sunLight.position.set(20, 30, 15);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const blueFillLight = new THREE.PointLight(0x0b424c, 3.5, 50);
    blueFillLight.position.set(-15, 12, -10);
    scene.add(blueFillLight);

    const goldAccentLight = new THREE.PointLight(0xdfc07c, 4.0, 40);
    goldAccentLight.position.set(8, 6, 8);
    scene.add(goldAccentLight);

    // 5. Build Architectural Sculptural Penthouse
    const penthouseGroup = new THREE.Group();
    penthouseGroupRef.current = penthouseGroup;
    scene.add(penthouseGroup);

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({
      color: 0x243238,
      roughness: 0.35,
      metalness: 0.2,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.2,
      metalness: 0.85,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x7ed0e0,
      transparent: true,
      opacity: 0.45,
      roughness: 0.05,
      transmission: 0.85,
      ior: 1.5,
    });
    const warmInteriorMat = new THREE.MeshStandardMaterial({
      color: 0xffd99a,
      roughness: 0.5,
      emissive: 0xdfc07c,
      emissiveIntensity: 0.35,
    });
    const poolMat = new THREE.MeshPhysicalMaterial({
      color: 0x00bcd4,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      metalness: 0.3,
    });

    materialsRef.current = [concreteMat, goldTrimMat, glassMat, warmInteriorMat, poolMat];

    // Podium / Base
    const podiumGeo = new THREE.BoxGeometry(16, 1.2, 16);
    const podium = new THREE.Mesh(podiumGeo, concreteMat);
    podium.position.y = -0.6;
    podium.receiveShadow = true;
    penthouseGroup.add(podium);

    // Golden grid platform trim
    const gridHelper = new THREE.GridHelper(20, 20, 0xc5a059, 0x0b424c);
    gridHelper.position.y = 0.01;
    penthouseGroup.add(gridHelper);

    // Level 1: Main Gallery & Living
    const level1Geo = new THREE.BoxGeometry(12, 3, 10);
    const level1 = new THREE.Mesh(level1Geo, concreteMat);
    level1.position.set(-1, 1.5, -1);
    level1.castShadow = true;
    level1.receiveShadow = true;
    penthouseGroup.add(level1);

    // Level 1 Glass Facade
    const glass1Geo = new THREE.BoxGeometry(11.8, 2.6, 0.2);
    const glass1 = new THREE.Mesh(glass1Geo, glassMat);
    glass1.position.set(-1, 1.5, 4.05);
    penthouseGroup.add(glass1);

    // Level 2: Cantilevered Master Suite with Gold Structural Frame
    const level2Geo = new THREE.BoxGeometry(10, 2.8, 12);
    const level2 = new THREE.Mesh(level2Geo, concreteMat);
    level2.position.set(2, 4.4, 1);
    level2.castShadow = true;
    level2.receiveShadow = true;
    penthouseGroup.add(level2);

    // Gold Cantilever Outriggers
    const outriggerGeo = new THREE.BoxGeometry(0.3, 3, 13);
    const outriggerL = new THREE.Mesh(outriggerGeo, goldTrimMat);
    outriggerL.position.set(7.1, 4.4, 1);
    const outriggerR = new THREE.Mesh(outriggerGeo, goldTrimMat);
    outriggerR.position.set(-3.1, 4.4, 1);
    penthouseGroup.add(outriggerL, outriggerR);

    // Level 3: Rooftop Penthouse & Solarium with Infinity Pool
    const level3Geo = new THREE.BoxGeometry(7, 2.4, 7);
    const level3 = new THREE.Mesh(level3Geo, warmInteriorMat);
    level3.position.set(1.5, 7.0, -1);
    penthouseGroup.add(level3);

    // Infinity Rooftop Pool
    const poolGeo = new THREE.BoxGeometry(4.5, 0.6, 3.5);
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.position.set(-2.5, 5.9, 3.5);
    penthouseGroup.add(pool);

    const poolBorderGeo = new THREE.BoxGeometry(4.8, 0.7, 0.2);
    const poolBorder = new THREE.Mesh(poolBorderGeo, goldTrimMat);
    poolBorder.position.set(-2.5, 5.9, 5.3);
    penthouseGroup.add(poolBorder);

    // Architectural Slatted Brise-Soleil (Champagne Gold)
    for (let i = -3; i <= 3; i++) {
      const slatGeo = new THREE.BoxGeometry(0.15, 2.4, 3);
      const slat = new THREE.Mesh(slatGeo, goldTrimMat);
      slat.position.set(5.1, 7.0, i * 0.8 - 1);
      penthouseGroup.add(slat);
    }

    // Interactive Drag / Orbit logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !penthouseGroupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      penthouseGroupRef.current.rotation.y += deltaX * 0.008;
      camera.position.y = Math.max(4, Math.min(24, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 2, 0);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    let prevTouchX = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevTouchX = e.touches[0].clientX;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1 || !penthouseGroupRef.current) return;
      const deltaX = e.touches[0].clientX - prevTouchX;
      penthouseGroupRef.current.rotation.y += deltaX * 0.01;
      prevTouchX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domEl.addEventListener("touchstart", onTouchStart);
    domEl.addEventListener("touchmove", onTouchMove);
    domEl.addEventListener("touchend", onTouchEnd);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate && penthouseGroupRef.current && !isDragging) {
        penthouseGroupRef.current.rotation.y += 0.0035;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      domEl.removeEventListener("touchmove", onTouchMove);
      domEl.removeEventListener("touchend", onTouchEnd);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Toggle wireframe mode in 3D WebGL mode
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if ("wireframe" in mat) {
        (mat as any).wireframe = wireframeMode;
      }
    });
  }, [wireframeMode]);

  // Fallback 2.5D Digital Twin floor data
  const floorLevels = [
    {
      level: 1,
      title: isEn ? "L1 • Grand Living & Gallery" : "N1 • Galería y Gran Salón",
      desc: isEn ? "8.5m double-height clearance, Calacatta floor" : "8.5m altura libre, pavimento de Calacatta",
      metric: "+18.5% ROI",
    },
    {
      level: 2,
      title: isEn ? "L2 • Cantilevered Master Suite" : "N2 • Master Suite en Vuelo",
      desc: isEn ? "Acoustic Passivhaus triple-glazed envelope" : "Envolvente Passivhaus con triple acristalamiento",
      metric: "+25.3% ROI",
    },
    {
      level: 3,
      title: isEn ? "L3 • Sky Solarium & Infinity Pool" : "N3 • Sky Solárium & Piscina",
      desc: isEn ? "Cantilevered glass swimming pool & teak deck" : "Piscina en voladizo y tarima de teca marina",
      metric: "+43.8% ROI",
    },
  ];

  return (
    <div
      id="hero-3d-penthouse-wrapper"
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-2xl bg-gradient-to-br from-[#06242C] via-[#0B424C] to-[#06242C] border-2 border-[#C5A059]/50 overflow-hidden shadow-[0_20px_50px_rgba(6,36,44,0.4)]"
    >
      {webglAvailable ? (
        /* Native 3D WebGL Canvas */
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Resilient Interactive 2.5D Digital Twin Architectural Viewer */
        <div className="relative w-full h-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none">
          {/* Background Architectural Asset with dynamic lighting */}
          <div className="absolute inset-0 z-0">
            <img
              src={
                lightingMode === "sunset"
                  ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
                  : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              }
              alt="Digital Twin Architectural Penthouse"
              className={`w-full h-full object-cover transition-all duration-700 ${
                wireframeMode ? "opacity-35 brightness-75 contrast-125 saturate-50" : "opacity-80"
              } ${autoRotate ? "scale-105" : "scale-100"}`}
            />
            {/* Color grading overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06242C] via-[#06242C]/40 to-transparent" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#06242C]/50 to-[#06242C]/80" />

            {/* Futuristic BIM Wireframe grid overlay if wireframe mode is active */}
            {wireframeMode && (
              <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(to_right,#c5a05915_1px,transparent_1px),linear-gradient(to_bottom,#c5a05915_1px,transparent_1px)] bg-[size:28px_28px] animate-pulse">
                {/* SVG Isometric Wireframe Structural Vectors */}
                <svg className="w-full h-full opacity-60 stroke-[#C5A059] fill-none stroke-[1.5]">
                  <polygon points="120,420 540,240 760,340 340,520" />
                  <polygon points="120,320 540,140 760,240 340,420" />
                  <line x1="120" y1="420" x2="120" y2="320" />
                  <line x1="540" y1="240" x2="540" y2="140" />
                  <line x1="760" y1="340" x2="760" y2="240" />
                  <line x1="340" y1="520" x2="340" y2="420" />
                </svg>
              </div>
            )}
          </div>

          {/* Interactive 2.5D Floor Selector Bar */}
          <div className="relative z-10 mt-16 sm:mt-14 max-w-sm sm:max-w-md bg-[#06242C]/85 border border-[#C5A059]/40 rounded-xl p-2.5 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#DFC07C]">
              <span className="flex items-center space-x-1.5 font-bold">
                <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isEn ? "SELECT LEVEL" : "EXPLORAR NIVELES"}</span>
              </span>
              <span className="text-stone-300">{floorLevels[activeFloor - 1].metric}</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {floorLevels.map((fl) => (
                <button
                  key={fl.level}
                  onClick={() => setActiveFloor(fl.level)}
                  className={`px-2 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeFloor === fl.level
                      ? "bg-[#C5A059] text-[#06242C] shadow-md"
                      : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Nivel {fl.level}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-stone-200 line-clamp-1">
              <span className="text-[#DFC07C] font-semibold">{floorLevels[activeFloor - 1].title}: </span>
              {floorLevels[activeFloor - 1].desc}
            </p>
          </div>
        </div>
      )}

      {/* Top HUD Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        {/* Plusvalia Badge */}
        <div
          id="badge-plusvalia"
          className="pointer-events-auto flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] shadow-lg"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs sm:text-sm font-extrabold text-[#0B424C] tracking-wide">
            {isEn ? "Capital Gain +43.8%" : "Plusvalía +43.8%"}
          </span>
        </div>

        {/* Digital Twin Status HUD */}
        <div className="pointer-events-auto flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#06242C]/80 border border-[#C5A059]/40 backdrop-blur-md text-[11px] font-mono text-[#DFC07C]">
          <Compass className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: "12s" }} />
          <span>{webglAvailable ? "BIM LOD 400 • THREE.JS" : "BIM LOD 400 • DIGITAL TWIN"}</span>
        </div>
      </div>

      {/* Floating HUD Nodes / Architectural Callouts */}
      <div className="absolute left-6 bottom-20 pointer-events-none hidden sm:block space-y-2 z-20">
        <div className="px-3 py-1.5 rounded-lg bg-[#06242C]/85 border border-[#C5A059]/40 backdrop-blur-md text-xs text-white max-w-[220px]">
          <span className="text-[#DFC07C] font-bold block">{isEn ? "Cantilevered Suite" : "Suite en Vuelo"}</span>
          <span className="text-stone-300 text-[10px]">
            {isEn ? "Structural steel & French oak deck" : "Acero estructural y tarima de roble"}
          </span>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-[#06242C]/85 border border-[#C5A059]/40 backdrop-blur-md text-xs text-white max-w-[220px]">
          <span className="text-emerald-400 font-bold block">Passivhaus A++</span>
          <span className="text-stone-300 text-[10px]">
            {isEn ? "Triple-pane acoustic envelope" : "Triple cristal con filtro UV dinámico"}
          </span>
        </div>
      </div>

      {/* 3D / 2.5D Control Bar */}
      <div className="absolute top-4 right-4 sm:top-auto sm:bottom-4 sm:right-4 flex items-center space-x-2 pointer-events-auto bg-[#06242C]/90 border border-[#C5A059]/40 rounded-xl p-1.5 backdrop-blur-md z-20">
        {/* Lighting Mode toggle (Day vs Sunset) */}
        <button
          onClick={() => setLightingMode(lightingMode === "day" ? "sunset" : "day")}
          title={lightingMode === "day" ? (isEn ? "Switch to Sunset Warmth" : "Modo Atardecer Dorado") : (isEn ? "Switch to Architectural Day" : "Modo Luz Diurna")}
          className="p-2 rounded-lg text-xs font-semibold text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {lightingMode === "day" ? <Sun className="w-4 h-4 text-[#DFC07C]" /> : <Sunset className="w-4 h-4 text-orange-400" />}
        </button>

        <button
          id="toggle-wireframe-btn"
          onClick={() => setWireframeMode(!wireframeMode)}
          title={isEn ? "Toggle Wireframe Digital Twin" : "Modo Gemelo Digital Wireframe"}
          className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            wireframeMode
              ? "bg-[#C5A059] text-[#06242C]"
              : "text-stone-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="hidden md:inline">{isEn ? "BIM Mesh" : "Malla BIM"}</span>
        </button>

        <button
          id="toggle-autorotate-btn"
          onClick={() => setAutoRotate(!autoRotate)}
          title={isEn ? "Toggle 360 Auto-Rotation" : "Activar/Pausar Giro"}
          className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
            autoRotate
              ? "bg-[#C5A059]/20 text-[#DFC07C] border border-[#C5A059]"
              : "text-stone-300 hover:text-white hover:bg-white/10"
          }`}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
          <span className="hidden md:inline">{autoRotate ? "360°" : "Pausa"}</span>
        </button>
      </div>

      {/* Bottom Main Action Button: Ver Oportunidades 3D */}
      <div className="absolute bottom-4 left-4 right-4 sm:right-auto pointer-events-auto z-20">
        <button
          id="hero-ver-oportunidades-3d-btn"
          onClick={onExploreClick}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFC07C] text-[#06242C] font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(197,160,89,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4 text-[#06242C]" />
          <span>{isEn ? "View 3D Opportunities" : "Ver Oportunidades 3D"}</span>
        </button>
      </div>
    </div>
  );
};
