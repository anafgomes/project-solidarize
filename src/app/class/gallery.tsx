import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { Image } from "expo-image";
import ImageModal from "@/module";

type PropsImage = {
  images: string[];
  setImages: (images: string[]) => void;
};

export default function Gallery({ images, setImages }: PropsImage) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  function toggleSelectImage(uri: string) {
    setSelectedImages((prev) =>
      prev.includes(uri) ? prev.filter((img) => img !== uri) : [...prev, uri],
    );
  }

  function isSelected(uri: string) {
    return selectedImages.includes(uri);
  }

  function deleteSelectedImages() {
    setImages(images.filter((img) => !selectedImages.includes(img)));
    setSelectedImages([]);
  }

  const handleImagePress = (uri: string) => {
    console.log("Imagem pressionada:", uri);
    if (selectionMode) {
      if (selectedImages.length == 1 && selectedImages[0] === uri) {
        setSelectionMode(false);
        setSelectedImages([]);
      } else {
        toggleSelectImage(uri);
      }
    } else {
      setCurrentImage(uri);
      setImageModalVisible(true);
    }
  };

  const handleLongPress = (uri: string) => {
    console.log("Imagem pressionada2:", uri);
    toggleSelectImage(uri);
    setSelectionMode(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Seus registros</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: 120,
            alignItems: "center",
          }}
        >
          {selectionMode ? (
            <Pressable
              onPress={() => {
                setSelectionMode(false);
                setSelectedImages([]);
              }}
              style={{ marginRight: 30 }}
            >
              <Text style={{ fontSize: 18 }}>Cancelar</Text>
            </Pressable>
          ) : null}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Text style={styles.menuButton}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu de contexto */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.contextMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                setSelectionMode(true);
              }}
            >
              <Text>Selecionar várias</Text>
            </TouchableOpacity>
            {selectedImages.length > 0 && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={deleteSelectedImages}
              >
                <Text>Deletar</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal image */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay2}
          onPress={() => setImageModalVisible(false)}
        >
          <View style={styles.imageModalContainer}>
            <Image source={{ uri: currentImage }} style={styles.modalImage} />
          </View>
        </TouchableOpacity>
      </Modal>

      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleImagePress(item)}
            onLongPress={() => {
              handleLongPress(item);
            }}
          >
            <Animated.View
              style={[
                styles.imageContainer,
                selectedImages.includes(item) && styles.selected,
              ]}
              entering={FadeInUp}
              exiting={FadeOut}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </Animated.View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  menuItem: {
    paddingVertical: 8,
  },
  imageContainer: {
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  selected: {
    borderWidth: 2,
    borderColor: "#E14848",
  },
  image: {
    width: 120,
    height: 120,
  },
  imageModalContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    // padding: 10,
  },
  modalImage: {
    width: 300,
    height: 300,
  },

  headerText: {
    fontSize: 18,
  },
  menuButton: {
    fontSize: 33,
    paddingRight: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 10,
  },
  modalOverlay2: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  contextMenu: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    width: 150,
  },
});
