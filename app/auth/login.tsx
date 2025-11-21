import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!usuario || !password) {
      alert("Rellena todos los campos");
      return;
    }

    router.replace("/tasks");
  };

  return (
    <View className="flex-1 bg-[#003824] px-6 justify-center">
      {/* CARD */}
      <View className="bg-[#0d1f1a] rounded-2xl p-6">

        <View className="flex-row mb-6">
          <Text className="text-green-400 text-lg font-semibold mr-4">
            Iniciar Sesión
          </Text>
          <Link href="/auth/register">
            <Text className="text-gray-400 text-lg">Registrarse</Text>
          </Link>
        </View>

        <Text className="text-gray-300 mb-1">Usuario</Text>
        <TextInput
          placeholder="Tu nombre de usuario"
          className="bg-[#0b1512] text-white p-3 rounded-xl mb-4"
          placeholderTextColor="#5f7c74"
          onChangeText={setUsuario}
        />

        <Text className="text-gray-300 mb-1">Contraseña</Text>
        <TextInput
          placeholder="Tu contraseña"
          secureTextEntry
          className="bg-[#0b1512] text-white p-3 rounded-xl mb-6"
          placeholderTextColor="#5f7c74"
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-green-600 py-3 rounded-xl"
          onPress={handleLogin}
        >
          <Text className="text-center text-white font-semibold">
            Entrar
          </Text>
        </TouchableOpacity>

      </View>

      <Text className="text-gray-300 text-center mt-6">
        Transforma tus metas en misiones épicas ⚔️
      </Text>
    </View>
  );
}
