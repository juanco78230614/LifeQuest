// app/(tabs)/tasks/[id].tsx
import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TaskDetail() {
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-xl font-bold mb-2">Detalle de tarea</Text>
      <Text className="text-sm text-slate-600">ID: {id ?? "Desconocido"}</Text>
      <Text className="mt-4 text-gray-700">Aquí podrás ver/editar la tarea en detalle.</Text>
    </View>
  );
}
