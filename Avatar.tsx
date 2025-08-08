
import React from 'react';
import { User, Award } from 'lucide-react';
import { UserData } from '../types';

interface AvatarProps {
  userData: UserData;
  size?: 'small' | 'medium' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ userData, size = 'large' }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32',
  };

  const suitColors = {
    business: 'bg-blue-600',
    premium: 'bg-purple-600',
    executive: 'bg-gray-800',
    casual: 'bg-gray-600',
  };

  const sizeClass = sizeClasses[size];
  const suitColor = suitColors[userData.avatar.suit];

  return (
    <div className={`${sizeClass} relative mx-auto`}>
      <div className={`w-full h-full rounded-full ${suitColor} border-4 border-white shadow-lg flex items-center justify-center`}>
        <User className="w-1/2 h-1/2 text-white" />
      </div>
      
      <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-white shadow-md">
        {userData.level}
      </div>
      
      {userData.avatar.badge && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <Award className="w-6 h-6 text-yellow-500" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
