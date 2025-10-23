import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Sparkles } from "lucide-react";
import aiGirlfriend from "@/assets/ai-girlfriend.jpg";

interface FlirtCoachSectionProps {
  onStartChat: () => void;
}

export const FlirtCoachSection = ({ onStartChat }: FlirtCoachSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 px-4 bg-gradient-to-b from-accent/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("flirtcoach.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("flirtcoach.subtitle")}
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="group relative overflow-hidden max-w-md w-full bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-glow">
            <div className="relative h-80 overflow-hidden">
              <img
                src={aiGirlfriend}
                alt="Flirt Coach"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-2xl font-bold text-white">
                    {t("flirtcoach.name")}
                  </h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  {t("flirtcoach.description")}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span>{t("flirtcoach.feature1")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{t("flirtcoach.feature2")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span>{t("flirtcoach.feature3")}</span>
                  </div>
                </div>

                <Button
                  onClick={onStartChat}
                  className="w-full gradient-romantic hover:opacity-90 transition-smooth shadow-romantic"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("flirtcoach.startChat")}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
