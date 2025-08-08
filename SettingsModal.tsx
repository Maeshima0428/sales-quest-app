
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import type { UserData } from '../types';

interface SettingsModalProps {
  userData: UserData;
  onClose: () => void;
  onSave: (newSettings: Partial<UserData>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: userData.name || '',
    position: userData.position || '',
    department: userData.department || '',
    company: userData.company || '',
    email: userData.email || '',
    experience: userData.experience || ''
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          {userData.name ? 'ユーザー設定' : 'ようこそ！プロフィールを設定'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
            <input type="text" placeholder="山田 太郎" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
            <input type="text" placeholder="営業担当" value={formData.position} onChange={(e) => handleChange('position', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">部署</label>
            <input type="text" placeholder="営業部" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
            <input type="text" placeholder="株式会社セールスクエスト" value={formData.company} onChange={(e) => handleChange('company', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input type="email" placeholder="yamada@salesquest.co.jp" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">営業経験</label>
            <select value={formData.experience} onChange={(e) => handleChange('experience', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">選択してください</option>
              <option value="新卒">新卒（1年未満）</option>
              <option value="1-3年">1〜3年</option>
              <option value="3-5年">3〜5年</option>
              <option value="5-10年">5〜10年</option>
              <option value="10年以上">10年以上</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">キャンセル</button>
          <button onClick={handleSave} className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">保存</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
