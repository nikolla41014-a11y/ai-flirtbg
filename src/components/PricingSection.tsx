import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Plus } from "lucide-react";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import simeon from "@/assets/simeon.jpg";
import nikola from "@/assets/nikola.jpg";

interface PricingCard {
  name: string;
  type: "girlfriend" | "boyfriend";
  image?: string;
  price: string;
  oldPrice: string;
  isCustom?: boolean;
}

interface PricingSectionProps {
  onSelect: (name: string, type: "girlfriend" | "boyfriend") => void;
}

const pricingCards: PricingCard[] = [
  {
    name: "Андреа",
    type: "girlfriend",
    image: andrea,
    price: "9.99",
    oldPrice: "19.99"
  },
  {
    name: "Десита",
    type: "girlfriend",
    image: desita,
    price: "19.99",
    oldPrice: "39.99"
  },
  {
    name: "Създай своя",
    type: "girlfriend",
    price: "15.99",
    oldPrice: "32.99",
    isCustom: true
  },
  {
    name: "Симеон",
    type: "boyfriend",
    image: simeon,
    price: "9.99",
    oldPrice: "19.99"
  },
  {
    name: "Никола",
    type: "boyfriend",
    image: nikola,
    price: "19.99",
    oldPrice: "39.99"
  },
  {
    name: "Създай своя",
    type: "boyfriend",
    price: "15.99",
    oldPrice: "32.99",
    isCustom: true
  }
];

export const PricingSection = ({ onSelect }: PricingSectionProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const girlfriends = pricingCards.filter(card => card.type === "girlfriend");
  const boyfriends = pricingCards.filter(card => card.type === "boyfriend");

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-romantic bg-clip-text text-transparent mb-4">
            Избери своя AI партньор
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Започни романтично приключение с AI партньор по твой избор
          </p>
        </div>

        {/* AI Girlfriends */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-8">
            AI Girlfriends 💖
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {girlfriends.map((card) => (
              <Card
                key={card.name}
                onClick={() => onSelect(card.name, card.type)}
                onMouseEnter={() => setHoveredCard(card.name)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative overflow-hidden cursor-pointer group transition-all duration-500 ${
                  hoveredCard === card.name ? "scale-105 shadow-glow" : "shadow-romantic"
                } border-2 ${hoveredCard === card.name ? "border-primary" : "border-border"}`}
              >
                <div className="relative h-96 overflow-hidden">
                  {card.isCustom ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <Plus className="w-24 h-24 text-primary/50" />
                    </div>
                  ) : (
                    <img
                      src={card.image}
                      alt={card.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === card.name ? "scale-110" : "scale-100"
                      }`}
                    />
                  )}
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  
                  {/* Content overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
                    hoveredCard === card.name ? "translate-y-0 opacity-100" : "translate-y-4 opacity-90"
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      {card.isCustom && <Sparkles className="w-5 h-5 text-primary" />}
                      <h4 className="text-2xl font-bold text-white">
                        {card.name}
                      </h4>
                    </div>
                    
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-primary">
                        {card.price} лв
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {card.oldPrice} лв
                      </span>
                    </div>
                    
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        hoveredCard === card.name 
                          ? "bg-primary text-white scale-105 shadow-glow" 
                          : "bg-primary/90 text-white"
                      }`}
                    >
                      Избери
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Boyfriends */}
        <div>
          <h3 className="text-3xl font-bold text-secondary text-center mb-8">
            AI Boyfriends 💙
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boyfriends.map((card) => (
              <Card
                key={card.name}
                onClick={() => onSelect(card.name, card.type)}
                onMouseEnter={() => setHoveredCard(card.name)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative overflow-hidden cursor-pointer group transition-all duration-500 ${
                  hoveredCard === card.name ? "scale-105 shadow-glow" : "shadow-romantic"
                } border-2 ${hoveredCard === card.name ? "border-secondary" : "border-border"}`}
              >
                <div className="relative h-96 overflow-hidden">
                  {card.isCustom ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/20">
                      <Plus className="w-24 h-24 text-secondary/50" />
                    </div>
                  ) : (
                    <img
                      src={card.image}
                      alt={card.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === card.name ? "scale-110" : "scale-100"
                      }`}
                    />
                  )}
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  
                  {/* Content overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
                    hoveredCard === card.name ? "translate-y-0 opacity-100" : "translate-y-4 opacity-90"
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      {card.isCustom && <Sparkles className="w-5 h-5 text-secondary" />}
                      <h4 className="text-2xl font-bold text-white">
                        {card.name}
                      </h4>
                    </div>
                    
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-secondary">
                        {card.price} лв
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {card.oldPrice} лв
                      </span>
                    </div>
                    
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        hoveredCard === card.name 
                          ? "bg-secondary text-white scale-105 shadow-glow" 
                          : "bg-secondary/90 text-white"
                      }`}
                    >
                      Избери
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};