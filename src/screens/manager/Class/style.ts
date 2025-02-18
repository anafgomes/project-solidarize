// src/screens/Home/HomeScreen.styles.ts
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { heightScreen, widthScreen } from "@/constants/DimensionScreen";

export interface HomeScreenProps {
  toggleTheme?: () => void;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 180px;
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

export const InputContainer = styled.View`
  width: 80%;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
`;
