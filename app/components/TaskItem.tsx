// app/components/TaskItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onDelete: () => void;
  onToggleDone: () => void;
  onToggleImportant: () => void;
};

export default function TaskItem({ task, onDelete, onToggleDone, onToggleImportant }: Props) {
  return (
    <View className="bg-white p-4 rounded-xl mb-3 flex-row justify-between items-center shadow">
      <View style={{ flex: 1 }}>
        <Text className={`font-medium ${task.done ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {task.text}
        </Text>
        <Text className="text-xs text-slate-500 mt-1">
          {task.important ? "Importante" : ""}
        </Text>
      </View>

      <View className="flex-row items-center ml-3">
        <TouchableOpacity className="px-3 py-2 mr-2" onPress={onToggleDone}>
          <Text className="text-emerald-700 font-semibold">{task.done ? "✔" : "Hacer"}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-3 py-2 mr-2" onPress={onToggleImportant}>
          <Text className="text-amber-600">{task.important ? "★" : "☆"}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="px-3 py-2" onPress={onDelete}>
          <Text className="text-red-500">Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
