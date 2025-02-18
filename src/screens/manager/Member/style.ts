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
  align-items: center;
  padding-top: 60px;
  justify-content: flex-start;
  padding-bottom: 180px;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Title = styled.Text<{ fontSize?: any; bold?: boolean }>`
  font-size: ${(props) => props.fontSize || "24px"};
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

export const SubTitle = styled.Text`
  font-size: 17px;
  color: ${(props) => props.theme.colors.subText};
`;

export const Button = styled(TouchableOpacity)<{
  color?: string;
}>`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background-color: ${({ color }) => color || "green"};
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
  width: 90%;
  margin-bottom: 15px;
  margin-top: 15px;
  flex-direction: row;
`;
export const InputContainerTime = styled.View`
  width: 90%;
  margin-bottom: 15px;
  margin-top: 10px;
  flex-direction: row;
`;

export const ButtonAdd = styled(TouchableOpacity)`
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: -48px;
  margin-top: 4px;
  width: 43px;
  height: 43px;
  border-radius: 5px;
`;

export const ButtonTime = styled(TouchableOpacity)<{ border?: boolean }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70px;
  margin-left: 10px;
  height: 43px;
  border-radius: 8px;
  border: ${(props) => (props.border ? "2px solid" : "0px solid")};
  border-color: #00b37e;
`;

export const StyledInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border-radius: 7px;
  padding: 10px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.inputBackground};
  border: 1px solid ${(props) => props.theme.colors.inputBorder};
`;
