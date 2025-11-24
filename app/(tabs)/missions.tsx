import { View, Text, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

interface Mission {
  id: string;
  title: string;
  category: 'productivity' | 'wellness' | 'habit';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  completed: boolean;
  createdAt: string;
}

interface UserStats {
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalMissionsCompleted: number;
  streak: number;
  lastCompletionDate: string | null;
}

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [missions, setMissions] = useState<Mission[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalMissionsCompleted: 0,
    streak: 0,
    lastCompletionDate: null,
  });
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedMissions = await AsyncStorage.getItem('lifequest-missions');
    const savedStats = await AsyncStorage.getItem('lifequest-stats');
    const savedUser = await AsyncStorage.getItem('lifequest-user');

    if (savedMissions) setMissions(JSON.parse(savedMissions));
    if (savedStats) setUserStats(JSON.parse(savedStats));
    if (savedUser) setUsername(JSON.parse(savedUser).username);
  };

  const totalXPEarned = missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const missionsByCategory = {
    productivity: {
      completed: missions.filter(m => m.category === 'productivity' && m.completed).length,
      total: missions.filter(m => m.category === 'productivity').length,
    },
    wellness: {
      completed: missions.filter(m => m.category === 'wellness' && m.completed).length,
      total: missions.filter(m => m.category === 'wellness').length,
    },
    habit: {
      completed: missions.filter(m => m.category === 'habit' && m.completed).length,
      total: missions.filter(m => m.category === 'habit').length,
    },
  };

  const activeMissions = missions.filter(m => !m.completed).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isDark ? ['#064e3b', '#065f46', '#047857'] : ['#f0fdf4', '#dcfce7', '#bbf7d0']}
        style={styles.gradient}
      >
        <StatusBar style={isDark ? 'light' : 'dark'} />
        
        {/* Header */}
        <LinearGradient
          colors={['#10b981', '#059669']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>LifeQuest</Text>
          <Text style={styles.headerSubtitle}>Hola, {username} 👋</Text>
        </LinearGradient>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={[styles.title, isDark ? styles.textDark : styles.textLight]}>
              Estadísticas
            </Text>

            {/* Level Card */}
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.levelCard}
            >
              <View style={styles.levelIcon}>
                <Text style={styles.levelIconText}>🏆</Text>
              </View>
              <View style={styles.levelInfo}>
                <Text style={styles.levelLabel}>Nivel actual</Text>
                <Text style={styles.levelValue}>Nivel {userStats.level}</Text>
                <Text style={styles.levelProgress}>
                  {userStats.xp} / {userStats.xpToNextLevel} XP hasta nivel {userStats.level + 1}
                </Text>
              </View>
            </LinearGradient>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <StatBox
                icon="⚡"
                label="XP Total Ganado"
                value={totalXPEarned.toLocaleString()}
                color={['#f59e0b', '#d97706']}
                isDark={isDark}
              />
              <StatBox
                icon="🎯"
                label="Misiones Completadas"
                value={userStats.totalMissionsCompleted.toString()}
                color={['#10b981', '#059669']}
                isDark={isDark}
              />
              <StatBox
                icon="📅"
                label="Racha Actual"
                value={`${userStats.streak} días`}
                color={['#f97316', '#ea580c']}
                isDark={isDark}
              />
              <StatBox
                icon="📋"
                label="Misiones Activas"
                value={activeMissions.toString()}
                color={['#3b82f6', '#2563eb']}
                isDark={isDark}
              />
            </View>

            {/* Category Breakdown */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📈</Text>
                <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
                  Por Categoría
                </Text>
              </View>

              <View style={styles.categoryList}>
                <CategoryBar
                  label="Productividad"
                  completed={missionsByCategory.productivity.completed}
                  total={missionsByCategory.productivity.total}
                  color="#3b82f6"
                  isDark={isDark}
                />
                <CategoryBar
                  label="Bienestar"
                  completed={missionsByCategory.wellness.completed}
                  total={missionsByCategory.wellness.total}
                  color="#ec4899"
                  isDark={isDark}
                />
                <CategoryBar
                  label="Hábitos"
                  completed={missionsByCategory.habit.completed}
                  total={missionsByCategory.habit.total}
                  color="#10b981"
                  isDark={isDark}
                />
              </View>
            </View>

            {/* Achievements */}
            <View style={[styles.achievementsCard, isDark ? styles.achievementsCardDark : styles.achievementsCardLight]}>
              <Text style={[styles.achievementsTitle, isDark ? styles.achievementsTitleDark : styles.achievementsTitleLight]}>
                🏆 Logros Desbloqueados
              </Text>
              
              <View style={styles.achievementsList}>
                {userStats.level >= 5 && (
                  <AchievementBadge
                    title="Guerrero Nivel 5"
                    description="Alcanzaste nivel 5"
                    isDark={isDark}
                  />
                )}
                {userStats.streak >= 7 && (
                  <AchievementBadge
                    title="Racha Semanal"
                    description="7 días consecutivos"
                    isDark={isDark}
                  />
                )}
                {userStats.totalMissionsCompleted >= 10 && (
                  <AchievementBadge
                    title="Veterano"
                    description="10 misiones completadas"
                    isDark={isDark}
                  />
                )}
                {userStats.level === 1 && userStats.totalMissionsCompleted === 0 && (
                  <Text style={[styles.noAchievements, isDark ? styles.noAchievementsDark : styles.noAchievementsLight]}>
                    Completa misiones para desbloquear logros
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function StatBox({ icon, label, value, color, isDark }: any) {
  return (
    <View style={[styles.statBox, isDark ? styles.statBoxDark : styles.statBoxLight]}>
      <LinearGradient
        colors={color}
        style={styles.statBoxIcon}
      >
        <Text style={styles.statBoxIconText}>{icon}</Text>
      </LinearGradient>
      <Text style={[styles.statBoxValue, isDark ? styles.textDark : styles.textLight]}>{value}</Text>
      <Text style={[styles.statBoxLabel, isDark ? styles.descDark : styles.descLight]}>{label}</Text>
    </View>
  );
}

function CategoryBar({ label, completed, total, color, isDark }: any) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  
  return (
    <View style={[styles.categoryBar, isDark ? styles.categoryBarDark : styles.categoryBarLight]}>
      <View style={styles.categoryHeader}>
        <Text style={[styles.categoryLabel, isDark ? styles.textDark : styles.textLight]}>{label}</Text>
        <Text style={[styles.categoryValue, isDark ? styles.textDark : styles.textLight]}>
          {completed} / {total}
        </Text>
      </View>
      <View style={[styles.categoryProgressBg, isDark ? styles.categoryProgressBgDark : styles.categoryProgressBgLight]}>
        <View
          style={[styles.categoryProgress, { width: `${percentage}%`, backgroundColor: color }]}
        />
      </View>
    </View>
  );
}

function AchievementBadge({ title, description, isDark }: any) {
  return (
    <View style={[styles.achievementBadge, isDark ? styles.achievementBadgeDark : styles.achievementBadgeLight]}>
      <View style={styles.achievementIcon}>
        <Text style={styles.achievementIconText}>🏆</Text>
      </View>
      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, isDark ? styles.textDark : styles.textLight]}>{title}</Text>
        <Text style={[styles.achievementDesc, isDark ? styles.achievementDescDark : styles.achievementDescLight]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(209, 250, 229, 0.9)',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  levelCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 24,
    gap: 16,
    marginBottom: 16,
  },
  levelIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelIconText: {
    fontSize: 32,
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 12,
    color: 'rgba(209, 250, 229, 0.9)',
    marginBottom: 4,
  },
  levelValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  levelProgress: {
    fontSize: 14,
    color: 'rgba(209, 250, 229, 0.9)',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
  },
  statBoxLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statBoxDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  statBoxIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statBoxIconText: {
    fontSize: 20,
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statBoxLabel: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoryList: {
    gap: 12,
  },
  categoryBar: {
    borderRadius: 16,
    padding: 16,
  },
  categoryBarLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryBarDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryProgressBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  categoryProgressBgLight: {
    backgroundColor: '#e5e7eb',
  },
  categoryProgressBgDark: {
    backgroundColor: '#334155',
  },
  categoryProgress: {
    height: '100%',
    borderRadius: 4,
  },
  achievementsCard: {
    borderRadius: 16,
    padding: 16,
  },
  achievementsCardLight: {
    backgroundColor: 'rgba(220, 252, 231, 1)',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  achievementsCardDark: {
    backgroundColor: 'rgba(6, 78, 59, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  achievementsTitleLight: {
    color: '#065f46',
  },
  achievementsTitleDark: {
    color: '#d1fae5',
  },
  achievementsList: {
    gap: 8,
  },
  achievementBadge: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderRadius: 12,
  },
  achievementBadgeLight: {
    backgroundColor: 'rgba(134, 239, 172, 0.5)',
  },
  achievementBadgeDark: {
    backgroundColor: 'rgba(6, 95, 70, 0.3)',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
  },
  achievementDescLight: {
    color: '#065f46',
  },
  achievementDescDark: {
    color: '#86efac',
  },
  noAchievements: {
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 8,
  },
  noAchievementsLight: {
    color: '#065f46',
  },
  noAchievementsDark: {
    color: '#86efac',
  },
  textLight: {
    color: '#111827',
  },
  textDark: {
    color: '#ffffff',
  },
  descLight: {
    color: '#6b7280',
  },
  descDark: {
    color: '#94a3b8',
  },
});
