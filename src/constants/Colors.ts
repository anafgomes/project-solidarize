export const lightTheme = {
  colors: {
    background: "#f8f9fa",
    secundaryBackground: "#e4e5de",
    text: "#212529",
    buttonBackground: "#00875F",
    buttonText: "",
    subText: "#7C7C8A",
    inputBackground: "#fff",
    inputBorder: "#ddd",
  },
};

export const darkTheme = {
  colors: {
    background: "#212529",
    secundaryBackground: "#343B41",
    text: "#f8f9fa",
    buttonBackground: "#00875F",
    buttonText: "#ffffff",
    subText: "#7C7C8A",
    inputBackground: "#121214",
    inputBorder: "#444",
  },
};

// Tipagem do tema
export type ThemeType = typeof lightTheme;
