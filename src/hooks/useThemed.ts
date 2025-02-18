import { ThemeContextStyle } from "@/contexts/Theme/ThemeContextStyle";
import { useContext } from "react";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStyled = (): ThemeContextProps => {
  const context = useContext(ThemeContextStyle);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
