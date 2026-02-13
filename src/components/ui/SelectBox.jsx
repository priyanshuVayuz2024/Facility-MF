import { Button, FormLabel } from "@mui/material";

export const SelectBox = ({ label, placeholder, value, icon, onClick }) => {
    const hasValue = Boolean(value);

    return (
        <div className="border border-[#EBEBEB] flex flex-col pt-4 pb-5 px-4 rounded-sm">
            <FormLabel required className="pb-4! font-medium capitalize!">
                {label}
            </FormLabel>

            <Button
                onClick={onClick}
                variant="outlined"
                sx={{
                    textTransform: "none",
                    borderColor: "#EBEBEB",
                    backgroundColor: "#FAFAFA",
                    justifyContent: "flex-start",
                    textAlign: "left",
                    px: 2,
                }}
                className={`capitalize! font-normal! ${hasValue ? "text-[#121212]!" : "text-[#ADADAD]!"
                    }`}
            >
                {hasValue ? value : placeholder}
                <span className="ml-auto text-[#884EA7]!">
                    {icon}
                </span>
            </Button>
        </div>
    );
};