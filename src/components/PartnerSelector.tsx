import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import aiGirlfriend from "@/assets/ai-girlfriend.jpg";
import aiBoyfriend from "@/assets/ai-boyfriend.jpg";
import { Heart, MessageCircleHeart, Sparkles } from "lucide-react";

interface PartnerSelectorProps {
  onSelect: (type: "girlfriend" | "boyfriend") => void;
}

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

        {/* Partner cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Girlfriend */}
          <Card 
            className={`overflow-hidden cursor-pointer transition-all duration-500 shadow-romantic hover:shadow-glow border-2 ${
              hoveredCard === "girlfriend" ? "border-primary scale-105" : "border-border"
            }`}
            onMouseEnter={() => setHoveredCard("girlfriend")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
              <img 
                src={aiGirlfriend} 
                alt="AI Girlfriend" 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredCard === "girlfriend" ? "scale-110" : "scale-100"
                }`}
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-3 text-primary flex items-center gap-2">
                <Heart className="w-7 h-7" />
                AI-Girlfriend
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Мила, флиртуваща и романтична. Казва се Мария и обожава да води забавни разговори. 
                Готова е да те впечатли с комплиментите си! 😊
              </p>
              <Button 
                onClick={() => onSelect("girlfriend")}
                className="w-full gradient-romantic hover:opacity-90 transition-all text-lg py-6 shadow-romantic hover:shadow-glow font-semibold"
              >
                Избери Мария 💖
              </Button>
            </div>
          </Card>

          {/* AI Boyfriend */}
          <Card 
            className={`overflow-hidden cursor-pointer transition-all duration-500 shadow-romantic hover:shadow-glow border-2 ${
              hoveredCard === "boyfriend" ? "border-secondary scale-105" : "border-border"
            }`}
            onMouseEnter={() => setHoveredCard("boyfriend")}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
              <img 
                src={aiBoyfriend} 
                alt="AI Boyfriend" 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredCard === "boyfriend" ? "scale-110" : "scale-100"
                }`}
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-3 text-secondary flex items-center gap-2">
                <Heart className="w-7 h-7" />
                AI-Boyfriend
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Чаровен, флиртуващ и романтичен. Казва се Александър и обича да прави комплименти. 
                Перфектният виртуален партньор! 😎
              </p>
              <Button 
                onClick={() => onSelect("boyfriend")}
                className="w-full bg-secondary hover:bg-secondary/90 transition-all text-lg py-6 shadow-romantic hover:shadow-glow font-semibold"
              >
                Избери Александър 💙
              </Button>
            </div>
          </Card>
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
      </div>
    </div>
  );
};
