import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Send, ArrowLeft, Heart, Loader2, Crown } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import aiGirlfriend from "@/assets/ai-girlfriend.jpg";
import aiBoyfriend from "@/assets/ai-boyfriend.jpg";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  partnerName: string;
  partnerType: "girlfriend" | "boyfriend";
  partnerImage?: string;
  onBack: () => void;
}

export const ChatInterface = ({ partnerName, partnerType, partnerImage: customImage, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [freeTrialCount, setFreeTrialCount] = useState(0);
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { subscriptionStatus } = useAuth();

  const defaultImage = partnerType === "girlfriend" ? aiGirlfriend : aiBoyfriend;
  const partnerImage = customImage || defaultImage;
  const partnerColor = partnerType === "girlfriend" ? "text-primary" : "text-secondary";
  
  // Partners with free trial
  const FREE_TRIAL_PARTNERS = ["Andrea", "Mia"];
  const FREE_TRIAL_LIMIT = 3;
  const hasFreeTrial = FREE_TRIAL_PARTNERS.includes(partnerName);
  const hasActiveSubscription = subscriptionStatus?.subscribed || false;

  useEffect(() => {
    // Initial greeting
    const greeting = partnerType === "girlfriend"
      ? "Здравей красавецо! 😘 Радвам се да те видя тук. Как си днес? Разкажи ми нещо за теб!"
      : "Здравей красавице! 😎 Приятно ми е да се запознаем. Какво те прави щастлива?";
    
    setMessages([{ role: "assistant", content: greeting }]);
    
    // Load free trial count from localStorage
    if (hasFreeTrial) {
      const storageKey = `freeTrial_${partnerName}`;
      const savedCount = localStorage.getItem(storageKey);
      setFreeTrialCount(savedCount ? parseInt(savedCount, 10) : 0);
    }
  }, [partnerType, partnerName, hasFreeTrial]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Check free trial limit
    if (hasFreeTrial && !hasActiveSubscription) {
      if (freeTrialCount >= FREE_TRIAL_LIMIT) {
        setShowSubscribeDialog(true);
        return;
      }
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: {
          messages: [...messages, userMessage],
          partnerType,
          partnerName,
        },
      });

      if (error) throw error;

      if (data?.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
        
        // Increment free trial count if applicable
        if (hasFreeTrial && !hasActiveSubscription) {
          const newCount = freeTrialCount + 1;
          setFreeTrialCount(newCount);
          const storageKey = `freeTrial_${partnerName}`;
          localStorage.setItem(storageKey, newCount.toString());
          
          // Show remaining messages
          const remaining = FREE_TRIAL_LIMIT - newCount;
          if (remaining > 0) {
            toast.info(`Имате още ${remaining} безплатни съобщения с ${partnerName}`);
          } else {
            setShowSubscribeDialog(true);
          }
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Грешка при изпращане на съобщението. Опитайте отново.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      {/* Top Header */}
      <div className="w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm border-b border-primary/20 py-3">
        <h1 className="text-xl md:text-2xl font-bold gradient-romantic bg-clip-text text-transparent text-center">
          AI.FLIRT
        </h1>
      </div>
      {/* Chat Header */}
      <div className="bg-card/80 backdrop-blur-md border-b shadow-soft sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-accent/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <Avatar className="w-12 h-12 border-2 border-primary/30">
            <AvatarImage src={partnerImage} alt={partnerName} />
            <AvatarFallback>{partnerName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className={`text-xl font-bold ${partnerColor}`}>{partnerName}</h2>
            <p className="text-sm text-muted-foreground">Онлайн • AI Партньор</p>
          </div>
          
          <Heart className={`w-6 h-6 ${partnerColor} animate-pulse-slow`} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"} animate-fade-in`}
            >
              {message.role === "assistant" && (
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarImage src={partnerImage} alt={partnerName} />
                  <AvatarFallback>{partnerName[0]}</AvatarFallback>
                </Avatar>
              )}
              
              <Card
                onClick={() => message.role === "assistant" && setIsImageOpen(true)}
                className={`max-w-[75%] p-4 ${
                  message.role === "user"
                    ? "gradient-romantic text-primary-foreground shadow-romantic"
                    : "bg-card shadow-soft border-border cursor-pointer hover:shadow-glow transition-all"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </Card>
              
              {message.role === "user" && (
                <Avatar className="w-10 h-10 bg-accent">
                  <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                    Ти
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarImage src={partnerImage} alt={partnerName} />
                <AvatarFallback>{partnerName[0]}</AvatarFallback>
              </Avatar>
              <Card className="p-4 shadow-soft">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-card/80 backdrop-blur-md border-t shadow-soft sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Напиши съобщение до ${partnerName}...`}
              disabled={isLoading}
              className="flex-1 text-base py-6 border-2 focus:border-primary transition-smooth"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="gradient-romantic hover:opacity-90 transition-smooth px-6 shadow-romantic"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-2 border-primary/30">
          <img 
            src={partnerImage} 
            alt={partnerName}
            className="w-full h-auto object-cover"
          />
        </DialogContent>
      </Dialog>

      {/* Subscribe Dialog */}
      <Dialog open={showSubscribeDialog} onOpenChange={setShowSubscribeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Crown className="w-6 h-6 text-primary" />
              Безплатният период приключи
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Използвахте всичките си 3 безплатни съобщения с {partnerName}. 
              Абонирайте се сега за неограничен достъп до всички функции!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={onBack}
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Crown className="w-4 h-4 mr-2" />
              Виж планове за абонамент
            </Button>
            <Button 
              onClick={() => setShowSubscribeDialog(false)}
              variant="outline"
              className="w-full"
            >
              Затвори
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
