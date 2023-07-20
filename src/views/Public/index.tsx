import React, { MouseEvent, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NFTCard, PreviewNFT } from "components";
import { INFT, IUser } from "types";
import useApi from "hooks/userApi";
import Loading from "ui-component/Loading";
import EmptyContent from "ui-component/EmptyContent";
import handleViewport from 'react-in-viewport';
import { RENDERNUM } from "config"

const Public = () => {
  const { getCollections } = useApi();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>("");
  const [nfts, setNfts] = useState([]);
  const [nft, setNft] = useState<INFT[]>([]);
  const [user, setUser] = useState<IUser>({});
  const [active, setActive] = useState<INFT>({});
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width:430px)");
  const [renderNum, setRenderNum] = useState(RENDERNUM * 4);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleType = (event: MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) setType(newType);
  };

  const handleActive = (nft: INFT) => {
    setActive(nft);
    handleOpen();
  };

  const NFTComponent = ({ item, index }: { item: any, index: number }) => {

    const Component = (props: { inViewport: boolean, forwardedRef: any }) => {
      const { inViewport, forwardedRef } = props;
      return (
        <Box ref={forwardedRef} />
      );
    };

    const SmartRender = handleViewport(Component, /** options: {}, config: {} **/);

    const renderFunc = () => {
      if (index === renderNum - 1) {
        setRenderNum(renderNum + (RENDERNUM * 4));
      }
    }

    return (
      <Box>
        <NFTCard
          nft={item}
          onClick={() => handleActive(item)}
        />
        <SmartRender onEnterViewport={renderFunc} onLeaveViewport={() => { }} />
      </Box>
    )
  }


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("c");
    if (id) {
      setLoading(true);
      getCollections(id).then((data) => {
        setLoading(false);
        setNfts(data.data.nfts);
        let temp: any = [];
        data.data.nfts.map((item: any) => {
          temp = temp.concat(item.data);
        })
        setNft(temp);
        setUser(data.data.user);
      });
    }
  }, []);

  return (
    <Container>
      <Avatar src={user.avatar} sx={{ width: 128, height: 128, mt: 5 }} />
      <Box mt={2}>
        <Typography>{user.name}</Typography>
        <Stack direction="row" gap={0.5} mt={1.5}>
          <Typography sx={{ fontWeight: 700 }}>{nft.length}</Typography>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            NFTs
          </Typography>
          <Typography sx={{ fontWeight: 700, ml: 1 }}>
            {nfts?.length}
          </Typography>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            Chains
          </Typography>
        </Stack>
      </Box>
      <ToggleButtonGroup
        size="small"
        sx={{
          "& .MuiToggleButtonGroup-grouped": {
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textTransform: "none",
            margin: "10px",
            border: 0,
            color: "rgb(254, 254, 254, 0.8)",
            p: "6px 12px",
            borderRadius: "4px !important",
            background: "rgba(0, 0, 0, 0.2)",
            "&:first-of-type": {
              marginLeft: 0,
            },
            ":hover": {
              background: "rgba(255, 255, 255, 0.1)",
            },
          },
          "& .Mui-selected": {
            background: "rgba(255, 255, 255, 0.1)",
            color: "#FFDD2D !important",
          },
        }}
        value={type}
        exclusive
        onChange={handleType}
        aria-label="text type"
      >
        <ToggleButton value="" aria-label="left aligned">
          All Chains
        </ToggleButton>
        {nfts?.map((item: any, key) => (
          <ToggleButton
            key={key}
            value={item._id.name}
            aria-label="centered"
            sx={{ textTransform: "capitalize !important" }}
          >
            {item._id.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {loading ? (
        <Loading height={"calc(100vh - 400px)"} />
      ) : nft.filter((e) => e.network?.name.indexOf(type) !== -1).length ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {nft.filter((e) => e.network?.name.indexOf(type) !== -1).slice(0, renderNum).map((item, key) => (
            <NFTComponent key={key} item={item} index={key} />
          ))}
        </Box>
      ) : (
        <EmptyContent height={"calc(100vh - 400px)"} />
      )}

      <Box>
        <PreviewNFT nft={active} open={open} onClose={handleClose} />
      </Box>
    </Container>
  );
};

export default Public;
