import { useAppStore } from '../../store/useAppStore';
import { getXPNeeded } from '../../store/useAppStore';
import { MissionCard } from '../components/MissionCard';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { DifficultyLevel, MissionCategory } from '../types';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native';

const XP_VALUES = {
  easy: 10,
  medium: 25,
  hard: 50,
};

export default function MissionsScreen() {
  const {
    currentUser,
    missions,
    addMission,
    completeMission,
    deleteMission,
  } = useAppStore();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MissionCategory>('productivity');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');

  const userMissions = missions.filter((m) => m.userId === currentUser?.id);
  const activeMissions = userMissions.filter((m) => !m.completed);
  const completedMissions = userMissions.filter((m) => m.completed);

  const handleCreateMission = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Por favor ingresa un título para la misión');
      return;
    }

    addMission({
      title: title.trim(),
      category,
      difficulty,
      xp: XP_VALUES[difficulty],
      completed: false,
    });

    setTitle('');
    setShowModal(false);
  };

  const xpNeeded = currentUser ? getXPNeeded(currentUser.level) : 100;

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        <View className="p-4 space-y-4">
          {/* Player Stats */}
          <Card>
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  Nivel {currentUser?.level || 1}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  🔥 Racha: {currentUser?.streak || 0} días
                </Text>
              </View>
              <View className="bg-primary w-16 h-16 rounded-full items-center justify-center">
                <Text className="text-white text-2xl font-bold">
                  {currentUser?.level || 1}
                </Text>
              </View>
            </View>
            <ProgressBar
              current={currentUser?.xp || 0}
              total={xpNeeded}
            />
          </Card>

          {/* Add Mission Button */}
          <Button
            title="➕ Nueva Misión"
            onPress={() => setShowModal(true)}
            variant="primary"
          />

          {/* Active Missions */}
          <View>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Misiones Activas ({activeMissions.length})
            </Text>
            {activeMissions.length === 0 ? (
              <Card>
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  No tienes misiones activas. ¡Crea una nueva!
                </Text>
              </Card>
            ) : (
              <View className="space-y-3">
                {activeMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onComplete={() => completeMission(mission.id)}
                    onDelete={() => deleteMission(mission.id)}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Completed Missions */}
          {completedMissions.length > 0 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Completadas ({completedMissions.length})
              </Text>
              <View className="space-y-3">
                {completedMissions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    onComplete={() => {}}
                    onDelete={() => deleteMission(mission.id)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Create Mission Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6">
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Nueva Misión
            </Text>

            {/* Title */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Título
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Ej: Hacer ejercicio 30 min"
                className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Category */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría
              </Text>
              <View className="flex-row space-x-2">
                {[
                  { value: 'productivity', label: '💼 Productividad' },
                  { value: 'wellness', label: '❤️ Bienestar' },
                  { value: 'habit', label: '🔄 Hábito' },
                ].map((cat) => (
                  <TouchableOpacity
                    key={cat.value}
                    onPress={() => setCategory(cat.value as MissionCategory)}
                    className={`flex-1 py-3 rounded-xl ${
                      category === cat.value
                        ? 'bg-primary'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`text-center text-sm ${
                        category === cat.value
                          ? 'text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Difficulty */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dificultad
              </Text>
              <View className="flex-row space-x-2">
                {[
                  { value: 'easy', label: 'Fácil', xp: 10 },
                  { value: 'medium', label: 'Media', xp: 25 },
                  { value: 'hard', label: 'Difícil', xp: 50 },
                ].map((diff) => (
                  <TouchableOpacity
                    key={diff.value}
                    onPress={() => setDifficulty(diff.value as DifficultyLevel)}
                    className={`flex-1 py-3 rounded-xl ${
                      difficulty === diff.value
                        ? 'bg-primary'
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <Text
                      className={`text-center text-sm font-medium ${
                        difficulty === diff.value
                          ? 'text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {diff.label}
                    </Text>
                    <Text
                      className={`text-center text-xs ${
                        difficulty === diff.value
                          ? 'text-white/80'
                          : 'text-gray-500'
                      }`}
                    >
                      +{diff.xp} XP
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Buttons */}
            <View className="space-y-2">
              <Button
                title="Crear Misión"
                onPress={handleCreateMission}
                variant="primary"
              />
              <Button
                title="Cancelar"
                onPress={() => setShowModal(false)}
                variant="secondary"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}