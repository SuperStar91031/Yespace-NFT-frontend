import React, { useEffect, useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useApi from "hooks/userApi";
import { NFTCard2 } from "components";
import { INFT } from "types";
import Loading from "ui-component/Loading";
import handleViewport from 'react-in-viewport';
import { RENDERNUM } from "config"

interface InfoProps {
  hideTitle?: boolean;
  handleClose: () => void;
  handleNextPage: () => void;
}

const HideNFT = ({ handleClose, handleNextPage, hideTitle }: InfoProps) => {
  const isMobile = useMediaQuery("(max-width:400px)");
  const { setShowNFT, getMyNFTs } = useApi();
  const [nfts, setNfts] = useState<INFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [renderNum, setRenderNum] = useState(RENDERNUM * 4);

  const handleConfirm = () => {
    setLoading(true);
    setShowNFT(nfts).then((data) => {
      setLoading(false);
      handleClose();
    });
  };

  const handleClickNFT = (nft: INFT) => {
    setDisabled(false);
    const _nfts = nfts.map((item: any) => {
      if (item._id === nft._id) {
        item.isShow = !item.isShow;
      }
      return item;
    });
    setNfts(_nfts);
  };

  const NFTComponent = ({ item, index }: { item: any, index: number }) => {
    const Component = (props: { inViewport: boolean, forwardedRef: any }) => {
      const { forwardedRef } = props;
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
        <NFTCard2
          onClick={() => handleClickNFT(item)}
          hideState={true}
          nft={item}
        />
        <SmartRender onEnterViewport={renderFunc} onLeaveViewport={() => { }} />
      </Box>
    )
  }

  useEffect(() => {
    setLoading(true);
    getMyNFTs(false).then((data) => {
      setLoading(false);
      let temp: any = [];
      data.data.map((item: any) => {
        temp = temp.concat(item.data);
      })
      setNfts(temp);
    });
  }, []);

  return (
    <>
      <DialogContent dividers sx={{ minWidth: "430px" }}>
        <Stack gap={2} sx={{ height: "100%" }}>
          <Typography>Select which NFTs to hide from your gallery.</Typography>
          <Stack
            gap={1}
            direction="row"
            flexWrap="wrap"
            sx={{
              height: "100%",
              "& .nft-card": {
                cursor: "pointer",
                width: 84,
                height: 84,
              },
              "& .nft-card:hover": {
                background: "rgba(0, 0, 0, 0.4)",
                "& .nft-img": {
                  opacity: 0.6,
                },
                "& .nft-text": {
                  display: "flex",
                },
                "& .nft-status": {
                  display: "none",
                },
              },
              "& .nft-img": {
                width: 84,
                height: 84,
                borderRadius: 1,
              },
            }}
          >
            {loading ? (
              <Loading height={"loading"} />
            ) : (
              nfts.slice(0, renderNum).map((item: any, i: number) => (
                <NFTComponent item={item} key={i} index={i} />
              ))
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleConfirm}
          disabled={disabled}
          sx={{
            "&.Mui-disabled": {
              background: "#FFDD2D !important",
              opacity: 0.6,
              color: "#343434",
            },
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </>
  );
};

export default HideNFT;
