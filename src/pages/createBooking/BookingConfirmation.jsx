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
import { CalendarMonthOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

import { useDispatch, useSelector } from "react-redux";
import { setMultipleBookingFields } from "../../redux/slice/bookingCreateSlice";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup";
import { TimeRangeInput } from "../../components/ui/TimeRangeInput";
import { DropdownSelect } from "../../components/ui/DropdownSelect";
import ActionButtons from "../../components/ui/ActionButtons";






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
        // resolver: yupResolver(bookingScheduleSchema),
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


            <DropdownSelect
                label="Booking Frequency"
                valueCount={0}
                placeholder="Choose Booking Frequency"
                onClick={() => setPopupOpen(true)}
            />

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






            {/* BOOKING DATE */}
            <Box>
                <Box className="flex justify-between items-center mb-2">
                    <FormLabel required className="formLabels">
                        Booking Date
                    </FormLabel>
                    <Button
                        variant="text"
                        sx={{ color: "#884EA7", textTransform: "none" }}
                        startIcon={<CalendarMonthOutlined />}
                        className="p-0!"
                    >
                        Check Availability
                    </Button>
                </Box>

                {/* ✅ SINGLE DATE PICKER */}
                {bookingFrequency?.[0] == 1 ? (
                    <Box className="w-full flex flex-col">
                        <Controller
                            name="bookingDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    value={toDateObject(field.value)}
                                    onChange={(newVal) =>
                                        field.onChange(toStorableString(newVal))
                                    }
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            placeholder: "DD/MM/YYYY",
                                            size: "small",
                                            error: !!errors.bookingDate,
                                            helperText: errors.bookingDate?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                )
                    : (
                        <Box className="flex gap-3 w-full">
                            <Controller
                                name="fromDate"
                                control={control}
                                render={({ field }) => (
                                    <FormControl className="flex-1">
                                        <FormLabel className="formLabels">From</FormLabel>
                                        <DatePicker
                                            value={toDateObject(field.value)}
                                            onChange={(newVal) =>
                                                field.onChange(toStorableString(newVal))
                                            }
                                            format="MM/dd/yyyy"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,   // ✅ important
                                                    placeholder: "MM/DD/YYYY",
                                                    size: "small",
                                                    error: !!errors.fromDate,
                                                    helperText: errors.fromDate?.message,
                                                    InputProps: {
                                                        sx: {
                                                            backgroundColor: "#FAFAFA",
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name="toDate"
                                control={control}
                                render={({ field }) => (
                                    <FormControl className="flex-1">
                                        <FormLabel className="formLabels">To</FormLabel>
                                        <DatePicker
                                            value={toDateObject(field.value)}
                                            onChange={(newVal) =>
                                                field.onChange(toStorableString(newVal))
                                            }
                                            format="MM/dd/yyyy"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    placeholder: "MM/DD/YYYY",
                                                    size: "small",
                                                    error: !!errors.toDate,
                                                    helperText: errors.toDate?.message,
                                                    InputProps: {
                                                        sx: {
                                                            backgroundColor: "#FAFAFA",
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </FormControl>
                                )}
                            />
                        </Box>

                    )}
            </Box>

            {/* BOOKING TIME */}
            <Box>
                <FormLabel required className="formLabels text-base!">
                    Time
                </FormLabel>

                <Typography className="text-sm! text-[#ADADAD] mb-4">
                    Booking must be between 05:00 AM and 11:00 PM
                </Typography>

                <Box className="flex gap-4 w-full mt-3">

                    {/* START TIME */}
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex-1">
                                <FormLabel>Start Time</FormLabel>
                                <TimeRangeInput
                                    {...field}
                                    error={!!errors.startTime}
                                    helperText={errors.startTime?.message}
                                />
                            </FormControl>
                        )}
                    />

                    {/* END TIME */}
                    <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex-1">
                                <FormLabel>End Time</FormLabel>
                                <TimeRangeInput
                                    {...field}
                                    error={!!errors.endTime}
                                    helperText={errors.endTime?.message}
                                />
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
            <ActionButtons
                startText="Cancel"
                onStart={() => setCancelDialog(true)}
                backText="Back"
                onBack={() => goToStep(0)}
                nextText="Preview"
                onNext={handleSubmit(onSubmit)}
            // nextProps={{ disabled: !isValid }}
            />







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
