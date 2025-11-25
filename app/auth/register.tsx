// app/auth/register.tsx
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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAppStore();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const success = await register(username.trim(), email.trim(), password);
      if (!success) {
        Alert.alert('Error', 'El usuario o email ya existe, o hubo un problema con Firebase');
      } else {
        // Si todo bien, puedes redirigir a la pantalla principal (index) o dejar que index useEffect maneje
        router.replace('/');
      }
    } catch (error) {
      console.error('Register screen error:', error);
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
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Crear cuenta</Text>
            <Text className="text-gray-600 dark:text-gray-400 text-center">Comienza tu viaje épico hoy</Text>
          </View>

          <Card className="mb-6">
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Usuario</Text>
                <TextInput value={username} onChangeText={setUsername} placeholder="tu_usuario" autoCapitalize="none"
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</Text>
                <TextInput value={email} onChangeText={setEmail} placeholder="tu@email.com"
                  keyboardType="email-address" autoCapitalize="none"
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</Text>
                <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirmar Contraseña</Text>
                <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="••••••••" secureTextEntry
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white" placeholderTextColor="#9ca3af" />
              </View>
            </View>
          </Card>

          <Button title="Crear Cuenta" onPress={handleRegister} loading={loading} variant="primary" className="mb-4" />

          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-center text-primary">¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
