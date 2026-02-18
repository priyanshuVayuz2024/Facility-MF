import React, { useState } from "react";
import { Box, TextField, Divider } from "@mui/material";
import RecursiveOptionList from "./RecursiveOptionList";

const RightPanel = ({ parent, defaultHeading, value, onChange }) => {
  const [search, setSearch] = useState("");

  if (!parent) return null;

  const rightConfig = parent.right || {};

  // Custom UI
  if (rightConfig.customRenderer) {
    const Custom = rightConfig.customRenderer;
    return (
      <Box width="100%" bgcolor="white">
        <Custom value={value} onChange={onChange} />
      </Box>
    );
  }

  const filteredChildren = (parent.children || []).filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box width="100%" bgcolor="white">
      {/* SEARCH */}
      {rightConfig.search && (
        <>
          <TextField
            fullWidth
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "50px",
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" },
              },
              "& .MuiInputBase-input": {
                paddingLeft: "24px",
              },
            }}
          />
          <Divider sx={{ borderColor: "#EBEBEB" }} />
        </>
      )}

      <RecursiveOptionList
        options={filteredChildren}
        value={value}
        onChange={onChange}
        selectionType={rightConfig.selectionType}
      />
    </Box>
  );
};

export default RightPanel;