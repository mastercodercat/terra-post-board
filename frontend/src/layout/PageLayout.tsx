import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "./Header";
import SnackBar from "../components/SnackBar";
import Spinner from "../components/Spinner";

const PageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <SnackBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {children}
      </Container>
      <Spinner />
    </Box>
  );
};

export default PageLayout;
