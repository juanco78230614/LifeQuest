// store/useAppStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, User, Mission, Achievement } from '../app/types';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const STORAGE_KEY = '@lifequest_data';

// XP required for each level (exponential growth)
const getXPForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Default achievements
const defaultAchievements: Achievement[] = [
  { id: '1', title: 'Primera Misión', description: 'Completa tu primera misión', icon: '🎯', unlocked: false },
  { id: '2', title: 'Racha de 7 días', description: 'Mantén una racha de 7 días consecutivos', icon: '🔥', unlocked: false },
  { id: '3', title: 'Nivel 10', description: 'Alcanza el nivel 10', icon: '⭐', unlocked: false },
  { id: '4', title: 'Maestro Productivo', description: 'Completa 50 misiones de productividad', icon: '💼', unlocked: false },
  { id: '5', title: 'Guerrero del Bienestar', description: 'Completa 30 misiones de bienestar', icon: '❤️', unlocked: false },
];

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  users: [],
  missions: [],
  achievements: defaultAchievements,

  // AUTH (Firebase-backed)
  login: async (username: string, password: string) => {
    try {
      const { users } = get();

      // Primero intenta buscar localmente por username
      const local = users.find((u) => u.username === username);

      if (local) {
        // Si existe localmente, intenta autenticación con su email en Firebase
        await signInWithEmailAndPassword(auth, local.email, password);
        // Actualiza lastActive + streak localmente
        const today = new Date().toDateString();
        const lastActive = new Date(local.lastActiveDate).toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        let newStreak = local.streak;
        if (lastActive !== today) {
          if (lastActive === yesterday) newStreak += 1;
          else newStreak = 1;
        }

        const updatedUser: User = { ...local, lastActiveDate: new Date().toISOString(), streak: newStreak };

        set({ currentUser: updatedUser, users: users.map((u) => (u.id === local.id ? updatedUser : u)) });
        await get().saveToStorage();
        return true;
      } else {
        // Si no existe localmente, intentamos iniciar sesión en Firebase directamente
        // Aquí asumimos que el usuario introducirá el email en lugar del username si no existe localmente.
        // Como tu UI usa 'username', podemos intentar inferir email (no ideal). Mejor práctica: en Login usar email.
        // Intentamos con username como email fallback:
        try {
          await signInWithEmailAndPassword(auth, username, password);
          const fbUser = auth.currentUser;
          if (!fbUser) return false;

          // Crear usuario local a partir del email (username por defecto = parte antes de @)
          const email = fbUser.email || '';
          const derivedUsername = email.split('@')[0] || `user_${fbUser.uid.slice(0,6)}`;

          const newUser: User = {
            id: fbUser.uid,
            username: derivedUsername,
            email,
            role: 'user',
            level: 1,
            xp: 0,
            totalXP: 0,
            streak: 1,
            lastActiveDate: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            hasCompletedOnboarding: false,
          };

          set({ currentUser: newUser, users: [...users, newUser] });
          await get().saveToStorage();
          return true;
        } catch (e) {
          // No encontrado ni en local ni en firebase
          console.warn('Login fallo (no local y firebase):', e);
          return false;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const { users } = get();
      // Validación local: nombre o email duplicado
      if (users.some((u) => u.username === username || u.email === email)) {
        return false;
      }

      // Crear usuario en Firebase
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser: FirebaseUser | null = cred.user ?? null;
      const id = fbUser?.uid ?? Date.now().toString();

      const newUser: User = {
        id,
        username,
        email,
        role: 'user',
        level: 1,
        xp: 0,
        totalXP: 0,
        streak: 1,
        lastActiveDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        hasCompletedOnboarding: false,
      };

      set({ currentUser: newUser, users: [...users, newUser] });
      await get().saveToStorage();
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase signOut error', e);
    }
    set({ currentUser: null });
  },

  // User actions
  updateUser: (userId: string, updates: Partial<User>) => {
    const { users, currentUser } = get();
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, ...updates } : u));

    set({
      users: updatedUsers,
      currentUser: currentUser?.id === userId ? { ...currentUser, ...updates } : currentUser,
    });

    get().saveToStorage();
  },

  completeOnboarding: () => {
    const { currentUser } = get();
    if (currentUser) get().updateUser(currentUser.id, { hasCompletedOnboarding: true });
  },

  // Mission actions
  addMission: (mission) => {
    const { currentUser, missions } = get();
    if (!currentUser) return;
    const newMission: Mission = { ...mission, id: Date.now().toString(), createdAt: new Date().toISOString(), userId: currentUser.id };
    set({ missions: [...missions, newMission] });
    get().saveToStorage();
  },

  completeMission: (missionId: string) => {
    const { missions, currentUser, achievements } = get();
    if (!currentUser) return;
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.completed) return;

    const updatedMissions = missions.map((m) => (m.id === missionId ? { ...m, completed: true, completedAt: new Date().toISOString() } : m));

    let newXP = currentUser.xp + mission.xp;
    let newLevel = currentUser.level;
    let newTotalXP = currentUser.totalXP + mission.xp;

    while (newXP >= getXPForLevel(newLevel)) {
      newXP -= getXPForLevel(newLevel);
      newLevel += 1;
    }

    get().updateUser(currentUser.id, { xp: newXP, level: newLevel, totalXP: newTotalXP });

    const userMissions = updatedMissions.filter((m) => m.userId === currentUser.id);
    const completedMissions = userMissions.filter((m) => m.completed).length;
    const productivityCompleted = userMissions.filter((m) => m.completed && m.category === 'productivity').length;
    const wellnessCompleted = userMissions.filter((m) => m.completed && m.category === 'wellness').length;

    if (completedMissions === 1 && !achievements[0].unlocked) get().unlockAchievement('1');
    if (currentUser.streak >= 7 && !achievements[1].unlocked) get().unlockAchievement('2');
    if (newLevel >= 10 && !achievements[2].unlocked) get().unlockAchievement('3');
    if (productivityCompleted >= 50 && !achievements[3].unlocked) get().unlockAchievement('4');
    if (wellnessCompleted >= 30 && !achievements[4].unlocked) get().unlockAchievement('5');

    set({ missions: updatedMissions });
    get().saveToStorage();
  },

  deleteMission: (missionId: string) => {
    const { missions } = get();
    set({ missions: missions.filter((m) => m.id !== missionId) });
    get().saveToStorage();
  },

  // Achievement actions
  unlockAchievement: (achievementId: string) => {
    const { achievements } = get();
    set({ achievements: achievements.map((a) => (a.id === achievementId ? { ...a, unlocked: true, unlockedAt: new Date().toISOString() } : a)) });
    get().saveToStorage();
  },

  getStats: () => {
    const { missions, currentUser, achievements } = get();
    if (!currentUser) return { totalMissions: 0, completedMissions: 0, activeMissions: 0, productivityMissions: 0, wellnessMissions: 0, habitMissions: 0, unlockedAchievements: 0 };

    const userMissions = missions.filter((m) => m.userId === currentUser.id);
    const completedMissions = userMissions.filter((m) => m.completed);

    return {
      totalMissions: userMissions.length,
      completedMissions: completedMissions.length,
      activeMissions: userMissions.length - completedMissions.length,
      productivityMissions: completedMissions.filter((m) => m.category === 'productivity').length,
      wellnessMissions: completedMissions.filter((m) => m.category === 'wellness').length,
      habitMissions: completedMissions.filter((m) => m.category === 'habit').length,
      unlockedAchievements: achievements.filter((a) => a.unlocked).length,
    };
  },

  // Persistence
  loadFromStorage: async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        set({
          users: parsed.users || [],
          missions: parsed.missions || [],
          achievements: parsed.achievements || defaultAchievements,
        });
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const { users, missions, achievements } = get();
      const data = JSON.stringify({ users, missions, achievements });
      await AsyncStorage.setItem(STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
}));

// Helper function to get XP needed for next level
export const getXPNeeded = (level: number): number => {
  return getXPForLevel(level);
};
