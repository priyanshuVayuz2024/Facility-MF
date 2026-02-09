import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Autocomplete,
    Checkbox,
    FormControlLabel,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { bookingScheduleSchema } from "../../validation/bookingSchema";
import { basePath, bookingFrequencyOptions } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { DatePicker } from "@mui/x-date-pickers";

import { useDispatch, useSelector } from "react-redux";
import { setMultipleBookingFields } from "../../redux/slice/bookingCreateSlice";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup";
import { LuChevronDown } from "react-icons/lu";

// =============================
// Time Input Component
// =============================
export function TimeInput({ value, onChange, error, helperText }) {
    const [internal, setInternal] = useState(value || "");

    const formatTime = (v) => {
        v = v.replace(/\D/g, "");
        if (v.length === 0) return "";
        if (v.length <= 2) return v;
        if (v.length <= 4) return `${v.slice(0, 2)}:${v.slice(2)}`;
        return `${v.slice(0, 2)}:${v.slice(2, 4)}`;
    };

    const handleInput = (e) => {
        const formatted = formatTime(e.target.value);
        setInternal(formatted);
        onChange(formatted);
    };

    useEffect(() => {
        setInternal(value || "");
    }, [value]);


    return (
        <TextField
            value={internal}
            onChange={handleInput}
            placeholder="00:00 hrs"
            size="small"
            fullWidth
            error={error}
            helperText={helperText}
            inputProps={{ maxLength: 5 }}
        />
    );
}

// =============================
// BOOKING CONFIRMATION PAGE
// =============================
export default function BookingConfirmation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxData = useSelector((state) => state.booking);

    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 1;

    const [cancelDialog, setCancelDialog] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);



    // =============================
    // FORM SETUP
    // =============================
    const {
        control,
        handleSubmit,
        watch,
        trigger,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: reduxData,
        resolver: yupResolver(bookingScheduleSchema),
        mode: "onChange",
    });



    let bookingFrequency = watch("bookingFrequency")




    // Auto-mark step completion
    useEffect(() => {
        goToStep(stepIndex);
    }, []);

    useEffect(() => {
        setCompleted((prev) =>
            isValid ? [...new Set([...prev, stepIndex])] : prev.filter((s) => s !== stepIndex)
        );
    }, [isValid]);


    // On submit
    const onSubmit = (formValues) => {
        dispatch(setMultipleBookingFields(formValues));
        navigate("/create-booking/preview");
    };


    // =============================
    // CLEAN DATE HELPERS
    // =============================

    const toDateObject = (val) => {
        if (!val) return null;
        const d = new Date(val);
        return isNaN(d.getTime()) ? null : d;  // ← Avoid Invalid Date
    };

    const toStorableString = (dateObj) => {
        if (!(dateObj instanceof Date)) return "";   // ← MUI sometimes passes string
        if (isNaN(dateObj.getTime())) return "";     // ← Convert Invalid Date → ""
        return dateObj.toISOString();
    };



    const handleBookingFrequencySave = (val) => {
        setValue("bookingFrequency", val)
        trigger("bookingFrequency")
        setPopupOpen(false)
    }

    // =============================
    // UI STARTS HERE
    // =============================
    return (
        <FormWrapper className="flex flex-col gap-8 border-0!">

            {/* Booking Frequency */}


            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Booking Frequency</FormLabel>
                <Button
                    onClick={() => setPopupOpen(true)}
                    variant="outlined"
                    sx={{ textTransform: "none", justifyContent: "flex-start" }}
                >
                    {bookingFrequency?.length > 0
                        ? `${bookingFrequency.length} Selected`
                        : "Choose booking frequency"}
                    <span className="ml-auto"><LuChevronDown /></span>
                </Button>
                {errors?.bookingFrequency && (
                    <FormHelperText error>{errors.bookingFrequency?.message}</FormHelperText>
                )}
            </FormControl>

            <SimpleSelectorPopup
                open={popupOpen}
                selectionMode="radio"
                onClose={() => setPopupOpen(false)}
                options={bookingFrequencyOptions}
                initialSelection={bookingFrequency || []}
                onSave={handleBookingFrequencySave}
                showSelectAll={false}
                hideSearch={true}
                headingText="Booking For"
            />






            {/* DATE RANGE */}
            <Box>
                <Typography className="mb-1!">Date Range</Typography>

                <Box className="grid sm:grid-cols-2 gap-6">

                    {/* FROM DATE */}
                    <Controller
                        name="fromDate"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel className="formLabels">From</FormLabel>

                                <DatePicker
                                    value={toDateObject(field.value)}
                                    onChange={(newVal) => {
                                        field.onChange(toStorableString(newVal));
                                    }}
                                    format="MM/dd/yyyy"
                                    slotProps={{
                                        textField: {
                                            placeholder: "MM/DD/YYYY",
                                            size: "small",
                                            error: !!errors.fromDate,
                                            helperText: errors.fromDate?.message,
                                        }
                                    }}
                                />

                            </FormControl>
                        )}
                    />

                    {/* TO DATE */}
                    <Controller
                        name="toDate"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel className="formLabels">To</FormLabel>

                                <DatePicker
                                    value={toDateObject(field.value)}
                                    onChange={(newVal) => {
                                        field.onChange(toStorableString(newVal));
                                    }}
                                    format="MM/dd/yyyy"
                                    slotProps={{
                                        textField: {
                                            placeholder: "MM/DD/YYYY",
                                            size: "small",
                                            error: !!errors.toDate,
                                            helperText: errors.toDate?.message,
                                        }
                                    }}
                                />

                            </FormControl>
                        )}
                    />

                </Box>
            </Box>

            {/* TIME RANGE */}
            <Box>
                <FormLabel className="formLabels">Time</FormLabel>
                <Typography className="text-xs text-[#4D4D4F] mb-2">
                    Booking must be between 05:00 hrs and 23:00 hrs
                </Typography>

                <Box className="grid sm:grid-cols-2 gap-6">

                    {/* START TIME */}
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel className="formLabels">Start Time</FormLabel>
                                <TimeInput {...field} error={!!errors.startTime} helperText={errors.startTime?.message} />
                            </FormControl>
                        )}
                    />

                    {/* END TIME */}
                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                            <FormControl>
                                <FormLabel className="formLabels">End Time</FormLabel>
                                <TimeInput {...field} error={!!errors.endTime} helperText={errors.endTime?.message} />
                            </FormControl>
                        )}
                    />

                </Box>
            </Box>

            {/* CONSENT */}
            <Box>
                <FormLabel required className="formLabels pb-2">Consent Settings</FormLabel>

                {/* Consent 1 */}
                <Controller
                    name="consent1"
                    control={control}
                    render={({ field }) => (
                        <Box className="p-4 bg-white mb-4">
                            <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label="I understand that I would be charged for the usage of this facility."
                            />
                            <Typography className="text-sm text-[#4D4D4F] leading-5 pl-8">
                                I acknowledge that using this facility involves a fee, and I fully accept the charges associated with it. I am aware that the facility is not complimentary and that payment is required as per the guidelines. By stating this, I confirm my understanding of the cost and agree to comply with all applicable usage and billing terms.                            </Typography>
                            {errors.consent1 && <FormHelperText error>{errors.consent1.message}</FormHelperText>}
                        </Box>
                    )}
                />

                {/* Consent 2 */}
                <Controller
                    name="consent2"
                    control={control}
                    render={({ field }) => (
                        <Box className="p-4 bg-white">
                            <FormControlLabel
                                control={<Checkbox {...field} checked={!!field.value} />}
                                label={
                                    <span>
                                        I have read the{" "}
                                        <span
                                            className="text-[#884EA7] cursor-pointer"
                                            onClick={() => window.open(`${basePath}/`, "_blank")}
                                        >
                                            Facility usage instructions
                                        </span>.
                                    </span>
                                }
                            />
                            <Typography className="text-sm text-[#4D4D4F] leading-5 pl-8">
                                If this is checked, it means you agree to all the instructions.
                            </Typography>
                            {errors.consent2 && <FormHelperText error>{errors.consent2.message}</FormHelperText>}
                        </Box>
                    )}
                />
            </Box>

            {/* BUTTONS */}
            <div className="flex justify-between border-t border-[#EDEDED] pt-4">
                <Button variant="outlined" onClick={() => setCancelDialog(true)}>Cancel</Button>

                <Box className="flex gap-2">
                    <Button variant="outlined" onClick={() => goToStep(0)}>Back</Button>
                    <Button variant="contained" disabled={!isValid} onClick={handleSubmit(onSubmit)}>Preview</Button>
                </Box>
            </div>

            {/* CANCEL CONFIRM */}
            <ConfirmDialog
                open={cancelDialog}
                onClose={() => setCancelDialog(false)}
                onConfirm={() => navigate(`${basePath}/`)}
                title="Confirm Cancellation"
                description="Are you sure you want to cancel? Any changes made will be lost."
                cancelText="No, Keep It"
                confirmText="Yes, Cancel"
                confirmTextClassName="!bg-[#884EA7]"
                icon={<img src={crossIcon} className="w-28" />}
            />

        </FormWrapper>
    );
}
