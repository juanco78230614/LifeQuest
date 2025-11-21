// app/_layout.tsx
import { Stack, Slot } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Grupo de autenticación */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* Grupo de tabs (solo cuando hay sesión) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
