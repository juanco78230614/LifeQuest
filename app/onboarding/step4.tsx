import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { setOnboardingDone } from "../lib/onboardingStorage";

export default function Step4() {
  const finish = async () => {
    await setOnboardingDone();
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 bg-[#003824] justify-center px-8">
      <View className="bg-black/20 p-8 rounded-2xl">

        <Text className="text-5xl mb-4 text-white text-center">🔥</Text>

        <Text className="text-3xl text-white font-bold text-center">
          ¡Listo para comenzar!
        </Text>

        <Text className="text-gray-200 text-center mt-4">
          Estás preparado para convertir cada día en una aventura.
        </Text>

        <TouchableOpacity
          className="mt-10 py-3 bg-green-600 rounded-xl"
          onPress={finish}
        >
          <Text className="text-center text-white font-semibold">
            Comenzar ahora
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/onboarding/step3")}
        >
          <Text className="text-center text-gray-300 underline">Atrás</Text>
        </TouchableOpacity>

        <Text className="text-gray-300 text-center mt-6">Paso 4 de 4</Text>
      </View>
    </View>
  );
}
