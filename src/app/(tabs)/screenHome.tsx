import { ONGsTypes } from "@/@types/ONGsType";
import { UserInfoClerk } from "@/@types/userClerkTypes";
import apiAxios from "@/components/axiosApi";
import SolidaName from "@/components/svgs/solidaName";
import HomeScreen from "@/screens/home/home";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-react";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useRouter } from "expo-router";
import { getItemAsync } from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const { user } = useUser();
  // console.log(user);
  const [ong, setOng] = useState<ONGsTypes[]>([]);
  const { isSignedIn, userId, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await apiAxios.get("ongs");
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
    setIsLoading(false);
    console.log(response.data);
    setOng(response.data);
  };

  async function checkUser() {
    const response = await apiAxios.get(`/infoUser/${user?.id}`);

    if (response.data.typeUser === "ONG") {
      return router.replace("/(tabs)/screenOng");
    }
  }

  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <SolidaName />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Olá, {user?.firstName}
            </Text>
            <LinearGradient
              colors={["#ff7e5f", "#feb47b"]}
              style={{
                marginLeft: 10,
                elevation: 5,
                padding: 5,
                paddingBottom: 2,
                height: 33,
                borderRadius: 5,
                width: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ width: "100%" }}
                onPress={() => signOut()}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    textAlign: "center",
                    paddingBottom: 2,
                  }}
                >
                  Sair
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          Escolha uma ONG abaixo para doar:
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <ScrollView
          style={{ width: "93%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {ong
            .filter((item) => item.typeUser === "ONG")
            .map((item, index) => (
              <View key={index} style={{ padding: 10 }}>
                <Pressable
                  style={styles.buttonsOng}
                  onPress={() =>
                    router.push({
                      pathname: "/(tabs)/screenDonation",
                      params: {
                        id: item.userID,
                      },
                    })
                  }
                >
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: "#FFFFFF",
                    }}
                  ></View>
                  <View style={{ marginLeft: 10, height: "100%" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      {item.nameOng.charAt(0).toUpperCase() +
                        item.nameOng.slice(1)}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      {item.address.street}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "400" }}>
                      Telefone: {item.phoneOnwerOng}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#8AC926",
                      }}
                    >
                      Doar
                    </Text>
                  </View>
                </Pressable>
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    padding: 20,
    paddingTop: 5,
  },
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonsOng: {
    flexDirection: "row",
    backgroundColor: "#dedede",
    padding: 10,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
});
