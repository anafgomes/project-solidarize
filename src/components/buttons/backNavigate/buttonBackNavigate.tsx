import React from "react";
import { ContainerButtonBackNavigate, ButtonBack } from "./style";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeStyled } from "@/hooks/useThemed";
import { useRouter } from "expo-router";

export const ButtonBackNavigateCustom = () => {
  const { isDarkMode } = useThemeStyled();
  const router = useRouter();

  return (
    <ContainerButtonBackNavigate>
      <ButtonBack onPress={() => router.push("/")}>
        {isDarkMode ? (
          <AntDesign
            style={{ marginLeft: 1 }}
            name="left"
            size={30}
            color="white"
          />
        ) : (
          <AntDesign
            style={{ marginLeft: 1 }}
            name="left"
            size={30}
            color="black"
          />
        )}
      </ButtonBack>
    </ContainerButtonBackNavigate>
  );
};
