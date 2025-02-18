import React from "react";
import { Button, HeaderContainer } from "./styleHeaderCustom";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeStyled } from "@/hooks/useThemed";

export const HeaderCustom = () => {
  const { toggleTheme, isDarkMode } = useThemeStyled();

  return (
    <HeaderContainer>
      <Button onPress={toggleTheme}>
        {isDarkMode ? (
          <MaterialIcons
            style={{ marginLeft: 1 }}
            name="light-mode"
            size={30}
            color="white"
          />
        ) : (
          <MaterialIcons
            style={{ marginLeft: 1 }}
            name="dark-mode"
            size={30}
            color="black"
          />
        )}
      </Button>
    </HeaderContainer>
  );
};
