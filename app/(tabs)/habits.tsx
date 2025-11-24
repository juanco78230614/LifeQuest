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

export default function HabitsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [missions, setMissions] = useState<Mission[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedMissions = await AsyncStorage.getItem('lifequest-missions');
    const savedUser = await AsyncStorage.getItem('lifequest-user');

    if (savedMissions) setMissions(JSON.parse(savedMissions));
    if (savedUser) setUsername(JSON.parse(savedUser).username);
  };

  const habitMissions = missions.filter(m => m.category === 'habit');
  const completedHabits = habitMissions.filter(m => m.completed).length;
  const totalHabits = habitMissions.length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

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
              Seguimiento de Hábitos
            </Text>

            {/* Completion Card */}
            <View style={[styles.completionCard, isDark ? styles.cardDark : styles.cardLight]}>
              <View style={styles.completionHeader}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.completionIcon}
                >
                  <Text style={styles.completionIconText}>📈</Text>
                </LinearGradient>
                <View style={styles.completionInfo}>
                  <Text style={[styles.completionLabel, isDark ? styles.descDark : styles.descLight]}>
                    Tasa de completitud
                  </Text>
                  <Text style={[styles.completionValue, isDark ? styles.textDark : styles.textLight]}>
                    {completionRate}%
                  </Text>
                </View>
              </View>

              <View style={[styles.progressBarBg, isDark ? styles.progressBarBgDark : styles.progressBarBgLight]}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={[styles.progressBar, { width: `${completionRate}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>
            </View>

            {/* Habits List */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>📅</Text>
                <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
                  Tus hábitos
                </Text>
              </View>

              {habitMissions.length === 0 ? (
                <View style={[styles.emptyState, isDark ? styles.emptyStateDark : styles.emptyStateLight]}>
                  <Text style={[styles.emptyText, isDark ? styles.emptyTextDark : styles.emptyTextLight]}>
                    No tienes hábitos registrados
                  </Text>
                  <Text style={[styles.emptySubtext, isDark ? styles.emptySubtextDark : styles.emptySubtextLight]}>
                    Crea misiones de tipo "Hábito" para hacer seguimiento
                  </Text>
                </View>
              ) : (
                <View style={styles.habitsList}>
                  {habitMissions.map(habit => (
                    <View
                      key={habit.id}
                      style={[styles.habitCard, isDark ? styles.habitCardDark : styles.habitCardLight]}
                    >
                      <View style={styles.habitContent}>
                        <Text style={[styles.habitTitle, isDark ? styles.textDark : styles.textLight]}>
                          {habit.title}
                        </Text>
                        <Text style={[styles.habitStatus, isDark ? styles.descDark : styles.descLight]}>
                          {habit.completed ? '✓ Completado hoy' : 'Pendiente'}
                        </Text>
                      </View>
                      <View style={[
                        styles.habitBadge,
                        habit.completed ? styles.habitBadgeCompleted : (isDark ? styles.habitBadgePendingDark : styles.habitBadgePendingLight)
                      ]}>
                        <Text style={[
                          styles.habitBadgeText,
                          habit.completed ? styles.habitBadgeTextCompleted : (isDark ? styles.habitBadgeTextPendingDark : styles.habitBadgeTextPendingLight)
                        ]}>
                          {habit.completed ? 'Hecho' : 'Por hacer'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Tip Card */}
            <View style={[styles.tipCard, isDark ? styles.tipCardDark : styles.tipCardLight]}>
              <Text style={[styles.tipText, isDark ? styles.tipTextDark : styles.tipTextLight]}>
                💡 <Text style={styles.tipBold}>Consejo:</Text> Los hábitos son acciones que repites regularmente.
                Completa tus hábitos diarios para mantener tu racha activa.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
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
  completionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  cardLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  completionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  completionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionIconText: {
    fontSize: 24,
  },
  completionInfo: {
    flex: 1,
  },
  completionLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  completionValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarBgLight: {
    backgroundColor: '#e5e7eb',
  },
  progressBarBgDark: {
    backgroundColor: '#334155',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
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
  emptyState: {
    padding: 48,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyStateLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  emptyStateDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyTextLight: {
    color: '#6b7280',
  },
  emptyTextDark: {
    color: '#94a3b8',
  },
  emptySubtextLight: {
    color: '#9ca3af',
  },
  emptySubtextDark: {
    color: '#64748b',
  },
  habitsList: {
    gap: 12,
  },
  habitCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  habitCardLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  habitCardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  habitContent: {
    flex: 1,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  habitStatus: {
    fontSize: 14,
  },
  habitBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  habitBadgeCompleted: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  habitBadgePendingLight: {
    backgroundColor: '#e5e7eb',
  },
  habitBadgePendingDark: {
    backgroundColor: '#334155',
  },
  habitBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  habitBadgeTextCompleted: {
    color: '#10b981',
  },
  habitBadgeTextPendingLight: {
    color: '#6b7280',
  },
  habitBadgeTextPendingDark: {
    color: '#94a3b8',
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
  },
  tipCardLight: {
    backgroundColor: 'rgba(220, 252, 231, 1)',
    borderWidth: 1,
    borderColor: '#86efac',
  },
  tipCardDark: {
    backgroundColor: 'rgba(6, 78, 59, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipTextLight: {
    color: '#065f46',
  },
  tipTextDark: {
    color: '#d1fae5',
  },
  tipBold: {
    fontWeight: '600',
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
