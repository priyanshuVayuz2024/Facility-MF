import React from "react";
import {
  Box,
  Checkbox,
  Radio,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const RecursiveOptionList = ({ options, value, onChange, selectionType }) => {
  const toggle = (id) => {
    if (selectionType === "readonly") return;

    if (selectionType === "checkbox") {
      const updated = { ...value };
      updated[id] ? delete updated[id] : (updated[id] = true);
      onChange(updated);
    }

    if (selectionType === "radio") {
      onChange({ [id]: true });
    }
  };

  return (
    <List disablePadding>
      {options.map((option, index) => {
        const isSelected = !!value[option.id];

        return (
          <React.Fragment key={option.id}>
            <ListItemButton
              onClick={() => toggle(option.id)}
              sx={{
                px: 3,
                py: 2,
                backgroundColor: isSelected ? "#FBF5FF" : "transparent",
                "&:hover": {
                  backgroundColor: "#FBF5FF",
                },
              }}
            >
              {selectionType === "checkbox" && (
                <Checkbox
                  sx={{
                    p: 0,
                    mr: 2,
                    "& .MuiSvgIcon-root": {
                      borderRadius: "8px", 
                    },
                    "& .MuiButtonBase-root": {
                      borderRadius: "8px",
                    },
                  }}
                  checked={isSelected}
                  onChange={() => toggle(option.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              {selectionType === "radio" && (
                <Radio
                  sx={{ p: 0, mr: 2 }}
                  checked={isSelected}
                  onChange={() => toggle(option.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              <ListItemText
                primary={
                  <Typography fontSize="16px" color="#121212">
                    {option.label}
                  </Typography>
                }
              />
            </ListItemButton>

            {index !== options.length - 1 && (
              <Divider sx={{ borderColor: "#EBEBEB" }} />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default RecursiveOptionList;
