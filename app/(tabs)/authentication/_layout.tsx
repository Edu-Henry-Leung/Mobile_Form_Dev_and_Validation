import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="signInForm" options={{ title: "Sign In" }} />
      <Stack.Screen name="signUpForm" options={{ title: "Sign Up" }} />
    </Stack>
  );
}
