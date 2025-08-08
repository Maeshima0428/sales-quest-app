
import React from 'react';
import { User, Target, BarChart3, Trophy } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const navItems = [
  { id: 'home', icon: <User className="w-6 h-6" />, label: 'ホーム' },
  { id: 'tasks', icon: <Target className="w-6 h-6" />, label: 'クエスト' },
  { id: 'stats', icon: <BarChart3 className="w-6 h-6" />, label: 'ステータス' },
  { id: 'ranking', icon: <Trophy className="w-6 h-6" />, label: 'ランキング' }
];

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 z-10">
      <div className="flex justify-around">
        {navItems.map(tab => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors w-20 ${
              currentTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
