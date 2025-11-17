// app/lib/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const KEY = "lifequest:tasks";

export async function loadTasks(): Promise<Task[] | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Task[] : null;
  } catch (e) {
    console.warn("loadTasks error", e);
    return null;
  }
}

export async function saveTasks(tasks: Task[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("saveTasks error", e);
  }
}
