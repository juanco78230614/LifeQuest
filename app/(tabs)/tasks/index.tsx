// app/(tabs)/tasks/index.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert } from "react-native";
import AddButton from "../../components/AddButton";
import TaskItem from "../../components/TaskItem";
import { Task, create as createTask } from "../../types/task";
import { loadTasks, saveTasks } from "../../lib/storage";

export default function Tasks() {
  const [newTaskText, setNewTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const saved = await loadTasks();
      if (saved) setTasks(saved);
    })();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAdd = () => {
    const text = newTaskText.trim();
    if (!text) {
      Alert.alert("Atención", "La tarea no puede estar vacía");
      return;
    }
    setTasks((prev) => [createTask(text), ...prev]);
    setNewTaskText("");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Eliminar", "¿Seguro que quieres eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => setTasks((p) => p.filter((t) => t.id !== id)),
      },
    ]);
  };

  const toggleDone = (id: string) => {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const toggleImportant = (id: string) => {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, important: !t.important } : t)));
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-gray-800 mb-3">Mis Tareas</Text>

      <TextInput
        value={newTaskText}
        onChangeText={setNewTaskText}
        placeholder="Escribe una tarea..."
        placeholderTextColor="#9CA3AF"
        className="border border-gray-200 rounded-lg p-3 mb-3"
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={() => handleDelete(item.id)}
            onToggleDone={() => toggleDone(item.id)}
            onToggleImportant={() => toggleImportant(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <Text className="text-gray-400 text-center mt-6">No hay tareas aún. Agrega tu primera tarea.</Text>
        )}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <AddButton label="Agregar" onPress={handleAdd} />
    </View>
  );
}
