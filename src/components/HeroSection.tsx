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
      className="relative px-2 py-2 md:py-2.5 rounded-lg overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Decorative hearts */}
      <div className="absolute top-1 left-2 animate-pulse" style={{ animationDelay: delay, animationDuration: '2s' }}>
        <Heart className="w-2 h-2 text-white/40 fill-white/40" />
      </div>
      <div className="absolute top-1.5 right-3 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.3}s`, animationDuration: '2s' }}>
        <Heart className="w-1.5 h-1.5 text-white/30 fill-white/30" />
      </div>
      <div className="absolute bottom-1.5 right-5 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.6}s`, animationDuration: '2s' }}>
        <Heart className="w-1.5 h-1.5 text-white/35 fill-white/35" />
      </div>
      <div className="absolute bottom-2 left-4 animate-pulse" style={{ animationDelay: `${parseFloat(delay) + 0.9}s`, animationDuration: '2s' }}>
        <Heart className="w-1.5 h-1.5 text-white/25 fill-white/25" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h2 className="text-xs md:text-sm font-bold text-white inline">
          {title} {emoji}
        </h2>
        <span className="text-[10px] md:text-xs text-white/95 ml-2">
          {description}
        </span>
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
    <div className="pt-24 pb-3 px-4 space-y-2 bg-gradient-to-br from-pink-50 via-red-50 to-rose-100">
      {banners.map((banner, index) => (
        <Banner key={index} {...banner} />
      ))}

    </div>
  );
};
