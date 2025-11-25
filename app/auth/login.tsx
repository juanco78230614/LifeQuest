// app/auth/login.tsx
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAppStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const success = await login(username.trim(), password);
      if (!success) {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      } else {
        // Redirige a la pantalla principal
        router.replace('/');
      }
    } catch (error) {
      console.error('Login screen error:', error);
      Alert.alert('Error', 'Algo salió mal. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center px-6 py-12">
          <View className="items-center mb-8">
            <Text className="text-6xl mb-4">🎮</Text>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido de nuevo</Text>
            <Text className="text-gray-600 dark:text-gray-400 text-center">Inicia sesión para continuar tu aventura</Text>
          </View>

          <Card className="mb-6">
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Usuario</Text>
                <TextInput value={username} onChangeText={setUsername} placeholder="tu_usuario (o email)"
                  autoCapitalize="none"
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</Text>
                <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>
            </View>
          </Card>

          <Button title="Iniciar Sesión" onPress={handleLogin} loading={loading} variant="primary" className="mb-4" />

          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-center text-primary">¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>

          <View className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Text className="text-sm text-blue-700 dark:text-blue-300 text-center">💡 Tip: Puedes usar tu usuario o tu email</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
