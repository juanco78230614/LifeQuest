import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Step3() {
  return (
    <View className="flex-1 bg-[#003824] justify-center px-8">
      <View className="bg-black/20 p-8 rounded-2xl">

        <Text className="text-5xl mb-4 text-white text-center">⏳</Text>

        <Text className="text-3xl text-white font-bold text-center">
          Sube de nivel
        </Text>

        <Text className="text-gray-200 text-center mt-4">
          Cada misión te otorga experiencia.  
          Completa tus tareas y observa cómo tu personaje crece cada día.
        </Text>

        <View className="flex-row justify-between mt-10">
          <TouchableOpacity
            className="py-3 px-6 bg-gray-500/40 rounded-xl"
            onPress={() => router.push("/onboarding/step2")}
          >
            <Text className="text-white">Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3 px-6 bg-green-600 rounded-xl"
            onPress={() => router.push("/onboarding/step4")}
          >
            <Text className="text-white">Siguiente</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-gray-300 text-center mt-6">Paso 3 de 4</Text>
      </View>
    </View>
  );
}
