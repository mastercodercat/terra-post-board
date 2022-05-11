import { AlertColor } from "@mui/material";
import { useContext, createContext, useState } from "react";

export interface ISnack {
  message: string;
  open: boolean;
  status: AlertColor;
}

interface SnackContextType {
  snack: ISnack;
  setSnack: (value: ISnack) => void;
}

export const SnackContext = createContext<SnackContextType | undefined>(
  undefined
);

export const useSnack = () => {
  const { snack, setSnack } = useContext(SnackContext)!;

  const show = (value: Omit<ISnack, "open">) => {
    setSnack({
      ...value,
      open: true,
    });
  };

  const hide = () => {
    setSnack({
      ...snack,
      open: false,
    });
  };

  const message = {
    success: (msg: string) => {
      show({
        message: msg,
        status: "success",
      });
    },
    error: (msg: string) => {
      show({
        message: msg,
        status: "error",
      });
    },
  };

  return {
    snack,
    setSnack,
    show,
    hide,
    message,
  };
};

interface ISnackProviderProps {
  children: React.ReactNode;
}

const SnackProvider = ({ children }: ISnackProviderProps) => {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    status: "success" as AlertColor,
  });

  return (
    <SnackContext.Provider value={{ snack, setSnack }}>
      {children}
    </SnackContext.Provider>
  );
};

export default SnackProvider;
