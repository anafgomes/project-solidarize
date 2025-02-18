// src/screens/Home/HomeScreen.styles.ts
import { Theme } from "@/@types/themeType";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import { heightScreen, widthScreen } from "@/constants/DimensionScreen";

export interface HomeScreenProps {
  toggleTheme?: () => void;
}

export const Container = styled.View`
  flex: 1;
  padding-top: 20px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.colors.text};
`;

export const SubTitle = styled.Text`
  font-size: 17px;
  color: ${(props) => props.theme.colors.subText};
`;

export const Button = styled(TouchableOpacity)`
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  background-color: ${(props) => props.theme.colors.buttonBackground};
  padding: ${heightScreen * 0.015}px ${widthScreen * 0.3}px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.buttonText};
  font-size: 16px;
`;
