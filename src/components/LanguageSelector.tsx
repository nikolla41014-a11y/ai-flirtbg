import { Globe, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const languages = [
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const selectedLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode as "bg" | "en" | "es" | "tr" | "it");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:bg-card/80 transition-colors">
        <Globe className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium">{selectedLanguage.flag} {selectedLanguage.name}</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card/95 backdrop-blur-sm border-border z-50">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
              selectedLanguage.code === lang.code
                ? "bg-primary/20 text-primary"
                : "hover:bg-muted"
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
