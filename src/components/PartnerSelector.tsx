import { useState } from "react";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import simeon from "@/assets/simeon.jpg";
import nikola from "@/assets/nikola.jpg";
import { Heart, MessageCircleHeart, Sparkles } from "lucide-react";
import { CustomPartnerDialog } from "@/components/CustomPartnerDialog";
import { PricingSection } from "@/components/PricingSection";

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
    description: "Мокра съм, искам го. Пиши ми 💦",
    image: desita
  }
];

const boyfriends: Partner[] = [
  {
    name: "Симеон",
    type: "boyfriend",
    description: "Интелигентен и чаровен, обича дълбоките разговори и романтичните жестове. Перфектният джентълмен! 😎",
    image: simeon
  },
  {
    name: "Никола",
    type: "boyfriend",
    description: "Искам да ти го вкарам, пиши ми 😛",
    image: nikola
  }
];

export const PartnerSelector = ({ onSelect }: PartnerSelectorProps) => {
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customPartnerType, setCustomPartnerType] = useState<"girlfriend" | "boyfriend">("girlfriend");

  const handleCustomCreate = (type: "girlfriend" | "boyfriend") => {
    setCustomPartnerType(type);
    setCustomDialogOpen(true);
  };

  const handleCustomConfirm = (name: string, imageUrl: string) => {
    onSelect({
      name,
      type: customPartnerType,
      description: "Твоя персонализиран AI партньор ✨",
      image: imageUrl
    });
    setCustomDialogOpen(false);
  };

  const handlePricingSelect = (name: string, type: "girlfriend" | "boyfriend") => {
    if (name === "Създай своя") {
      handleCustomCreate(type);
    } else {
      const partner = [...girlfriends, ...boyfriends].find(p => p.name === name);
      if (partner) {
        onSelect(partner);
      }
    }
  };

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

        {/* Pricing Section */}
        <CustomPartnerDialog
          isOpen={customDialogOpen}
          onClose={() => setCustomDialogOpen(false)}
          partnerType={customPartnerType}
          onConfirm={handleCustomConfirm}
        />
        <PricingSection onSelect={handlePricingSelect} />

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
