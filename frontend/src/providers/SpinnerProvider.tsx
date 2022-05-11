import { useContext, createContext, useState } from "react";

interface SpinnerContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const SpinnerContext = createContext<SpinnerContextType | undefined>(
  undefined
);

export const useSpinner = () => {
  const { loading, setLoading } = useContext(SpinnerContext)!;

  const toggle = (value: boolean) => {
    setLoading(value);
  };

  return {
    loading,
    toggle,
    setLoading,
  };
};

const SpinnerProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [loading, setLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ loading, setLoading }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
