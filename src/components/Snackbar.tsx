import React, { SyntheticEvent } from "react";
import {
  Alert,
  Button,
  Fade,
  Grow,
  IconButton,
  Slide,
  SlideProps,
  Snackbar as MuiSnackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { KeyedObject } from "types";
import { useDispatch, useSelector } from "store";
import { closeSnackbar } from "store/reducers/snackbar";

function TransitionSlideLeft(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

const animation: KeyedObject = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade,
};

const Snackbar = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:430px)");
  const snackbar = useSelector((state) => state.snackbar);
  const {
    actionButton,
    anchorOrigin,
    alert,
    close,
    message,
    content,
    open,
    transition,
    variant,
  } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {/* default snackbar */}
      {variant === "default" && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              sx={{ background: "#ffffff00" }}
            >
              <CloseIcon fontSize="small" onClick={handleClose} />
            </IconButton>
          }
        />
      )}

      {/* alert snackbar */}
      {variant === "alert" && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={8000}
          onClose={handleClose}
          sx={{
            top: "80px !important",
          }}
        >
          <Alert
            variant={alert.variant}
            severity="error"
            color={alert.color}
            action={
              <>
                {actionButton !== false && (
                  <Button
                    size="small"
                    onClick={handleClose}
                    sx={{ color: "background.paper" }}
                  >
                    UNDO
                  </Button>
                )}
                {close !== false && (
                  <IconButton
                    sx={{ color: "background.paper" }}
                    size="small"
                    aria-label="close"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </>
            }
            sx={{
              ...(alert.variant === "outlined" && {
                bgcolor: "background.paper",
              }),
            }}
          >
            {message}
            {content && (
              <Typography sx={{ color: "#FEFEFE", fontSize: "14px", mt: 1 }}>
                {content}
              </Typography>
            )}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
