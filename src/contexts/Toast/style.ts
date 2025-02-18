import styled from "styled-components/native";

export const ToastContainer = styled.View<{
  type: "loading" | "success" | "error";
}>`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  z-index: 9999;
  background-color: ${({ type }) =>
    type === "loading"
      ? "#f0ad4e"
      : type === "success"
        ? "#5cb85c"
        : "#d9534f"};
  padding: 15px;
  border-radius: 10px;
  margin: 5px 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
`;

export const Message = styled.Text`
  color: white;
  font-size: 16px;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 5px;
`;

export const CloseButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
