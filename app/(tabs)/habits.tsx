import { View, Text, ScrollView } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';

export default function HabitsScreen() {
  const { missions, currentUser } = useAppStore();

  const habitMissions = missions.filter(
    (m) => m.category === 'habit' && m.userId === currentUser?.id
  );
  const completedHabits = habitMissions.filter((m) => m.completed);
  const completionRate = habitMissions.length > 0
    ? Math.round((completedHabits.length / habitMissions.length) * 100)
    : 0;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Overview */}
        <Card>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Resumen de Hábitos
          </Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 dark:text-gray-400">
              Total de hábitos
            </Text>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              {habitMissions.length}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 dark:text-gray-400">
              Completados
            </Text>
            <Text className="text-xl font-bold text-success">
              {completedHabits.length}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600 dark:text-gray-400">
              Tasa de completitud
            </Text>
            <Text className="text-xl font-bold text-primary">
              {completionRate}%
            </Text>
          </View>
        </Card>

        {/* Habits List */}
        <View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Tus Hábitos
          </Text>
          {habitMissions.length === 0 ? (
            <Card>
              <Text className="text-center text-gray-500 dark:text-gray-400">
                No tienes hábitos registrados.{'\n'}
                Crea misiones con categoría "🔄 Hábito" en la pestaña de Misiones.
              </Text>
            </Card>
          ) : (
            <View className="space-y-3">
              {habitMissions.map((habit) => (
                <Card key={habit.id}>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        {habit.title}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {habit.completed ? '✅ Completado' : '⏳ En progreso'}
                      </Text>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-lg ${
                        habit.completed
                          ? 'bg-success/10'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          habit.completed
                            ? 'text-success'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        +{habit.xp} XP
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>

        {/* Tips */}
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <Text className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
            💡 Tips para mantener tus hábitos
          </Text>
          <View className="space-y-2">
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              • Empieza con hábitos pequeños y alcanzables
            </Text>
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              • Mantén tu racha activa completando misiones diariamente
            </Text>
            <Text className="text-sm text-blue-800 dark:text-blue-200">
              • Celebra cada pequeño logro en tu camino
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
