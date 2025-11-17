// app/components/TaskItem.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import IconItem from "./IconItem";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onDelete: () => void;
  onToggleDone: () => void;
  onToggleImportant: () => void;
}

export default function TaskItem({ task, onDelete, onToggleDone, onToggleImportant }: Props) {
  return (
    <View className={`flex-row items-center justify-between p-3 mb-2 rounded-lg ${task.done ? "bg-gray-100" : "bg-white"} shadow`}>
      <View className="flex-1 mr-3">
        <Text className={`text-base ${task.important ? "font-bold text-yellow-600" : "text-gray-800"}`}>{task.text}</Text>
        <Text className="text-xs text-gray-400 mt-1">{new Date(task.createdAt).toLocaleString()}</Text>
      </View>

      <View className="flex-row items-center space-x-2">
        <Pressable onPress={onToggleDone}>
          <IconItem type="fa" name={task.done ? "check-circle" : "circle-thin"} size={22} color={task.done ? "#16a34a" : "#6b7280"} />
        </Pressable>
        <Pressable onPress={onToggleImportant}>
          <IconItem type="ion" name={task.important ? "star" : "star-outline"} size={22} color={task.important ? "#f59e0b" : "#6b7280"} />
        </Pressable>
        <Pressable onPress={onDelete}>
          <IconItem type="ion" name="trash" size={22} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  );
}
