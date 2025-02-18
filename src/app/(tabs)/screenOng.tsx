import { Donation, ONGsTypes } from "@/@types/ONGsType";
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

export default function HomeONG() {
  const { user } = useUser();
  // console.log(user);
  const [donations, setDonations] = useState<Donation[]>([]);
  const { isSignedIn, userId, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await apiAxios.get(`/ongDonations/${user?.id}`);
    setIsLoading(false);
    console.log(response.data);
    setDonations(response.data);
  };

  useEffect(() => {
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
          Doações recebidas:
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
          {donations.map((item, index) => (
            <View key={index} style={{ padding: 10 }}>
              <Pressable
                style={styles.buttonsOng}
                onPress={() => console.log("onpress")}
              >
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
                  }}
                ></View>
                <View
                  style={{
                    marginLeft: 10,
                    height: "100%",
                    justifyContent: "center",
                    padding: 5,
                    paddingVertical: 25,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    {item.UserDonator.emailUser.split("@")[0]}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Doou {item.products.length}{" "}
                    {item.products.length > 1 ? "produtos" : "produto"}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#8AC926",
                      marginTop: 10,
                    }}
                  >
                    Detalhes
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
