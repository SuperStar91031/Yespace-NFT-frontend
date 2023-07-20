import React, { useState } from "react";
import { Holder } from "types";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NFTCard2, PreviewNFT } from "components";
import { INFT } from "types";
import { RENDERNUM } from "config"

import { useNavigate } from "react-router-dom";
import handleViewport from 'react-in-viewport';

const Component = (props: { inViewport: boolean, forwardedRef: any }) => {
  const { inViewport, forwardedRef } = props;
  return (
    <Box ref={forwardedRef} />
  );
};

const Space = ({ holder, index, renderNum, setRenderNum }: { holder: Holder, index: number, renderNum: number, setRenderNum: any }) => {
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const isMobile = useMediaQuery("(max-width:700px)");
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState<INFT>({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickNFT = (nft: INFT) => {
    setActive(nft);
    handleOpen();
  };
  const navigate = useNavigate();

  if (!holder.nfts?.length) {
    return <></>
  }

  const SmartRender = handleViewport(Component, /** options: {}, config: {} **/);

  const renderFunc = () => {
    if (index === renderNum - 1) {
      setRenderNum(renderNum + RENDERNUM);
    }
  }

  return (
    <>
      <Stack
        p={2}
        bgcolor={palette.primary.dark}
        gap={2}
        sx={{
          cursor: "pointer",
          "&:hover": { bgcolor: palette.secondary.dark },
        }}
        borderRadius={1}
      >
        <Stack
          direction="row"
          onClick={() => {
            navigate(`/public?c=${holder._id}`);
          }}
          gap={2}
        >
          <Avatar src={holder?.avatar} sx={{ width: 72, height: 72 }} />
          <Stack gap={1} justifyContent="center">
            <Typography fontWeight={700}>{holder?.name}</Typography>
            <Stack direction="row" gap="10px">
              <Stack direction="row" gap={0.5}>
                <Typography fontWeight={700}>{holder?.nftLength}</Typography>
                <Typography fontWeight={400} color="rgba(255, 255, 255, 0.8)">
                  NFTs
                </Typography>
              </Stack>
              <Stack direction="row" gap={0.5}>
                <Typography fontWeight={700}>{holder?.addresses}</Typography>
                <Typography fontWeight={400} color="rgba(255, 255, 255, 0.8)">
                  Chains
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          sx={{
            "& .nft-card": {
              width: isMobile ? "47%" : 260,
              aspectRatio: "1 / 1",
              overflow: "hidden",
              cursor: "pointer",
            },
            "& .nft-img": {
              transition: "transform .2s",
              width: isMobile ? "100%" : 260,
              aspectRatio: "1 / 1",
              borderRadius: 1,
            },
            "& .nft-img:hover": {
              transform: "scale(1.2)",
            },
          }}
        >
          {holder?.nfts?.slice(0, 4).map((row: any, i) => (
            <NFTCard2 key={i} nft={row} onClick={() => handleClickNFT(row)} />
          ))}
        </Stack>
      </Stack>
      <Box>
        <PreviewNFT nft={active} open={open} onClose={handleClose} />
      </Box>
      <SmartRender onEnterViewport={renderFunc} onLeaveViewport={()=>{}} />
    </>
  );
};

export default Space;
