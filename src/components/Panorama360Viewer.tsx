import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { PropertyListing, SpatialHotspot, Language } from "../types";
import { I18N } from "../data/mockData";
import { isWebGLAvailable } from "../utils/webgl";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Award,
  Sparkles,
  MapPin,
  Move,
  RotateCw,
} from "lucide-react";

interface Panorama360ViewerProps {
  property: PropertyListing;
  language: Language;
  onClose: () => void;
}

export const Panorama360Viewer: React.FC<Panorama360ViewerProps> = ({
  property,
  language,
  onClose,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [webglAvailable, setWebglAvailable] = useState<boolean>(() => isWebGLAvailable());
  const [selectedHotspot, setSelectedHotspot] = useState<SpatialHotspot | null>(
    property.hotspots[0] || null
  );
  const [fov, setFov] = useState(75);

  // 2.5D fallback pan and zoom state
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1.15);
  const isDragging2D = useRef<boolean>(false);
  const startDragPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPan = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const t = I18N[language].marketplace;
  const isEn = language === "en";

  // WebGL 360 Scene setup
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglAvailable(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    // 3. Renderer with safe context instantiation
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn("WebGL initialization failed for 360 viewer, switching to interactive 2.5D panoramic viewport:", err);
      setWebglAvailable(false);
      return;
    }

    // 4. Sphere geometry for 360 projection (inverted normals to view from inside)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      property.panoramaImage || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"
    );
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // 6. Interactive Drag / Look around logic (lat / lon)
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    const onPointerDown = (event: MouseEvent) => {
      isUserInteracting = true;
      onPointerDownMouseX = event.clientX;
      onPointerDownMouseY = event.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
    };

    const onPointerMove = (event: MouseEvent) => {
      if (!isUserInteracting) return;
      lon = (onPointerDownMouseX - event.clientX) * 0.15 + onPointerDownLon;
      lat = (event.clientY - onPointerDownMouseY) * 0.15 + onPointerDownLat;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
    };

    // Touch support
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isUserInteracting = true;
        onPointerDownMouseX = event.touches[0].clientX;
        onPointerDownMouseY = event.touches[0].clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isUserInteracting && event.touches.length === 1) {
        lon = (onPointerDownMouseX - event.touches[0].clientX) * 0.18 + onPointerDownLon;
        lat = (event.touches[0].clientY - onPointerDownMouseY) * 0.18 + onPointerDownLat;
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    domEl.addEventListener("touchstart", onTouchStart);
    domEl.addEventListener("touchmove", onTouchMove);
    domEl.addEventListener("touchend", onPointerUp);

    // ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && camera) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isUserInteracting) {
        lon += 0.04;
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      domEl.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      domEl.removeEventListener("touchstart", onTouchStart);
      domEl.removeEventListener("touchmove", onTouchMove);
      domEl.removeEventListener("touchend", onPointerUp);
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [property.id]);

  // Update FOV dynamically without recreating the WebGL context
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.fov = fov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [fov]);

  // Handlers for 2.5D panoramic pan & drag fallback
  const handleMouseDown2D = (e: React.MouseEvent) => {
    isDragging2D.current = true;
    startDragPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove2D = (e: React.MouseEvent) => {
    if (!isDragging2D.current) return;
    const deltaX = (e.clientX - startDragPos.current.x) * 0.4;
    const deltaY = (e.clientY - startDragPos.current.y) * 0.4;
    startDragPos.current = { x: e.clientX, y: e.clientY };
    setPanX((prev) => Math.max(-250, Math.min(250, prev + deltaX)));
    setPanY((prev) => Math.max(-80, Math.min(80, prev + deltaY)));
  };

  const handleMouseUp2D = () => {
    isDragging2D.current = false;
  };

  const handleTouchStart2D = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging2D.current = true;
      startDragPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove2D = (e: React.TouchEvent) => {
    if (!isDragging2D.current || e.touches.length !== 1) return;
    const deltaX = (e.touches[0].clientX - startDragPos.current.x) * 0.4;
    const deltaY = (e.touches[0].clientY - startDragPos.current.y) * 0.4;
    startDragPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setPanX((prev) => Math.max(-250, Math.min(250, prev + deltaX)));
    setPanY((prev) => Math.max(-80, Math.min(80, prev + deltaY)));
  };

  const handleZoom = (delta: number) => {
    if (webglAvailable) {
      setFov((f) => Math.max(35, Math.min(95, f + delta)));
    } else {
      setZoomScale((z) => Math.max(1.0, Math.min(2.0, z - delta * 0.015)));
    }
  };

  return (
    <div
      id="panorama-360-modal"
      className="fixed inset-0 z-50 bg-[#06242C]/95 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-6xl h-full max-h-[92vh] bg-[#0C323D] rounded-3xl border-2 border-[#C5A059] shadow-2xl overflow-hidden flex flex-col">
        {/* Top Bar with Explicit Return Button */}
        <div className="h-16 px-4 sm:px-6 bg-[#06242C] border-b border-[#C5A059]/40 flex items-center justify-between z-20">
          {/* Explicit Mandated Return Button: "Regresar al Menú de Propiedades" */}
          <button
            id="return-to-properties-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FAF7F2] text-[#06242C] font-extrabold text-xs sm:text-sm border-2 border-[#C5A059] shadow-md hover:bg-[#C5A059] hover:text-[#06242C] active:scale-95 transition-all flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4 text-[#06242C]" />
            <span>{t.returnToProperties}</span>
          </button>

          {/* Property Title and Coordinates */}
          <div className="hidden md:flex items-center space-x-3 text-white">
            <span className="font-display font-bold text-sm tracking-wide">
              {isEn ? property.title.en : property.title.es}
            </span>
            <span className="text-stone-400">•</span>
            <span className="flex items-center space-x-1 text-xs text-[#DFC07C] font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>
                {property.city}, {property.state} ({property.coordinates.lat.toFixed(4)}° N, {property.coordinates.lng.toFixed(4)}° W)
              </span>
            </span>
          </div>

          {/* Badges */}
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#C5A059]/20 text-[#DFC07C] border border-[#C5A059]">
              {webglAvailable ? "360° AI SPATIAL TOUR" : "360° SPATIAL TOUR • 2.5D"}
            </span>
          </div>
        </div>

        {/* Middle: 360 Viewer Canvas or Interactive 2.5D Viewport */}
        <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden">
          {webglAvailable ? (
            /* 360 Three.js Canvas Container */
            <div ref={mountRef} className="w-full h-full" />
          ) : (
            /* Resilient Interactive 2.5D Panoramic Pan & Drag Viewport */
            <div
              onMouseDown={handleMouseDown2D}
              onMouseMove={handleMouseMove2D}
              onMouseUp={handleMouseUp2D}
              onMouseLeave={handleMouseUp2D}
              onTouchStart={handleTouchStart2D}
              onTouchMove={handleTouchMove2D}
              onTouchEnd={handleMouseUp2D}
              className="relative w-full h-full overflow-hidden select-none"
            >
              <div
                style={{
                  transform: `translate3d(${panX}px, ${panY}px, 0) scale(${zoomScale})`,
                  transition: isDragging2D.current ? "none" : "transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
                }}
                className="absolute inset-[-15%] flex items-center justify-center pointer-events-none"
              >
                <img
                  src={property.panoramaImage || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80"}
                  alt={isEn ? property.title.en : property.title.es}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Drag instruction overlay hint */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center space-x-2 px-3 py-1 rounded-lg bg-[#06242C]/80 border border-[#C5A059]/40 backdrop-blur-md text-[11px] text-[#DFC07C] font-semibold">
                <Move className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{isEn ? "Click & drag to explore panoramic space" : "Arrastra para explorar el espacio panorámico"}</span>
              </div>
            </div>
          )}

          {/* Hotspot Floating Buttons */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {property.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <button
                  onClick={() => setSelectedHotspot(hotspot)}
                  className={`group relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    selectedHotspot?.id === hotspot.id
                      ? "bg-[#C5A059] border-white scale-125 shadow-[0_0_20px_#C5A059]"
                      : "bg-[#06242C]/90 border-[#C5A059] shadow-lg hover:scale-110"
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-6 whitespace-nowrap px-2 py-0.5 rounded bg-[#06242C]/90 text-[10px] font-bold text-[#DFC07C] border border-[#C5A059]/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isEn ? hotspot.title.en : hotspot.title.es}
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Viewer Controls: Zoom In, Zoom Out, Reset */}
          <div className="absolute right-4 bottom-4 z-20 flex flex-col space-y-2 bg-[#06242C]/90 border border-[#C5A059]/40 rounded-xl p-1.5 backdrop-blur-md">
            <button
              onClick={() => handleZoom(-10)}
              title="Zoom In"
              className="p-2 text-stone-200 hover:text-[#DFC07C] hover:bg-white/10 rounded-lg transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleZoom(10)}
              title="Zoom Out"
              className="p-2 text-stone-200 hover:text-[#DFC07C] hover:bg-white/10 rounded-lg transition-colors"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>

          {/* Active Hotspot HUD Detail Card */}
          {selectedHotspot && (
            <div
              id="hotspot-detail-card"
              className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 z-20 max-w-sm sm:max-w-md bg-[#06242C]/95 border-2 border-[#C5A059] rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl text-white space-y-2.5 animate-in slide-in-from-bottom duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#DFC07C] flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>AI SPATIAL UPGRADE</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-xs font-mono font-bold">
                  {selectedHotspot.roiContribution} ROI Impact
                </span>
              </div>

              <h4 className="font-display font-bold text-base text-white">
                {isEn ? selectedHotspot.title.en : selectedHotspot.title.es}
              </h4>

              <p className="text-xs text-stone-300 leading-relaxed">
                {isEn ? selectedHotspot.description.en : selectedHotspot.description.es}
              </p>

              <div className="pt-2 border-t border-[#C5A059]/30 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-400 block font-semibold">Material Spec</span>
                  <span className="font-semibold text-stone-200">
                    {isEn ? selectedHotspot.materialUpgrade.en : selectedHotspot.materialUpgrade.es}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block font-semibold">Intervention Cost</span>
                  <span className="font-mono font-bold text-[#DFC07C]">
                    ${selectedHotspot.costUsd.toLocaleString("en-US")} USD
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
