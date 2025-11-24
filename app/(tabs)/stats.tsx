import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';

export default function StatsScreen() {
  const { isDarkMode, user, userStats, missions } = useAppStore();

  const totalXPEarned = missions
    .filter(m => m.completed)
    .reduce((sum, m) => sum + m.xp, 0);

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
        colors={
          isDarkMode
            ? ['#6e6e6eff', '#065f46', '#047857']
            : ['#f0fdf4', '#dcfce7', '#bbf7d0']
        }
        style={styles.gradient}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {/* HEADER */}
        <LinearGradient colors={['#10b981', '#059669']} style={styles.header}>
          <Text style={styles.headerTitle}>LifeQuest</Text>
          <Text style={styles.headerSubtitle}>
            Hola, {user?.username ?? 'usuario'} 👋
          </Text>
        </LinearGradient>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text
              style={[
                styles.title,
                isDarkMode ? styles.textDark : styles.textLight,
              ]}
            >
              Estadísticas
            </Text>

            {/* LEVEL CARD */}
            <LinearGradient colors={['#10b981', '#059669']} style={styles.levelCard}>
              <View style={styles.levelIcon}>
                <Text style={styles.levelIconText}>🏆</Text>
              </View>

              <View style={styles.levelInfo}>
                <Text style={styles.levelLabel}>Nivel actual</Text>
                <Text style={styles.levelValue}>Nivel {userStats.level}</Text>
                <Text style={styles.levelProgress}>
                  {userStats.xp} / {userStats.xpToNextLevel} XP hasta nivel{' '}
                  {userStats.level + 1}
                </Text>
              </View>
            </LinearGradient>

            {/* STATS GRID */}
            <View style={styles.statsGrid}>
              <StatBox
                icon="⚡"
                label="XP Total Ganado"
                value={totalXPEarned.toString()}
                color={['#f59e0b', '#d97706']}
              />
              <StatBox
                icon="🎯"
                label="Misiones Completadas"
                value={userStats.totalMissionsCompleted.toString()}
                color={['#10b981', '#059669']}
              />
              <StatBox
                icon="📅"
                label="Racha Actual"
                value={`${userStats.streak} días`}
                color={['#f97316', '#ea580c']}
              />
              <StatBox
                icon="📋"
                label="Misiones Activas"
                value={activeMissions.toString()}
                color={['#3b82f6', '#2563eb']}
              />
            </View>

            {/* CATEGORY BREAKDOWN */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📈</Text>
                <Text style={[styles.sectionTitle, isDarkMode ? styles.textDark : styles.textLight]}>
                  Por Categoría
                </Text>
              </View>

              <CategoryBar
                label="Productividad"
                completed={missionsByCategory.productivity.completed}
                total={missionsByCategory.productivity.total}
                color="#3b82f6"
                isDark={isDarkMode}
              />

              <CategoryBar
                label="Bienestar"
                completed={missionsByCategory.wellness.completed}
                total={missionsByCategory.wellness.total}
                color="#ec4899"
                isDark={isDarkMode}
              />

              <CategoryBar
                label="Hábitos"
                completed={missionsByCategory.habit.completed}
                total={missionsByCategory.habit.total}
                color="#10b981"
                isDark={isDarkMode}
              />
            </View>

            {/* ACHIEVEMENTS */}
            <Card
              style={[
                styles.achievementsCard,
                isDarkMode
                  ? styles.achievementsCardDark
                  : styles.achievementsCardLight,
              ]}
            >
              <Text
                style={[
                  styles.achievementsTitle,
                  isDarkMode
                    ? styles.achievementsTitleDark
                    : styles.achievementsTitleLight,
                ]}
              >
                🏆 Logros Desbloqueados
              </Text>

              <View style={styles.achievementsList}>
                {userStats.level >= 5 && (
                  <AchievementBadge
                    title="Guerrero Nivel 5"
                    description="Alcanzaste nivel 5"
                    isDark={isDarkMode}
                  />
                )}

                {userStats.streak >= 7 && (
                  <AchievementBadge
                    title="Racha Semanal"
                    description="7 días consecutivos"
                    isDark={isDarkMode}
                  />
                )}

                {userStats.totalMissionsCompleted >= 10 && (
                  <AchievementBadge
                    title="Veterano"
                    description="10 misiones completadas"
                    isDark={isDarkMode}
                  />
                )}

                {userStats.totalMissionsCompleted === 0 && (
                  <Text
                    style={[
                      styles.noAchievements,
                      isDarkMode
                        ? styles.noAchievementsDark
                        : styles.noAchievementsLight,
                    ]}
                  >
                    Completa misiones para desbloquear logros
                  </Text>
                )}
              </View>
            </Card>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

/* --- COMPONENTES --- */

function StatBox({ icon, value, label, color }) {
  return (
    <View style={styles.statBox}>
      <LinearGradient colors={color} style={styles.statBoxGradient}>
        <Text style={styles.statBoxIcon}>{icon}</Text>
        <Text style={styles.statBoxValue}>{value}</Text>
        <Text style={styles.statBoxLabel}>{label}</Text>
      </LinearGradient>
    </View>
  );
}

function CategoryBar({ label, completed, total, color, isDark }) {
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <Card style={{ marginBottom: 12 }}>
      <View style={styles.categoryHeader}>
        <Text style={[styles.categoryLabel, isDark ? styles.textDark : styles.textLight]}>
          {label}
        </Text>
        <Text style={[styles.categoryValue, isDark ? styles.textDark : styles.textLight]}>
          {completed} / {total}
        </Text>
      </View>

      <View
        style={[
          styles.categoryProgressBg,
          isDark ? styles.categoryProgressBgDark : styles.categoryProgressBgLight,
        ]}
      >
        <View
          style={[styles.categoryProgress, { width: `${percentage}%`, backgroundColor: color }]}
        />
      </View>
    </Card>
  );
}

function AchievementBadge({ title, description, isDark }) {
  return (
    <View
      style={[
        styles.achievementBadge,
        isDark ? styles.achievementBadgeDark : styles.achievementBadgeLight,
      ]}
    >
      <View style={styles.achievementIcon}>
        <Text style={styles.achievementIconText}>🏆</Text>
      </View>

      <View style={styles.achievementContent}>
        <Text style={[styles.achievementTitle, isDark ? styles.textDark : styles.textLight]}>
          {title}
        </Text>
        <Text
          style={[
            styles.achievementDesc,
            isDark ? styles.achievementDescDark : styles.achievementDescLight,
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

/* --- ESTILOS --- */
const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: 'rgba(209,250,229,0.9)', marginTop: 4 },
  content: { padding: 16 },

  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },

  /* --- LEVEL CARD --- */
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelIconText: { fontSize: 32 },
  levelInfo: { flex: 1 },
  levelLabel: { color: 'rgba(209,250,229,0.9)' },
  levelValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  levelProgress: { color: 'rgba(209,250,229,0.9)' },

  /* --- GRID --- */
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },

  statBox: { width: '48%', borderRadius: 16, overflow: 'hidden' },
  statBoxGradient: { padding: 16, alignItems: 'center' },
  statBoxIcon: { fontSize: 24 },
  statBoxValue: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  statBoxLabel: { color: '#fff' },

  /* CATEGORY */
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  sectionIcon: { fontSize: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600' },

  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryLabel: { fontSize: 16, fontWeight: '500' },
  categoryValue: { fontSize: 16, fontWeight: '600' },

  categoryProgressBg: { height: 8, borderRadius: 4 },
  categoryProgressBgLight: { backgroundColor: '#e5e7eb' },
  categoryProgressBgDark: { backgroundColor: '#334155' },
  categoryProgress: { height: '100%', borderRadius: 4 },

  /* ACHIEVEMENTS */
  achievementsCard: { padding: 12, borderRadius: 16 },
  achievementsCardLight: {
    backgroundColor: 'rgba(220,252,231,1)',
    borderColor: '#86efac',
    borderWidth: 1,
  },
  achievementsCardDark: {
    backgroundColor: 'rgba(6,78,59,0.3)',
    borderColor: 'rgba(16,185,129,0.3)',
    borderWidth: 1,
  },
  achievementsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  achievementsTitleLight: { color: '#065f46' },
  achievementsTitleDark: { color: '#d1fae5' },

  achievementsList: { gap: 8 },

  achievementBadge: { flexDirection: 'row', padding: 12, borderRadius: 12, gap: 10 },
  achievementBadgeLight: { backgroundColor: 'rgba(134,239,172,0.5)' },
  achievementBadgeDark: { backgroundColor: 'rgba(6,95,70,0.3)' },

  achievementIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f59e0b',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconText: { fontSize: 20 },

  achievementContent: { flex: 1 },
  achievementTitle: { fontSize: 14, fontWeight: '600' },
  achievementDesc: { fontSize: 12 },
  achievementDescLight: { color: '#065f46' },
  achievementDescDark: { color: '#86efac' },

  noAchievements: { paddingVertical: 8, textAlign: 'center' },
  noAchievementsLight: { color: '#065f46' },
  noAchievementsDark: { color: '#d1fae5' },

  textLight: { color: '#111827' },
  textDark: { color: '#fff' },
});
