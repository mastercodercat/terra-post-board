import React from "react";
import ThemeProvider from "./ThemeProvider";
import SnackProvider from "./SnackProvider";
import SpinnerProvider from "./SpinnerProvider";

const Providers = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <ThemeProvider>
      <SpinnerProvider>
        <SnackProvider>{children}</SnackProvider>
      </SpinnerProvider>
    </ThemeProvider>
  );
};

export default Providers;
