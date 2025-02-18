import React, {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Toast } from "./Toast";

type ToastProviderProps = {
  children: ReactNode;
};

type ToastType = {
  message: string;
  id: number;
  type: "loading" | "success" | "error";
};

export type AddToastParams = {
  type: "loading" | "success" | "error";
  message: string;
};

type ToastContextValue = {
  addToast: (params: AddToastParams) => void;
  onClose: (id: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = ({ type, message }: AddToastParams) => {
    const newToast: ToastType = {
      id: Date.now(),
      message,
      type,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const closeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const contextValue = useMemo(() => ({ addToast, onClose: closeToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => closeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
