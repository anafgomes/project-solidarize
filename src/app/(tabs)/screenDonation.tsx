import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Biblioteca para dropdown
import { LinearGradient } from "expo-linear-gradient";
import SolidaName from "@/components/svgs/solidaName";
import { useAuth, useUser } from "@clerk/clerk-react";
import apiAxios from "@/components/axiosApi";
import { ONGsTypes } from "@/@types/ONGsType";
import Dropdown from "@/components/Dropdown";
import { useToast } from "@/contexts/Toast/ToastContext";

export default function Donation() {
  const params = useLocalSearchParams();
  const { signOut } = useAuth();
  const { user } = useUser();
  console.log(params);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [donationList, setDonationList] = useState<string[]>([]);
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [ong, setOng] = useState<ONGsTypes>();
  const [quantity, setQuantity] = useState<number>(1);
  const { addToast } = useToast();

  const products = [
    "Ração",
    "Cobertor",
    "Brinquedo",
    "Medicamento",
    "Alimento",
  ];

  const addProductToDonation = () => {
    const itemExists = items.some((item) => item.name === selectedProduct);
    console.log(selectedProduct, quantity);
    console.log(selectedProduct);
    console.log(itemExists);
    if (!selectedProduct) {
      return addToast({ type: "error", message: "Selecione um produto" });
    }
    if (quantity <= 0) {
      return addToast({ type: "error", message: "Quantidade inválida" });
    }
    if (selectedProduct && quantity >= 1 && !itemExists) {
      console.log("entrou");
      setItems([...items, { name: selectedProduct, quantity }]);
      addToast({ type: "success", message: "Produto adicionado" });
    } else {
      addToast({
        type: "loading",
        message: "Produto já existe",
      });
    }
    console.log(items);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiAxios.get(`/ongs/${params.id}`);
      console.log(response.data);
      setOng(response.data);
    };
    fetchData();
  }, []);

  function handleSelectProduct(item: any) {
    console.log(item);
    console.log("entrou");
    setSelectedProduct(item.value);
  }

  async function sendData() {
    const data = {
      products: items,
      ONGdestination: params.id,
      UserDonator: user?.id,
    };
    console.log(data);
    addToast({ type: "loading", message: "Enviando dados" });
    const response = await apiAxios.post("/ongs/donation", data);
    console.log(response);
    if (response.status !== 201) {
      return addToast({ type: "error", message: "Erro ao enviar dados" });
    }
    addToast({
      type: "success",
      message: "Doação realizada com sucesso",
    });
    setTimeout(() => {
      router.push("/(tabs)/screenHome");
    }, 1500);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <SolidaName />
            <View
              style={{
                width: 126,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            ></View>
          </View>
        </View>
        <View style={styles.containerNameONG}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              color: "white",
            }}
          >
            {ong
              ? ong?.nameOng.charAt(0).toLocaleUpperCase() +
                ong.nameOng.slice(1)
              : "Carrengando Dados"}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
            {ong ? ong?.address.street : "Carrengando Dados"}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
            {ong ? "telefone: " + ong?.phoneOng : "Carrengando Dados"}
          </Text>
        </View>
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ textAlign: "left", fontSize: 16, fontWeight: "600" }}>
            Resgistre sua doação
          </Text>
        </View>
        <Dropdown
          data={products.map((product) => ({ label: product, value: product }))}
          onChange={handleSelectProduct}
          placeholder="Selecione o produto"
        />
        <TextInput
          style={{
            height: 50,
            justifyContent: "space-between",
            backgroundColor: "#fff",
            flexDirection: "row",
            width: "92%",
            alignItems: "center",
            paddingHorizontal: 15,
            borderRadius: 8,
            marginBottom: 20,
          }}
          placeholder="Selecione a quantidade"
          keyboardType="numeric"
          value={quantity === 0 ? "" : quantity.toString()}
          onChangeText={(text) => {
            if (text === "") {
              setQuantity(0);
            } else {
              const parsedValue = parseInt(text, 10);
              if (!isNaN(parsedValue) && parsedValue > 0) {
                setQuantity(parsedValue);
              }
            }
          }}
          onBlur={() => {
            if (quantity === 0) {
              setQuantity(1);
            }
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#8AC926",
            padding: 12,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 25,
          }}
          onPress={addProductToDonation}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Adicionar Produto
          </Text>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "92%" }}
        >
          {items.map((item, index) => (
            <View key={index} style={styles.itemsContainer}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "#FFFFFF",
                }}
              ></View>
              <View style={{ marginLeft: 10, height: "100%" }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {item.quantity} {item.quantity > 1 ? "unidades" : "unidade"}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <LinearGradient
          colors={["#ff7e5f", "#feb47b"]}
          style={{
            marginLeft: 10,
            elevation: 5,
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            marginRight: 10,
          }}
        >
          <TouchableOpacity onPress={sendData}>
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Realizar doação
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
  containerNameONG: {
    width: "92%",
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
    height: 100,
    elevation: 5,
    backgroundColor: "#8AC926",
  },
  itemsContainer: {
    flexDirection: "row",
    backgroundColor: "#dedede",
    padding: 10,
    height: 70,
    borderRadius: 10,
    marginBottom: 10,
  },
});
