import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function AdminDashboardScreen() {
  const router = useRouter();
  const { users, missions, achievements, currentUser } = useAppStore();

  // Verify admin access
  if (currentUser?.role !== 'admin') {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center p-4">
        <Text className="text-2xl mb-4">❌</Text>
        <Text className="text-gray-900 dark:text-white mb-4">
          Acceso denegado
        </Text>
        <Button
          title="Volver"
          onPress={() => router.back()}
          variant="primary"
        />
      </View>
    );
  }

  const totalUsers = users.length;
  const totalMissions = missions.length;
  const completedMissions = missions.filter((m) => m.completed).length;
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Welcome */}
        <Card className="bg-red-500">
          <Text className="text-white text-2xl font-bold mb-2">
            Panel de Administrador
          </Text>
          <Text className="text-white/80">
            Bienvenido, {currentUser.username}
          </Text>
        </Card>

        {/* Quick Stats */}
        <View className="flex-row flex-wrap gap-3">
          <StatCard
            title="Usuarios"
            value={totalUsers}
            icon="👥"
            color="bg-blue-500"
          />
          <StatCard
            title="Misiones"
            value={totalMissions}
            icon="🎯"
            color="bg-green-500"
          />
          <StatCard
            title="Completadas"
            value={completedMissions}
            icon="✅"
            color="bg-purple-500"
          />
          <StatCard
            title="Logros"
            value={unlockedAchievements}
            icon="🏆"
            color="bg-yellow-500"
          />
        </View>

        {/* Quick Actions */}
        <Card>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Acciones Rápidas
          </Text>
          <View className="space-y-2">
            <ActionButton
              title="Gestionar Usuarios"
              icon="👥"
              onPress={() => router.push('/admin/users')}
            />
            <ActionButton
              title="Ver Misiones"
              icon="🎯"
              onPress={() => router.push('/admin/missions')}
            />
            <ActionButton
              title="Configuración"
              icon="⚙️"
              onPress={() => router.push('/settings')}
            />
          </View>
        </Card>

        {/* System Info */}
        <Card>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Información del Sistema
          </Text>
          <View className="space-y-2">
            <InfoRow label="Versión" value="1.0.0" />
            <InfoRow label="Usuarios activos" value={`${totalUsers}`} />
            <InfoRow label="Tasa de completitud" value={`${Math.round((completedMissions / totalMissions) * 100) || 0}%`} />
          </View>
        </Card>

        {/* Back to App */}
        <Button
          title="Volver a la App"
          onPress={() => router.push('/(tabs)/missions')}
          variant="secondary"
        />
      </View>
    </ScrollView>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <View className="flex-1 min-w-[45%]">
      <Card className={color}>
        <Text className="text-white text-3xl mb-2">{icon}</Text>
        <Text className="text-white text-3xl font-bold mb-1">{value}</Text>
        <Text className="text-white/80 text-sm">{title}</Text>
      </Card>
    </View>
  );
}

function ActionButton({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl flex-row items-center active:bg-gray-200 dark:active:bg-gray-600"
    >
      <Text className="text-2xl mr-3">{icon}</Text>
      <Text className="text-gray-900 dark:text-white font-medium flex-1">
        {title}
      </Text>
      <Text className="text-gray-400">›</Text>
    </TouchableOpacity>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between items-center py-2">
      <Text className="text-gray-600 dark:text-gray-400">{label}</Text>
      <Text className="text-gray-900 dark:text-white font-medium">{value}</Text>
    </View>
  );
}
