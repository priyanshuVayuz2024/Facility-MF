export const stepperSx = (theme) => ({
  width: "fit-content",
  px: "4px",
  pt: "16px",
  pb: "32px",

  "& .MuiStep-root": {
    px: "12px",
  },

  "& .MuiStepIcon-root": {
    color: "#EBEBEB",

    "&.Mui-completed": {
      color: "#4caf50",
    },

    "&.Mui-active": {
      color: "#FBF5FF",
      border: "1px solid #884EA7",
      borderRadius: "50%",
    },
  },

  "& .MuiStepLabel-label": {
    fontSize: "16px",
    fontWeight: 500,
    color: "#ADADAD",

    "&.Mui-active": {
      color: "#884EA7",
      fontWeight: 600,
    },

    "&.Mui-completed": {
      color: "#121212",
      fontWeight: 500,
    },
  },

  "& .MuiStepLabel-iconContainer": {
    pr: "12px",
  },

  "& .MuiStepIcon-root.Mui-active .MuiStepIcon-text": {
    color: "#884EA7",
    fill: "#884EA7",
    fontWeight: 500,
  },

  "& .MuiStepIcon-root.Mui-active.Mui-completed": {
    color: "#4caf50 !important",
    border: "none !important",
  },

  "& .MuiStepIcon-text": {
    fill: "#ADADAD",
  },

  "& .MuiStepConnector-lineHorizontal": {
    width: "4px",

    [theme.breakpoints.up("sm")]: {
      width: "90px",
    },

    [theme.breakpoints.up("md")]: {
      width: "121px",
    },
  },
});
