// app/(tabs)/profile.tsx
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function ProfileTab() {
  const router = useRouter();
  const name = "Juan Ovando";

  return (
    <View className="flex-1 bg-white p-6">
      <View className="items-center mb-6">
        <View className="w-24 h-24 rounded-full bg-emerald-100 items-center justify-center mb-3">
          <Text className="text-2xl font-bold text-emerald-700">{name[0]}</Text>
        </View>
        <Text className="text-lg font-semibold">{name}</Text>
        <Text className="text-sm text-slate-500">Usuario activo</Text>
      </View>

      <View className="space-y-3">
        <TouchableOpacity className="bg-white p-4 rounded-xl shadow" onPress={() => router.push("/settings")}>
          <Text>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-500 p-4 rounded-xl"
          onPress={() =>
            Alert.alert("Cerrar sesión", "¿Estás seguro?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Cerrar sesión", style: "destructive", onPress: () => router.replace("/auth/login") },
            ])
          }
        >
          <Text className="text-white text-center font-semibold">Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
