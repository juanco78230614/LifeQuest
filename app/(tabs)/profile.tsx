import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { currentUser, logout, getStats } = useAppStore();
  const stats = getStats();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/');
          },
        },
      ]
    );
  };

  const handleAdminPanel = () => {
    router.push('/admin/dashboard');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* User Header */}
        <Card>
          <View className="items-center">
            {/* Avatar */}
            <View className="bg-primary w-24 h-24 rounded-full items-center justify-center mb-4">
              <Text className="text-white text-4xl font-bold">
                {currentUser?.username.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* User Info */}
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {currentUser?.username}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400 mb-4">
              {currentUser?.email}
            </Text>

            {/* Quick Stats */}
            <View className="flex-row justify-around w-full pt-4 border-t border-gray-200 dark:border-gray-700">
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">
                  {currentUser?.level}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Nivel
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">
                  {stats.completedMissions}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Completadas
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">
                  {currentUser?.streak}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Racha
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Account Info */}
        <Card>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Información de Cuenta
          </Text>
          <View className="space-y-3">
            <InfoRow label="Rol" value={currentUser?.role === 'admin' ? 'Administrador' : 'Usuario'} />
            <InfoRow label="Miembro desde" value={formatDate(currentUser?.createdAt || '')} />
            <InfoRow label="Último acceso" value={formatDate(currentUser?.lastActiveDate || '')} />
          </View>
        </Card>

        {/* Admin Access */}
        {currentUser?.role === 'admin' && (
          <Button
            title="🔧 Panel de Administrador"
            onPress={handleAdminPanel}
            variant="primary"
          />
        )}

        {/* Logout */}
        <Button
          title="Cerrar Sesión"
          onPress={handleLogout}
          variant="danger"
        />

        {/* App Info */}
        <View className="items-center py-4">
          <Text className="text-gray-400 text-sm">LifeQuest v1.0.0</Text>
          <Text className="text-gray-400 text-xs mt-1">
            Gamifica tu productividad 🎮
          </Text>
        </View>
      </View>
    </ScrollView>
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

function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}