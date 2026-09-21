/**
 * WebGL capability detection and safe context creation helpers.
 */

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined" || !window.document) {
    return false;
  }
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl && "getExtension" in (gl as any));
  } catch (e) {
    return false;
  }
}
