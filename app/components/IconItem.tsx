// app/components/IconItem.tsx
import React from "react";
import { Pressable } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from "@expo/vector-icons";

type IconType = "ion" | "fa" | "material" | "entypo";

interface Props {
  type?: IconType;
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export default function IconItem({ type = "ion", name, size = 20, color = "#000", onPress }: Props) {
  const Lib = type === "fa" ? FontAwesome : type === "material" ? MaterialIcons : type === "entypo" ? Entypo : Ionicons;
  return (
    <Pressable onPress={onPress} style={{ padding: 6 }}>
      {/* @ts-ignore */}
      <Lib name={name as any} size={size} color={color} />
    </Pressable>
  );
}
