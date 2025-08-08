
import React, { useState, useEffect, useCallback } from 'react';
import { UserData, Task, TaskCategory, TaskType } from './types';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TaskScreen';
import StatsScreen from './screens/StatsScreen';
import RankingScreen from './screens/RankingScreen';
import BottomNav from './components/BottomNav';
import Notification from './components/Notification';
import LevelUpModal from './components/LevelUpModal';
import SettingsModal from './components/SettingsModal';
import TaskAddModal from './components/TaskAddModal';

const initialUserData: UserData = {
  name: '',
  position: '',
  department: '',
  company: '',
  email: '',
  experience: '',
  level: 1,
  xp: 0,
  xpToNext: 100,
  totalXP: 0,
  avatar: {
    suit: 'casual',
    accessory: '',
    badge: '',
  },
  stats: {
    listening: 1,
    proposal: 1,
    action: 1,
    trust: 1,
    closing: 1,
  },
  badges: [],
  rank: null,
  teamRank: null,
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTab, setCurrentTab] = useState('home');
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // For new users, prompt to set up their profile.
    if (!userData.name) {
      setShowSettingsModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLevelUp = useCallback((currentXp: number, xpGained: number) => {
    const newTotalXP = userData.totalXP + xpGained;
    let newXp = currentXp + xpGained;
    let newLevel = userData.level;
    let newXpToNext = userData.xpToNext;

    if (newXp >= newXpToNext) {
      newLevel += 1;
      newXp -= newXpToNext;
      newXpToNext += 500;
      setShowLevelUpModal(true);
      setTimeout(() => setShowLevelUpModal(false), 3000);
    }

    setUserData(prev => ({
      ...prev,
      level: newLevel,
      xp: newXp,
      xpToNext: newXpToNext,
      totalXP: newTotalXP,
    }));
  }, [userData.totalXP, userData.level, userData.xpToNext]);

  const completeTask = useCallback((taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setTasks(prevTasks => prevTasks.map(t =>
        t.id === taskId ? { ...t, completed: true } : t
      ));
      
      checkLevelUp(userData.xp, task.xp);
      
      setNotification(`+${task.xp}XP 獲得！`);
      setTimeout(() => setNotification(''), 2000);
    }
  }, [tasks, userData.xp, checkLevelUp]);

  const addTask = useCallback((title: string, category: TaskCategory) => {
    const xpMap = {
      [TaskCategory.Daily]: 50,
      [TaskCategory.Weekly]: 200,
      [TaskCategory.Challenge]: 500,
    };
    
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      xp: xpMap[category],
      completed: false,
      type: TaskType.Target,
    };
    
    setTasks(prev => [...prev, newTask]);
    setShowTaskModal(false);
  }, []);

  const updateUserSettings = useCallback((newSettings: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...newSettings,
      rank: prev.rank || 1 // Assign a rank on first setup
    }));
    setShowSettingsModal(false);
    setNotification('設定を保存しました！');
    setTimeout(() => setNotification(''), 2000);
  }, []);

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen userData={userData} tasks={tasks} onCompleteTask={completeTask} onShowSettings={() => setShowSettingsModal(true)} />;
      case 'tasks':
        return <TaskScreen tasks={tasks} onCompleteTask={completeTask} onShowTaskModal={() => setShowTaskModal(true)} />;
      case 'stats':
        return <StatsScreen userData={userData} tasks={tasks} />;
      case 'ranking':
        return <RankingScreen userData={userData} />;
      default:
        return <HomeScreen userData={userData} tasks={tasks} onCompleteTask={completeTask} onShowSettings={() => setShowSettingsModal(true)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative shadow-2xl">
      <Notification message={notification} />
      <LevelUpModal isOpen={showLevelUpModal} level={userData.level} />
      {showSettingsModal && (
        <SettingsModal
          userData={userData}
          onClose={() => setShowSettingsModal(false)}
          onSave={updateUserSettings}
        />
      )}
      {showTaskModal && (
        <TaskAddModal
          onClose={() => setShowTaskModal(false)}
          onAddTask={addTask}
        />
      )}

      <main className="pb-20">
        {renderScreen()}
      </main>

      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
