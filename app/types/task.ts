// app/types/task.ts
export interface Task {
  id: string;
  text: string;
  done: boolean;
  important?: boolean;
  createdAt: string; // string for serializable with AsyncStorage
}

export const create = (text: string): Task => ({
  id: Math.random().toString(36).substring(2, 9),
  text,
  done: false,
  important: false,
  createdAt: new Date().toISOString(),
});
