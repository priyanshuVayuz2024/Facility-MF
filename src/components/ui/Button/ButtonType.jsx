import { ImSpinner2 } from "react-icons/im";

export const ButtonType = ({
  variant = "primary",
  children,
  type = "button",
  className = "",
  onClick,
  disabled,
  isLoading,
  leftIcon,
  rightIcon,
  ...props
}) => {

  const base =
    "font-inter inline-flex items-center justify-center gap-2 rounded-md px-6 py-2 transition-all duration-300 ease-in-out disabled:cursor-not-allowed focus:outline-none";

  const variants = {
    primary:
      "bg-[#884EA7] text-white border border-[#884EA7] hover:opacity-90",

    outline:
      "border border-[#884EA7] text-[#884EA7] bg-transparent hover:bg-[#884EA7]/10 disabled:hover:bg-transparent",

    link:
      "text-[#884EA7] bg-transparent border-none hover:underline",

    gradient:
      "bg-gradient-to-r from-[#884EA7] to-[#A569BD] text-white border-none hover:opacity-90",
  };

  const disabledStyle = "opacity-60 cursor-not-allowed";

  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isLoading}
      onClick={disabled || isLoading ? undefined : onClick}
      aria-busy={isLoading}
      className={`${base} ${variants[variant]} ${
        disabled || isLoading ? disabledStyle : ""
      } ${className}`}
    >
      <>
        {leftIcon && !isLoading && leftIcon}

        <span className={isLoading ? "opacity-70" : ""}>
          {children}
        </span>

        {isLoading && (
          <ImSpinner2 className="animate-spin text-current text-lg" />
        )}

        {rightIcon && !isLoading && rightIcon}
      </>
    </button>
  );
};
