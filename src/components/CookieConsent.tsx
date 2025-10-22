import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const CookieConsent = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in">
      <Card className="max-w-4xl mx-auto p-6 shadow-glow border-2 border-primary/20 bg-card/95 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-semibold text-foreground">
              {language === "bg" ? "🍪 Бисквитки и поверителност" : "🍪 Cookies and Privacy"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === "bg" 
                ? "Използваме бисквитки за подобряване на вашето изживяване, анализ на трафика и персонализация на съдържанието. Необходимите бисквитки са задължителни за функционирането на сайта."
                : "We use cookies to improve your experience, analyze traffic, and personalize content. Essential cookies are required for the site to function."}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === "bg" ? (
                <>Прочетете нашата <Link to="/privacy-policy" className="text-primary hover:underline">Политика за поверителност</Link> за повече информация.</>
              ) : (
                <>Read our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for more information.</>
              )}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={handleAcceptAll}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {language === "bg" ? "✓ Приемам всички" : "✓ Accept All"}
          </Button>
          <Button
            onClick={handleRejectNonEssential}
            variant="outline"
            className="flex-1"
          >
            {language === "bg" ? "Отказвам ненужните бисквитки" : "Reject Non-Essential Cookies"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
