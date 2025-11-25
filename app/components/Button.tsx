import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const baseClasses = 'px-6 py-3 rounded-xl items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary active:bg-primary-dark',
    secondary: 'bg-gray-600 active:bg-gray-700',
    danger: 'bg-danger active:bg-red-600',
    success: 'bg-success active:bg-green-600',
  };

  const disabledClasses = disabled || loading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-semibold text-base">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
