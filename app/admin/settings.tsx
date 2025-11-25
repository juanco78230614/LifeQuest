import { View, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export default function AdminSettingsScreen() {
  const router = useRouter();
  const { saveToStorage, loadFromStorage } = useAppStore();

  const handleExportData = async () => {
    try {
      const data = await AsyncStorage.getItem('@lifequest_data');
      if (data) {
        Alert.alert(
          'Exportar Datos',
          'Datos listos para exportar:\n\n' + data.substring(0, 100) + '...',
          [{ text: 'OK' }]
        );
        // En una app real, aquí podrías usar expo-sharing o expo-file-system
        // para guardar el archivo
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo exportar los datos');
    }
  };

  const handleClearCache = async () => {
    Alert.alert(
      'Limpiar Caché',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Éxito', 'Caché limpiado correctamente');
              router.replace('/');
            } catch (error) {
              Alert.alert('Error', 'No se pudo limpiar el caché');
            }
          },
        },
      ]
    );
  };

  const handleReload = async () => {
    try {
      await loadFromStorage();
      Alert.alert('Éxito', 'Datos recargados correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo recargar los datos');
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4 space-y-4">
        {/* Header */}
        <Card className="bg-purple-500">
          <Text className="text-white text-xl font-bold mb-1">
            Configuración del Sistema
          </Text>
          <Text className="text-white/80">
            Gestiona la configuración de la aplicación
          </Text>
        </Card>

        {/* Data Management */}
        <Card>
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Gestión de Datos
          </Text>
          <View className="space-y-2">
            <Button
              title="💾 Guardar Datos"
              onPress={() => saveToStorage()}
              variant="success"
            />
            <Button
              title="🔄 Recargar Datos"
              onPress={handleReload}
              variant="primary"
            />
            <Button
              title="📤 Exportar Datos"
              onPress={handleExportData}
              variant="secondary"
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
            <InfoRow label="Build" value="1" />
            <InfoRow label="Plataforma" value="iOS / Android" />
            <InfoRow label="Expo SDK" value="~51.0.0" />
          </View>
        </Card>

        {/* Danger Zone */}
        <Card className="border-2 border-red-500">
          <Text className="text-lg font-bold text-red-600 mb-2">
            ⚠️ Zona Peligrosa
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Las siguientes acciones son irreversibles
          </Text>
          <Button
            title="🗑️ Limpiar Todo el Caché"
            onPress={handleClearCache}
            variant="danger"
          />
        </Card>

        {/* Documentation */}
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <Text className="text-base font-bold text-blue-900 dark:text-blue-100 mb-2">
            📚 Documentación
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-200">
            Para más información sobre cómo usar el panel de administrador,
            consulta la documentación en el README.md del proyecto.
          </Text>
        </Card>

        {/* Back */}
        <Button
          title="← Volver al Dashboard"
          onPress={() => router.back()}
          variant="secondary"
        />
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
