import { useEffect, useRef, useState } from "react";

interface UseScratchCanvasOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  radius?: number;
  threshold?: number;
  onReveal?: () => void;
  resetKey?: any;
  coverImage?: string;
  scratchNumber?: number;
}

export const useScratchCanvas = ({
  canvasRef,
  width,
  height,
  radius = 36,
  threshold = 0.6,
  onReveal,
  resetKey,
  coverImage,
  scratchNumber,
}: UseScratchCanvasOptions) => {
  const [revealed, setRevealed] = useState(false);
  const isDownRef = useRef(false);
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle DPI for crisp drawing
    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (coverImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };
      img.src = coverImage;
    } else {
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
      gradient.addColorStop(0, "#b8b8b8");
      gradient.addColorStop(1, "#8a8a8a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (scratchNumber !== undefined) {
        ctx.fillStyle = "#5a5a5a";
        ctx.font = `bold ${Math.max(40, Math.floor(width / 6))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(scratchNumber.toString(), width / 2, height / 2);
      } else {
        ctx.fillStyle = "#5a5a5a";
        ctx.font = `bold ${Math.max(16, Math.floor(width / 10))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Scratch", width / 2, height / 2);
      }
    }

    setRevealed(false);
    isDownRef.current = false;
  }, [canvasRef, width, height, resetKey, coverImage, scratchNumber]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const x = (clientX - rect.left);
    const y = (clientY - rect.top);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Check cleared area
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < img.data.length; i += 4) {
      if (img.data[i] === 0) transparent++;
    }
    const totalPixels = (canvas.width * canvas.height) / (dprRef.current * dprRef.current);
    const clearedRatio = transparent / (canvas.width * canvas.height) ;
    // Adjust ratio back to CSS pixels
    const adjustedRatio = clearedRatio; // good enough for our estimate

    if (adjustedRatio >= threshold) {
      setRevealed(true);
      onReveal?.();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDownRef.current = true;
    (e.currentTarget as HTMLCanvasElement).setPointerCapture(e.pointerId);
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDownRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDownRef.current = false;
    try {
      (e.currentTarget as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return {
    revealed,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
};
