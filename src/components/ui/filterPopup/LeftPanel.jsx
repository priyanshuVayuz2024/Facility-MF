import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Checkbox,
  Radio,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const LeftPanel = ({
  singlePanel = false,

  parents,
  heading,
  activeParentId,
  setActiveParentId,
  value,
  onChange,
  searchEnabled,
  selectionType,
}) => {
  const [search, setSearch] = useState("");

  const filteredParents = parents.filter((p) =>
    p.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleParentToggle = (parent, checked) => {
    if (selectionType !== "checkbox") return;

    const updated = { ...value };

    if (checked) {
      const childSelections = {};
      (parent.children || []).forEach((child) => {
        childSelections[child.id] = true;
      });
      updated[parent.id] = childSelections;
    } else {
      delete updated[parent.id];
    }

    onChange(updated);
  };

  return (
    <Box width="100%" bgcolor="white">
      {/* HEADING */}
      {heading && (
        <Typography
          sx={{
            px: 3,
            py: 2,
            fontWeight: 600,
            fontSize: "16px",
            color: "#4D4D4F",
          }}
        >
          {heading}
        </Typography>
      )}

      {/* SEARCH */}
      {searchEnabled && (
        <>
          <TextField
            fullWidth
            placeholder="Search Community"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "50px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px", // optional: smooth edges
                "& fieldset": {
                  border: "none", // ✅ remove border
                },
                "&:hover fieldset": {
                  border: "none", // ✅ remove hover border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // ✅ remove focus border
                },
              },
              "& .MuiInputBase-input": {
                paddingLeft: "24px", // ✅ space before placeholder text
              },
            }}
          />
          <Divider sx={{ borderColor: "#EBEBEB" }} />
        </>
      )}

      {/* LIST */}
      <List disablePadding>
        {filteredParents.map((parent, index) => {
          const parentChildren = parent.children || [];
          const selectedChildren = value[parent.id] || {};

          const totalChildren = parentChildren.length;
          const selectedCount = Object.keys(selectedChildren).length;

          const isChecked =
            totalChildren > 0 && selectedCount === totalChildren;

          const isIndeterminate =
            selectedCount > 0 && selectedCount < totalChildren;

          return (
            <React.Fragment key={parent.id}>
              <ListItemButton
                selected={!singlePanel && parent.id === activeParentId}
                onClick={() => {
                  if (singlePanel) {
                    if (selectionType === "radio") {
                      onChange({ [parent.id]: {} });
                    } else {
                      const updated = { ...value };
                      if (updated[parent.id]) delete updated[parent.id];
                      else updated[parent.id] = {};
                      onChange(updated);
                    }
                  } else {
                    setActiveParentId(parent.id);
                    if (selectionType === "radio") {
                      onChange({ [parent.id]: value[parent.id] || {} });
                    }
                  }
                }}
                sx={{
                  px: 3,
                  py: 2,
                  backgroundColor:
                    isChecked ||
                    isIndeterminate ||
                    !!value[parent.id] ||
                    parent.id === activeParentId
                      ? "#FBF5FF" // ← selected
                      : "transparent", // ← not selected
                  "&:hover": {
                    backgroundColor: "#FBF5FF",
                  },
                }}
              >
                {selectionType === "checkbox" && (
                  <Checkbox
                    sx={{ p: 0, mr: 2 }}
                    checked={isChecked}
                    indeterminate={isIndeterminate}
                    onChange={(e) =>
                      handleParentToggle(parent, e.target.checked)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                )}

                {selectionType === "radio" && (
                  <Radio
                    sx={{ p: 0, mr: 2 }}
                    checked={!!value[parent.id]}
                    onChange={() => onChange({ [parent.id]: {} })}
                  />
                )}

                <ListItemText
                  primary={
                    <Typography fontSize="16px" color="#121212">
                      {parent.label}
                    </Typography>
                  }
                />

                {/* RIGHT ARROW ICON */}
                {!singlePanel && parent.children?.length > 0 && (
                  <ChevronRightIcon
                    sx={{
                      color:
                        isChecked ||
                        isIndeterminate ||
                        parent.id === activeParentId
                          ? "primary.main" // ← matches MUI default checkbox/radio color
                          : "#4D4D4F",
                    }}
                  />
                )}
              </ListItemButton>

              {/* DIVIDER BETWEEN ITEMS */}
              {index !== filteredParents.length && (
                <Divider sx={{ borderColor: "#EBEBEB" }} />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default LeftPanel;
