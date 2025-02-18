import { Redirect, Stack, usePathname } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { makeRequest } from "@/utils/makeRequest";
import { useEffect } from "react";
import axios from "axios";
import apiAxios from "@/components/axiosApi";

function AuthRoutesLayout() {
  const { isSignedIn, userId } = useAuth();
  const { user } = useUser();
  const pathName = usePathname();

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const response = await apiAxios.get(
    //       `/user/get-user-info?userId=${user?.id}`,
    //     );
    //     console.log(response.data);
    //     console.log("response do use effect layout", response);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }
    // if (isSignedIn) {
    //   fetchData();
    // }
  }, []);

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    console.log(
      "_layout auth",
      user?.unsafeMetadata?.onboarding_completed,
      isSignedIn,
    );
    if (pathName !== "/auth/complete-your-account") {
      console.log("entrou redirecionol 2");
      return <Redirect href="/auth/complete-your-account" />;
    }
  }
  console.log(user?.unsafeMetadata?.onboarding_completed);
  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed === true) {
    return <Redirect href="/(tabs)/screenHome" />;
  }
  console.log("entrou não redirecionol ");
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="complete-your-account"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default AuthRoutesLayout;
