import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';

const onboardingSteps = [
  {
    emoji: '🎯',
    title: 'Bienvenido a LifeQuest',
    description: 'Transforma tus tareas diarias en misiones épicas y sube de nivel en la vida real.',
  },
  {
    emoji: '⚡',
    title: 'Gana XP y Sube de Nivel',
    description: 'Completa misiones para ganar experiencia. Cada logro te acerca más a tu siguiente nivel.',
  },
  {
    emoji: '🔥',
    title: 'Mantén tu Racha',
    description: 'Completa misiones todos los días para mantener tu racha activa y desbloquear logros especiales.',
  },
  {
    emoji: '🏆',
    title: 'Desbloquea Logros',
    description: 'Alcanza hitos importantes y colecciona logros que demuestren tu progreso.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding, currentUser } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    completeOnboarding();
    if (currentUser?.role === 'admin') {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/(tabs)/missions');
    }
  };

  const step = onboardingSteps[currentStep];

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6']}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-between px-6 py-12">
          {/* Skip button */}
          <View className="items-end">
            <Button
              title="Saltar"
              onPress={handleSkip}
              variant="secondary"
              className="bg-white/20 px-4 py-2"
            />
          </View>

          {/* Content */}
          <View className="flex-1 justify-center items-center">
            <Text className="text-8xl mb-8">{step.emoji}</Text>
            <Text className="text-white text-3xl font-bold text-center mb-4">
              {step.title}
            </Text>
            <Text className="text-white/80 text-lg text-center max-w-md">
              {step.description}
            </Text>
          </View>

          {/* Navigation */}
          <View>
            {/* Dots */}
            <View className="flex-row justify-center mb-8 space-x-2">
              {onboardingSteps.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 rounded-full ${
                    index === currentStep
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/30'
                  }`}
                />
              ))}
            </View>

            {/* Next button */}
            <Button
              title={currentStep === onboardingSteps.length - 1 ? 'Comenzar' : 'Siguiente'}
              onPress={handleNext}
              variant="primary"
              className="bg-white"
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
