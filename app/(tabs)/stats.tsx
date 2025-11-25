import { View, Text, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { getXPNeeded } from '../../store/useAppStore';

export default function StatsScreen() {
  const { currentUser, achievements, getStats } = useAppStore();
  const stats = getStats();
  const xpNeeded = currentUser ? getXPNeeded(currentUser.level) : 100;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Player Info */}
        <Card>
          <View className="items-center mb-4">
            <View className="bg-primary w-24 h-24 rounded-full items-center justify-center mb-3">
              <Text className="text-white text-4xl font-bold">
                {currentUser?.level || 1}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              Nivel {currentUser?.level || 1}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              @{currentUser?.username}
            </Text>
          </View>
          <ProgressBar
            current={currentUser?.xp || 0}
            total={xpNeeded}
          />
        </Card>

        {/* Overall Stats */}
        <Card>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Estadísticas Generales
          </Text>
          <View className="space-y-3">
            <StatRow
              label="XP Total"
              value={currentUser?.totalXP || 0}
              icon="⚡"
            />
            <StatRow
              label="Misiones Completadas"
              value={stats.completedMissions}
              icon="✅"
            />
            <StatRow
              label="Racha Actual"
              value={`${currentUser?.streak || 0} días`}
              icon="🔥"
            />
            <StatRow
              label="Misiones Activas"
              value={stats.activeMissions}
              icon="🎯"
            />
          </View>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Por Categoría
          </Text>
          <View className="space-y-3">
            <CategoryStat
              label="Productividad"
              value={stats.productivityMissions}
              icon="💼"
              color="bg-blue-500"
            />
            <CategoryStat
              label="Bienestar"
              value={stats.wellnessMissions}
              icon="❤️"
              color="bg-red-500"
            />
            <CategoryStat
              label="Hábitos"
              value={stats.habitMissions}
              icon="🔄"
              color="bg-green-500"
            />
          </View>
        </Card>

        {/* Achievements */}
        <Card>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Logros ({stats.unlockedAchievements}/{achievements.length})
          </Text>
          <View className="space-y-3">
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                className={`p-4 rounded-xl ${
                  achievement.unlocked
                    ? 'bg-yellow-50 dark:bg-yellow-900/20'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <View className="flex-row items-center">
                  <Text
                    className={`text-3xl mr-3 ${
                      !achievement.unlocked && 'opacity-30'
                    }`}
                  >
                    {achievement.icon}
                  </Text>
                  <View className="flex-1">
                    <Text
                      className={`font-bold mb-1 ${
                        achievement.unlocked
                          ? 'text-yellow-900 dark:text-yellow-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {achievement.title}
                    </Text>
                    <Text
                      className={`text-sm ${
                        achievement.unlocked
                          ? 'text-yellow-700 dark:text-yellow-300'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {achievement.description}
                    </Text>
                  </View>
                  {achievement.unlocked && (
                    <Text className="text-yellow-500 text-xl">✓</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

function StatRow({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Text className="text-xl mr-2">{icon}</Text>
        <Text className="text-gray-700 dark:text-gray-300">{label}</Text>
      </View>
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        {value}
      </Text>
    </View>
  );
}

function CategoryStat({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className={`${color} w-10 h-10 rounded-full items-center justify-center mr-3`}>
          <Text className="text-xl">{icon}</Text>
        </View>
        <Text className="text-gray-700 dark:text-gray-300">{label}</Text>
      </View>
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        {value}
      </Text>
    </View>
  );
}
