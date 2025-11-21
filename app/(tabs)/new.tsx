import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function NewHabit() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim().length < 3) {
      return Alert.alert("Nombre demasiado corto", "Ingresa un hábito válido");
    }

    // Temporal: luego conectaremos Firebase
    console.log("Hábito creado:", name);

    Alert.alert("Listo", "Hábito creado correctamente", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-20">
      <Text className="text-2xl font-bold text-slate-800 mb-6">
        Nuevo hábito
      </Text>

      <Text className="text-base text-slate-600 mb-2">
        Nombre del hábito
      </Text>

      <TextInput
        className="border border-slate-300 rounded-lg px-4 py-3 mb-6 text-slate-700"
        placeholder="Ej. Leer 10 minutos"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        className="bg-emerald-600 py-4 rounded-xl active:bg-emerald-700"
        onPress={handleSave}
      >
        <Text className="text-white text-center font-semibold text-lg">
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
