import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-8 justify-center">
      <View>
        <Text className="text-5xl font-extrabold text-emerald-700 mb-4">
          LifeQuest
        </Text>

        <Text className="text-2xl font-semibold text-slate-800 mb-3">
          Domina tus hábitos.
        </Text>

        <Text className="text-base leading-relaxed text-slate-600 mb-16">
          Te guiaremos a través de una experiencia personalizada para que 
          desarrolles constancia, claridad y control sobre tus objetivos.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-emerald-600 py-4 rounded-xl"
        onPress={() => router.push("/onboarding/step1")}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Comenzar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
