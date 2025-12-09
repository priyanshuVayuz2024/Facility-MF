import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { FormWrapper } from "../../components/ui/wrapper/form";

export default function BookingRules() {
    const navigate = useNavigate();

    const [adminApproval, setAdminApproval] = useState(false);
    const [chargeable, setChargeable] = useState(false);

    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto!">

            {/* Booking Approval & Charges */}
            <div className="flex flex-col gap-6">

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={adminApproval}
                                onChange={(e) => setAdminApproval(e.target.checked)}
                            />
                        }
                        label="Administrator Approval Required For Booking?"
                        sx={{
                            "& .MuiFormControlLabel-label": { fontWeight: 500 },
                        }}
                    />
                    <p className="text-xs text-[#4D4D4F] leading-4 pl-8">
                        Check this if bookings require admin approval.
                    </p>
                </div>

                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={chargeable}
                                onChange={(e) => setChargeable(e.target.checked)}
                            />
                        }
                        label="Chargeable"
                        sx={{
                            "& .MuiFormControlLabel-label": { fontWeight: 500 },
                        }}
                    />
                    <p className="text-xs text-[#4D4D4F] leading-4 pl-8">
                        Check this if the facility has an associated fee.
                    </p>
                </div>
            </div>

            {/* Booking Settings */}
            <div className="flex flex-col gap-2">
                <FormLabel className="formLabels">Booking Settings</FormLabel>

                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-[#EBEBEB] bg-white rounded p-6">

                    {/* Booking Quota Limit */}
                    <div className="flex flex-col gap-2 w-full">
                        <FormLabel className="text-sm font-medium text-[#121212]">
                            Booking Quota Limit
                        </FormLabel>
                        <p className="text-xs text-[#4D4D4F] leading-4">
                            Maximum number of open bookings allowed by any unit at any time.
                        </p>
                        <TextField
                            placeholder="0"
                            fullWidth
                            sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                        />
                    </div>

                    {/* Max Booking Per Slot */}
                    <div className="flex flex-col gap-2 w-full">
                        <FormLabel className="text-sm font-medium text-[#121212]">
                            Max Booking Per Slot
                        </FormLabel>
                        <p className="text-xs text-[#4D4D4F] leading-4">
                            Maximum bookings to be allowed per slot.
                        </p>
                        <TextField
                            placeholder="0"
                            fullWidth
                            sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                        />
                    </div>

                    {/* Booking Time Limit */}
                    <div className="flex flex-col gap-2 w-full">
                        <FormLabel className="text-sm font-medium text-[#121212]">
                            Booking Time Limit (in minutes)
                        </FormLabel>
                        <p className="text-xs text-[#4D4D4F] leading-4">
                            Max duration allowed per booking, leave blank or zero for no limit.
                        </p>
                        <TextField
                            placeholder="0"
                            fullWidth
                            sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                        />
                    </div>

                    {/* Advance Booking Limit */}
                    <div className="flex flex-col gap-2 w-full">
                        <FormLabel className="text-sm font-medium text-[#121212]">
                            Advance Booking Limit (in minutes)
                        </FormLabel>
                        <p className="text-xs text-[#4D4D4F] leading-4">
                            Number of minutes before which booking opens. Example: 1440 = 24 hours.
                        </p>
                        <TextField
                            placeholder="0"
                            fullWidth
                            sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                        />
                    </div>

                </Box>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col justify-between sm:flex-row border-t border-[#EDEDED] pt-4">
                <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                >
                    Cancel
                </Button>

                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/create-facility/time-availability")}
                    >
                        Back
                    </Button>

                    <Button variant="contained">
                        Save & Preview
                    </Button>
                </div>
            </div>

        </FormWrapper>
    );
}
