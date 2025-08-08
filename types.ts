
export interface UserData {
  name: string;
  position: string;
  department: string;
  company: string;
  email: string;
  experience: string;
  level: number;
  xp: number;
  xpToNext: number;
  totalXP: number;
  avatar: {
    suit: 'casual' | 'business' | 'premium' | 'executive';
    accessory: string;
    badge: string;
  };
  stats: {
    [key: string]: number;
    listening: number;
    proposal: number;
    action: number;
    trust: number;
    closing: number;
  };
  badges: string[];
  rank: number | null;
  teamRank: number | null;
}

export enum TaskCategory {
  Daily = 'daily',
  Weekly = 'weekly',
  Challenge = 'challenge',
}

export enum TaskType {
  Phone = 'phone',
  Mail = 'mail',
  Document = 'document',
  Handshake = 'handshake',
  Proposal = 'proposal',
  Target = 'target',
}

export interface Task {
  id: number;
  title: string;
  category: TaskCategory;
  xp: number;
  completed: boolean;
  type: TaskType;
}
