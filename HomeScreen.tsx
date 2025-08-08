
import React from 'react';
import { Bell, Settings, Target, Star, TrendingUp, Trophy } from 'lucide-react';
import Avatar from '../components/Avatar';
import TaskItem from '../components/TaskItem';
import { UserData, Task } from '../types';

interface HomeScreenProps {
  userData: UserData;
  tasks: Task[];
  onCompleteTask: (id: number) => void;
  onShowSettings: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userData, tasks, onCompleteTask, onShowSettings }) => {
  const dailyTasks = tasks.filter(task => task.category === 'daily');
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const xpEarned = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.xp, 0);

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {userData.name ? `おかえりなさい！` : 'SalesQuest へようこそ！'}
          </h1>
          <p className="text-gray-600">
            {userData.name ? `${userData.name}さん` : '設定から情報を入力してください'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
          <button onClick={onShowSettings} className="p-1 rounded-full hover:bg-gray-200 transition-colors">
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <Avatar userData={userData} />
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">
            {userData.position || '新人'} Lv. {userData.level}
          </h2>
          <p className="text-gray-600">総経験値: {userData.totalXP.toLocaleString()} XP</p>
          {userData.department && <p className="text-sm text-gray-500 mt-1">{userData.company} / {userData.department}</p>}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>{userData.xp.toLocaleString()} XP</span>
            <span>{userData.xpToNext.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min((userData.xp / userData.xpToNext) * 100, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-1">
            次のレベルまであと {(userData.xpToNext - userData.xp).toLocaleString()} XP
          </p>
        </div>
      </div>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-blue-500" /> 今日のクエスト</h3>
        {dailyTasks.length > 0 ? (
          <div className="space-y-3">
            {dailyTasks.slice(0, 3).map(task => <TaskItem key={task.id} task={task} onComplete={onCompleteTask} />)}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">クエストがありません。追加してみましょう！</p>
        )}
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{completedTasksCount}</p>
          <p className="text-sm text-gray-600">完了タスク</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{xpEarned.toLocaleString()}</p>
          <p className="text-sm text-gray-600">獲得XP</p>
        </div>
      </div>

      <section className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center"><Trophy className="w-5 h-5 mr-2 text-yellow-500" /> あなたのランク</h3>
        <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 border-2 border-white">
                        {userData.rank || '-'}
                    </div>
                    <span className="font-bold text-gray-800">{userData.name || 'あなた'}</span>
                </div>
                <span className="text-yellow-600 font-bold">{userData.totalXP.toLocaleString()} XP</span>
            </div>
            {userData.rank === null && <p className="text-gray-500 text-sm text-center mt-2">タスクを完了してランクインしよう！</p>}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
