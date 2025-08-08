
import React from 'react';
import { Phone, Mail, FileText, Handshake, Target, Check } from 'lucide-react';
import { Task, TaskType } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
}

const getTaskIcon = (type: TaskType): React.ReactNode => {
  const commonProps = { className: "w-5 h-5" };
  switch(type) {
    case TaskType.Phone: return <Phone {...commonProps} />;
    case TaskType.Mail: return <Mail {...commonProps} />;
    case TaskType.Document: return <FileText {...commonProps} />;
    case TaskType.Handshake: return <Handshake {...commonProps} />;
    case TaskType.Proposal: return <Target {...commonProps} />;
    default: return <Target {...commonProps} />;
  }
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete }) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
      task.completed ? 'bg-green-100 border-green-200' : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      <div className="flex items-center flex-1 min-w-0">
        <div className={`mr-4 p-2 rounded-full ${task.completed ? 'text-green-600 bg-green-200' : 'text-blue-600 bg-blue-100'}`}>
          {getTaskIcon(task.type)}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {task.title}
          </p>
          <p className="text-sm text-yellow-600 font-semibold">+{task.xp}XP</p>
        </div>
      </div>
      <button
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
        className={`p-2 rounded-full transition-colors ${
          task.completed
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'bg-gray-200 text-gray-600 hover:bg-blue-500 hover:text-white'
        }`}
        aria-label={`Complete task: ${task.title}`}
      >
        <Check className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TaskItem;
