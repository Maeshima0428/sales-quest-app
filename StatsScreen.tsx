
import React from 'react';
import { Phone, Handshake, FileText, DollarSign } from 'lucide-react';
import Avatar from '../components/Avatar';
import { UserData, Task, TaskType } from '../types';

interface StatsScreenProps {
  userData: UserData;
  tasks: Task[];
}

const StatsScreen: React.FC<StatsScreenProps> = ({ userData, tasks }) => {
  const skills = [
    { key: 'listening', name: 'ヒアリング力', icon: '👂' },
    { key: 'proposal', name: '提案力', icon: '💡' },
    { key: 'action', name: '行動力', icon: '🚀' },
    { key: 'trust', name: '信頼構築力', icon: '🤝' },
    { key: 'closing', name: 'クロージング力', icon: '🎯' }
  ];

  const achievementStats = {
    calls: tasks.filter(t => t.completed && t.type === TaskType.Phone).length,
    meetings: tasks.filter(t => t.completed && t.type === TaskType.Handshake).length,
    proposals: tasks.filter(t => t.completed && (t.type === TaskType.Document || t.type === TaskType.Proposal)).length,
    deals: 0, // This would need a specific task type
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">成長ステータス</h1>

      <section className="bg-white rounded-xl p-6 shadow-sm text-center">
        <Avatar userData={userData} />
        <h2 className="text-xl font-bold text-gray-800 mt-4">レベル {userData.level} {userData.position || 'セールス'}</h2>
        <div className="flex justify-center flex-wrap gap-2 mt-4">
          {userData.badges.length > 0 ? userData.badges.map(badge => (
            <span key={badge} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {badge}
            </span>
          )) : <p className="text-sm text-gray-500">実績を積んでバッジを獲得しよう！</p>}
        </div>
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">営業スキル</h3>
        <div className="space-y-4">
          {skills.map(skill => (
            <div key={skill.key} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{skill.icon}</span>
                <span className="font-medium text-gray-800">{skill.name}</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(userData.stats[skill.key] / 10) * 100}%` }}
                  />
                </div>
                <span className="font-bold text-gray-800 w-8 text-right">{userData.stats[skill.key]}/10</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">今月の実績</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Phone className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{achievementStats.calls}</p>
            <p className="text-sm text-gray-600">架電数</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Handshake className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{achievementStats.meetings}</p>
            <p className="text-sm text-gray-600">商談数</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <FileText className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{achievementStats.proposals}</p>
            <p className="text-sm text-gray-600">提案数</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-800">{achievementStats.deals}</p>
            <p className="text-sm text-gray-600">受注数</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsScreen;
