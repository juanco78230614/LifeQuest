import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef4444',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{
          title: '🔧 Panel Admin',
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: '👥 Usuarios',
        }}
      />
      <Stack.Screen
        name="missions"
        options={{
          title: '🎯 Misiones',
        }}
      />
    </Stack>
  );
}
