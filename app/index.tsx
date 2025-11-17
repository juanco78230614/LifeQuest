import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-3xl font-bold mb-2">Bienvenido a LifeQuest 🌱</Text>
      <Text className="text-gray-600 text-center mb-8">
        Tu app para construir hábitos y tareas — vamos a empezar.
      </Text>

      <Link href="/auth/login" asChild>
        <Pressable className="bg-green-600 px-6 py-3 rounded-full">
          <Text className="text-white font-semibold">Comenzar</Text>
        </Pressable>
      </Link>
    </View>
  );
}
