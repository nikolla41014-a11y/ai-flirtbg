import { useState } from "react";
import { PartnerSelector } from "@/components/PartnerSelector";
import { ChatInterface } from "@/components/ChatInterface";

interface Partner {
  name: string;
  type: "girlfriend" | "boyfriend";
  description: string;
}

const Index = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleSelectPartner = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const handleBack = () => {
    setSelectedPartner(null);
  };

  if (selectedPartner) {
    return (
      <ChatInterface 
        partnerName={selectedPartner.name}
        partnerType={selectedPartner.type}
        onBack={handleBack} 
      />
    );
  }

  return <PartnerSelector onSelect={handleSelectPartner} />;
};

export default Index;
