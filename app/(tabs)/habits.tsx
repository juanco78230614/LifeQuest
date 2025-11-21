// app/(tabs)/habits.tsx
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type Habit = {
  id: string;
  title: string;
  schedule?: string;
  streak?: number;
  completedToday?: boolean;
};

const MOCK: Habit[] = [
  { id: "h1", title: "Beber 2L de agua", schedule: "10:00 • 14:00 • 18:00", streak: 5, completedToday: false },
  { id: "h2", title: "Leer 30 min", schedule: "20:00", streak: 2, completedToday: true },
  { id: "h3", title: "Caminar 20 min", schedule: "07:30", streak: 10, completedToday: false },
];

export default function HabitsTab() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>(MOCK);

  const toggleDone = (id: string) => {
    setHabits((prev) => prev.map(h => h.id === id ? { ...h, completedToday: !h.completedToday } : h));
  };

  return (
    <View className="flex-1 bg-emerald-50 p-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Tus hábitos</Text>
        <TouchableOpacity className="bg-emerald-600 px-3 py-2 rounded-lg" onPress={() => router.push("/habits/new")}>
          <Text className="text-white font-semibold">+ Nuevo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl mb-3 flex-row justify-between items-center shadow">
            <View>
              <Text className="font-medium text-slate-800">{item.title}</Text>
              <Text className="text-xs text-slate-500">{item.schedule} • Racha {item.streak}</Text>
            </View>
            <TouchableOpacity
              className={`px-3 py-2 rounded-lg ${item.completedToday ? "bg-emerald-600" : "bg-emerald-100"}`}
              onPress={() => toggleDone(item.id)}
            >
              <Text className={item.completedToday ? "text-white font-semibold" : "text-emerald-700 font-semibold"}>
                {item.completedToday ? "Listo" : "Hacer"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
