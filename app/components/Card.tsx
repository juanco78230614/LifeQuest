import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <View className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm ${className}`}>
      {children}
    </View>
  );
};
