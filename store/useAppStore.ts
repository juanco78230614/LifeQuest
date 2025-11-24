import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Mission {
  id: string;
  title: string;
  category: 'productivity' | 'wellness' | 'habit';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
  userId: string;
}

export interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalMissionsCompleted: number;
  streak: number;
  lastCompletionDate: string | null;
}

export interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  createdAt: string;
}

interface AppState {
  // User
  user: User | null;
  isLoggedIn: boolean;
  hasSeenWelcome: boolean;
  hasSeenOnboarding: boolean;
  
  // Missions
  missions: Mission[];
  
  // Stats
  userStats: UserStats;
  
  // Theme
  isDarkMode: boolean;
  
  // Admin
  allUsers: User[];
  
  // Actions
  login: (username: string, password: string, isSignUp: boolean) => Promise<void>;
  logout: () => Promise<void>;
  setHasSeenWelcome: (seen: boolean) => void;
  setHasSeenOnboarding: (seen: boolean) => void;
  
  // Mission Actions
  addMission: (mission: Omit<Mission, 'id' | 'completed' | 'createdAt' | 'userId'>) => void;
  toggleMission: (id: string) => void;
  deleteMission: (id: string) => void;
  
  // Stats Actions
  awardXP: (xp: number) => void;
  updateStreak: () => void;
  
  // Theme Actions
  toggleTheme: () => void;
  
  // Admin Actions
  getAllUsers: () => Promise<User[]>;
  deleteUser: (userId: string) => Promise<void>;
  getAllMissions: () => Promise<Mission[]>;
  resetUserProgress: (userId: string) => Promise<void>;
  promoteToAdmin: (userId: string) => Promise<void>;
  
  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const ADMIN_PASSWORD = 'admin123'; // En producción, usar mejor autenticación

export const useAppStore = create<AppState>((set, get) => ({
  // Initial State
  user: null,
  isLoggedIn: false,
  hasSeenWelcome: false,
  hasSeenOnboarding: false,
  missions: [],
  userStats: {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalMissionsCompleted: 0,
    streak: 0,
    lastCompletionDate: null,
  },
  isDarkMode: true,
  allUsers: [],

  // Actions
  login: async (username: string, password: string, isSignUp: boolean) => {
    try {
      const usersJson = await AsyncStorage.getItem('lifequest-all-users');
      let users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      // Check for admin login
      const isAdminLogin = username === 'admin' && password === ADMIN_PASSWORD;
      
      if (isSignUp) {
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          username: username.trim(),
          isAdmin: isAdminLogin,
          createdAt: new Date().toISOString(),
        };
        
        users.push(newUser);
        await AsyncStorage.setItem('lifequest-all-users', JSON.stringify(users));
        
        set({ 
          user: newUser, 
          isLoggedIn: true,
          hasSeenOnboarding: false,
        });
        
        // Save user data
        await AsyncStorage.setItem('lifequest-current-user', JSON.stringify(newUser));
        
      } else {
        // Login existing user or admin
        let existingUser = users.find(u => u.username === username);
        
        if (!existingUser && isAdminLogin) {
          // Create admin user if doesn't exist
          existingUser = {
            id: 'admin-' + Date.now().toString(),
            username: 'admin',
            isAdmin: true,
            createdAt: new Date().toISOString(),
          };
          users.push(existingUser);
          await AsyncStorage.setItem('lifequest-all-users', JSON.stringify(users));
        }
        
        if (existingUser) {
          set({ 
            user: existingUser, 
            isLoggedIn: true,
          });
          
          // Load user data
          await AsyncStorage.setItem('lifequest-current-user', JSON.stringify(existingUser));
          await get().loadFromStorage();
          
          // Check onboarding
          const onboardingKey = `lifequest-onboarding-${existingUser.id}`;
          const hasCompleted = await AsyncStorage.getItem(onboardingKey);
          set({ hasSeenOnboarding: !!hasCompleted });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  },

  logout: async () => {
    await get().saveToStorage();
    await AsyncStorage.removeItem('lifequest-current-user');
    set({ 
      user: null, 
      isLoggedIn: false,
      missions: [],
      userStats: {
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalMissionsCompleted: 0,
        streak: 0,
        lastCompletionDate: null,
      },
    });
  },

  setHasSeenWelcome: (seen: boolean) => {
    set({ hasSeenWelcome: seen });
    if (seen) {
      AsyncStorage.setItem('lifequest-welcome-seen', 'true');
    }
  },

  setHasSeenOnboarding: (seen: boolean) => {
    const user = get().user;
    if (user) {
      set({ hasSeenOnboarding: seen });
      if (seen) {
        AsyncStorage.setItem(`lifequest-onboarding-${user.id}`, 'true');
      }
    }
  },

  // Mission Actions
  addMission: (mission) => {
    const user = get().user;
    if (!user) return;

    const newMission: Mission = {
      ...mission,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    set(state => ({
      missions: [newMission, ...state.missions],
    }));
    
    get().saveToStorage();
  },

  toggleMission: (id: string) => {
    const mission = get().missions.find(m => m.id === id);
    if (!mission || mission.completed) return;

    set(state => ({
      missions: state.missions.map(m =>
        m.id === id ? { ...m, completed: true, completedAt: new Date().toISOString() } : m
      ),
    }));

    // Award XP and update streak
    get().awardXP(mission.xp);
    get().updateStreak();
    get().saveToStorage();
  },

  deleteMission: (id: string) => {
    set(state => ({
      missions: state.missions.filter(m => m.id !== id),
    }));
    get().saveToStorage();
  },

  // Stats Actions
  awardXP: (xpAmount: number) => {
    set(state => {
      let newXP = state.userStats.xp + xpAmount;
      let newLevel = state.userStats.level;
      let xpToNextLevel = state.userStats.xpToNextLevel;

      // Level up logic
      while (newXP >= xpToNextLevel) {
        newXP -= xpToNextLevel;
        newLevel += 1;
        xpToNextLevel = Math.floor(xpToNextLevel * 1.5);
      }

      return {
        userStats: {
          ...state.userStats,
          xp: newXP,
          level: newLevel,
          xpToNextLevel,
          totalMissionsCompleted: state.userStats.totalMissionsCompleted + 1,
        },
      };
    });
  },

  updateStreak: () => {
    set(state => {
      const today = new Date().toDateString();
      const lastDate = state.userStats.lastCompletionDate
        ? new Date(state.userStats.lastCompletionDate).toDateString()
        : null;

      if (lastDate === today) {
        return state;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      let newStreak = state.userStats.streak;
      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else if (lastDate === null || lastDate !== today) {
        newStreak = 1;
      }

      return {
        userStats: {
          ...state.userStats,
          streak: newStreak,
          lastCompletionDate: new Date().toISOString(),
        },
      };
    });
  },

  toggleTheme: () => {
    set(state => ({ isDarkMode: !state.isDarkMode }));
    const newTheme = !get().isDarkMode ? 'dark' : 'light';
    AsyncStorage.setItem('lifequest-theme', newTheme);
  },

  // Admin Actions
  getAllUsers: async () => {
    try {
      const usersJson = await AsyncStorage.getItem('lifequest-all-users');
      const users = usersJson ? JSON.parse(usersJson) : [];
      set({ allUsers: users });
      return users;
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const usersJson = await AsyncStorage.getItem('lifequest-all-users');
      let users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      users = users.filter(u => u.id !== userId);
      await AsyncStorage.setItem('lifequest-all-users', JSON.stringify(users));
      
      // Delete user data
      await AsyncStorage.removeItem(`lifequest-missions-${userId}`);
      await AsyncStorage.removeItem(`lifequest-stats-${userId}`);
      await AsyncStorage.removeItem(`lifequest-onboarding-${userId}`);
      
      set({ allUsers: users });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  },

  getAllMissions: async () => {
    try {
      const usersJson = await AsyncStorage.getItem('lifequest-all-users');
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      let allMissions: Mission[] = [];
      for (const user of users) {
        const missionsJson = await AsyncStorage.getItem(`lifequest-missions-${user.id}`);
        if (missionsJson) {
          const userMissions = JSON.parse(missionsJson);
          allMissions = [...allMissions, ...userMissions];
        }
      }
      
      return allMissions;
    } catch (error) {
      console.error('Error getting all missions:', error);
      return [];
    }
  },

  resetUserProgress: async (userId: string) => {
    try {
      await AsyncStorage.removeItem(`lifequest-missions-${userId}`);
      await AsyncStorage.removeItem(`lifequest-stats-${userId}`);
      
      // If it's current user, reset state
      const currentUser = get().user;
      if (currentUser && currentUser.id === userId) {
        set({
          missions: [],
          userStats: {
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            totalMissionsCompleted: 0,
            streak: 0,
            lastCompletionDate: null,
          },
        });
      }
    } catch (error) {
      console.error('Error resetting user progress:', error);
    }
  },

  promoteToAdmin: async (userId: string) => {
    try {
      const usersJson = await AsyncStorage.getItem('lifequest-all-users');
      let users: User[] = usersJson ? JSON.parse(usersJson) : [];
      
      users = users.map(u => u.id === userId ? { ...u, isAdmin: true } : u);
      await AsyncStorage.setItem('lifequest-all-users', JSON.stringify(users));
      
      // Update current user if it's them
      const currentUser = get().user;
      if (currentUser && currentUser.id === userId) {
        set({ user: { ...currentUser, isAdmin: true } });
      }
      
      set({ allUsers: users });
    } catch (error) {
      console.error('Error promoting user:', error);
    }
  },

  // Persistence
  loadFromStorage: async () => {
    try {
      const user = get().user;
      if (!user) return;

      const [missionsJson, statsJson, themeJson, welcomeJson] = await Promise.all([
        AsyncStorage.getItem(`lifequest-missions-${user.id}`),
        AsyncStorage.getItem(`lifequest-stats-${user.id}`),
        AsyncStorage.getItem('lifequest-theme'),
        AsyncStorage.getItem('lifequest-welcome-seen'),
      ]);

      const updates: Partial<AppState> = {};

      if (missionsJson) updates.missions = JSON.parse(missionsJson);
      if (statsJson) updates.userStats = JSON.parse(statsJson);
      if (themeJson) updates.isDarkMode = themeJson === 'dark';
      if (welcomeJson) updates.hasSeenWelcome = true;

      set(updates);
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const { user, missions, userStats } = get();
      if (!user) return;

      await Promise.all([
        AsyncStorage.setItem(`lifequest-missions-${user.id}`, JSON.stringify(missions)),
        AsyncStorage.setItem(`lifequest-stats-${user.id}`, JSON.stringify(userStats)),
      ]);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
}));
