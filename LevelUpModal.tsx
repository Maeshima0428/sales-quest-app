
import React from 'react';
import { Star } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, level }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl p-8 text-center animate-pulse transform scale-100 transition-transform duration-300">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">LEVEL UP!</h2>
        <p className="text-lg text-gray-600">レベル {level} に成長しました！</p>
        <Star className="w-12 h-12 text-yellow-400 mx-auto mt-4 animate-spin" />
      </div>
    </div>
  );
};

export default LevelUpModal;
