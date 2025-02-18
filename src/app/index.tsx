import SVGSolidarize from "@/components/svgs/iconSolidarize";
import HomeScreen from "@/screens/home/home";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Home() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (shouldRedirect) {
    return <Redirect href={"/(tabs)/screenHome"} />;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SVGSolidarize></SVGSolidarize>
    </View>
  );
}
