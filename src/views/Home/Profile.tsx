import React, { useState, useEffect } from "react";
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
import { ProfileAvatar } from "components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDispatch, useSelector } from "store";
import useApi from "hooks/userApi";
import { SetUserData } from "store/reducers/auth";
import { INFT } from "types";
import Loading from "ui-component/Loading";
import EmptyContent from "ui-component/EmptyContent";
import handleViewport from 'react-in-viewport';
import { RENDERNUM } from "config"

interface ProfileProps {
  hideTitle?: boolean;
  handleClose: () => void;
  handleNextPage: () => void;
}

const Profile = ({ hideTitle, handleClose, handleNextPage }: ProfileProps) => {
  const isMobile = useMediaQuery("(max-width:400px)");
  const { updateAccount, getMyWalletNFTs } = useApi();
  const dispatch = useDispatch();
  const [nfts, setNfts] = useState<INFT[]>([]);
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(user.avatar);
  const [loading, setLoading] = useState(false);
  const [renderNum, setRenderNum] = useState(RENDERNUM * 4);

  const handleConfirm = () => {
    updateAccount({ avatar }).then(() => {
      dispatch(SetUserData({ avatar }));
      handleNextPage();
    });
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
        setRenderNum(renderNum + (RENDERNUM * 3));
      }
    }

    return (
      <Box>
        <ProfileAvatar
          active={item.image === avatar}
          onClick={() => setAvatar(item.image || "")}
        >
          <Avatar src={item.image} />
          <CheckCircleIcon color="warning" />
        </ProfileAvatar>
        <SmartRender onEnterViewport={renderFunc} onLeaveViewport={() => { }} />
      </Box>
    )
  }

  useEffect(() => {
    setLoading(true);
    getMyWalletNFTs().then((data) => {
      setLoading(false);
      setNfts(data.data);
    });
  }, [user.addresses]);

  return (
    <>
      <DialogContent dividers sx={{ minWidth: "450px" }}>
        <Box
          gap={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {!hideTitle && (
            <Typography variant="h6">Pick a profle Picture</Typography>
          )}
          <Typography variant="subtitle1">
            Select a profile picture from your NFTs.
          </Typography>
          {loading ? (
            <Loading height={"100%"} />
          ) : nfts.length ? (
            <Stack
              sx={{
                py: 2,
                gap: isMobile ? "10px" : 2,
                maxWidth: "380px",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              {nfts.map((nft, key) => (
                <NFTComponent item={nft} index={key} />
              ))}
            </Stack>
          ) : (
            <EmptyContent height={"100%"} />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        {hideTitle || avatar ? (
          <Button variant="contained" color="warning" onClick={handleConfirm}>
            Confirm
          </Button>
        ) : (
          <Button variant="contained" color="inherit" onClick={handleNextPage}>
            Skip
          </Button>
        )}
      </DialogActions>
    </>
  );
};

export default Profile;
