import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { isOnboardingDone } from "./lib/onboardingStorage";

// 🔥 Reanimated
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
  async function check() {
    const done = await isOnboardingDone();

    if (!done) {
      // Si NO terminó onboarding → llevar al paso 1
      router.replace("/onboarding/step1");
    }
    // Si SÍ terminó, NO redirigimos
    // mostramos la bienvenida normal
  }

  check();
}, []);

  return (
    <View className="flex-1 px-6 justify-center bg-gradient-to-b from-emerald-900 to-emerald-700">

      {/* LOGO */}
      <Animated.View entering={FadeInDown.duration(600)} className="items-center mb-10">
        <View className="w-20 h-20 rounded-2xl bg-white/10 justify-center items-center">
          <Text className="text-white text-3xl font-bold">LQ</Text>
        </View>

        <Text className="text-white text-3xl font-bold mt-4">LifeQuest</Text>

        <Text className="text-gray-200 mt-2 text-base">
          Convierte tu vida en una aventura épica
        </Text>
      </Animated.View>

      {/* TARJETA 1 */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(500)}
        className="bg-[#0F1A27] rounded-2xl p-5 mb-4 border border-white/10"
      >
        <Text className="text-white text-lg font-semibold">Misiones Diarias</Text>
        <Text className="text-gray-300 text-sm mt-1">
          Transforma tus tareas en misiones emocionantes
        </Text>
      </Animated.View>

      {/* TARJETA 2 */}
      <Animated.View
        entering={FadeInUp.delay(350).duration(500)}
        className="bg-[#0F1A27] rounded-2xl p-5 mb-4 border border-white/10"
      >
        <Text className="text-white text-lg font-semibold">Sistema de Niveles</Text>
        <Text className="text-gray-300 text-sm mt-1">
          Gana experiencia y sube de nivel al completar misiones
        </Text>
      </Animated.View>

      {/* TARJETA 3 */}
      <Animated.View
        entering={FadeInUp.delay(500).duration(500)}
        className="bg-[#0F1A27] rounded-2xl p-5 mb-6 border border-white/10"
      >
        <Text className="text-white text-lg font-semibold">Rachas y Logros</Text>
        <Text className="text-gray-300 text-sm mt-1">
          Mantén tu motivación con rachas diarias y recompensas
        </Text>
      </Animated.View>

      {/* BOTÓN */}
      <Animated.View entering={FadeInUp.delay(650).duration(500)}>
        <TouchableOpacity
          className="bg-emerald-600 py-4 rounded-xl mb-4"
          onPress={() => router.push("/auth/login")}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Comenzar Aventura →
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* FOOTER */}
      <Animated.Text
        entering={FadeInUp.delay(750).duration(500)}
        className="text-center text-gray-200 text-xs"
      >
        Organiza tu vida mientras te diviertes 🎮✨
      </Animated.Text>
    </View>
  );
}
