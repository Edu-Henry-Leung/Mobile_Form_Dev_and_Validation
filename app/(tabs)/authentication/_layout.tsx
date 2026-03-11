import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="signInForm" options={{ headerShown: false }} />
      <Stack.Screen name="signUpForm" options={{ headerShown: false }} />
    </Stack>
  );
}
