import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "store";
import useApi from "hooks/userApi";
import { SetUserData } from "store/reducers/auth";

interface InfoProps {
  hideTitle?: boolean;
  handleClose: () => void;
  handleNextPage: () => void;
}

const Info = ({ handleClose, handleNextPage, hideTitle }: InfoProps) => {
  const isMobile = useMediaQuery("(max-width:400px)");
  const { updateAccount } = useApi();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [existsName, setExistsName] = useState(false);

  const handleConfirm = () => {
    setExistsName(false);
    updateAccount({ name, bio })
      .then(() => {
        dispatch(SetUserData({ name, bio }));
        handleNextPage();
      })
      .catch((error) => {
        if (error.response.data && error.response.data.existsName) {
          setExistsName(true);
        }
      });
  };

  return (
    <>
      <DialogContent dividers sx={{ minWidth: "430px" }}>
        <Grid container>
          <Grid item sm={12} md={12} xs={12} sx={{ mt: 1 }}>
            <Stack
              sx={{ p: "8px 0" }}
              direction="row"
              justifyContent="space-between"
            >
              <Typography>Name</Typography>
              <Typography
                color={name.length === 50 ? "error" : "default"}
                variant="subtitle1"
              >
                {name.length}/50
              </Typography>
            </Stack>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              placeholder="How should we call you?"
              value={name}
              sx={{ height: isMobile ? 40 : "auto" }}
              onChange={(e) => {
                setName(e.target.value);
                setExistsName(false);
              }}
              inputProps={{ maxLength: 50 }}
            />
            {existsName && (
              <Typography mt={2} color="error">
                '{name}' already exists.
              </Typography>
            )}
          </Grid>
          <Grid item sm={12} md={12} xs={12} sx={{ mt: 3 }}>
            <Stack
              sx={{ p: "8px 0" }}
              direction="row"
              justifyContent="space-between"
            >
              <Stack direction="row" gap={1}>
                <Typography>Your bio</Typography>
                <Typography variant="subtitle2">Optional</Typography>
              </Stack>
              <Typography variant="subtitle1">{bio.length}/160</Typography>
            </Stack>
            <TextField
              rows={2}
              multiline
              fullWidth
              variant="outlined"
              sx={{
                height: isMobile ? 64 : "auto",
                "& .MuiInputBase-root": { padding: "8px 12px" },
              }}
              placeholder="Tell your community a little about you"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              inputProps={{ maxLength: 160 }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleConfirm}
          disabled={!name.length}
          sx={{
            "&.Mui-disabled": {
              background: "#FFDD2D !important",
              opacity: 0.6,
              color: "#343434",
            },
          }}
        >
          {hideTitle ? "Confirm" : "Next"}
        </Button>
      </DialogActions>
    </>
  );
};

export default Info;
