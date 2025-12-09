// src/theme/muiTheme.js

import { createTheme } from "@mui/material/styles";

export const getMuiTheme = () => {
  const getVar = (name) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--${name}`)
      .trim() || "#000";

  return createTheme({
    palette: {
      mode:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light",
      primary: {
        main: getVar("color-primary"),
      },
      secondary: {
        main: getVar("color-secondary"),
      },
      background: {
        default: getVar("color-background"),
        paper: getVar("color-background"),
      },
      text: {
        primary: getVar("color-text"),
      },
    },
    typography: {
      fontFamily: "Outfit",
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: getVar("color-primary"), // Define this CSS variable
            color: getVar("color-primary"),
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: getVar("color-sidebar-selected"),
              color: getVar("color-primary"),
            },
            "&:hover": {
              backgroundColor: getVar("color-sidebar-hover"),
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            overflow: "hidden",
            height: 40,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FAFAFA",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            height: 40,
            backgroundColor: "#FAFAFA",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#884EA7",
              borderWidth: "0.5px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#884EA7",
              borderWidth: "0.5px",
            },
          },
          notchedOutline: {
            borderColor: "#EBEBEB",
            borderWidth: "0.5px",
          },
          input: {
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: "14px",
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            height: 40,
            boxSizing: "border-box",
            backgroundColor: "#FAFAFA",
          },
          input: {
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: 10,
            paddingBottom: 10,
            height: "100%",
            fontSize: "14px",
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            overflow: "hidden",
            height: 40,
            boxSizing: "border-box",
            backgroundColor: "#FAFAFA",
          },
          input: {
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: 10,
            paddingBottom: 10,
            height: "100%",
            fontSize: "14px",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            paddingLeft: "12px",
            paddingRight: "12px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "12px 24px",
            lineHeight: "16px",
            textTransform: "none",
            cursor: "pointer",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#121212",
            fontWeight: 500,
          },
          asterisk: {
            color: "#AB0000",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
    },
  });
};
