import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import simeon from "@/assets/simeon.jpg";
import nikola from "@/assets/nikola.jpg";
import mia from "@/assets/mia.jpg";
import lora from "@/assets/lora.jpg";
import ana from "@/assets/ana.jpg";

interface PricingCard {
  name: string;
  type: "girlfriend" | "boyfriend";
  image?: string;
  price: string;
  oldPrice: string;
  description: string;
  isCustom?: boolean;
}

interface PricingSectionProps {
  onSelect: (name: string, type: "girlfriend" | "boyfriend") => void;
}

const pricingCards: PricingCard[] = [
  {
    name: "andrea",
    type: "girlfriend",
    image: andrea,
    price: "9.99",
    oldPrice: "19.99",
    description: ""
  },
  {
    name: "desita",
    type: "girlfriend",
    image: desita,
    price: "19.99",
    oldPrice: "39.99",
    description: ""
  },
  {
    name: "mia",
    type: "girlfriend",
    image: mia,
    price: "14.99",
    oldPrice: "29.99",
    description: ""
  },
  {
    name: "lora",
    type: "girlfriend",
    image: lora,
    price: "36.99",
    oldPrice: "73.99",
    description: ""
  },
  {
    name: "ana",
    type: "girlfriend",
    image: ana,
    price: "99.99",
    oldPrice: "199.99",
    description: ""
  },
  {
    name: "custom",
    type: "girlfriend",
    price: "15.99",
    oldPrice: "32.99",
    description: "",
    isCustom: true
  },
  {
    name: "simeon",
    type: "boyfriend",
    image: simeon,
    price: "9.99",
    oldPrice: "19.99",
    description: ""
  },
  {
    name: "nikola",
    type: "boyfriend",
    image: nikola,
    price: "19.99",
    oldPrice: "39.99",
    description: ""
  },
  {
    name: "custom",
    type: "boyfriend",
    price: "15.99",
    oldPrice: "32.99",
    description: "",
    isCustom: true
  }
];

export const PricingSection = ({ onSelect }: PricingSectionProps) => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const pricingCardsWithTranslations: PricingCard[] = pricingCards.map(card => ({
    ...card,
    name: card.isCustom 
      ? t("pricing.createOwn") 
      : t(`partner.${card.name}.name`),
    description: card.isCustom 
      ? (card.type === "girlfriend" ? t("partner.custom.girlfriend") : t("partner.custom.boyfriend"))
      : t(`partner.${card.name}.desc`)
  }));

  const girlfriends = pricingCardsWithTranslations.filter(card => card.type === "girlfriend");
  const boyfriends = pricingCardsWithTranslations.filter(card => card.type === "boyfriend");

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* AI Girlfriends */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-8">
            {t("pricing.girlfriends")}
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
                <div className="relative h-[700px] overflow-hidden">
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
                    
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl font-bold text-primary">
                        {card.price} {t("currency")}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {card.oldPrice} {t("currency")}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        hoveredCard === card.name 
                          ? "bg-primary text-white scale-105 shadow-glow" 
                          : "bg-primary/90 text-white"
                      }`}
                    >
                      {t("pricing.select")}
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
            {t("pricing.boyfriends")}
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
                <div className="relative h-[700px] overflow-hidden">
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
                    
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-3xl font-bold text-secondary">
                        {card.price} {t("currency")}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {card.oldPrice} {t("currency")}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <button
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        hoveredCard === card.name 
                          ? "bg-secondary text-white scale-105 shadow-glow" 
                          : "bg-secondary/90 text-white"
                      }`}
                    >
                      {t("pricing.select")}
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