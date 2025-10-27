import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerSelector } from "@/components/PartnerSelector";
import { ChatInterface } from "@/components/ChatInterface";
import { AgeVerification } from "@/components/AgeVerification";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SubscriptionSelector } from "@/components/SubscriptionSelector";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ScratchHeartButton } from "@/components/ScratchHeartButton";
import { FlirtCoachSection } from "@/components/FlirtCoachSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Sparkles } from "lucide-react";
import aiFlirtLogo from "@/assets/ai-flirt-logo.png";

// DEV MODE: Set to true to bypass subscription checks for testing
const DEV_MODE = false;

interface Partner {
  name: string;
  type: "girlfriend" | "boyfriend";
  description: string;
  image?: string;
}

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const { user, loading, signOut, subscriptionStatus } = useAuth();
  const navigate = useNavigate();


  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  const handleSelectPartner = (partner: Partner) => {
    // Check if user is logged in
    if (!user) {
      navigate("/auth");
      return;
    }
    // Check if user has active subscription before allowing chat (skip in DEV_MODE)
    if (!DEV_MODE && !subscriptionStatus?.subscribed) {
      return; // Stay on subscription selector
    }
    setSelectedPartner(partner);
  };

  const handleStartFreeTrial = (partnerName: string, partnerType: "girlfriend" | "boyfriend", partnerImage: string) => {
    // Check if user is logged in
    if (!user) {
      navigate("/auth");
      return;
    }
    // Allow free trial access without subscription
    setSelectedPartner({
      name: partnerName,
      type: partnerType,
      description: "",
      image: partnerImage
    });
  };

  const handleBack = () => {
    setSelectedPartner(null);
  };

  const handleStartFlirtCoach = () => {
    // Check if user is logged in
    if (!user) {
      navigate("/auth");
      return;
    }
    // Start Flirt Coach chat
    setSelectedPartner({
      name: "Flirt Coach",
      type: "girlfriend",
      description: "Твоят личен AI треньор за флирт",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Зареждане...</div>
      </div>
    );
  }

  if (!isAgeVerified) {
    return <AgeVerification onConfirm={handleAgeVerification} />;
  }

  if (selectedPartner) {
    return (
      <ChatInterface 
        partnerName={selectedPartner.name}
        partnerType={selectedPartner.type}
        partnerImage={selectedPartner.image}
        onBack={handleBack} 
      />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-card/95 backdrop-blur-sm border-b border-border">
        <img 
          src={aiFlirtLogo} 
          alt="AI FLIRT Logo" 
          className="h-10 md:h-12 w-auto object-contain"
        />
        <div className="flex items-center gap-4">
          {DEV_MODE && (
            <div className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
              ТЕСТОВ РЕЖИМ
            </div>
          )}
          <LanguageSelector />
          {user && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/image-generator")}
              className="text-gray-900 hover:text-primary hover:bg-primary/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Art
            </Button>
          )}
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut} className="text-gray-900 border-gray-900 hover:bg-gray-100">
              <LogOut className="w-4 h-4 mr-2" />
              Изход
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="text-gray-900 border-gray-900 hover:bg-gray-100">
              Вход
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1">
        <HeroSection />
        <ScratchHeartButton />
        <FlirtCoachSection onStartChat={handleStartFlirtCoach} />
        {DEV_MODE || subscriptionStatus?.subscribed ? (
          <PartnerSelector onSelect={handleSelectPartner} />
        ) : (
          <SubscriptionSelector onStartFreeTrial={handleStartFreeTrial} />
        )}

        <div className="py-12 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            Създай своето AI изкуство
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Генерирай красиви романтични изображения с AI. Избери стил, опиши сцената и създай уникално изкуство!
          </p>
          <Button
            onClick={() => user ? navigate("/image-generator") : navigate("/auth")}
            size="lg"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 text-white font-bold px-10 py-7 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
            Отвори AI Art Generator
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
