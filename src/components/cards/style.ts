import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const ContainerCard = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secundaryBackground};
  padding-left: 20px;
  width: 100%;
  height: 55px;
  border-radius: 10px;
  margin-top: 12px;
`;

export const IconExclude = styled(TouchableOpacity)`
  background-color: transparent;
`;

export const Text = styled.Text`
  width: 80%;
  color: ${(props) => props.theme.colors.buttonText};
  padding-left: 20px;
  font-size: 20px;
`;
