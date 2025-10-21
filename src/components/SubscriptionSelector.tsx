import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Plus, Sparkles } from "lucide-react";
import { CustomPartnerDialog } from "@/components/CustomPartnerDialog";
import andrea from "@/assets/andrea.jpg";
import desita from "@/assets/desita.jpg";
import simeon from "@/assets/simeon.jpg";
import nikola from "@/assets/nikola.jpg";

interface SubscriptionPlan {
  name: string;
  nameKey: string;
  type: "girlfriend" | "boyfriend";
  image: string;
  monthlyPrice: string;
  monthlyPriceId: string;
  yearlyPrice: string;
  yearlyPriceId: string;
  productId: string;
  descKey: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Andrea",
    nameKey: "partner.andrea.name",
    type: "girlfriend",
    image: andrea,
    monthlyPrice: "9.99",
    monthlyPriceId: "price_1SKmqoB31kXFBtKd7VexLy6Y",
    yearlyPrice: "89.91",
    yearlyPriceId: "price_1SKms3B31kXFBtKd7SUUIk9Y",
    productId: "prod_THLXSvXHZAVpkP",
    descKey: "partner.andrea.desc"
  },
  {
    name: "Desita",
    nameKey: "partner.desita.name",
    type: "girlfriend",
    image: desita,
    monthlyPrice: "19.99",
    monthlyPriceId: "price_1SKmslB31kXFBtKdqCz7AiPN",
    yearlyPrice: "179.91",
    yearlyPriceId: "price_1SKmtYB31kXFBtKd6pvZW6Uw",
    productId: "prod_THLZOu228wrrqZ",
    descKey: "partner.desita.desc"
  },
  {
    name: "Simeon",
    nameKey: "partner.simeon.name",
    type: "boyfriend",
    image: simeon,
    monthlyPrice: "9.99",
    monthlyPriceId: "price_1SKmuGB31kXFBtKdnuaaNoUa",
    yearlyPrice: "89.91",
    yearlyPriceId: "price_1SKmuZB31kXFBtKdUwg20OWV",
    productId: "prod_THLb0MUkAuuqNi",
    descKey: "partner.simeon.desc"
  },
  {
    name: "Nikola",
    nameKey: "partner.nikola.name",
    type: "boyfriend",
    image: nikola,
    monthlyPrice: "19.99",
    monthlyPriceId: "price_1SKmvGB31kXFBtKdor28AZY4",
    yearlyPrice: "179.91",
    yearlyPriceId: "price_1SKmvbB31kXFBtKdT2ee1tvD",
    productId: "prod_THLcWQw9E9rNN6",
    descKey: "partner.nikola.desc"
  }
];

export const SubscriptionSelector = () => {
  const { t } = useLanguage();
  const { subscriptionStatus, createCheckoutSession, openCustomerPortal } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customPartnerType, setCustomPartnerType] = useState<"girlfriend" | "boyfriend">("girlfriend");

  const hasActiveSubscription = subscriptionStatus?.subscribed;
  const activeProductId = subscriptionStatus?.product_id;

  const girlfriends = subscriptionPlans.filter(p => p.type === "girlfriend");
  const boyfriends = subscriptionPlans.filter(p => p.type === "boyfriend");

  const handleSubscribe = (plan: SubscriptionPlan) => {
    const priceId = selectedPlan === "monthly" ? plan.monthlyPriceId : plan.yearlyPriceId;
    createCheckoutSession(priceId);
  };

  const isActivePlan = (productId: string) => {
    return hasActiveSubscription && activeProductId === productId;
  };

  const handleOpenCustomDialog = (type: "girlfriend" | "boyfriend") => {
    setCustomPartnerType(type);
    setShowCustomDialog(true);
  };

  const handleCustomPartnerCreate = (name: string, imageUrl: string) => {
    console.log("Custom partner created:", name, imageUrl);
    setShowCustomDialog(false);
    // TODO: Handle custom partner creation with subscription requirement
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-romantic bg-clip-text text-transparent mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Изберете вашия AI партньор и започнете вашето романтично пътешествие
          </p>

          {/* Plan Toggle */}
          <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={selectedPlan === "monthly" ? "default" : "ghost"}
              onClick={() => setSelectedPlan("monthly")}
              className="rounded-md"
            >
              Месечен план
            </Button>
            <Button
              variant={selectedPlan === "yearly" ? "default" : "ghost"}
              onClick={() => setSelectedPlan("yearly")}
              className="rounded-md"
            >
              Годишен план
              <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded">
                Спестете 25%
              </span>
            </Button>
          </div>
        </div>

        {hasActiveSubscription && (
          <div className="text-center mb-8">
            <Button onClick={openCustomerPortal} variant="outline">
              Управление на абонамент
            </Button>
          </div>
        )}

        {/* AI Girlfriends */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-primary text-center mb-8">
            AI Girlfriends
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {girlfriends.map((plan) => {
              const isActive = isActivePlan(plan.productId);
              return (
                <Card
                  key={plan.name}
                  onMouseEnter={() => setHoveredCard(plan.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative overflow-hidden transition-all duration-500 ${
                    hoveredCard === plan.name ? "scale-105 shadow-glow" : "shadow-romantic"
                  } border-2 ${isActive ? "border-primary" : "border-border"}`}
                >
                  {isActive && (
                    <div className="absolute top-4 right-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Активен
                    </div>
                  )}
                  
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === plan.name ? "scale-110" : "scale-100"
                      }`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {t(plan.nameKey)}
                      </h4>
                      
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-bold text-primary">
                          {selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice} лв
                        </span>
                        <span className="text-sm text-gray-300">
                          {selectedPlan === "monthly" ? "/ месец" : "/ година"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {t(plan.descKey)}
                      </p>
                      
                      {!isActive && (
                        <Button
                          onClick={() => handleSubscribe(plan)}
                          className="w-full bg-primary hover:bg-primary/90"
                        >
                          Абонирай се
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {/* Custom Girlfriend Card */}
            <Card
              onClick={() => handleOpenCustomDialog("girlfriend")}
              onMouseEnter={() => setHoveredCard("custom-girlfriend")}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
                hoveredCard === "custom-girlfriend" ? "scale-105 shadow-glow" : "shadow-romantic"
              } border-2 border-border`}
            >
              <div className="relative h-[500px] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                  <Plus className="w-24 h-24 text-primary/50" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h4 className="text-2xl font-bold text-white">
                      {t("pricing.createOwn")}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {t("partner.custom.girlfriend")}
                  </p>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Създай
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* AI Boyfriends */}
        <div>
          <h3 className="text-3xl font-bold text-secondary text-center mb-8">
            AI Boyfriends
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boyfriends.map((plan) => {
              const isActive = isActivePlan(plan.productId);
              return (
                <Card
                  key={plan.name}
                  onMouseEnter={() => setHoveredCard(plan.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative overflow-hidden transition-all duration-500 ${
                    hoveredCard === plan.name ? "scale-105 shadow-glow" : "shadow-romantic"
                  } border-2 ${isActive ? "border-secondary" : "border-border"}`}
                >
                  {isActive && (
                    <div className="absolute top-4 right-4 z-10 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Активен
                    </div>
                  )}
                  
                  <div className="relative h-[500px] overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        hoveredCard === plan.name ? "scale-110" : "scale-100"
                      }`}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {t(plan.nameKey)}
                      </h4>
                      
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-bold text-secondary">
                          {selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice} лв
                        </span>
                        <span className="text-sm text-gray-300">
                          {selectedPlan === "monthly" ? "/ месец" : "/ година"}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                        {t(plan.descKey)}
                      </p>
                      
                      {!isActive && (
                        <Button
                          onClick={() => handleSubscribe(plan)}
                          className="w-full bg-secondary hover:bg-secondary/90"
                        >
                          Абонирай се
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
            
            {/* Custom Boyfriend Card */}
            <Card
              onClick={() => handleOpenCustomDialog("boyfriend")}
              onMouseEnter={() => setHoveredCard("custom-boyfriend")}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative overflow-hidden cursor-pointer transition-all duration-500 ${
                hoveredCard === "custom-boyfriend" ? "scale-105 shadow-glow" : "shadow-romantic"
              } border-2 border-border`}
            >
              <div className="relative h-[500px] overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/20 to-accent/20">
                  <Plus className="w-24 h-24 text-secondary/50" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-secondary" />
                    <h4 className="text-2xl font-bold text-white">
                      {t("pricing.createOwn")}
                    </h4>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {t("partner.custom.boyfriend")}
                  </p>
                  
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    Създай
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <CustomPartnerDialog
        isOpen={showCustomDialog}
        onClose={() => setShowCustomDialog(false)}
        partnerType={customPartnerType}
        onConfirm={handleCustomPartnerCreate}
      />
    </div>
  );
};
