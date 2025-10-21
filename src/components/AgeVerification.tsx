import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface AgeVerificationProps {
  onConfirm: () => void;
}

export const AgeVerification = ({ onConfirm }: AgeVerificationProps) => {
  return (
    <div className="min-h-screen gradient-soft flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 shadow-glow border-2 border-primary/20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold gradient-romantic bg-clip-text text-transparent">
              18+ Потвърждение
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Този сайт съдържа съдържание само за възрастни. Моля, потвърдете, че сте навършили 18 години.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={onConfirm}
              className="w-full gradient-romantic hover:opacity-90 transition-smooth py-6 text-lg font-semibold shadow-romantic"
            >
              Потвърждавам - Навършил/а съм 18 години
            </Button>
            
            <p className="text-xs text-muted-foreground">
              С натискането на бутона потвърждавате, че сте навършили пълнолетие
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
