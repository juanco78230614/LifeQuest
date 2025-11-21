import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setOnboardingDone() {
  await AsyncStorage.setItem("onboardingDone", "true");
}

export async function isOnboardingDone() {
  const value = await AsyncStorage.getItem("onboardingDone");
  return value === "true";
}
