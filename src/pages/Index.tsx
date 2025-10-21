import { useState } from "react";
import { PartnerSelector } from "@/components/PartnerSelector";
import { ChatInterface } from "@/components/ChatInterface";
import { AgeVerification } from "@/components/AgeVerification";

interface Partner {
  name: string;
  type: "girlfriend" | "boyfriend";
  description: string;
  image?: string;
}

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  const handleSelectPartner = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const handleBack = () => {
    setSelectedPartner(null);
  };

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

  return <PartnerSelector onSelect={handleSelectPartner} />;
};

export default Index;
