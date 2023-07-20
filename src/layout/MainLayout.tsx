import * as React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import useWallets from "hooks/useWallets";

import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import AppFooter from "./appFooter";

const MainLayout = () => {
  const isMobile = useMediaQuery("(max-width:700px)");
  const { isLoggedIn } = useWallets();

  const header = useMemo(
    () => (
      <Toolbar>
        <Header />
      </Toolbar>
    ),
    []
  );

  const appFooter = useMemo(
    () => (
      <Toolbar>
        <AppFooter />
      </Toolbar>
    ),
    []
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar color="inherit" elevation={0} position="relative">
        {header}
      </AppBar>
      <Box
        padding={isMobile ? "24px 16px" : 4}
        sx={{ height: "calc(100vh -  64px)", overflowY: "auto" }}
      >
        <Outlet />
      </Box>
      {isMobile && isLoggedIn && (
        <AppBar
          color="inherit"
          elevation={0}
          component="footer"
          sx={{
            position: "fixed",
            bottom: 0,
            height: 53,
            mt: "calc(100vh - 53px)",
          }}
        >
          {appFooter}
        </AppBar>
      )}
    </Box>
  );
};

export default MainLayout;
