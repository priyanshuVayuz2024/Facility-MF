import React, { useState, useMemo } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Popover,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import { LuChevronDown, LuSearch } from "react-icons/lu";

export default function SearchableDropdownField({
  label,
  value,
  onChange,
  options = [],
  error,
  helperText,
  required,
  placeholder = "Select",
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
    setSearch("");
  };

  // selected label
  const selectedOption = options.find((o) => o.value === value);

  // search filter
  const filteredOptions = useMemo(() => {
    return options.filter((o) =>
      o.label?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  const handleSelect = (option) => {
    onChange(option.value); // THIS updates react-hook-form
    handleClose();
  };

  return (
    <FormControl className="flex flex-col gap-2" error={!!error}>
      <FormLabel required={required} className="formLabels">
        {label}
      </FormLabel>

      <Button
        onClick={handleOpen}
        variant="outlined"
        color="inherit"
        sx={{
          textTransform: "none",
          justifyContent: "flex-start",
          background: "#FAFAFA",
          borderColor: error ? "#d32f2f" : "#EBEBEB",
          color: selectedOption ? "#000" : "#9E9E9E",
          "&:hover": {
            background: "#F5F5F5",
            borderColor: "#DADADA",
          },
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}

        <span className="ml-auto text-[#884EA7]">
          <LuChevronDown />
        </span>
      </Button>

      {error && <FormHelperText>{helperText}</FormHelperText>}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            width: anchorEl?.clientWidth || 300,
            maxHeight: 350,
            p: 1,
          },
        }}
      >
        <TextField
          size="small"
          fullWidth
          autoFocus
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LuSearch />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />

        <List dense sx={{ maxHeight: 260, overflowY: "auto" }}>
          {filteredOptions.length === 0 && (
            <ListItemText
              primary="No results found"
              sx={{ px: 2, py: 1, color: "#999" }}
            />
          )}

          {filteredOptions.map((option) => (
            <ListItemButton
              key={option.value}
              selected={value === option.value}
              onClick={() => handleSelect(option)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#F3F3F3 !important",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#EAEAEA !important",
                },

                /* THIS is the important part */
                "&.Mui-selected .MuiListItemText-primary": {
                  color: "#000 !important",
                  fontWeight: 500,
                },
              }}
            >
              <ListItemText primary={option.label} />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </FormControl>
  );
}
