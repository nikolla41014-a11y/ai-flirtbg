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
import { LogOut } from "lucide-react";
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

      </div>
      <Footer />
    </div>
  );
};

export default Index;
