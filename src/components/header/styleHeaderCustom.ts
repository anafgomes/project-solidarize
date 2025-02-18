import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  background-color: transparent;
  width: 80px;
  padding: 15px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export const Button = styled(TouchableOpacity)`
  background-color: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 43px;
  height: 43px;
  border-radius: 25px;
`;
