import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  height?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  height = 8,
  className = '',
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <View className={className}>
      {showLabel && (
        <View className="flex-row justify-between mb-1">
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {current} / {total} XP
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {Math.floor(percentage)}%
          </Text>
        </View>
      )}
      <View
        className="bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        style={{ height }}
      >
        <View
          className="bg-primary h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
};
