import React from "react";
import { Stack, Typography } from "@mui/material";
import { EmptyIcon } from "ui-component/SvgIcon";

const EmptyContent = (props: any) => {
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
        gap: 2,
        "& path": {
          fill: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <EmptyIcon />
      <Typography fontSize="14px" color="rgba(255, 255, 255, 0.8)">
        No NFTs found in your wallet(s).
      </Typography>
    </Stack>
  );
};

export default EmptyContent;
