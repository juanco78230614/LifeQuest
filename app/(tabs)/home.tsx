// app/(tabs)/home.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function HomeTab() {
  const router = useRouter();

  // mock progreso por ahora
  const progress = 48; // %
  const completed = 3;
  const total = 6;
  const displayName = "juan";

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-emerald-50 via-white to-white p-6">
      {/* Header */}
      <View className="mt-6 mb-6">
        <Text className="text-3xl font-extrabold text-slate-800">Hola, {displayName} 👋</Text>
        <Text className="text-sm text-slate-500 mt-1">Bienvenido a LifeQuest — tu app para formar hábitos diarios</Text>
      </View>

      {/* Barra de vida + XP */}
      <View className="bg-emerald-600 rounded-2xl p-3 mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white font-semibold">Vida ❤️ 85</Text>
          <Text className="text-white font-medium">Lv. 3 • XP 240</Text>
        </View>
        <View className="mt-3 h-3 w-full bg-emerald-200 rounded-full overflow-hidden">
          <View className="h-3 bg-red-500 rounded-full" style={{ width: `${progress}%` }} />
        </View>
      </View>

      {/* Tarjeta Progreso Diario */}
      <View className="bg-white rounded-2xl p-4 shadow-md mb-4">
        <Text className="text-sm text-slate-600">Progreso de hoy</Text>
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-1 mr-4">
            <View className="h-3 rounded-full bg-slate-200 overflow-hidden">
              <View className="h-3 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
            </View>
            <Text className="text-xs text-slate-500 mt-2">{progress}% completado • {completed}/{total} hábitos</Text>
          </View>
          <TouchableOpacity
            className="bg-emerald-600 px-4 py-2 rounded-xl"
            onPress={() => router.push("/habits")}
          >
            <Text className="text-white font-semibold">Ver hábitos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CTA onboarding si quiere personalizar */}
      <View className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <Text className="font-semibold text-amber-800">¿Deseas personalizar tu experiencia?</Text>
        <Text className="text-sm text-amber-700 mt-1">Responde 3 preguntas rápidas y te sugerimos hábitos.</Text>
        <View className="mt-3 flex-row gap-3">
          <TouchableOpacity
            className="bg-amber-600 px-4 py-2 rounded-lg mr-2"
            onPress={() => router.push("/(app)/onboarding/welcome")}
          >
            <Text className="text-white font-medium">Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 rounded-lg border border-amber-200"
            onPress={() => router.push("/profile")}
          >
            <Text className="text-amber-700">Más tarde</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista corta de ejemplo de hábitos */}
      <Text className="text-lg font-semibold text-slate-800 mb-3">Tus hábitos para hoy</Text>
      <View className="space-y-3 mb-8">
        <View className="flex-row items-center justify-between bg-white p-4 rounded-xl shadow">
          <View>
            <Text className="font-medium text-slate-800">Beber 2L de agua</Text>
            <Text className="text-xs text-slate-500 mt-1">Recordatorio: 10:00 • 14:00 • 18:00</Text>
          </View>
          <TouchableOpacity className="bg-emerald-100 px-3 py-2 rounded-lg">
            <Text className="text-emerald-700 font-semibold">Listo</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between bg-white p-4 rounded-xl shadow">
          <View>
            <Text className="font-medium text-slate-800">10 minutos de journaling</Text>
            <Text className="text-xs text-slate-500 mt-1">Mañana • Antes de dormir</Text>
          </View>
          <TouchableOpacity className="bg-emerald-100 px-3 py-2 rounded-lg">
            <Text className="text-emerald-700 font-semibold">Listo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer botones rápidos */}
      <View className="flex-row justify-between items-center mb-12">
        <TouchableOpacity className="flex-1 mr-2 bg-white p-3 rounded-xl shadow" onPress={() => router.push("/tasks") }>
          <Text className="text-center font-semibold">Tareas</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 ml-2 bg-white p-3 rounded-xl shadow" onPress={() => router.push("/habits") }>
          <Text className="text-center font-semibold">Hábitos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
