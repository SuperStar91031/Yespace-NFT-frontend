import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HOME_PATH } from "config";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h6">This Page Isn't Available.</Typography>
      <Button
        variant="contained"
        color="warning"
        onClick={() => navigate(HOME_PATH)}
      >
        Back to Yespace
      </Button>
    </Box>
  );
};

export default Home;
