import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Stack,
  MenuItem,
  ListItemText,
  Box,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoImg from "assets/images/logo-1.svg";
import LogoSmImg from "assets/images/logo.svg";
import Metamask from "assets/images/metamask.svg";
import Phantom from "assets/images/phantom.svg";
import MyAlgo from "assets/images/myalgo.svg";

import { HOME_PATH } from "config";
import { WalletTypeProps } from "types";
import useWallets from "hooks/useWallets";
import { StyledMenu } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { ExploreIcon, PersonIcon } from "ui-component/SvgIcon";
import { useSelector } from "store";

export interface WalletModalProps {
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  connectPhantom: () => void;
  connectMetamask: () => void;
  connectMyAlgo: () => void;
}

function WalletModal(props: WalletModalProps) {
  const { open, onClose, connectPhantom, connectMetamask, connectMyAlgo, anchorEl } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <StyledMenu
      id="wallet-connect-menu"
      MenuListProps={{ "aria-labelledby": "wallet-connect-button" }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem
        onClick={connectPhantom}
        sx={{ padding: "8px 16px !important" }}
        disableRipple
      >
        <Box component={"img"} sx={{ width: "24px" }} src={Phantom} />
        <ListItemText primary="Phantom" sx={{ width: "152px", ml: 1 }} />
      </MenuItem>
      <MenuItem
        onClick={connectMetamask}
        sx={{ padding: "8px 16px !important" }}
        disableRipple
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "100px",
            width: 24,
            height: 24,
            bgcolor: "rgba(255,255,255,0.1)",
          }}
        >
          <Box
            component={"img"}
            sx={{ width: 18, height: 18 }}
            src={Metamask}
          />
        </Box>
        <ListItemText primary="Metamask" sx={{ width: "152px", ml: 1 }} />
      </MenuItem>
      <MenuItem
        onClick={connectMyAlgo}
        sx={{ padding: "8px 16px !important" }}
        disableRipple
      >
        <Box component={"img"} sx={{ width: "24px" }} src={MyAlgo} />
        <ListItemText primary="MyAlgo" sx={{ width: "152px", ml: 1 }} />
      </MenuItem>
    </StyledMenu>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:400px)");
  const isMobile2 = useMediaQuery("(max-width:700px)");
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState(3);
  const [icon, setIcon] = useState("");

  // const open = Boolean(anchorEl);

  const ActiveTabStyle = {
    "& path": {
      fill: theme.palette.primary.main,
    },
    cursor: "pointer",
    color: theme.palette.primary.main,
  };

  const DefaultTabStyle = {
    "&:hover": {
      "& path": {
        fill: theme.palette.primary.main,
      },
      color: theme.palette.primary.main,
    },
    cursor: "pointer",
    "& path": {
      fill: "white",
    },
    color: "white",
  };

  const {
    isLoggedIn,
    type,
    address,
    connectPhantom,
    connectMetamask,
    connectMyAlgo,
    disconnectWallets,
  } = useWallets();


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleOpenModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlerConnectPhantom = () => {
    setOpenModal(false);
    connectPhantom();
  };

  const handlerConnectMetamask = () => {
    setOpenModal(false);
    connectMetamask();
  };

  const handlerConnectMyAlgo = () => {
    setOpenModal(false);
    connectMyAlgo();
  };

  const onDisconnect = () => {
    setSelectedTab(3);
    setAnchorEl(null);
    setOpen(false);
    disconnectWallets();
  };

  const handleCreateSpace = () => {
    navigate(HOME_PATH);
  };

  const handleClickTap = (tab: number) => {
    if (tab === 1 && !user.isCreated) {
      setSelectedTab(3);
      navigate("/");
      return;
    }
    setSelectedTab(tab);
  };


  useEffect(() => {
    if (location.pathname.indexOf("public") !== -1) {
      setSelectedTab(3);
    }
    else if (location.pathname.indexOf("explore") !== -1 ) {
      setSelectedTab(0);
    } else if (location.pathname.indexOf("myyespace") !== -1) {
      setSelectedTab(1);
    } else if (isLoggedIn && user.isCreated) {
      setSelectedTab(1);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      if (selectedTab == 0) navigate("/explore");
      else if (selectedTab == 1 && user.isCreated) navigate("/myyespace");
    }
  }, [selectedTab]);

  useEffect(() => {
    if (type === WalletTypeProps.Ethereum) {
      setIcon(Metamask);
    } else if (type === WalletTypeProps.Solana) {
      setIcon(Phantom);
    } else if (type === WalletTypeProps.MyAlgo) {
      setIcon(MyAlgo);
    }
  }, [type])

  return (
    <>
      <Container sx={{ padding: isMobile ? "8px 0" : "auto" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <a href={HOME_PATH} style={{ display: "flex" }}>
            <img
              src={isMobile ? LogoSmImg : LogoImg}
              alt="logo"
              draggable={false}
            />
          </a>
          {isLoggedIn && address != "undefined" ? (
            <>
              {!isMobile2 && (
                <Stack direction="row" gap="34px">
                  <Stack
                    direction="row"
                    gap="10px"
                    alignItems="center"
                    sx={selectedTab === 0 ? ActiveTabStyle : DefaultTabStyle}
                    onClick={() => handleClickTap(0)}
                  >
                    <ExploreIcon />
                    <Typography fontSize="14px" color="warning">
                      Explore
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    gap="10px"
                    alignItems="center"
                    sx={selectedTab === 1 ? ActiveTabStyle : DefaultTabStyle}
                    onClick={() => handleClickTap(1)}
                  >
                    <PersonIcon />
                    <Typography fontSize="14px" color="warning">
                      My Yespace
                    </Typography>
                  </Stack>
                </Stack>
              )}
              <Button
                id="wallet-connect-button"
                aria-controls={open ? "wallet-connect-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                color="inherit"
                variant="contained"
                disableElevation
                onClick={handleClick}
                startIcon={
                  <Box component={"img"} src={icon} />
                }
                endIcon={<KeyboardArrowDownIcon fontSize="large" />}
                sx={{
                  border: "1px solid",
                  borderColor: open ? "#FFDD2D" : "rgba(255, 255, 255, 0.1)",
                }}
              >
                {`${address?.slice(0, 5)}...${address?.slice(-3)}`}
              </Button>
            </>
          ) : location.pathname.indexOf("public") !== -1 ? (
            <Button
              variant="contained"
              color="warning"
              onClick={handleCreateSpace}
            >
              Create Space
            </Button>
          ) : (
            <Button
              variant="contained"
              color="inherit"
              onClick={handleOpenModal}
            >
              Connect Wallet
            </Button>
          )}
        </Stack>
        <StyledMenu
          id="wallet-connect-menu"
          MenuListProps={{ "aria-labelledby": "wallet-connect-button" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={onDisconnect} disableRipple>
            <LogoutIcon />
            Sign Out
          </MenuItem>
        </StyledMenu>
        <WalletModal
          open={openModal}
          anchorEl={anchorEl}
          onClose={handleCloseModal}
          connectPhantom={handlerConnectPhantom}
          connectMetamask={handlerConnectMetamask}
          connectMyAlgo={handlerConnectMyAlgo}
        />
      </Container>
    </>
  );
};

export default Header;
