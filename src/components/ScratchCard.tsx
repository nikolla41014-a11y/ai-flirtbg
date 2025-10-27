import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useScratchCanvas } from "@/hooks/useScratchCanvas";

interface ScratchCardProps {
  id: number;
  image?: string;
}

export const ScratchCard = ({ id, image }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { revealed, onPointerDown, onPointerMove, onPointerUp } = useScratchCanvas({
    canvasRef,
    width: 120,
    height: 120,
    radius: 20,
    threshold: 0.65,
    resetKey: id,
    scratchNumber: id,
  });

  return (
    <div className="relative w-[120px] h-[120px] mx-auto">
      <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 shadow-lg">
        {image && (
          <img src={image} alt={`Position ${id}`} className="w-full h-full object-cover" />
        )}
      </div>

      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 rounded-full",
          revealed ? "opacity-0 pointer-events-none transition-opacity duration-300" : "cursor-pointer"
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
};

