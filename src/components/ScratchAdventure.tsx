import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { ScratchCard } from "./ScratchCard";
import { ScratchCardModal } from "./ScratchCardModal";
import position1 from "@/assets/positions/position-1.jpg";
import position2 from "@/assets/positions/position-2.jpg";
import position3 from "@/assets/positions/position-3.jpg";
import position4 from "@/assets/positions/position-4.jpg";
import position5 from "@/assets/positions/position-5.jpg";
import position6 from "@/assets/positions/position-6.jpg";
import position7 from "@/assets/positions/position-7.jpg";
import position8 from "@/assets/positions/position-8.jpg";
import position9 from "@/assets/positions/position-9.jpg";
import position10 from "@/assets/positions/position-10.jpg";
import position11 from "@/assets/positions/position-11.jpg";
import position12 from "@/assets/positions/position-12.jpg";
import position13 from "@/assets/positions/position-13.jpg";
import position14 from "@/assets/positions/position-14.jpg";
import position15 from "@/assets/positions/position-15.jpg";
import position16 from "@/assets/positions/position-16.jpg";
import position17 from "@/assets/positions/position-17.jpg";
import position18 from "@/assets/positions/position-18.jpg";
import position19 from "@/assets/positions/position-19.jpg";
import position20 from "@/assets/positions/position-20.jpg";
import position21 from "@/assets/positions/position-21.jpg";
import position22 from "@/assets/positions/position-22.jpg";
import position23 from "@/assets/positions/position-23.jpg";
import position24 from "@/assets/positions/position-24.jpg";
import position25 from "@/assets/positions/position-25.jpg";
import position26 from "@/assets/positions/position-26.jpg";
import position27 from "@/assets/positions/position-27.jpg";
import position28 from "@/assets/positions/position-28.jpg";
import position29 from "@/assets/positions/position-29.jpg";
import position30 from "@/assets/positions/position-30.jpg";
import position31 from "@/assets/positions/position-31.jpg";
import position32 from "@/assets/positions/position-32.jpg";
import position33 from "@/assets/positions/position-33.jpg";
import position34 from "@/assets/positions/position-34.jpg";
import position35 from "@/assets/positions/position-35.jpg";
import position36 from "@/assets/positions/position-36.jpg";
import position37 from "@/assets/positions/position-37.jpg";
import position38 from "@/assets/positions/position-38.jpg";
import position39 from "@/assets/positions/position-39.jpg";
import position40 from "@/assets/positions/position-40.jpg";
import position41 from "@/assets/positions/position-41.jpg";
import position42 from "@/assets/positions/position-42.jpg";
import position43 from "@/assets/positions/position-43.jpg";
import position44 from "@/assets/positions/position-44.jpg";
import position45 from "@/assets/positions/position-45.jpg";
import position46 from "@/assets/positions/position-46.jpg";
import position47 from "@/assets/positions/position-47.jpg";
import position48 from "@/assets/positions/position-48.jpg";
import position49 from "@/assets/positions/position-49.jpg";
import position50 from "@/assets/positions/position-50.jpg";
import position51 from "@/assets/positions/position-51.jpg";
import position52 from "@/assets/positions/position-52.jpg";
import position53 from "@/assets/positions/position-53.jpg";
import position54 from "@/assets/positions/position-54.jpg";
import position55 from "@/assets/positions/position-55.jpg";
import position56 from "@/assets/positions/position-56.jpg";
import position57 from "@/assets/positions/position-57.jpg";
import position58 from "@/assets/positions/position-58.jpg";
import position59 from "@/assets/positions/position-59.jpg";
import position60 from "@/assets/positions/position-60.jpg";
import position61 from "@/assets/positions/position-61.jpg";
import position62 from "@/assets/positions/position-62.jpg";
import position63 from "@/assets/positions/position-63.jpg";
import position64 from "@/assets/positions/position-64.jpg";
import position65 from "@/assets/positions/position-65.jpg";
import position66 from "@/assets/positions/position-66.jpg";
import position67 from "@/assets/positions/position-67.jpg";
import position68 from "@/assets/positions/position-68.jpg";
import position69 from "@/assets/positions/position-69.jpg";

export const ScratchAdventure = () => {
  const [resetKey, setResetKey] = useState(0);
  const [selectedCard, setSelectedCard] = useState<{ id: number; image: string } | null>(null);
  const positions = Array.from({ length: 69 }, (_, i) => i + 1);

  const allPositionImages: string[] = [
    position1, position2, position3, position4, position5, position6, position7, position8, position9, position10,
    position11, position12, position13, position14, position15, position16, position17, position18, position19, position20,
    position21, position22, position23, position24, position25, position26, position27, position28, position29, position30,
    position31, position32, position33, position34, position35, position36, position37, position38, position39, position40,
    position41, position42, position43, position44, position45, position46, position47, position48, position49, position50,
    position51, position52, position53, position54, position55, position56, position57, position58, position59, position60,
    position61, position62, position63, position64, position65, position66, position67, position68, position69,
  ];

  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = [...allPositionImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
    setSelectedCard(null);
  }, [resetKey]);

  const positionImages: Record<number, string> = {
    1: position1,
    2: position2,
    3: position3,
    4: position4,
    5: position5,
    6: position6,
    7: position7,
    8: position8,
    9: position9,
    10: position10,
    11: position11,
    12: position12,
    13: position13,
    14: position14,
    15: position15,
    16: position16,
    17: position17,
    18: position18,
    19: position19,
    20: position20,
    21: position21,
    22: position22,
    23: position23,
    24: position24,
    25: position25,
    26: position26,
    27: position27,
    28: position28,
    29: position29,
    30: position30,
    31: position31,
    32: position32,
    33: position33,
    34: position34,
    35: position35,
    36: position36,
    37: position37,
    38: position38,
    39: position39,
    40: position40,
    41: position41,
    42: position42,
    43: position43,
    44: position44,
    45: position45,
    46: position46,
    47: position47,
    48: position48,
    49: position49,
    50: position50,
    51: position51,
    52: position52,
    53: position53,
    54: position54,
    55: position55,
    56: position56,
    57: position57,
    58: position58,
    59: position59,
    60: position60,
    61: position61,
    62: position62,
    63: position63,
    64: position64,
    65: position65,
    66: position66,
    67: position67,
    68: position68,
    69: position69,
  };

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-background to-muted/20 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Scratch 69 Positions
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Надраскай картите и открий скритите пози!
          </p>
          <Button
            onClick={() => setResetKey(prev => prev + 1)}
            className="gap-2"
            variant="outline"
          >
            <RotateCcw className="w-4 h-4" />
            Нулирай всички
          </Button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 md:gap-6">
          {positions.map((positionId, i) => (
            <div
              key={`${positionId}-${resetKey}`}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 0.01}s`,
              }}
            >
              <ScratchCard
                id={positionId}
                onClick={() => setSelectedCard({ id: positionId, image: shuffledImages[i] })}
              />
            </div>
          ))}
        </div>

        {selectedCard && (
          <ScratchCardModal
            id={selectedCard.id}
            image={selectedCard.image}
            isOpen={!!selectedCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
};
