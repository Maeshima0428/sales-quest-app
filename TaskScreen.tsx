
import React from 'react';
import { Plus, Clock, Calendar, Zap } from 'lucide-react';
import TaskItem from '../components/TaskItem';
import { Task, TaskCategory } from '../types';

interface TaskScreenProps {
  tasks: Task[];
  onCompleteTask: (id: number) => void;
  onShowTaskModal: () => void;
}

const categoryInfo = {
  [TaskCategory.Daily]: {
    title: 'デイリークエスト',
    icon: <Clock className="w-5 h-5 mr-2 text-blue-500" />
  },
  [TaskCategory.Weekly]: {
    title: 'ウィークリークエスト',
    icon: <Calendar className="w-5 h-5 mr-2 text-green-500" />
  },
  [TaskCategory.Challenge]: {
    title: 'チャレンジクエスト',
    icon: <Zap className="w-5 h-5 mr-2 text-red-500" />
  },
};

const TaskScreen: React.FC<TaskScreenProps> = ({ tasks, onCompleteTask, onShowTaskModal }) => {
  const tasksByCategory = (category: TaskCategory) => tasks.filter(task => task.category === category);

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">クエスト一覧</h1>
        <button 
          onClick={onShowTaskModal}
          className="bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Add new quest"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {Object.values(TaskCategory).map(category => (
        <section key={category} className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-3 capitalize flex items-center">
            {categoryInfo[category].icon}
            {categoryInfo[category].title}
          </h3>
          <div className="space-y-3">
            {tasksByCategory(category).length > 0 ? (
              tasksByCategory(category).map(task => (
                <TaskItem key={task.id} task={task} onComplete={onCompleteTask} />
              ))
            ) : (
              <p className="text-center text-gray-500 py-4 text-sm">このカテゴリのクエストはありません。</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default TaskScreen;
