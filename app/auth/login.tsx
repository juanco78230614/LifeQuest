// app/auth/login.tsx
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-6">LifeQuest 🌱</Text>

      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
      />

      <Pressable className="bg-green-600 py-3 rounded-lg mb-4">
        <Text className="text-white text-center font-semibold">Ingresar</Text>
      </Pressable>

      <Link href="/auth/register" className="text-center text-green-700">
        Crear cuenta
      </Link>
    </View>
  );
}
