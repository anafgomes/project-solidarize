import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import SVGGallery from "@/components/svgs/iconGallery";
import SVGIconCamera from "@/components/svgs/iconCamera";
import SVGCaptu from "@/components/svgs/IconCaptu";
import Gallery from "@/app/class/gallery";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [openGallery, setOpenGallery] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  async function takePhoto() {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      setImages([...(images ?? []), photo!.uri]);
    } catch (error) {
      console.error("Erro ao capturar a foto:", error);
    }
  }
  async function pickImage() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permissão para acessar a biblioteca de mídia é necessária.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      // aspect: [9, 16],
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets?.length) {
      console.log(result?.assets[0].uri);
      setImages([...(images ?? []), result.assets[0].uri]);
      setOpenGallery(true);
    }
  }

  function deleteImage(uri: any) {
    setImages(images?.filter((img) => img !== uri));
  }

  return (
    <View style={styles.container}>
      {openGallery ? (
        <Gallery images={images} setImages={setImages}></Gallery>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons
                name="flip-camera-android"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      {/* // ----------------------------------- TAB -------------------------------------------------------------- */}
      <View style={styles.tab}>
        <View style={styles.tabItem}>
          <View style={styles.tabButton}>
            <TouchableOpacity
              style={styles.tabButtonInner}
              onPress={() => router.replace("/login")}
            >
              <SVGGallery></SVGGallery>
            </TouchableOpacity>
            <Text style={styles.tabButtonText}>Galeria</Text>
          </View>
          <View style={styles.tabButton}>
            <TouchableOpacity
              style={styles.tabButtonInnerCamera}
              onPress={() => {
                setOpenGallery(false);
                if (!openGallery) takePhoto();
              }}
            >
              <SVGIconCamera></SVGIconCamera>
            </TouchableOpacity>
          </View>
          <View style={styles.tabButton}>
            <TouchableOpacity
              style={styles.tabButtonInner}
              onPress={() => setOpenGallery(true)}
            >
              <SVGCaptu></SVGCaptu>
            </TouchableOpacity>
            <Text style={styles.tabButtonText}>Capturas</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    width: "100%",
    height: 110,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  tabItem: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabButtonText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 14,
    color: "#E14848",
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonInner: {
    overflow: "hidden",
    width: 50,

    height: 50,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 105, height: 100 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonInnerCamera: {
    overflow: "hidden",
    paddingLeft: 1,
    width: 60,
    height: 60,
    marginBottom: 10,
    marginLeft: 15,
    backgroundColor: "white",
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 20,
    marginBottom: 110,
  },
  button: {
    // backgroundColor: "black",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
