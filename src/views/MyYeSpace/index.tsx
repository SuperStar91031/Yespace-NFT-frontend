import React, { MouseEvent, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  Typography,
  DialogTitle,
  Dialog,
  Grid,
  useMediaQuery,
} from "@mui/material";

import { ShareIcon, EditIcon } from "ui-component/SvgIcon";
import { AppTooltip, NFTCard, PreviewNFT, StyledMenu } from "components";
import CopyToClipboard from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
import Wallets from "views/Home/Wallets";
import Profile from "views/Home/Profile";
import Info from "views/Home/Info";
import HideNFT from "./hidenft";
import snackbar from "utils/snackbar";
import { useSelector } from "store";
import { INFT } from "types";
import useApi from "hooks/userApi";
import { BASE_URL } from "config";
import Loading from "ui-component/Loading";
import EmptyContent from "ui-component/EmptyContent";
import handleViewport from 'react-in-viewport';
import { RENDERNUM } from "config"


const MyYeSpace = () => {
  const { getMyNFTs } = useApi();
  const isMobile = useMediaQuery("(max-width:430px)");
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openHideNFT, setOpenHideNFT] = useState(false);
  const [type, setType] = useState<string>("");
  const [nfts, setNfts] = useState([]);
  const [nft, setNft] = useState<INFT[]>([]);
  const [active, setActive] = useState<INFT>({});
  const [anchorElEdit, setAnchorElEdit] = useState<null | HTMLElement>(null);
  const openEdit = Boolean(anchorElEdit);
  const [loading, setLoading] = useState(false);
  const [renderNum, setRenderNum] = useState(RENDERNUM * 4);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenInfo = () => {
    setAnchorElEdit(null);
    setOpenInfo(true);
  };
  const handleCloseInfo = () => setOpenInfo(false);
  const handleOpenWallet = () => setOpenWallet(true);
  const handleCloseWallet = () => setOpenWallet(false);
  const handleOpenProfile = () => {
    setAnchorElEdit(null);
    setOpenProfile(true);
  };
  const handleCloseProfile = () => setOpenProfile(false);
  const handleOpenHideNFT = () => {
    setAnchorElEdit(null);
    setOpenHideNFT(true);
  };
  const handleCloseHideNFT = () => {
    getNFTData();
    setOpenHideNFT(false);
  };

  const handleClickEdit = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElEdit(event.currentTarget);
  };

  const handleCloseEdit = () => {
    setAnchorElEdit(null);
  };

  const handleType = (event: MouseEvent<HTMLElement>, newType: string) => {
    if (newType !== null) setType(newType);
  };

  const handleActive = (nft: INFT) => {
    setActive(nft);
    handleOpen();
  };

  const handleCopy = () => {
    snackbar({ message: "Link copied to clipboard" });
  };

  const getNFTData = () => {
    setLoading(true);
    getMyNFTs(true).then((data) => {
      setLoading(false);
      setNfts(data.data);
      let temp: any = [];
      data.data.map((item: any) => {
        temp = temp.concat(item.data);
      })
      setNft(temp);
    });
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
    getNFTData();
  }, [user.addresses]);


  return (
    <Container>
      <Avatar src={user.avatar} sx={{ width: 128, height: 128 }} />
      <Stack
        direction={isMobile ? "column" : "row"}
        justifyContent="space-between"
        gap={0.5}
        mt={2}
      >
        <Box>
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
        <Box>
          <Stack direction="row" gap={1}>
            <AppTooltip title="Manage Wallets" placement="top">
              <Button
                variant="contained"
                color="inherit"
                onClick={handleOpenWallet}
              >
                Manage Wallets
              </Button>
            </AppTooltip>
            <AppTooltip title="Edit Profile" placement="top">
              <IconButton
                id="edit-button"
                aria-haspopup="true"
                aria-expanded={openEdit ? "true" : undefined}
                aria-controls={openEdit ? "edit-menu" : undefined}
                sx={{
                  height: "40px",
                  width: "40px",
                  "&:hover": {
                    "& path": {
                      fill: "#FFDD2D !important",
                    },
                  },
                }}
                color="inherit"
                onClick={handleClickEdit}
              >
                <EditIcon />
              </IconButton>
            </AppTooltip>
            <CopyToClipboard
              text={`${BASE_URL}public?c=${user._id}`}
              onCopy={handleCopy}
            >
              <AppTooltip title="Share" placement="top">
                <IconButton
                  sx={{
                    height: "40px",
                    width: "40px",
                    "&:hover": {
                      "& path": {
                        fill: "#FFDD2D !important",
                      },
                    },
                  }}
                  color="inherit"
                >
                  {/* <img src={ShareIcon} /> */}
                  <ShareIcon />
                </IconButton>
              </AppTooltip>
            </CopyToClipboard>
          </Stack>
        </Box>
      </Stack>
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

      <Dialog
        onClose={handleCloseWallet}
        open={openWallet}
        sx={{
          "& .MuiPaper-root": {
            margin: isMobile ? 2 : "auto",
            width: isMobile ? 343 : 424,
            height: isMobile ? 418 : 438,
          },
        }}
      >
        <DialogTitle sx={{ m: 0 }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box width={30} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Manage wallets
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton aria-label="close" onClick={handleCloseWallet}>
                <CloseIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <Wallets
          handleClose={handleCloseWallet}
          handleNextPage={handleCloseWallet}
          hideTitle
        />
      </Dialog>
      <Dialog
        onClose={handleCloseProfile}
        open={openProfile}
        sx={{
          "& .MuiPaper-root": {
            margin: isMobile ? 2 : "auto",
            width: isMobile ? 343 : 424,
            height: isMobile ? 418 : 438,
          },
        }}
      >
        <DialogTitle sx={{ m: 0 }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box width={30} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Pick a Profile Picture
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton aria-label="close" onClick={handleCloseProfile}>
                <CloseIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <Profile
          handleClose={handleCloseProfile}
          handleNextPage={handleCloseProfile}
          hideTitle
        />
      </Dialog>
      <Dialog
        onClose={handleCloseInfo}
        open={openInfo}
        sx={{
          "& .MuiPaper-root": {
            margin: isMobile ? 2 : "auto",
            width: isMobile ? 343 : 424,
            height: isMobile ? 418 : 438,
          },
        }}
      >
        <DialogTitle sx={{ m: 0 }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box width={30} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Edit Name and Bio
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton aria-label="close" onClick={handleCloseInfo}>
                <CloseIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <Info
          handleClose={handleCloseInfo}
          handleNextPage={handleCloseInfo}
          hideTitle
        />
      </Dialog>
      <Dialog
        onClose={handleCloseHideNFT}
        open={openHideNFT}
        sx={{
          "& .MuiPaper-root": {
            margin: isMobile ? 2 : "auto",
            width: isMobile ? 343 : 424,
            height: isMobile ? 418 : 438,
          },
        }}
      >
        <DialogTitle sx={{ m: 0 }}>
          <Stack flexDirection="row" justifyContent="space-between">
            <Box width={30} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Hide NFTs
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton aria-label="close" onClick={handleCloseHideNFT}>
                <CloseIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <HideNFT
          handleClose={handleCloseHideNFT}
          handleNextPage={handleCloseHideNFT}
          hideTitle
        />
      </Dialog>
      <StyledMenu
        id="edit-menu"
        MenuListProps={{ "aria-labelledby": "edit-button" }}
        anchorEl={anchorElEdit}
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <MenuItem onClick={handleOpenProfile} disableRipple>
          Edit Profile Picture
        </MenuItem>
        <MenuItem onClick={handleOpenInfo} disableRipple>
          Edit Name and Bio
        </MenuItem>
        <MenuItem onClick={handleOpenHideNFT} disableRipple>
          Hide NFTs
        </MenuItem>
      </StyledMenu>
    </Container>
  );
};

export default MyYeSpace;
