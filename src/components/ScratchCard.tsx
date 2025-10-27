import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useScratchCanvas } from "@/hooks/useScratchCanvas";
import scratchCover from "@/assets/scratch-card-cover.png";

interface ScratchCardProps {
  id: number;
  image?: string;
}

export const ScratchCard = ({ id, image }: ScratchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const largeCanvasRef = useRef<HTMLCanvasElement>(null);

  const { revealed, onPointerDown, onPointerMove, onPointerUp } = useScratchCanvas({
    canvasRef: largeCanvasRef,
    width: 420,
    height: 420,
    radius: 40,
    threshold: 0.65,
    resetKey: `${id}-${isOpen}`,
    coverImage: scratchCover,
  });

  useEffect(() => {
    if (isOpen && revealed) {
      const t = setTimeout(() => setIsOpen(false), 1200);
      return () => clearTimeout(t);
    }
  }, [isOpen, revealed]);

  const normalCard = (
    <div
      className="relative w-[120px] h-[120px] mx-auto cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <img 
          src={scratchCover} 
          alt="Scratch to reveal" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  const zoomedCard =
    isOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative"
          style={{ width: "420px", height: "420px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900">
            {image && (
              <img src={image} alt={`Position ${id}`} className="w-full h-full object-cover" />
            )}
          </div>

          <canvas
            ref={largeCanvasRef}
            className={cn(
              "absolute inset-0 rounded-lg",
              revealed ? "opacity-0 pointer-events-none transition-opacity duration-300" : "cursor-pointer"
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
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

