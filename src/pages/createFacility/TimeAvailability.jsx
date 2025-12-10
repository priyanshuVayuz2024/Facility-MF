import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Autocomplete,
} from "@mui/material";
import { useState } from "react";
import { FormWrapper } from "../../components/ui/wrapper/form";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { basePath } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg"

export default function TimeAvailability() {
    const navigate = useNavigate();

    const [blockedDays, setBlockedDays] = useState([]);
    const [operatingHours, setOperatingHours] = useState(false);
    const [fixedSlot, setFixedSlot] = useState(false);
    const [cancelDialog, setCancelDialog] = useState(false);

    const weekDaysOptions = [
        { label: "Monday" },
        { label: "Tuesday" },
        { label: "Wednesday" },
        { label: "Thursday" },
        { label: "Friday" },
        { label: "Saturday" },
        { label: "Sunday" },
    ];

    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto!">

            {/* Block Week Days */}
            <FormControl className="flex flex-col gap-2 w-full">
                <FormLabel required className="formLabels">Block Week Days</FormLabel>
                <Autocomplete
                    multiple
                    options={weekDaysOptions}
                    value={blockedDays}
                    onChange={(_, v) => setBlockedDays(v)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Choose Days"
                            fullWidth
                            sx={{
                                "& .MuiInputBase-root": { height: "48px" },
                            }}
                        />
                    )}
                />
            </FormControl>

            {/* Operating Hours Toggle */}
            <Box className="flex flex-col gap-1">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={operatingHours}
                            onChange={(e) => setOperatingHours(e.target.checked)}
                        />
                    }
                    label="Operating Hours"
                    sx={{
                        "& .MuiFormControlLabel-label": {
                            fontWeight: 500,
                        },
                    }}
                />
                <p className="text-xs text-[#4D4D4F] leading-4">
                    Set the daily opening and closing time.
                </p>
            </Box>

            {/* Fixed Time Slot Toggle */}
            <Box className="flex flex-col gap-1">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={fixedSlot}
                            onChange={(e) => setFixedSlot(e.target.checked)}
                        />
                    }
                    label="Fix Time Slot?"
                    sx={{
                        "& .MuiFormControlLabel-label": {
                            fontWeight: 500,
                        },
                    }}
                />
                <p className="text-xs text-[#4D4D4F] leading-4">
                    Check this box, if this Facility is open for booking at pre-defined hours.
                </p>
            </Box>

            {/* Time Slot UI Placeholder */}
            {fixedSlot && (
                <Box className="flex flex-col gap-8 border border-[#EBEBEB] bg-white rounded p-4">
                    <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-[#121212]">
                            Define Time Slots
                        </h4>
                        <Button
                            variant="text"
                            sx={{ textTransform: "none" }}
                        >
                            Add Slot
                        </Button>
                    </div>

                    <div className="text-xs text-[#ADADAD] text-center py-6">
                        No slots added yet
                    </div>
                </Box>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col justify-between sm:flex-row border-t border-[#EDEDED] pt-4">
                <Button
                    variant="outlined"
                    onClick={() => setCancelDialog(true)}
                >
                    Cancel
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/create-facility/basic-details")}
                    >
                        Back
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => navigate("/create-facility/booking-rules")}
                    >
                        Next
                    </Button>
                </div>





                <ConfirmDialog
                    open={cancelDialog}
                    onClose={() => setCancelDialog(false)}
                    onConfirm={() => {
                        navigate(`${basePath}/`)
                        setCancelDialog(false)
                    }
                    }
                    title="Confirm Cancellation"
                    description="Are you sure you want to cancel? Any changes made will be lost and cannot be recovered."
                    cancelText={"No, Keep It"}
                    confirmText={"Yes, Cancel"}
                    confirmTextClassName={"!bg-[#884EA7]"}
                    icon={
                        <span className="py-2">
                            <img src={crossIcon} className="w-28" alt="" />
                        </span>
                    }
                />
            </div>
        </FormWrapper>
    );
}
