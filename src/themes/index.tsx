import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#202225",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          borderColor: "#313132",
          minWidth: "315px !important",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          background: "#000 ",
          color: "#EB4944",
          "& .MuiAlert-icon svg": {
            fill: "#EB4944",
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          background: "#000",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        subtitle1: {
          color: "rgba(254, 254, 254, 0.8)",
          fontSize: "14px",
        },
        subtitle2: {
          color: "rgba(254, 254, 254, 0.4)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "rgba(255, 255, 255, 0.08)",
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#FFDD2D !important",
          },
          ":hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.24)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "none",
          boxShadow: "none",
        },
        colorInherit: {
          color: "#FEFEFE",
          background: "rgba(255, 255, 255, 0.1)",
          ":hover": {
            color: "#FFDD2D",
            background: "rgba(255, 255, 255, 0.1)",
          },
        },
        containedWarning: {
          color: "#343434",
          background: "#FFDD2D",
          ":hover": {
            background: "#FFE24D",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "none",
        },
        colorInherit: {
          color: "#FEFEFE",
          background: "rgba(255, 255, 255, 0.1)",
          ":hover": {
            color: "#FFDD2D",
            background: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#202225",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "& .MuiSnackbarContent-root": {
            minWidth: 221,
            padding: 16,
            justifyContent: "space-between",
          },
          "& .MuiSnackbarContent-message": {
            padding: 0,
            lineHeight: "24px",
            fontSize: 14,
          },
          "& .MuiSnackbarContent-action": {
            marginLeft: 0,
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#A0A0A3",
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#FFDD2D",
          width: "36px !important",
          height: "36px !important",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fallback:{
          width:"100%",
          height:"100%",
        }
      },
    },
  },
  palette: {
    primary: {
      main: "#FFDD2D",
      dark: "#202225",
    },
    secondary: {
      dark: "#25282B",
      main: "#FEFEFE",
    },
    success: {
      main: "#26C885",
    },
    error: {
      main: "#D9433F",
    },
    text: {
      primary: "#FEFEFE",
    },
  },
});

export default theme;
