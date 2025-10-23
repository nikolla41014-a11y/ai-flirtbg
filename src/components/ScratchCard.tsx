import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScratchCardProps {
  id: number;
  image?: string;
  onRevealed?: (id: number) => void;
  resetTrigger?: number;
}

export const ScratchCard = ({ id, image, onRevealed, resetTrigger }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const scratchedPixelsRef = useRef(0);
  const totalPixelsRef = useRef(0);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const size = 120;
    canvas.width = size;
    canvas.height = size;

    // Draw silver metallic scratch surface
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "#e8e8e8");
    gradient.addColorStop(0.5, "#c0c0c0");
    gradient.addColorStop(1, "#a8a8a8");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Add text
    ctx.fillStyle = "#666";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratchy!", size / 2, size / 2);

    // Calculate total pixels
    const imageData = ctx.getImageData(0, 0, size, size);
    totalPixelsRef.current = imageData.data.filter((_, i) => i % 4 === 3 && imageData.data[i] > 0).length;
    scratchedPixelsRef.current = 0;
    setIsRevealed(false);
  };

  useEffect(() => {
    initCanvas();
  }, [resetTrigger]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparentPixels++;
    }

    const scratchedPercentage = (transparentPixels / totalPixelsRef.current) * 100;

    if (scratchedPercentage >= 70 && !isRevealed) {
      setIsRevealed(true);
      onRevealed?.(id);
    }
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleTouchStart = () => setIsScratching(true);
  const handleTouchEnd = () => setIsScratching(false);
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (isScratching && e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="relative w-[120px] h-[120px] mx-auto">
      <div
        className={cn(
          "absolute inset-0 rounded-full flex items-center justify-center overflow-hidden transition-all duration-300",
          isRevealed ? "scale-110" : ""
        )}
        style={{
          background: image ? "transparent" : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))`,
        }}
      >
        {image ? (
          <img 
            src={image} 
            alt={`Position ${id}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-bold">{id}</span>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 rounded-full cursor-pointer transition-opacity duration-300 hover:shadow-lg active:scale-95",
          isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      />
    </div>
  );
};
