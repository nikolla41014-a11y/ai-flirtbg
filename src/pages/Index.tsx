import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PartnerSelector } from "@/components/PartnerSelector";
import { ChatInterface } from "@/components/ChatInterface";
import { AgeVerification } from "@/components/AgeVerification";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SubscriptionSelector } from "@/components/SubscriptionSelector";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import aiFlirtLogo from "@/assets/ai-flirt-logo.png";

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
    // Check if user has active subscription before allowing chat
    if (!subscriptionStatus?.subscribed) {
      return; // Stay on subscription selector
    }
    setSelectedPartner(partner);
  };

  const handleBack = () => {
    setSelectedPartner(null);
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
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-b border-primary/20">
        <img 
          src={aiFlirtLogo} 
          alt="AI FLIRT Logo" 
          className="h-10 md:h-12 w-auto object-contain"
        />
        <div className="flex items-center gap-4">
          <LanguageSelector />
          {user ? (
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Изход
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
              Вход
            </Button>
          )}
        </div>
      </div>
      {subscriptionStatus?.subscribed ? (
        <PartnerSelector onSelect={handleSelectPartner} />
      ) : (
        <SubscriptionSelector />
      )}
    </div>
  );
};

export default Index;
