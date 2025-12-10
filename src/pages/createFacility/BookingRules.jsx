import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    Autocomplete,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import { basePath } from "../../utils";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityBookingSchema } from "../../validation/facilitySchema";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleFacilityFormFields } from "../../redux/slice/facilityCreateSlice";

// Dropdown Data
const chargeTypeGroupOptions = [
    { label: "Postpaid" },
    { label: "Prepaid" },
];

const chargeCategoryOptions = [
    { label: "Bank" },
    { label: "Electricity" },
    { label: "Maintenance" },
];

export default function BookingRules() {
    const dispatch = useDispatch();
    const facilityFormData = useSelector(state => state.facility);


    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 2;

    const [cancelDialog, setCancelDialog] = useState(false);

    const {
        control,
        watch,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: facilityFormData,
        resolver: yupResolver(facilityBookingSchema),
        mode: "onChange",
    });

    const chargeable = watch("chargeable");

    useEffect(() => {
        goToStep(stepIndex);
    }, []);

    useEffect(() => {
        if (isValid) {
            setCompleted((prev) => [...new Set([...prev, stepIndex])]);
        } else {
            setCompleted((prev) => prev.filter((s) => s !== stepIndex));
        }
    }, [isValid]);

    const onSubmit = (data) => {
        dispatch(setMultipleFacilityFormFields(data));
        navigate(`${basePath}/create-facility/preview`);
    };

    return (

        <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">

            {/* Booking Approval & Charges */}
            <div className="flex flex-col gap-6">
                <Typography className="leading-5!">
                    Booking Approval & Charges
                </Typography>

                {/* Admin Approval */}
                <Controller
                    name="adminApproval"
                    control={control}
                    render={({ field }) => (
                        <Box>
                            <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label="Administrator Approval Required For Booking?"
                            />
                            <p className="text-xs text-[#4D4D4F] leading-4 pl-8">
                                Check this if bookings require admin approval.
                            </p>
                        </Box>
                    )}
                />

                {/* Chargeable */}
                <Controller
                    name="chargeable"
                    control={control}
                    render={({ field }) => (
                        <Box className="flex flex-col gap-2">
                            <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label="Chargeable"
                            />
                            <p className="text-xs text-[#4D4D4F] leading-4 pl-8">
                                Check this if the facility has an associated fee.
                            </p>

                            {chargeable && (
                                <Box className="border border-[#EBEBEB] bg-white rounded-xl flex flex-col gap-4 p-6 space-y-6 mt-2">

                                    {/* Charge Type Group */}
                                    <Controller
                                        name="chargeTypeGroup"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className="flex flex-col gap-2" fullWidth>
                                                <FormLabel className="formLabels" required>Charge Type Group</FormLabel>
                                                <Autocomplete
                                                    options={chargeTypeGroupOptions}
                                                    value={field.value}
                                                    onChange={(_, v) => field.onChange(v)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Select charge type"
                                                            error={!!errors.chargeTypeGroup}
                                                            helperText={errors.chargeTypeGroup?.message}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        )}
                                    />

                                    {/* Charge Category */}
                                    <Controller
                                        name="chargeCategory"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className="flex flex-col gap-2" fullWidth>
                                                <FormLabel className="formLabels" required>
                                                    Charge Category to be Used for Invoicing
                                                </FormLabel>
                                                <Autocomplete
                                                    options={chargeCategoryOptions}
                                                    value={field.value}
                                                    onChange={(_, v) => field.onChange(v)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            placeholder="Select category"
                                                            error={!!errors.chargeCategory}
                                                            helperText={errors.chargeCategory?.message}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        )}
                                    />

                                    {/* Due Date Policy */}
                                    <Controller
                                        name="dueDatePolicy"
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl className="flex flex-col gap-2" fullWidth>
                                                <FormLabel className="formLabels" required>Due Date Policy</FormLabel>
                                                <TextField
                                                    {...field}
                                                    placeholder="No. of days"
                                                    slotProps={{
                                                        htmlInput: {
                                                            maxLength: 15,
                                                        }
                                                    }}
                                                    onChange={(e) => {
                                                        let value = e.target.value;

                                                        // Block spaces completely
                                                        value = value.replace(/\s+/g, "");

                                                        // Allow only numbers and - + /
                                                        value = value.replace(/[^0-9+\-/]/g, "");

                                                        field.onChange(value);
                                                    }}
                                                    size="small"
                                                    error={!!errors.dueDatePolicy}
                                                    helperText={errors.dueDatePolicy?.message}
                                                />
                                            </FormControl>
                                        )}
                                    />

                                </Box>
                            )}
                        </Box>
                    )}
                />
            </div>

            {/* Booking Settings */}
            <Box className="flex flex-col gap-2">
                <FormLabel className="formLabels">Booking Settings</FormLabel>

                <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-[#EBEBEB] bg-white rounded p-6">

                    {/* Booking Quota */}
                    <Controller
                        name="bookingQuota"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2" fullWidth>
                                <FormLabel>Booking Quota Limit</FormLabel>
                                <TextField {...field}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 15,
                                        }
                                    }}
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        // Block spaces completely
                                        value = value.replace(/\s+/g, "");

                                        // Allow only numbers and - + /
                                        value = value.replace(/[^0-9+\-/]/g, "");

                                        field.onChange(value);
                                    }}
                                    placeholder="0" size="small" />
                            </FormControl>
                        )}
                    />

                    {/* Max Booking */}
                    <Controller
                        name="maxBookingPerSlot"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2" fullWidth>
                                <FormLabel>Max Booking Per Slot</FormLabel>
                                <TextField {...field}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 15,
                                        }
                                    }}
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        // Block spaces completely
                                        value = value.replace(/\s+/g, "");

                                        // Allow only numbers and - + /
                                        value = value.replace(/[^0-9+\-/]/g, "");

                                        field.onChange(value);
                                    }}
                                    placeholder="0" size="small" />
                            </FormControl>
                        )}
                    />

                    {/* Booking Time Limit */}
                    <Controller
                        name="bookingTimeLimit"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2" fullWidth>
                                <FormLabel>Booking Time Limit (in minutes)</FormLabel>
                                <TextField {...field}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 15,
                                        }
                                    }}
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        // Block spaces completely
                                        value = value.replace(/\s+/g, "");

                                        // Allow only numbers and - + /
                                        value = value.replace(/[^0-9+\-/]/g, "");

                                        field.onChange(value);
                                    }}
                                    placeholder="0" size="small" />
                            </FormControl>
                        )}
                    />

                    {/* Advance Booking Limit */}
                    <Controller
                        name="advanceBookingLimit"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2" fullWidth>
                                <FormLabel>Advance Booking Limit (in minutes)</FormLabel>
                                <TextField {...field}
                                    slotProps={{
                                        htmlInput: {
                                            maxLength: 15,
                                        }
                                    }}
                                    onChange={(e) => {
                                        let value = e.target.value;

                                        // Block spaces completely
                                        value = value.replace(/\s+/g, "");

                                        // Allow only numbers and - + /
                                        value = value.replace(/[^0-9+\-/]/g, "");

                                        field.onChange(value);
                                    }}
                                    placeholder="0" size="small" />
                            </FormControl>
                        )}
                    />

                </Box>
            </Box>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between border-t border-[#EDEDED] pt-4">
                <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                    Cancel
                </Button>

                <div className="flex gap-2">
                    <Button variant="outlined" onClick={() => navigate("/create-facility/time-availability")}>
                        Back
                    </Button>
                    <Button variant="contained" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                        Save & Preview
                    </Button>
                </div>
            </div>

            <ConfirmDialog
                open={cancelDialog}
                onClose={() => setCancelDialog(false)}
                onConfirm={() => navigate(`${basePath}/`)}
                title="Confirm Cancellation"
                description="Are you sure you want to cancel? Any changes will be lost."
                confirmTextClassName="!bg-[#884EA7]"
                cancelText="No, Keep It"
                confirmText="Yes, Cancel"
                icon={<img src={crossIcon} className="w-28" />}
            />
        </FormWrapper>
    );
}
