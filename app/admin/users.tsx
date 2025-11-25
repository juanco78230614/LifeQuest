import { View, Text, ScrollView, Alert } from 'react-native';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function AdminUsersScreen() {
  const { users, currentUser, updateUser } = useAppStore();

  const toggleUserRole = (userId: string, currentRole: 'user' | 'admin') => {
    if (userId === currentUser?.id) {
      Alert.alert('Error', 'No puedes cambiar tu propio rol');
      return;
    }

    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    Alert.alert(
      'Cambiar Rol',
      `¿Cambiar rol a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => updateUser(userId, { role: newRole }),
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Header */}
        <Card className="bg-blue-500">
          <Text className="text-white text-xl font-bold mb-1">
            Gestión de Usuarios
          </Text>
          <Text className="text-white/80">
            Total: {users.length} usuarios
          </Text>
        </Card>

        {/* Users List */}
        <View className="space-y-3">
          {users.map((user) => (
            <Card key={user.id}>
              <View className="flex-row items-start justify-between mb-3">
                <View className="flex-1">
                  {/* Avatar and Name */}
                  <View className="flex-row items-center mb-2">
                    <View className="bg-primary w-12 h-12 rounded-full items-center justify-center mr-3">
                      <Text className="text-white text-lg font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900 dark:text-white">
                        {user.username}
                        {user.id === currentUser?.id && (
                          <Text className="text-primary"> (Tú)</Text>
                        )}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </Text>
                    </View>
                  </View>

                  {/* Stats */}
                  <View className="flex-row flex-wrap gap-2 mb-3">
                    <View className="bg-primary/10 px-2 py-1 rounded-lg">
                      <Text className="text-xs text-primary">
                        Nivel {user.level}
                      </Text>
                    </View>
                    <View className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                      <Text className="text-xs text-green-700 dark:text-green-300">
                        🔥 {user.streak} días
                      </Text>
                    </View>
                    <View className="bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                      <Text className="text-xs text-yellow-700 dark:text-yellow-300">
                        ⚡ {user.totalXP} XP
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded-lg ${
                        user.role === 'admin'
                          ? 'bg-red-100 dark:bg-red-900/20'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <Text
                        className={`text-xs ${
                          user.role === 'admin'
                            ? 'text-red-700 dark:text-red-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {user.role === 'admin' ? '🔧 Admin' : '👤 Usuario'}
                      </Text>
                    </View>
                  </View>

                  {/* Info */}
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Miembro desde: {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </Text>
                </View>
              </View>

              {/* Actions */}
              {user.id !== currentUser?.id && (
                <Button
                  title={
                    user.role === 'admin'
                      ? 'Revocar Admin'
                      : 'Hacer Admin'
                  }
                  onPress={() => toggleUserRole(user.id, user.role)}
                  variant={user.role === 'admin' ? 'danger' : 'success'}
                  className="mt-2"
                />
              )}
            </Card>
          ))}
        </View>

        {users.length === 0 && (
          <Card>
            <Text className="text-center text-gray-500 dark:text-gray-400">
              No hay usuarios registrados
            </Text>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
