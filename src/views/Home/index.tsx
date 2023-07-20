import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LogoImg from "assets/images/logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import Info from "./Info";
import Wallets from "./Wallets";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import useApi from "hooks/userApi";
import { useDispatch, useSelector } from "store";
import { SetUserData } from "store/reducers/auth";
import useWallets from "hooks/useWallets";
import snackbar from "utils/snackbar";

const Home = () => {
  const { address } = useWallets();
  const isMobile = useMediaQuery("(max-width:430px)");
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateAccount } = useApi();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const Height = isMobile ? 88 : 96;

  const handleClickOpen = () => {
    if (!isLoggedIn)
      return snackbar({
        message: "Wallet is not connected",
        content: "Unable to connect wallet, please try again.",
        variant: "alert",
        vertical: "top",
        horizontal: "right",
        transition: "SlideLeft",
      });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < 3) setPage(page + 1);
    if (page === 3) {
      updateAccount({ isCreated: true }).then((data) => {
        handleClose();
        navigate("/myyespace");
        dispatch(SetUserData(data.data));
      });
    }
  };
  useEffect(() => {
    if (isLoggedIn && user.isCreated) {
      navigate("/myyespace");
    }
  }, [isLoggedIn, user]);

  return (
    <Box
      sx={{
        height: `calc(100vh - ${Height}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box
        component="img"
        sx={{ width: 80, height: 80 }}
        src={LogoImg}
        alt="logo"
        draggable={false}
      />
      <Stack gap="8px" justifyContent="center" alignItems="center">
        <Typography variant="h6">Welcome to Yespace</Typography>

        <Typography
          sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.8)" }}
        >
          Create your space to showcase your NFTs from across chains.
        </Typography>
      </Stack>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        Create Space
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            margin: isMobile ? 2 : "auto",
            width: isMobile ? 343 : 424,
            height: isMobile ? 418 : 438,
          },
        }}
      >
        <DialogTitle sx={{ m: 0 }}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            position="relative"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {!isMobile && (
                <Typography sx={{ fontSize: "14px" }}>
                  Step {page} of 3
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                width: "100%",
              }}
            >
              Create Your Space
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon sx={{ fontSize: "14px" }} />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        {page === 1 && (
          <Info
            handleClose={handleClose}
            handleNextPage={handleNextPage}
            hideTitle={false}
          />
        )}
        {page === 2 && (
          <Wallets
            handleClose={handleClose}
            handleNextPage={handleNextPage}
            hideTitle={false}
          />
        )}
        {page === 3 && (
          <Profile
            handleClose={handleClose}
            handleNextPage={handleNextPage}
            hideTitle={false}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default Home;
