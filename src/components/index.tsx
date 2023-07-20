import React, { useState } from "react";

import {
  Box,
  styled,
  Modal,
  Menu,
  MenuProps,
  Stack,
  Typography,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton/IconButton";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { INFT } from "types";
import Loading from "ui-component/Loading";
import { UnableIcon, HideICon } from "ui-component/SvgIcon";

interface WalletButtonProps {
  active?: boolean;
}

interface ProfileAvatarProps {
  active?: boolean;
}

const NFTUnload = ({ url }: { url?: string }) => (
  <Stack
    data-url={url}
    sx={{
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: 2,
      opacity: 0.4,
      height: "100%",
    }}
  >
    <UnableIcon />
    <Typography>Unable to load content</Typography>
  </Stack>
);

const NFTUnload2 = ({ url }: { url?: string }) => (
  <Stack
    data-url={url}
    sx={{
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: 2,
      opacity: 0.4,
      height: "100%",
      borderRadius: 1,
      background: "#2F3136",
    }}
  >
    <UnableIcon />
  </Stack>
);

export const LoaderWrapper = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1301,
  width: "100%",
});

export const NFTCardWrapper = styled(Box)({
  borderRadius: "4px",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  background: "#26272B",
  width: 268,
  aspectRatio: "1 / 1",
  "@media screen and (max-width: 430px)": {
    width: "100%",
  },
  "& .nft-img": {
    height: "100%",
    width: "100%",
    transition: "transform .2s",
    objectFit: "contain",
  },
  "& .network-icon": {
    position: "absolute",
    width: "24px",
    height: "24px",
    padding: "5px 10px",
    right: "8px",
    top: "8px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all .2s",
    "& .MuiTypography-root": {
      width: "0px",
      display: "none",
      overflow: "hidden",
    },
  },
  "&:hover": {
    "& .nft-img": {
      transform: "scale(1.2)",
    },
    // "& .network-icon": {
    //   gap: "4px",
    //   minWidth: "100px",
    //   width: "auto",
    //   "& .MuiTypography-root": {
    //     width: "auto",
    //     fontWeight: "400",
    //     fontSize: "14px",
    //     lineHeight: "20px",
    //     display: "flex",
    //     alignItems: "center",
    //     color: "rgb(254, 254, 254, 0.8)",
    //     textTransform: "capitalize",
    //   },
    // },
  },
  "& div": {
    marginTop: 0
  }
});

interface NFTCardProps<INFT> {
  hideState?: boolean;
  onClick?: any;
  nft: INFT;
}

export const NFTCard = ({ onClick, nft }: NFTCardProps<INFT>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (nft.image?.indexOf(".mp4") !== -1 && !nft.video) {
    nft.video = nft.image;
  }

  return (
    <NFTCardWrapper
      onClick={() => {
        if ((!loading && !error) && (nft.video || nft.image))
          onClick();
      }}
    >
      {loading && <Loading height={"100%"} />}
      {nft.video && !error ? (
        <video
          key={nft._id}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadedData={() => {
            setLoading(false);
          }}
          onError={() => {
            setError(true);
            setLoading(false);
          }} className="nft-img">
          <source src={nft.video} type="video/mp4" />
        </video>
      ) : nft.image && !error ? (
        <img
          key={nft._id}
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          className="nft-img" src={nft.image} />
      ) : (
        <NFTUnload url={nft.image} key={nft._id} />
      )}
      <Box
        className="network-icon"
        bgcolor={nft.network?.name === "ethereum" ? "#1C1C1C" : "#000000"}
      >
        <Typography>{nft.network?.name}</Typography>
        <img key={nft._id} src={nft.network?.icon} />
      </Box>
    </NFTCardWrapper>
  )
};

export const NFTCard2 = ({ onClick, nft, hideState }: NFTCardProps<INFT>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (nft.image?.indexOf(".mp4") !== -1 && !nft.video) {
    nft.video = nft.image;
  }

  return (
    <Box sx={{ position: "relative" }} onClick={() => {
      if ((!loading && hideState) || ((!loading && !error) && (nft.video || nft.image)))
        onClick();
    }} className="nft-card">
      <Box sx={{ opacity: nft.isShow ? 1 : 0.6, height: "100%", "& div": { mt: 0 } }}>
        {loading && <Loading height={"100%"} />}
        {nft.video && !error ? (
          <video
            key={nft._id}
            onLoadStart={() => {
              setLoading(true);
            }}
            onLoadedData={() => {
              setLoading(false);
            }}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            className="nft-img">
            <source src={nft.video} type="video/mp4" />
          </video>
        ) : nft.image && !error ? (
          <img
            key={nft._id}
            onLoad={() => {
              setLoading(false);
            }}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            className="nft-img" src={nft.image} />
        ) : hideState ? (
          <NFTUnload2 url={nft.image} key={nft._id} />
        ) : (
          <NFTUnload url={nft.image} key={nft._id} />
        )}
      </Box>
      <Box
        className="nft-text"
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{nft.isShow ? "Hide" : "Show"}</Typography>
      </Box>
      {!nft.isShow && (
        <Box
          className="nft-status"
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HideICon />
        </Box>
      )}
    </Box>
  )
};

export const PreviewNFTWrapper = styled(Box)({
  borderRadius: "4px",
  position: "absolute",
  overflow: "hidden",
  cursor: "pointer",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  "& .nft-img": {
    width: 640,
    aspectRatio: "1 / 1",
    "@media screen and (max-width: 650px)": {
      width: "343px",
    },
    background: "#26272B",
    objectFit: "contain",
  },
  "& .network-icon": {
    position: "absolute",
    width: "48px",
    height: "48px",
    right: "8px",
    top: "8px",
    background: "#000000",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 300ms",
    "& img": {
      height: "100%",
      width: "100%",
    },
    "& .MuiTypography-root": {
      width: "0px",
      display: "none",
      overflow: "hidden",
    },
  },
});
interface PreviewNFTProps<INFT> {
  open: boolean;
  onClose?: any;
  onClick?: any;
  nft: INFT;
}

export const PreviewNFT = ({
  open,
  onClick,
  onClose,
  nft,
}: PreviewNFTProps<INFT>) => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        <IconButton
          sx={{
            position: "absolute",
            right: "85px",
            top: "85px",
            "@media screen and (max-width: 890px)": {
              top: 21.5,
              right: 21.5,
            },
          }}
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <PreviewNFTWrapper onClick={onClick}>
          {loading && <Loading height={640} />}
          {nft.video ? (
            <video
              className="nft-img"
              controls
              onLoadStart={() => {
                setLoading(true);
              }}
              onLoadedData={() => {
                setLoading(false);
              }}
              style={{
                display: loading ? "none" : "block",
              }}
            >
              <source src={nft.video} type="video/mp4" />
            </video>
          ) : (
            <img
              onLoad={() => {
                setLoading(false);
              }}
              className="nft-img"
              src={nft.image}
              style={{
                display: loading ? "none" : "block",
              }}
            />
          )}
          <Box className="network-icon">
            <Typography>{nft.network?.name}</Typography>
            <img src={nft.network?.icon} />
          </Box>
        </PreviewNFTWrapper>
      </Box>
    </Modal>
  );
};

export const WalletButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }: WalletButtonProps) => ({
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "20px",
  flex: 1,
  width: "100%",
  fontSize: "14px",
  border: "1px solid",
  cursor: "pointer",
  justifyContent: "space-between",
  borderColor: active ? "#FFDD2D" : "transparent",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
  },
  "& .MuiAvatar-root": {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "3px",
    width: "24px",
    height: "24px",
  },
  "& .MuiSvgIcon-root": {
    marginLeft: "22px",
    fontSize: "19px",
    color: active ? "#FFDD2D" : "transparent",
  },
}));

export const ProfileAvatar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active = false }: ProfileAvatarProps) => ({
  borderRadius: "4px",
  border: "1px solid",
  cursor: "pointer",
  borderColor: active ? "#FFDD2D" : "transparent",
  position: "relative",
  "& .MuiAvatar-root": {
    borderRadius: "4px",
    width: "110px",
    height: "110px",
    "@media screen and (max-width: 430px)": {
      width: "135px",
      height: "135px",
    },
  },
  "& .MuiSvgIcon-root": {
    top: 1,
    right: 1,
    position: "absolute",
    color: active ? "#FFDD2D" : "transparent",
  },
}));

export const AppTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "#121212",
    borderRadius: "4px",
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: "#FEFEFE",
    "& .MuiMenu-list": {
      padding: "8px",
    },
    "& .MuiMenuItem-root": {
      padding: "11px",
      borderRadius: "4px",
      fontSize: "12px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        marginRight: theme.spacing(1.5),
      },
      ":hover": {
        background: "rgba(255, 255, 255, 0.1)",
        color: "#FFDD2D",
        "& .MuiSvgIcon-root": {
          color: "#FFDD2D",
        },
      },
    },
  },
}));
