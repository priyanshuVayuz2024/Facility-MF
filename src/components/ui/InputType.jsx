import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function InputType({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
  fullWidth = true,
  startIcon,
  endIcon,
  name,
  min,
  max,
  step,
  sx = {},
}) {

  // block e + - in number fields
  const handleKeyDown = (e) => {
    if (type === "number") {
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      size="small"
      variant="outlined"
      onKeyDown={handleKeyDown}

      /* 🔥 NEW MUI v6 WAY */
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ) : undefined,

          endAdornment: endIcon ? (
            <InputAdornment position="end">
              {endIcon}
            </InputAdornment>
          ) : undefined,
        },

        htmlInput: {
          min: min,
          max: max,
          step: step || (type === "number" ? 1 : undefined),
        },
      }}

      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          backgroundColor: "#fff",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#e5e7eb",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7C5CFC",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7C5CFC",
        },
        ...sx,
      }}
    />
  );
}
