import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { completeOnboarding } from "../lib/onboardingStorage";

export default function Finish() {
  const handleFinish = async () => {
    await completeOnboarding();
    router.replace("/(app)/(tabs)/home");

  };

  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">

      <Text className="text-[30px] font-extrabold text-center mb-4">
        ¡Todo listo! 🎉
      </Text>

      <Text className="text-gray-500 text-lg text-center mb-10">
        Tu viaje hacia una vida más productiva comienza ahora.
      </Text>

      <TouchableOpacity
        className="bg-black py-3 px-8 rounded-2xl w-full"
        onPress={handleFinish}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Empezar
        </Text>
      </TouchableOpacity>

    </View>
  );
}
