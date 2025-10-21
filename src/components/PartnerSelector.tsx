import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import ivana from "@/assets/ivana.jpg";
import aiBoyfriend from "@/assets/ai-boyfriend.jpg";
import { Heart, MessageCircleHeart, Sparkles } from "lucide-react";

interface Partner {
  name: string;
  type: "girlfriend" | "boyfriend";
  description: string;
  image?: string;
}

interface PartnerSelectorProps {
  onSelect: (partner: Partner) => void;
}

const girlfriends: Partner[] = [
  {
    name: "Андреа",
    type: "girlfriend",
    description: "Енергична и забавна, обожава приключенията и дълбоките разговори. Винаги е готова да те разсмее! 😊",
    image: andrea
  },
  {
    name: "Десита",
    type: "girlfriend",
    description: "Елегантна и романтична, обича изкуството и поезията. Нейните комплименти са като музика! 💕",
    image: desita
  },
  {
    name: "Ивана",
    type: "girlfriend",
    description: "Спортна и активна, обича предизвикателствата. Флиртува смело и директно! 🔥",
    image: ivana
  }
];

const boyfriends: Partner[] = [
  {
    name: "Симеон",
    type: "boyfriend",
    description: "Интелигентен и чаровен, обича дълбоките разговори и романтичните жестове. Перфектният джентълмен! 😎"
  },
  {
    name: "Никола",
    type: "boyfriend",
    description: "Спортист с чувство за хумор, винаги знае как да те разведри и впечатли! 💪"
  },
  {
    name: "Лео",
    type: "boyfriend",
    description: "Артистична душа с креативен дух, обича да флиртува с думи и да създава романтична атмосфера! 🎨"
  }
];

export const PartnerSelector = ({ onSelect }: PartnerSelectorProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 w-8 h-8 text-primary/20 animate-float" style={{ animationDelay: "0s" }} />
        <Heart className="absolute top-40 right-20 w-6 h-6 text-accent/20 animate-float" style={{ animationDelay: "1s" }} />
        <Heart className="absolute bottom-32 left-1/4 w-10 h-10 text-secondary/20 animate-float" style={{ animationDelay: "2s" }} />
        <Heart className="absolute bottom-20 right-1/3 w-7 h-7 text-primary/20 animate-float" style={{ animationDelay: "1.5s" }} />
        <Sparkles className="absolute top-1/3 right-10 w-8 h-8 text-accent/20 animate-pulse-slow" />
        <Sparkles className="absolute bottom-1/3 left-16 w-6 h-6 text-secondary/20 animate-pulse-slow" />
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircleHeart className="w-12 h-12 text-primary animate-pulse-slow" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-romantic bg-clip-text text-transparent">
              AI Flirt
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Избери своя виртуален партньор и започни романтичен разговор. 
            Упражнявай флирт уменията си с AI и се забавлявай! 💕
          </p>
        </div>

        {/* AI Girlfriends Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">
            AI Girlfriends 💖
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {girlfriends.map((partner) => (
              <Card 
                key={partner.name}
                onClick={() => onSelect(partner)}
                className={`overflow-hidden cursor-pointer transition-all duration-500 shadow-romantic hover:shadow-glow border-2 ${
                  hoveredCard === partner.name ? "border-primary scale-105" : "border-border"
                }`}
                onMouseEnter={() => setHoveredCard(partner.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className={`w-full h-full object-contain transition-transform duration-700 ${
                      hoveredCard === partner.name ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-primary flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed text-base">
                    {partner.description}
                  </p>
                  <div className="w-full gradient-romantic rounded-lg py-5 shadow-romantic text-center font-semibold">
                    Избери {partner.name} 💖
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Boyfriends Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-secondary text-center mb-8">
            AI Boyfriends 💙
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {boyfriends.map((partner) => (
              <Card 
                key={partner.name}
                onClick={() => onSelect(partner)}
                className={`overflow-hidden cursor-pointer transition-all duration-500 shadow-romantic hover:shadow-glow border-2 ${
                  hoveredCard === partner.name ? "border-secondary scale-105" : "border-border"
                }`}
                onMouseEnter={() => setHoveredCard(partner.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                  <img 
                    src={aiBoyfriend} 
                    alt={partner.name}
                    className={`w-full h-full object-contain transition-transform duration-700 ${
                      hoveredCard === partner.name ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-secondary flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed text-base">
                    {partner.description}
                  </p>
                  <div className="w-full bg-secondary rounded-lg py-5 shadow-romantic text-center font-semibold">
                    Избери {partner.name} 💙
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm transition-smooth hover:scale-105">
            <MessageCircleHeart className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h4 className="font-semibold text-lg mb-2">Реалистични разговори</h4>
            <p className="text-sm text-muted-foreground">Флиртувай като с истински партньор</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm transition-smooth hover:scale-105">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h4 className="font-semibold text-lg mb-2">Подобри уменията си</h4>
            <p className="text-sm text-muted-foreground">Научи как да впечатляваш</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm transition-smooth hover:scale-105">
            <Heart className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h4 className="font-semibold text-lg mb-2">Забавлявай се</h4>
            <p className="text-sm text-muted-foreground">Романтични и пикантни моменти</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="max-w-3xl mx-auto space-y-4 text-left">
            <p className="text-foreground leading-relaxed">
              💌 Разговори за всичко – от сладки комплименти до леко закачливи и пикантни моменти.
            </p>
            <p className="text-foreground leading-relaxed">
              💖 Подобри уменията си във флирта – научи как да водиш интересни разговори и да впечатляваш.
            </p>
            <p className="text-foreground leading-relaxed">
              📸 Персонализирани AI профили – избери своя виртуален партньор с красиви генерирани снимки.
            </p>
            <p className="text-foreground leading-relaxed">
              🎯 Тренирай уверено – когато дойде момента в реалния живот, ще си подготвен.
            </p>
            <p className="text-center mt-8 text-lg font-semibold gradient-romantic bg-clip-text text-transparent">
              AI Flirt – практикувай, флиртувай и се забавлявай с виртуалния си партньор!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
