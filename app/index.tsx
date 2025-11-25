import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/useAppStore';
import { Button } from './components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen() {
  const router = useRouter();
  const currentUser = useAppStore((state) => state.currentUser);

  useEffect(() => {
    if (currentUser) {
      if (!currentUser.hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (currentUser.role === 'admin') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/(tabs)/missions');
      }
    }
  }, [currentUser]);

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#d946ef']}
      className="flex-1 justify-center items-center px-8"
    >
<View className="items-center mb-16"></View>

  <View className="items-center mb-16">
    <View className="items-center mb-16">
      <Text className="text-white text-6xl font-bold mb-3">
          LifeQuest
        </Text>
      <Text className="text-white text-6xl font-bold mb-3">
          BIENVENIDOS
        </Text>
    </View>
  
</View>
      {/* BLOQUE ÉPICO DE BIENVENIDA */}
      <View className="items-center mb-20">
        <Text className="text-white/90 text-lg text-center leading-snug px-4">
           ¡Transforma tu vida en una aventura épica!
           
        </Text>

        {/* Ícono */}
        <Text className="text-8xl mb-6">🎮</Text>

        {/* Título épico */}
        <Text className="text-white text-4xl font-extrabold text-center mb-4 leading-tight">
          PUEDES SER MEJOR  
          CADA DÍA
        </Text>

        {/* Subtítulo */}
        <Text className="text-white/90 text-lg text-center leading-snug px-4">
          La aventura de tu vida comienza aquí.  
          Sube de nivel, supera desafíos  
          y descubre tu verdadero potencial.
        </Text>
        
      </View>

      {/* NOMBRE DEL JUEGO */}
      <View className="items-center mb-16">
        

        <Text className="text-white/75 text-lg text-center">
          Convierte tu vida en una aventura épica.
        </Text>
      </View>

      {/* BOTÓN */}
      <View className="w-full max-w-sm space-y-5">
        
        <Button
          title="Iniciar Sesión"
          onPress={() => router.push('/auth/login')}
          variant="primary"
          className="w-full bg-white"
        />

        <Text className="text-white/70 text-sm text-center mt-2 px-6">
          Gamifica tu productividad.  
          Cada día es una misión.  
          Cada logro te hace más fuerte.
        </Text>
      </View>

    </LinearGradient>
  );
}
