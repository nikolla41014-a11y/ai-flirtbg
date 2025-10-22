import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface BannerProps {
  color: string;
  title: string;
  description: string;
  emoji: string;
  delay: string;
}

const Banner = ({ color, title, description, emoji, delay }: BannerProps) => {
  return (
    <div 
      className="relative px-6 py-12 md:py-16 rounded-3xl overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Decorative hearts */}
      <div className="absolute top-4 left-8 animate-pulse" style={{ animationDelay: delay, animationDuration: '2s' }}>
        <Heart className="w-6 h-6 text-white/40 fill-white/40" />
      </div>
      <div className="absolute top-8 right-12 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.3}s`, animationDuration: '2s' }}>
        <Heart className="w-5 h-5 text-white/30 fill-white/30" />
      </div>
      <div className="absolute bottom-6 right-20 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.6}s`, animationDuration: '2s' }}>
        <Heart className="w-4 h-4 text-white/35 fill-white/35" />
      </div>
      <div className="absolute bottom-10 left-16 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.9}s`, animationDuration: '2s' }}>
        <Heart className="w-5 h-5 text-white/25 fill-white/25" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
          {title} {emoji}
        </h2>
        <p className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
        <div className="pt-4">
          <Button 
            size="lg"
            className="text-lg px-8 py-6 rounded-full font-semibold transition-all hover:scale-105"
            style={{ 
              backgroundColor: '#ffb3c6',
              color: '#b30047',
              border: 'none'
            }}
          >
            Започни сега 💌
          </Button>
        </div>
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const banners = [
    {
      color: '#ff4d4d',
      title: 'Тренирай флирт уменията си',
      description: 'Флиртът е като всяко друго умение. Практикувай с AI Flirt и стани уверен, когато настъпи моментът!',
      emoji: '💬',
      delay: '0s'
    },
    {
      color: '#e60073',
      title: 'Подобри любовната си комуникация',
      description: 'Научи се да изразяваш емоциите си естествено и чаровно с нашия AI партньор.',
      emoji: '💘',
      delay: '0.2s'
    },
    {
      color: '#b30047',
      title: 'Създай увереност и харизма',
      description: 'Общувай, експериментирай и развий своя уникален чар!',
      emoji: '💖',
      delay: '0.4s'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 space-y-8 bg-gradient-to-br from-pink-50 via-red-50 to-rose-100">
      {banners.map((banner, index) => (
        <Banner key={index} {...banner} />
      ))}
    </div>
  );
};
