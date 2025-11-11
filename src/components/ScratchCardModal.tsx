import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useScratchCanvas } from "@/hooks/useScratchCanvas";

interface ScratchCardModalProps {
  id: number;
  image: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ScratchCardModal = ({ id, image, isOpen, onClose }: ScratchCardModalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { revealed, onPointerDown, onPointerMove, onPointerUp } = useScratchCanvas({
    canvasRef,
    width: 400,
    height: 400,
    radius: 30,
    threshold: 0.65,
    resetKey: `modal-${id}-${isOpen}`,
    scratchNumber: id,
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="relative flex flex-col items-center gap-6 animate-scale-in">
        <div className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900">
            <img src={image} alt={`Position ${id}`} className="w-full h-full object-cover" />
          </div>

          <canvas
            ref={canvasRef}
            className={
              revealed
                ? "opacity-0 pointer-events-none transition-opacity duration-300"
                : "absolute inset-0 cursor-pointer"
            }
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          />
        </div>

        <Button
          onClick={onClose}
          variant="secondary"
          size="lg"
          className="gap-2 shadow-lg"
        >
          <X className="w-5 h-5" />
          Изход
        </Button>
      </div>
    </div>
  );
};
