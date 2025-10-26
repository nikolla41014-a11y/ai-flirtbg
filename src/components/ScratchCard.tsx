import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { useScratchCanvas } from "@/hooks/useScratchCanvas";

interface ScratchCardProps {
  id: number;
  image?: string;
  onRevealed?: (id: number) => void;
  resetTrigger?: number;
}

// Fresh, minimal scratch card implementation
export const ScratchCard = ({ id, image, onRevealed, resetTrigger }: ScratchCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const largeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [revealedOnce, setRevealedOnce] = useState(false);

  const { revealed, onPointerDown, onPointerMove, onPointerUp } = useScratchCanvas({
    canvasRef: largeCanvasRef,
    width: 420,
    height: 420,
    radius: 40,
    threshold: 0.65,
    resetKey: `${id}-${resetTrigger ?? 0}-${isOpen}`,
    onReveal: () => {
      setRevealedOnce(true);
      onRevealed?.(id);
    },
  });

  useEffect(() => {
    // Close automatically shortly after reveal
    if (isOpen && revealed) {
      const t = setTimeout(() => setIsOpen(false), 1200);
      return () => clearTimeout(t);
    }
  }, [isOpen, revealed]);

  // Reset local revealed state when resetTrigger changes
  useEffect(() => {
    setRevealedOnce(false);
  }, [resetTrigger]);

  const normalCard = (
    <div
      className="relative w-[120px] h-[120px] mx-auto cursor-pointer"
      onClick={() => setIsOpen(true)}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
        )}
        style={{
          background: image
            ? "transparent"
            : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))`,
        }}
      >
        {image ? (
          <img src={image} alt={`Position ${id}`} className="w-full h-full object-cover" />
        ) : (
          <span className="text-4xl font-bold">{id}</span>
        )}
        {/* Subtle cover label */}
        {!revealedOnce && (
          <div className="absolute inset-0 rounded-full bg-foreground/5 flex items-end justify-center pb-3">
            <span className="text-xs text-muted-foreground">Scratch</span>
          </div>
        )}
      </div>
    </div>
  );

  const zoomedCard =
    isOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="relative"
          style={{ width: "420px", height: "420px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background: image
                ? "transparent"
                : `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))`,
            }}
          >
            {image ? (
              <img src={image} alt={`Position ${id}`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[140px] font-bold">{id}</span>
            )}
          </div>

          <canvas
            ref={largeCanvasRef}
            className={cn(
              "absolute inset-0 rounded-full touch-none select-none",
              revealed ? "opacity-0 pointer-events-none transition-opacity duration-300" : "cursor-pointer"
            )}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
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

