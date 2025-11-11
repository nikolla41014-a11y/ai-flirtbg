interface ScratchCardProps {
  id: number;
  image?: string;
  onClick: () => void;
}

export const ScratchCard = ({ id, onClick }: ScratchCardProps) => {
  return (
    <button
      onClick={onClick}
      className="relative w-[120px] h-[120px] mx-auto rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer group"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700">
        <span className="text-5xl font-bold text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform">
          {id}
        </span>
      </div>
    </button>
  );
};

