import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Plus, Sparkles, X } from "lucide-react";
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

const customPlans = {
  girlfriend: {
    monthlyPrice: "15.99",
    monthlyPriceId: "price_1SKn4TB31kXFBtKd3j9CZhPR",
    yearlyPrice: "143.91",
    yearlyPriceId: "price_1SKn54B31kXFBtKdBvo7QU9o",
    productId: "prod_THLmOQVIi0rUXx"
  },
  boyfriend: {
    monthlyPrice: "15.99",
    monthlyPriceId: "price_1SKn6nB31kXFBtKd45jkszdq",
    yearlyPrice: "143.91",
    yearlyPriceId: "price_1SKn9WB31kXFBtKdvYY4kjzN",
    productId: "prod_THLoDbmo7r6pKJ"
  }
};

export const SubscriptionSelector = () => {
  const { t, language } = useLanguage();
  const { subscriptionStatus, createCheckoutSession, openCustomerPortal } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showCustomDialog, setShowCustomDialog] = useState(false);
  const [customPartnerType, setCustomPartnerType] = useState<"girlfriend" | "boyfriend">("girlfriend");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Конверсия от BGN в EUR (1 EUR = 1.95583 BGN)
  const convertToEUR = (bgnPrice: string): string => {
    const bgn = parseFloat(bgnPrice);
    const eur = bgn / 1.95583;
    return eur.toFixed(2);
  };

  const formatPrice = (bgnPrice: string): string => {
    if (language === "bg") {
      return `${bgnPrice} лв / €${convertToEUR(bgnPrice)}`;
    }
    return `€${convertToEUR(bgnPrice)}`;
  };

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
    // Check if user has active custom subscription for this type
    const customPlan = customPlans[type];
    if (isActivePlan(customPlan.productId)) {
      // User has active subscription, can create custom partner
      setCustomPartnerType(type);
      setShowCustomDialog(true);
    } else {
      // User needs to subscribe first
      const priceId = selectedPlan === "monthly" ? customPlan.monthlyPriceId : customPlan.yearlyPriceId;
      createCheckoutSession(priceId);
    }
  };

  const handleCustomPartnerCreate = (name: string, imageUrl: string) => {
    console.log("Custom partner created:", name, imageUrl);
    setShowCustomDialog(false);
    // TODO: Store custom partner details and allow chat
  };

  const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Image clicked:", imageUrl);
    setSelectedImage(imageUrl);
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
                  
                  <div className="relative h-[900px] overflow-hidden">
                    <div
                      onClick={(e) => handleImageClick(e, plan.image)}
                      className="w-full h-full cursor-pointer"
                    >
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === plan.name ? "scale-110" : "scale-100"
                        }`}
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {t(plan.nameKey)}
                      </h4>
                      
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-bold text-primary">
                          {formatPrice(selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)}
                        </span>
                        <span className="text-sm text-gray-300">
                          {selectedPlan === "monthly" ? (language === "bg" ? "/ месец" : "/ month") : (language === "bg" ? "/ година" : "/ year")}
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
              } border-2 ${isActivePlan(customPlans.girlfriend.productId) ? "border-primary" : "border-border"}`}
            >
              {isActivePlan(customPlans.girlfriend.productId) && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Активен
                </div>
              )}
              
              <div className="relative h-[900px] overflow-hidden">
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
                  
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(selectedPlan === "monthly" ? customPlans.girlfriend.monthlyPrice : customPlans.girlfriend.yearlyPrice)}
                    </span>
                    <span className="text-sm text-gray-300">
                      {selectedPlan === "monthly" ? (language === "bg" ? "/ месец" : "/ month") : (language === "bg" ? "/ година" : "/ year")}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {t("partner.custom.girlfriend")}
                  </p>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    {isActivePlan(customPlans.girlfriend.productId) ? "Създай" : "Абонирай се"}
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
                  
                  <div className="relative h-[900px] overflow-hidden">
                    <div
                      onClick={(e) => handleImageClick(e, plan.image)}
                      className="w-full h-full cursor-pointer"
                    >
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          hoveredCard === plan.name ? "scale-110" : "scale-100"
                        }`}
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-2xl font-bold text-white mb-3">
                        {t(plan.nameKey)}
                      </h4>
                      
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl font-bold text-secondary">
                          {formatPrice(selectedPlan === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)}
                        </span>
                        <span className="text-sm text-gray-300">
                          {selectedPlan === "monthly" ? (language === "bg" ? "/ месец" : "/ month") : (language === "bg" ? "/ година" : "/ year")}
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
              } border-2 ${isActivePlan(customPlans.boyfriend.productId) ? "border-secondary" : "border-border"}`}
            >
              {isActivePlan(customPlans.boyfriend.productId) && (
                <div className="absolute top-4 right-4 z-10 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Активен
                </div>
              )}
              
              <div className="relative h-[900px] overflow-hidden">
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
                  
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl font-bold text-secondary">
                      {formatPrice(selectedPlan === "monthly" ? customPlans.boyfriend.monthlyPrice : customPlans.boyfriend.yearlyPrice)}
                    </span>
                    <span className="text-sm text-gray-300">
                      {selectedPlan === "monthly" ? (language === "bg" ? "/ месец" : "/ month") : (language === "bg" ? "/ година" : "/ year")}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {t("partner.custom.boyfriend")}
                  </p>
                  
                  <Button className="w-full bg-secondary hover:bg-secondary/90">
                    {isActivePlan(customPlans.boyfriend.productId) ? "Създай" : "Абонирай се"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Description */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💌</span>
              <p className="text-foreground leading-relaxed">
                Разговори за всичко – от сладки комплименти до леко закачливи и пикантни моменти.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💖</span>
              <p className="text-foreground leading-relaxed">
                Подобри уменията си във флирта – научи как да водиш интересни разговори и да впечатляваш.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📸</span>
              <p className="text-foreground leading-relaxed">
                Персонализирани AI профили – избери своя виртуален партньор с красиви генерирани снимки.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <p className="text-foreground leading-relaxed">
                Тренирай уверено – когато дойде момента в реалния живот, ще си подготвен.
              </p>
            </div>
            <p className="text-center mt-8 text-xl font-bold gradient-romantic bg-clip-text text-transparent">
              AI Flirt – практикувай, флиртувай и се забавлявай с виртуалния си партньор!
            </p>
          </div>
        </div>
      </div>

      <CustomPartnerDialog
        isOpen={showCustomDialog}
        onClose={() => setShowCustomDialog(false)}
        partnerType={customPartnerType}
        onConfirm={handleCustomPartnerCreate}
      />

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl w-full p-2">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 z-50 p-2 rounded-full bg-black/80 hover:bg-black transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
