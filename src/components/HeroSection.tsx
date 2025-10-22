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
      className="relative px-3 py-4 md:py-5 rounded-xl overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Decorative hearts */}
      <div className="absolute top-2 left-4 animate-pulse" style={{ animationDelay: delay, animationDuration: '2s' }}>
        <Heart className="w-3 h-3 text-white/40 fill-white/40" />
      </div>
      <div className="absolute top-3 right-6 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.3}s`, animationDuration: '2s' }}>
        <Heart className="w-2.5 h-2.5 text-white/30 fill-white/30" />
      </div>
      <div className="absolute bottom-3 right-10 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.6}s`, animationDuration: '2s' }}>
        <Heart className="w-2 h-2 text-white/35 fill-white/35" />
      </div>
      <div className="absolute bottom-4 left-8 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.9}s`, animationDuration: '2s' }}>
        <Heart className="w-2.5 h-2.5 text-white/25 fill-white/25" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center space-y-2">
        <h2 className="text-sm md:text-base lg:text-lg font-bold text-white">
          {title} {emoji}
        </h2>
        <p className="text-xs md:text-sm text-white/95 leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
        <div className="pt-2">
          <Button 
            size="sm"
            className="text-xs px-4 py-2 rounded-full font-semibold transition-all hover:scale-105"
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
    <div className="pt-24 pb-6 px-4 space-y-3 bg-gradient-to-br from-pink-50 via-red-50 to-rose-100">
      {banners.map((banner, index) => (
        <Banner key={index} {...banner} />
      ))}
    </div>
  );
};
