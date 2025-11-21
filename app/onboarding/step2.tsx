import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Step2() {
  return (
    <View className="flex-1 bg-[#003824] justify-center px-8">
      <View className="bg-black/20 p-8 rounded-2xl">

        <Text className="text-5xl mb-4 text-white text-center">🎯</Text>

        <Text className="text-3xl text-white font-bold text-center">
          Crea tus misiones
        </Text>

        <Text className="text-gray-200 text-center mt-4">
          Convierte tus tareas en misiones de productividad, bienestar o hábitos.
          Cada misión te dará experiencia al completarla.
        </Text>

        <View className="flex-row justify-between mt-10">
          <TouchableOpacity
            className="py-3 px-6 bg-gray-500/40 rounded-xl"
            onPress={() => router.push("/onboarding/step1")}
          >
            <Text className="text-white">Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3 px-6 bg-green-600 rounded-xl"
            onPress={() => router.push("/onboarding/step3")}
          >
            <Text className="text-white">Siguiente</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.replace("/auth/login")}
        >
          <Text className="text-center text-gray-300 underline">Saltar</Text>
        </TouchableOpacity>

        <Text className="text-gray-300 text-center mt-6">Paso 2 de 4</Text>
      </View>
    </View>
  );
}
