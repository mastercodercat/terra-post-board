import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ConnectWallet from "../components/ConnectWallet";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "white",
        filter: "drop-shadow(0px 4px 20px #ECEFF3)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{ mr: 2, color: "black", display: "flex" }}
          >
            Post Board
          </Typography>
          <ConnectWallet />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
