import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface ScratchCardProps {
  id: number;
  image?: string;
  onRevealed?: (id: number) => void;
  resetTrigger?: number;
}

export const ScratchCard = ({ id, image, onRevealed, resetTrigger }: ScratchCardProps) => {
  const smallCanvasRef = useRef<HTMLCanvasElement>(null);
  const largeCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [canScratch, setCanScratch] = useState(false);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const scratchedPixelsRef = useRef(0);
  const totalPixelsRef = useRef(0);

  const initCanvas = (target: HTMLCanvasElement | null, size = 120) => {
    const canvas = target;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

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
    const fontSize = size === 420 ? 48 : 14;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratchy!", size / 2, size / 2);

    // Calculate total pixels for the circle
    const imageData = ctx.getImageData(0, 0, size, size);
    totalPixelsRef.current = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] > 0) {
        totalPixelsRef.current++;
      }
    }
    scratchedPixelsRef.current = 0;
  };

  useEffect(() => {
    initCanvas(smallCanvasRef.current, 120);
    setIsZoomed(false);
    setCanScratch(false);
    setIsRevealed(false);
    setIsScratching(false);
  }, [resetTrigger]);

  useEffect(() => {
    if (isZoomed && largeCanvasRef.current) {
      // Initialize large canvas when zoomed
      const timer = setTimeout(() => {
        initCanvas(largeCanvasRef.current, 420);
        // Enable scratching after canvas is ready
        setTimeout(() => {
          setCanScratch(true);
        }, 100);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isZoomed]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isRevealed || isZoomed) return;
    
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCardRect(rect);
      setIsZoomed(true);
      setCanScratch(false);
    }
  };

  const handleBackdropClick = () => {
    setIsZoomed(false);
    setCanScratch(false);
    setIsScratching(false);
    // Reinitialize canvas at normal size after transition
    setTimeout(() => {
      initCanvas(smallCanvasRef.current, 120);
    }, 300);
  };

  const scratch = (x: number, y: number) => {
    const canvas = largeCanvasRef.current;
    if (!canvas || isRevealed || !canScratch) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    const scratchRadius = 40;
    ctx.arc(canvasX, canvasY, scratchRadius, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) {
        transparentPixels++;
      }
    }

    const scratchedPercentage = (transparentPixels / totalPixelsRef.current) * 100;

    if (scratchedPercentage >= 65 && !isRevealed) {
      setIsRevealed(true);
      onRevealed?.(id);
      setCanScratch(false);
      // Close zoom view after revealing
      setTimeout(() => {
        setIsZoomed(false);
      }, 1500);
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

  const normalCard = (
    <div 
      ref={containerRef}
      className="relative w-[120px] h-[120px] mx-auto cursor-pointer"
      onClick={handleCardClick}
    >
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
        ref={smallCanvasRef}
        className={cn(
          "absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300",
          isRevealed ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );

  const zoomedCard = isZoomed && cardRect && createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className="relative"
        style={{
          width: '420px',
          height: '420px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
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
            <span className="text-[140px] font-bold">{id}</span>
          )}
        </div>
        <canvas
          ref={largeCanvasRef}
          className={cn(
            "absolute inset-0 rounded-full transition-opacity duration-300",
            isRevealed ? "opacity-0 pointer-events-none" : "opacity-100",
            canScratch ? "cursor-pointer hover:scale-[1.02]" : "cursor-not-allowed"
          )}
          width={420}
          height={420}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        />
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {normalCard}
      {zoomedCard}
    </>
  );
};
