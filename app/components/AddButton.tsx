// app/components/AddButton.tsx
import React from "react";
import { Pressable, Text } from "react-native";

interface Props { onPress: () => void; label?: string; }

export default function AddButton({ onPress, label = "Agregar" }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="absolute bottom-6 left-6 right-6 bg-green-600 rounded-full py-3 shadow-lg"
    >
      <Text className="text-center text-white font-semibold">{label}</Text>
    </Pressable>
  );
}
