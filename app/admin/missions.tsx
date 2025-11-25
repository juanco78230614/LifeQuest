import { View, Text, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';

export default function AdminMissionsScreen() {
  const { missions, users } = useAppStore();

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.username || 'Usuario desconocido';
  };

  const categoryEmojis = {
    productivity: '💼',
    wellness: '❤️',
    habit: '🔄',
  };

  const difficultyColors = {
    easy: 'text-green-600',
    medium: 'text-yellow-600',
    hard: 'text-red-600',
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Header */}
        <Card className="bg-green-500">
          <Text className="text-white text-xl font-bold mb-1">
            Monitor de Misiones
          </Text>
          <Text className="text-white/80">
            Total: {missions.length} misiones
          </Text>
          <View className="flex-row mt-2">
            <Text className="text-white/80 mr-4">
              ✅ {missions.filter((m) => m.completed).length} completadas
            </Text>
            <Text className="text-white/80">
              ⏳ {missions.filter((m) => !m.completed).length} activas
            </Text>
          </View>
        </Card>

        {/* Missions List */}
        <View className="space-y-3">
          {missions.map((mission) => (
            <Card
              key={mission.id}
              className={mission.completed ? 'opacity-70' : ''}
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-2">
                    {categoryEmojis[mission.category]}
                  </Text>
                  <View>
                    <Text className="text-base font-bold text-gray-900 dark:text-white">
                      {mission.title}
                    </Text>
                    <Text className="text-xs text-gray-600 dark:text-gray-400">
                      Por: {getUserName(mission.userId)}
                    </Text>
                  </View>
                </View>
                {mission.completed && (
                  <Text className="text-2xl">✅</Text>
                )}
              </View>

              {/* Details */}
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                  <Text className="text-xs text-gray-700 dark:text-gray-300">
                    {mission.category}
                  </Text>
                </View>
                <View className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                  <Text className={`text-xs ${difficultyColors[mission.difficulty]}`}>
                    {mission.difficulty}
                  </Text>
                </View>
                <View className="bg-primary/10 px-2 py-1 rounded-lg">
                  <Text className="text-xs text-primary">
                    +{mission.xp} XP
                  </Text>
                </View>
              </View>

              {/* Dates */}
              <View className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  Creada: {new Date(mission.createdAt).toLocaleDateString('es-ES')}
                </Text>
                {mission.completedAt && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Completada: {new Date(mission.completedAt).toLocaleDateString('es-ES')}
                  </Text>
                )}
              </View>
            </Card>
          ))}
        </View>

        {missions.length === 0 && (
          <Card>
            <Text className="text-center text-gray-500 dark:text-gray-400">
              No hay misiones registradas
            </Text>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
