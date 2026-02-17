import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { LuChevronDown } from "react-icons/lu";

export const SelectorDropdown = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // open menu
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // when user selects option
  const handleSelect = (option) => {
    onChange(option.value);
    handleClose();
  };

  // find selected label
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <FormControl className="flex flex-col gap-2 w-full">
      {label && (
        <FormLabel className="formLabels">
          {label}
        </FormLabel>
      )}

      {/* BUTTON */}
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          textTransform: "none",
          justifyContent: "flex-start",
          borderRadius: "10px",
          height: "42px",
          borderColor: "#EBEBEB",
          backgroundColor: "#FAFAFA",
          color: selectedOption ? "#333" : "#ADADAD",
        }}
      >
        {selectedOption ? selectedOption.label : placeholder}

        <span className="ml-auto text-[#884EA7]">
          <LuChevronDown />
        </span>
      </Button>

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            mt: 1,
            minWidth: anchorEl?.clientWidth,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={value === option.value}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  );
};
