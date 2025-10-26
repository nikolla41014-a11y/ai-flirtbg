import { useEffect, useRef, useState } from "react";

interface UseScratchCanvasOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  radius?: number; // brush radius in px
  threshold?: number; // 0..1 percent of cleared area to trigger reveal
  onReveal?: () => void;
  resetKey?: any;
}

export const useScratchCanvas = ({
  canvasRef,
  width,
  height,
  radius = 36,
  threshold = 0.6,
  onReveal,
  resetKey,
}: UseScratchCanvasOptions) => {
  const [revealed, setRevealed] = useState(false);
  const isDownRef = useRef(false);
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // HiDPI setup
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Scale drawing to device pixels but keep CSS coords
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Opaque cover layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#cfcfcf");
    gradient.addColorStop(1, "#a6a6a6");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#5a5a5a";
    ctx.font = `bold ${Math.max(16, Math.floor(width / 10))}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch", width / 2, height / 2);

    setRevealed(false);
    isDownRef.current = false;
    lastRef.current = null;

    const handleContext = (e: Event) => e.preventDefault();
    canvas.addEventListener("contextmenu", handleContext);
    return () => canvas.removeEventListener("contextmenu", handleContext);
  }, [canvasRef, width, height, resetKey]);

  const clearLine = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = radius * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  };

  const stamp = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < img.data.length; i += 4) {
      if (img.data[i] === 0) transparent++;
    }
    const total = canvas.width * canvas.height; // device pixels
    const ratio = transparent / total;
    if (ratio >= threshold) {
      setRevealed(true);
      onReveal?.();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDownRef.current = true;
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    lastRef.current = pos;
    stamp(pos.x, pos.y);
    checkReveal();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDownRef.current || revealed) return;
    const rect = (e.currentTarget as HTMLCanvasElement).getBoundingClientRect();
    const next = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const last = lastRef.current ?? next;
    clearLine(last, next);
    lastRef.current = next;
    // avoid heavy check every frame; sample roughly 1 of 5 moves
    if ((e.timeStamp % 5) < 1) checkReveal();
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDownRef.current = false;
    lastRef.current = null;
    try {
      (e.currentTarget as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {}
    checkReveal();
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDownRef.current = false;
    lastRef.current = null;
    try {
      (e.currentTarget as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return {
    revealed,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
};
