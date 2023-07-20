import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { RENDERNUM } from "config"
import { useSelector } from "store";
import useApi from "hooks/userApi";
import Loading from "ui-component/Loading";
import { useNavigate } from "react-router-dom";

import Space from "./space";

const Explore = () => {
  const { getExploreData } = useApi();
  const isMobile = useMediaQuery("(max-width:430px)");
  const { user } = useSelector((state) => state.auth);
  const [topHolders, setTopHolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renderNum, setRenderNum] = useState(RENDERNUM);
  const { palette } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getExploreData().then(({ data }) => {
      setLoading(false);
      setTopHolders(data);
    });
  }, [user.addresses]);

  return (
    <Container sx={{ padding: isMobile ? 0 : "0 40px !important" }}>
      <Stack gap={4}>
        <Stack gap={2}>
          <Typography fontSize={20} textTransform="capitalize" fontWeight={700}>
            🐳 Explore Top Holders
          </Typography>
          <Stack gap={4.9} direction="row" sx={{ overflowX: "auto" }}>
            {topHolders.slice(0, 7).map((row: any, i) => (
              <Stack
                gap={1}
                key={i}
                alignItems="center"
                onClick={() => {
                  navigate(`/public?c=${row._id}`);
                }}
                sx={{
                  cursor: "pointer",
                  "& img, & svg": {
                    transition: "transform .2s",
                  },
                  "&:hover": {
                    "& img, & svg": {
                      transform: "scale(1.2)",
                    },
                    "& .nft-name": { color: palette.primary.main },
                  },
                }}
              >
                <Avatar src={row.avatar} sx={{ width: 126, height: 126 }} />
                <Typography sx={{
                  width: 126, height: 24, textAlign: "center", whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }} className="nft-name" fontWeight={700}>
                  {row.name}
                </Typography>
                <Stack direction="row" gap={0.5}>
                  <Typography fontWeight={700}>{row.nftLength}</Typography>
                  <Typography fontWeight={400} color="rgba(255, 255, 255, 0.8)">
                    NFTs
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Stack gap={2} >
          <Typography fontSize={20} textTransform="capitalize" fontWeight={700}>
            🧑‍🚀 Explore Spaces
          </Typography>
          {loading ? (
            <Loading height={"calc(100vh - 400px)"} />
          ) : (
            topHolders.slice(0, renderNum).map((row: any, i) => <Space holder={row} key={i} index={i} renderNum={renderNum} setRenderNum={setRenderNum} />)
          )}
        </Stack>
      </Stack>
    </Container >
  );
};

export default Explore;
