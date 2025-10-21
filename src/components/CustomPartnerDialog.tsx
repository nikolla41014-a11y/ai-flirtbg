import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomPartnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  partnerType: "girlfriend" | "boyfriend";
  onConfirm: (name: string, imageUrl: string) => void;
}

export const CustomPartnerDialog = ({ isOpen, onClose, partnerType, onConfirm }: CustomPartnerDialogProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Файлът е твърде голям. Максимален размер: 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (!name.trim()) {
      toast.error("Моля, въведете име");
      return;
    }
    if (!imageUrl) {
      toast.error("Моля, качете снимка");
      return;
    }
    onConfirm(name.trim(), imageUrl);
    setName("");
    setImageUrl("");
    setPreviewUrl("");
  };

  const typeLabel = partnerType === "girlfriend" ? "AI Girlfriend" : "AI Boyfriend";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-romantic bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            {partnerType === "girlfriend" ? t("custom.title.girlfriend") : t("custom.title.boyfriend")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("custom.name")}</Label>
            <Input
              id="name"
              placeholder={t("custom.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">{t("custom.upload")}</Label>
            <div className="flex flex-col items-center gap-4">
              {previewUrl && (
                <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-primary/20">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <label htmlFor="image" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {previewUrl ? "Промени снимката" : "Качи снимка"}
                  </span>
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              
              <p className="text-xs text-muted-foreground text-center">
                Максимален размер: 5MB
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t("custom.cancel")}
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 gradient-romantic"
            >
              {t("custom.create")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
