import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const ContainerButtonBackNavigate = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  background-color: transparent;
  width: 80px;
  padding: 15px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const ButtonBack = styled(TouchableOpacity)`
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  border-radius: 25px;
`;
