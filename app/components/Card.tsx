import { View, StyleSheet, ViewStyle } from 'react-native';
import { useAppStore } from '../../store/useAppStore';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  const isDark = useAppStore(state => state.isDarkMode);

  return (
    <View style={[
      styles.card,
      isDark ? styles.cardDark : styles.cardLight,
      style
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
  cardLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardDark: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
});
