export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type MissionCategory = 'productivity' | 'wellness' | 'habit';
export type UserRole = 'user' | 'admin';

export interface Mission {
  id: string;
  title: string;
  category: MissionCategory;
  difficulty: DifficultyLevel;
  xp: number;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  userId: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  level: number;
  xp: number;
  totalXP: number;
  streak: number;
  lastActiveDate: string;
  createdAt: string;
  hasCompletedOnboarding: boolean;
}

export interface AppState {
  // User Management
  currentUser: User | null;
  users: User[];
  
  // Missions
  missions: Mission[];
  
  // Achievements
  achievements: Achievement[];
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // User actions
  updateUser: (userId: string, updates: Partial<User>) => void;
  completeOnboarding: () => void;
  
  // Mission actions
  addMission: (mission: Omit<Mission, 'id' | 'createdAt' | 'userId'>) => void;
  completeMission: (missionId: string) => void;
  deleteMission: (missionId: string) => void;
  
  // Achievement actions
  unlockAchievement: (achievementId: string) => void;
  
  // Stats
  getStats: () => {
    totalMissions: number;
    completedMissions: number;
    activeMissions: number;
    productivityMissions: number;
    wellnessMissions: number;
    habitMissions: number;
    unlockedAchievements: number;
  };
  
  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}
