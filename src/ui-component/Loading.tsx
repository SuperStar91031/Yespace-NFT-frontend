import React from "react";
import { Stack, CircularProgress } from "@mui/material";

const Loading = (props: any) => {
  const { height } = props;
  return (
    <Stack
      sx={{
        mt: 1,
        width: "100%",
        height: height,
        background: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0.5,
      }}
    >
      <CircularProgress color="secondary" />
    </Stack>
  );
};

export default Loading;
