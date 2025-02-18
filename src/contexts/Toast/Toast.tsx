import React, { useEffect } from "react";
import { CloseButton, CloseButtonText, Message, ToastContainer } from "./style";

type ToastProps = {
  message: string;
  onClose: () => void;
  type: "loading" | "success" | "error";
};

export const Toast = ({ message, onClose, type }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type}>
      <Message>{message}</Message>
      <CloseButton onPress={onClose}>
        <CloseButtonText>{"\u2716"}</CloseButtonText>
      </CloseButton>
    </ToastContainer>
  );
};
