import { useState } from "react";
import { ScratchCard } from "./ScratchCard";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const ScratchAdventure = () => {
  const [resetTrigger, setResetTrigger] = useState(0);
  const [revealedCount, setRevealedCount] = useState(0);

  const handleRevealed = (id: number) => {
    setRevealedCount((prev) => prev + 1);
    toast.success(`Карта ${id} разкрита!`);
  };

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
    setRevealedCount(0);
    toast.info("Всички карти са нулирани!");
  };

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-background to-muted/20 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-romantic bg-clip-text text-transparent">
            Scratch Adventure
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Надраскай 69 карти и открий скритите награди!
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              Разкрити: <span className="font-bold text-primary">{revealedCount}</span> / 69
            </div>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Нулирай всички
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 md:gap-6">
          {Array.from({ length: 69 }, (_, i) => (
            <div
              key={`${i}-${resetTrigger}`}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 0.01}s`,
              }}
            >
              <ScratchCard
                id={i + 1}
                onRevealed={handleRevealed}
                resetTrigger={resetTrigger}
              />
            </div>
          ))}
        </div>

        {revealedCount === 69 && (
          <div className="mt-12 text-center animate-scale-in">
            <div className="inline-block p-8 bg-primary/10 rounded-2xl border-2 border-primary">
              <h3 className="text-3xl font-bold text-primary mb-2">
                🎉 Поздравления! 🎉
              </h3>
              <p className="text-muted-foreground">
                Разкри всички 69 карти!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
