import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Redirect, Stack, Tabs, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProviderStyled } from "@/contexts/Theme/ThemeProvider";
import { ToastProvider } from "@/contexts/Toast/ToastContext";
import { Ionicons } from "@expo/vector-icons";
import {
  ClerkLoaded,
  ClerkProvider,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import { tokenCache } from "@/module/secure/cache";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayoutNav() {
  const path = usePathname().replace(/^\//, "");

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    );
  }

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  if (!isSignedIn) {
    return <Redirect href="/auth" />;
  }

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    return <Redirect href="/auth" />;
  }

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          headerShown: false,
          // animationTypeForReplace: "push",
        }}
        initialRouteName={"screenHome"}
      >
        <Stack.Screen
          name="screenHome"
          // options={{
          //   title: "Câmera",
          //   tabBarIcon: ({ color, size, focused }) => (
          //     <Feather
          //       name="camera"
          //       size={size}
          //       color={focused == true ? "#3e9677" : "black"}
          //     ></Feather>
          //   ),
          // }}
          // options={{ animation: "slide_from_left" }}
          options={{ headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
