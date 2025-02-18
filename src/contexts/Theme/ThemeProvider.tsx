import { HeaderCustom } from "@/components/header/headerCustom";
import { darkTheme, lightTheme } from "@/constants/Colors";
import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as ProviderStyleComponents } from "styled-components/native";
import { ThemeContextStyle } from "./ThemeContextStyle";
export const ThemeProviderStyled = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ProviderStyleComponents theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeContextStyle.Provider value={{ isDarkMode, toggleTheme }}>
        {/* <HeaderCustom /> */}
        {children}
      </ThemeContextStyle.Provider>
    </ProviderStyleComponents>
  );
};
