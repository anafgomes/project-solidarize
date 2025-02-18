import { createContext, useContext } from "react";

interface ThemeContextProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContextStyle = createContext<ThemeContextProps | undefined>(
  undefined,
);
