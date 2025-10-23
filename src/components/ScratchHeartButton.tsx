import { useState } from "react";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScratchAdventure } from "./ScratchAdventure";

export const ScratchHeartButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full py-12 px-4 flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex flex-col items-center gap-4 transition-all duration-300 hover:scale-105"
        >
          <div className="relative rounded-full p-2 shadow-glow">
            <Heart
              className="w-32 h-32 md:w-40 md:h-40 text-primary animate-pulse"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl md:text-2xl text-center px-4 drop-shadow-lg">
                69 Positions
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm md:text-base group-hover:text-primary transition-colors">
            Кликни за игра! 💋
          </p>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl font-bold">
              69 Positions Scratch Adventure
            </DialogTitle>
          </DialogHeader>
          <ScratchAdventure />
        </DialogContent>
      </Dialog>
    </>
  );
};
