import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function Register() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = () => {
    if (!usuario || !password || !confirm) {
      alert("Rellena todo");
      return;
    }

    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    alert("Usuario creado!");
    router.replace("/auth/login");
  };

  return (
    <View className="flex-1 bg-[#003824] px-6 justify-center">
      <View className="bg-[#0d1f1a] rounded-2xl p-6">
        <View className="flex-row mb-6">
          <Link href="/auth/login">
            <Text className="text-gray-400 text-lg mr-4">Iniciar Sesión</Text>
          </Link>
          <Text className="text-green-400 text-lg font-semibold">
            Registrarse
          </Text>
        </View>

        <Text className="text-gray-300 mb-1">Usuario</Text>
        <TextInput
          placeholder="Tu nombre"
          className="bg-[#0b1512] text-white p-3 rounded-xl mb-4"
          placeholderTextColor="#5f7c74"
          onChangeText={setUsuario}
        />

        <Text className="text-gray-300 mb-1">Contraseña</Text>
        <TextInput
          secureTextEntry
          placeholder="Crea una contraseña"
          className="bg-[#0b1512] text-white p-3 rounded-xl mb-4"
          placeholderTextColor="#5f7c74"
          onChangeText={setPassword}
        />

        <Text className="text-gray-300 mb-1">Confirmar contraseña</Text>
        <TextInput
          secureTextEntry
          placeholder="Repite la contraseña"
          className="bg-[#0b1512] text-white p-3 rounded-xl mb-6"
          placeholderTextColor="#5f7c74"
          onChangeText={setConfirm}
        />

        <TouchableOpacity
          className="bg-green-600 py-3 rounded-xl"
          onPress={handleRegister}
        >
          <Text className="text-center text-white font-semibold">
            Crear Cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
