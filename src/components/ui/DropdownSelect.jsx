import { Button, FormControl, FormLabel } from "@mui/material";
import { LuChevronDown } from "react-icons/lu";

export const DropdownSelect = ({ label, valueCount, placeholder, onClick, icon }) => {
    const hasValue = valueCount > 0;

    return (
        <FormControl className="flex flex-col gap-2">
            <FormLabel required className="formLabels">
                {label}
            </FormLabel>

            <Button
                onClick={onClick}
                variant="outlined"
                sx={{ textTransform: "none", justifyContent: "flex-start" }}
                className={`bg-[#FAFAFA]! border-[#EBEBEB]! px-3! ${!hasValue && "text-[#ADADAD]! font-normal!"
                    }`}
            >
                {hasValue ? `${valueCount} Selected` : placeholder}
                <span className="ml-auto text-[#884EA7]!">
                    {icon ? icon : <LuChevronDown />}
                </span>
            </Button>
        </FormControl>
    );
};