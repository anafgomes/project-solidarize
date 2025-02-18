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

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const path = usePathname().replace(/^\//, "");
  console.log("Rota atual:", path);
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  // console.log(publishableKey);
  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
    );
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <ThemeProviderStyled>
          <ToastProvider>
            <GestureHandlerRootView>
              <Stack
                screenOptions={{
                  headerShown: false,
                  // animationTypeForReplace: "push",
                }}
                initialRouteName={"index"}
              >
                <Stack.Screen
                  name="class/galleryUser"
                  // options={{
                  //   title: "Sua Galeria",
                  //   tabBarIcon: ({ color, size, focused }) => (
                  //     <FontAwesome
                  //       name="photo"
                  //       size={size}
                  //       color={focused == true ? "#3e9677" : "black"}
                  //     ></FontAwesome>
                  //   ),
                  // }}
                />
                <Stack.Screen
                  name="index"
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
                />
                <Stack.Screen
                  name="class/gallery"
                  // options={{
                  //   title: "Galeria local",
                  //   tabBarIcon: ({ color, size, focused }) => (
                  //     <FontAwesome
                  //       name="photo"
                  //       size={size}
                  //       color={focused == true ? "#3e9677" : "black"}
                  //     ></FontAwesome>
                  //   ),
                  // }}
                />
              </Stack>
            </GestureHandlerRootView>
          </ToastProvider>
        </ThemeProviderStyled>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
