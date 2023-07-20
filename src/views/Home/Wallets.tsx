import React from "react";
import {
  Avatar,
  Box,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { WalletButton } from "components";
import PhantomIcon from "assets/images/phantom.svg";
import MetamaskIcon from "assets/images/metamask-icon.svg";
import MyAlgoIcon from "assets/images/myalgo.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useWallets from "hooks/useWallets";

interface WalletsProps {
  hideTitle?: boolean;
  handleClose: () => void;
  handleNextPage: () => void;
}

const Wallets = ({ hideTitle, handleClose, handleNextPage }: WalletsProps) => {
  const {
    isLoggedIn,
    connectedMetamask,
    connectedPhantom,
    connectedMyAlgo,
    connectMetamask,
    connectPhantom,
    connectMyAlgo,
    disconnectMetamask,
    disconnectPhantom,
    disconnectMyAlgo,
  } = useWallets();

  const isMobile = useMediaQuery("(max-width:430px)");

  const handleMetamask = () => {
    if (connectedMetamask && (connectedPhantom || connectedMyAlgo)) {
      disconnectMetamask(true);
    }
    if (!connectedMetamask) {
      connectMetamask(true);
    }
  };

  const handlePhantom = () => {
    if (connectedPhantom && (connectedMetamask || connectedMyAlgo)) {
      disconnectPhantom(true);
    }
    if (!connectedPhantom) {
      connectPhantom(true);
    }
  };

  const handleMyAlgo = () => {
    if (connectedMyAlgo && (connectedMetamask || connectedPhantom)) {
      disconnectMyAlgo(true);
    }
    if (!connectedMyAlgo) {
      connectMyAlgo(true);
    }
  };

  return (
    <>
      <DialogContent dividers sx={{ minWidth: "450px" }}>
        <Box
          gap={1}
          sx={{
            mb: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!hideTitle && <Typography variant="h6">Connect wallets</Typography>}
          <Typography variant="subtitle1">
            Connect wallets with stored NFTs to show in your space.
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            gap={1}
            sx={{
              mt: 1,
              flexWrap: "wrap",
              "& .walletButton": {
                height: isMobile ? 56 : "auto",
                maxWidth: isMobile ? "auto" : "49%",
              },
            }}
          >
            <WalletButton
              className="walletButton"
              active={connectedPhantom}
              onClick={handlePhantom}
            >
              <Stack flexDirection="row" gap={1}>
                <Avatar src={PhantomIcon} />
                Phantom
              </Stack>
              <CheckCircleIcon color="success" />
            </WalletButton>
            <WalletButton
              className="walletButton"
              active={connectedMetamask}
              onClick={handleMetamask}
            >
              <Stack flexDirection="row" gap={1}>
                <Avatar src={MetamaskIcon} />
                Metamask
              </Stack>
              <CheckCircleIcon color="success" />
            </WalletButton>
            <WalletButton
              className="walletButton"
              active={connectedMyAlgo}
              onClick={handleMyAlgo}
            >
              <Stack flexDirection="row" gap={1}>
                <Avatar src={MyAlgoIcon} />
                MyAlgo
              </Stack>
              <CheckCircleIcon color="success" />
            </WalletButton>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={!isLoggedIn}
          variant="contained"
          color="warning"
          onClick={handleNextPage}
        >
          {hideTitle ? "Confirm" : "Next"}
        </Button>
      </DialogActions>
    </>
  );
};

export default Wallets;
