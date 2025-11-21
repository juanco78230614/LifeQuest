import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Step1() {
  return (
    <View className="flex-1 bg-[#003824] justify-center px-8">
      <View className="bg-black/20 p-8 rounded-2xl">
        
        <Text className="text-5xl mb-4 text-white text-center">🎮</Text>

        <Text className="text-3xl text-white font-bold text-center">
          ¡Bienvenido, juanco! 🎉
        </Text>

        <Text className="text-gray-200 text-center mt-4">
          Estás a punto de comenzar una aventura épica donde tus tareas diarias
          se convierten en misiones emocionantes.
        </Text>

        {/* Botones */}
        <TouchableOpacity
          className="mt-10 py-3 bg-green-600 rounded-xl"
          onPress={() => router.push("/onboarding/step2")}
        >
          <Text className="text-center text-white font-semibold">Siguiente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => {
            router.replace("/auth/login");
          }}
        >
          <Text className="text-center text-gray-300 underline">Saltar</Text>
        </TouchableOpacity>

        <Text className="text-gray-300 text-center mt-6">Paso 1 de 4</Text>
      </View>
    </View>
  );
}
