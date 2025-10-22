import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-card/80 backdrop-blur-md border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} AI Flirt. {language === "bg" ? "Всички права запазени." : "All rights reserved."}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              to="/privacy-policy" 
              className="hover:text-primary transition-colors"
            >
              {language === "bg" ? "Политика за поверителност" : "Privacy Policy"}
            </Link>
            <Link 
              to="/terms-of-service" 
              className="hover:text-primary transition-colors"
            >
              {language === "bg" ? "Условия за ползване" : "Terms of Service"}
            </Link>
            <a 
              href="mailto:support@ai-flirtbg.com" 
              className="hover:text-primary transition-colors"
            >
              {language === "bg" ? "Контакт" : "Contact"}
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50 text-center text-xs text-muted-foreground">
          {language === "bg" 
            ? "AI Flirt е предназначен само за лица над 18 години. Използваме AI технологии за развлекателни цели."
            : "AI Flirt is intended for users 18+ only. We use AI technology for entertainment purposes."}
        </div>
      </div>
    </footer>
  );
};
