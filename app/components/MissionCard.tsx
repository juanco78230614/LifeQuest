import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Mission } from '../types';
import { Card } from './Card';

interface MissionCardProps {
  mission: Mission;
  onComplete: () => void;
  onDelete: () => void;
}

const categoryEmojis = {
  productivity: '💼',
  wellness: '❤️',
  habit: '🔄',
};

const categoryLabels = {
  productivity: 'Productividad',
  wellness: 'Bienestar',
  habit: 'Hábito',
};

const difficultyColors = {
  easy: 'bg-green-100 dark:bg-green-900',
  medium: 'bg-yellow-100 dark:bg-yellow-900',
  hard: 'bg-red-100 dark:bg-red-900',
};

const difficultyTextColors = {
  easy: 'text-green-700 dark:text-green-300',
  medium: 'text-yellow-700 dark:text-yellow-300',
  hard: 'text-red-700 dark:text-red-300',
};

const difficultyLabels = {
  easy: 'Fácil',
  medium: 'Media',
  hard: 'Difícil',
};

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onComplete,
  onDelete,
}) => {
  return (
    <Card className={mission.completed ? 'opacity-60' : ''}>
      <View className="flex-row items-start justify-between">
        {/* Left side: Checkbox and content */}
        <View className="flex-row items-start flex-1">
          {/* Checkbox */}
          <TouchableOpacity
            onPress={onComplete}
            disabled={mission.completed}
            className="mr-3 mt-1"
          >
            <View
              className={`w-6 h-6 rounded-md border-2 items-center justify-center ${
                mission.completed
                  ? 'bg-primary border-primary'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {mission.completed && <Text className="text-white text-sm">✓</Text>}
            </View>
          </TouchableOpacity>

          {/* Content */}
          <View className="flex-1">
            <Text
              className={`text-base mb-2 ${
                mission.completed
                  ? 'line-through text-gray-500'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {mission.title}
            </Text>

            {/* Tags */}
            <View className="flex-row flex-wrap gap-2">
              {/* Category */}
              <View className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg flex-row items-center">
                <Text className="text-xs mr-1">{categoryEmojis[mission.category]}</Text>
                <Text className="text-xs text-gray-700 dark:text-gray-300">
                  {categoryLabels[mission.category]}
                </Text>
              </View>

              {/* Difficulty */}
              <View
                className={`px-2 py-1 rounded-lg ${difficultyColors[mission.difficulty]}`}
              >
                <Text className={`text-xs ${difficultyTextColors[mission.difficulty]}`}>
                  {difficultyLabels[mission.difficulty]}
                </Text>
              </View>

              {/* XP */}
              <View className="bg-primary/10 px-2 py-1 rounded-lg">
                <Text className="text-xs text-primary">+{mission.xp} XP</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Delete button */}
        {!mission.completed && (
          <TouchableOpacity onPress={onDelete} className="ml-2 p-1">
            <Text className="text-red-500">🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};
