import { useState } from "react";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import simeon from "@/assets/simeon.jpg";
import nikola from "@/assets/nikola.jpg";
import { Heart, MessageCircleHeart, Sparkles } from "lucide-react";
import { CustomPartnerDialog } from "@/components/CustomPartnerDialog";
import { PricingSection } from "@/components/PricingSection";
import { useLanguage } from "@/contexts/LanguageContext";

interface Partner {
  name: string;
  type: "girlfriend" | "boyfriend";
  description: string;
  image?: string;
}

interface PartnerSelectorProps {
  onSelect: (partner: Partner) => void;
}

export const PartnerSelector = ({ onSelect }: PartnerSelectorProps) => {
  const { t } = useLanguage();
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customPartnerType, setCustomPartnerType] = useState<"girlfriend" | "boyfriend">("girlfriend");

  const girlfriends: Partner[] = [
    {
      name: t("partner.andrea.name"),
      type: "girlfriend",
      description: t("partner.andrea.desc"),
      image: andrea
    },
    {
      name: t("partner.desita.name"),
      type: "girlfriend",
      description: t("partner.desita.desc"),
      image: desita
    }
  ];

  const boyfriends: Partner[] = [
    {
      name: t("partner.simeon.name"),
      type: "boyfriend",
      description: t("partner.simeon.desc"),
      image: simeon
    },
    {
      name: t("partner.nikola.name"),
      type: "boyfriend",
      description: t("partner.nikola.desc"),
      image: nikola
    }
  ];

  const handleCustomCreate = (type: "girlfriend" | "boyfriend") => {
    setCustomPartnerType(type);
    setCustomDialogOpen(true);
  };

  const handleCustomConfirm = (name: string, imageUrl: string) => {
    onSelect({
      name,
      type: customPartnerType,
      description: t("partner.custom.personalized"),
      image: imageUrl
    });
    setCustomDialogOpen(false);
  };

  const handlePricingSelect = (name: string, type: "girlfriend" | "boyfriend") => {
    if (name === t("pricing.createOwn")) {
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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground drop-shadow-lg">
              {t("header.title")}
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("header.subtitle")}
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
            <h4 className="font-semibold text-lg mb-2">{t("features.realistic.title")}</h4>
            <p className="text-sm text-muted-foreground">{t("features.realistic.desc")}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm transition-smooth hover:scale-105">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h4 className="font-semibold text-lg mb-2">{t("features.improve.title")}</h4>
            <p className="text-sm text-muted-foreground">{t("features.improve.desc")}</p>
          </div>
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm transition-smooth hover:scale-105">
            <Heart className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <h4 className="font-semibold text-lg mb-2">{t("features.fun.title")}</h4>
            <p className="text-sm text-muted-foreground">{t("features.fun.desc")}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="max-w-3xl mx-auto space-y-4 text-left">
            <p className="text-foreground leading-relaxed">
              {t("desc.line1")}
            </p>
            <p className="text-foreground leading-relaxed">
              {t("desc.line2")}
            </p>
            <p className="text-foreground leading-relaxed">
              {t("desc.line3")}
            </p>
            <p className="text-foreground leading-relaxed">
              {t("desc.line4")}
            </p>
            <p className="text-center mt-8 text-lg font-semibold gradient-romantic bg-clip-text text-transparent">
              {t("desc.footer")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
