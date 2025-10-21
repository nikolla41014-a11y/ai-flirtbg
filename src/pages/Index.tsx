import { useState } from "react";
import { PartnerSelector } from "@/components/PartnerSelector";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [selectedPartner, setSelectedPartner] = useState<"girlfriend" | "boyfriend" | null>(null);

  const handleSelectPartner = (type: "girlfriend" | "boyfriend") => {
    setSelectedPartner(type);
  };

  const handleBack = () => {
    setSelectedPartner(null);
  };

  if (selectedPartner) {
    return <ChatInterface partnerType={selectedPartner} onBack={handleBack} />;
  }

  return <PartnerSelector onSelect={handleSelectPartner} />;
};

export default Index;
