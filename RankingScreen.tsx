
import React from 'react';
import { Trophy, Users, Star } from 'lucide-react';
import { UserData } from '../types';

interface RankingScreenProps {
  userData: UserData;
}

const RankingScreen: React.FC<RankingScreenProps> = ({ userData }) => {
  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">ランキング</h1>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          総合ランキング
        </h3>
        <div className="space-y-3">
          {userData.rank ? (
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border-2 border-yellow-200">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 bg-yellow-500 text-white">
                  {userData.rank}
                </div>
                <div>
                  <p className="font-medium text-yellow-800">
                    {userData.name || 'あなた'} (あなた)
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-yellow-600">
                  {userData.totalXP.toLocaleString()}XP
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>まだランクインしていません。</p>
              <p className="text-sm">クエストを完了して、ランキングに参加しよう！</p>
            </div>
          )}
          <div className="text-center text-sm text-gray-400 pt-4">他のプレイヤーは近日登場...</div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          チーム順位
        </h3>
        {userData.department ? (
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">#{userData.teamRank || '-'}</div>
            <p className="text-gray-600">{userData.department}</p>
            <p className="text-sm text-gray-500 mt-2">全社チーム内</p>
          </div>
        ) : (
           <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>部署が設定されていません。</p>
              <p className="text-sm">設定から部署を登録してください。</p>
            </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-4 shadow-lg text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          今月のMVP候補
        </h3>
        {userData.rank === 1 ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                <Trophy className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <p className="font-bold">{userData.name || 'あなた'}</p>
                <p className="text-sm opacity-90">現在1位です！</p>
              </div>
            </div>
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        ) : (
          <p className="text-center opacity-90 py-2">トップを目指して頑張ろう！</p>
        )}
      </section>
    </div>
  );
};

export default RankingScreen;
