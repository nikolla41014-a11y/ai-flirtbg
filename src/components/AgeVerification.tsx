import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface AgeVerificationProps {
  onConfirm: () => void;
}

export const AgeVerification = ({ onConfirm }: AgeVerificationProps) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      <div className="w-full flex items-center justify-center px-4 py-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-b border-primary/20">
        <h1 className="text-2xl md:text-3xl font-bold gradient-romantic bg-clip-text text-transparent">
          AI.FLIRT
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 shadow-glow border-2 border-primary/20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold gradient-romantic bg-clip-text text-transparent">
              {t("age.title")}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {t("age.description")}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={onConfirm}
              className="w-full gradient-romantic hover:opacity-90 transition-smooth py-6 text-lg font-semibold shadow-romantic"
            >
              {t("age.confirm")}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              {t("age.notice")}
            </p>
            
            <p className="text-xs text-muted-foreground mt-4">
              {t("age.notice")}{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                {t("age.privacyLink")}
              </Link>
            </p>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
};
