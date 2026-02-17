import React from "react";

const DeleteButton = ({
  children = "Delete",
  onClick,
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  startIcon,
  endIcon,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
      text-red-900 px-4 py-1 text-sm font-medium
        flex items-center justify-center gap-2
        ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      {...rest}
    >
      {startIcon && <span className="flex">{startIcon}</span>}
      {loading ? "Loading..." : children}
      {endIcon && <span className="flex">{endIcon}</span>}
    </button>
  );
};

export default DeleteButton;
