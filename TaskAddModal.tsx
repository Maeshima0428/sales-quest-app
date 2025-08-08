
import React, { useState } from 'react';
import { TaskCategory } from '../types';

interface TaskAddModalProps {
  onClose: () => void;
  onAddTask: (title: string, category: TaskCategory) => void;
}

const TaskAddModal: React.FC<TaskAddModalProps> = ({ onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>(TaskCategory.Daily);

  const handleAddTask = () => {
    if (title.trim()) {
      onAddTask(title, category);
      setTitle('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">新しいクエスト</h3>
        <input
          type="text"
          placeholder="クエスト名を入力..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={TaskCategory.Daily}>デイリークエスト (+50XP)</option>
          <option value={TaskCategory.Weekly}>ウィークリークエスト (+200XP)</option>
          <option value={TaskCategory.Challenge}>チャレンジクエスト (+500XP)</option>
        </select>
        <div className="flex space-x-3">
          <button onClick={onClose} className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300">キャンセル</button>
          <button onClick={handleAddTask} className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">追加</button>
        </div>
      </div>
    </div>
  );
};

export default TaskAddModal;
