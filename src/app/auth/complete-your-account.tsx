import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { TextInput as TextInputCustom } from "@/components/Forms/TextInput";
import RadioButtonInput from "@/components/Forms/RadioButtonInput";
import apiAxios from "@/components/axiosApi";

const CompleteYourAccountScreen = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [lat, setLat] = useState("");
  const [log, setLog] = useState("");
  const [address, setAddress] = useState("");
  // const [accountType, setAccountType] = useState<"User" | "ONG">("ONG"); // Estado para definir o tipo de conta
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit, setError, setValue, watch, getValues } =
    useForm({
      defaultValues: {
        accountType: "ONG",
        full_name: "",
        name: "",
        address: "",
        phoneOwner: "",
        phoneONG: "",
      },
    });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLat(String(location.coords.latitude));
      setLog(String(location.coords.longitude));
      getAddress(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const getAddress = async (latitude: number, longitude: number) => {
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (reverseGeocode.length > 0) {
      const formattedAddress = `${reverseGeocode[0].street}, ${reverseGeocode[0].subregion}, ${reverseGeocode[0].region}`;
      setAddress(formattedAddress);
      setValue("address", formattedAddress);
    }
  };
  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLat(latitude.toString());
    setLog(longitude.toString());
    setLocation({ coords: { latitude, longitude } });
    getAddress(latitude, longitude);
  };

  const onSubmit = async (data: any) => {
    const { accountType, full_name, name, address, phoneOwner, phoneONG } =
      data;
    try {
      setIsLoading(true);
      const payload = {
        userID: user?.id,
        typeUser: accountType,
        emailUser: user?.emailAddresses[0].emailAddress,
        nameOwner: full_name,
        nameOng: name,
        phoneOnwerOng: phoneOwner,
        phoneOng: phoneONG,
        address: {
          street: address,
          longitude: log,
          latitude: lat,
        },
        onboarding_completed: true,
      };

      const response = await apiAxios.post("/signUp", payload);
      if (response.status === 201) {
        console.log("Conta criada com sucesso!", response.data);
      }
      // else {
      //   signOut();
      //   router.replace("/auth/sign-in");
      // }

      await user?.update({
        unsafeMetadata: {
          accountType,
          address,
          phoneOwner,
          phoneONG,
          onboarding_completed: true,
        },
      });
      await user?.reload();
      router.replace("/");
    } catch (error) {
      console.log(error);
      setError("full_name", { message: "Ocorreu um erro" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoaded || !user) return;
    setValue("full_name", user?.fullName || "");
    setValue("name", user?.username || "");
  }, [isLoaded, user]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headingContainer}>
        <Text style={styles.label}>Complete seu cadastro</Text>
        <Text style={styles.description}>
          Escolha seu tipo de conta e preencha os dados
        </Text>
      </View>

      <View style={styles.formContainer}>
        <RadioButtonInput
          control={control}
          placeholder="Escolha seu tipo de conta"
          label="Tipo de Conta"
          required
          name="accountType"
          options={[
            { label: "ONG", value: "ONG" },
            { label: "Doador", value: "User" },
          ]}
        />

        <TextInputCustom
          control={control}
          placeholder="Digite seu nome completo"
          label="Nome completo"
          required
          name="full_name"
        />
        <TextInputCustom
          control={control}
          placeholder="Digite o telefone"
          label="Número de telefone"
          required
          name="phoneOwner"
        />

        {watch("accountType") === "ONG" && (
          <>
            <TextInputCustom
              control={control}
              placeholder="Digite o nome da ONG"
              label="Nome da ONG"
              required
              name="name"
            />
            <TextInputCustom
              control={control}
              placeholder="Digite o telefone da ONG"
              label="Número da ONG"
              required
              name="phoneONG"
            />
          </>
        )}

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
          readOnly
        />

        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={handleMapPress}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Localização"
            />
          </MapView>
        )}

        <TouchableOpacity
          style={[styles.button, { opacity: isLoading ? 0.7 : 1 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator size="small" color="white" /> : null}
          <Text style={styles.buttonText}>
            {isLoading ? "Carregando..." : "Finalizar Cadastro"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CompleteYourAccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 25 },
  headingContainer: { marginBottom: 20 },
  label: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "gray" },
  formContainer: { padding: 10 },
  button: {
    backgroundColor: "#8AC926",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  map: { width: "100%", height: 300, marginTop: 10, borderRadius: 10 },
});
