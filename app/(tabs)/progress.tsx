// app/(tabs)/progress.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function ProgressTab() {
  // mocks
  const monthCompletion = 72; // %
  const streak = 10;

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-3">Progreso</Text>

      <View className="bg-white rounded-2xl p-4 shadow mb-4">
        <Text className="text-sm text-slate-500">Completado este mes</Text>
        <View className="mt-3 h-3 w-full bg-slate-200 rounded-full overflow-hidden">
          <View className="h-3 bg-emerald-500 rounded-full" style={{ width: `${monthCompletion}%` }} />
        </View>
        <Text className="text-xs text-slate-500 mt-2">{monthCompletion}% • Racha {streak} días</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="font-semibold mb-2">Estadísticas rápidas</Text>
        <Text className="text-sm text-slate-600">• Hábitos creados: 12</Text>
        <Text className="text-sm text-slate-600">• Días activos: 18</Text>
        <Text className="text-sm text-slate-600">• Mejor racha: 27 días</Text>
      </View>
    </ScrollView>
  );
}
