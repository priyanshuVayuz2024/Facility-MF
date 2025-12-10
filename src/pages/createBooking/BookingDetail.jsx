import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Autocomplete,
    ButtonBase,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import { MyEditor } from "../../components/MyEditor.jsx";
import SelectorPopup from "../../components/ui/selectorPopup.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";

import { basePath, stripHtml } from "../../utils/index.jsx";
import { LuBuilding, LuUsers } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityBasicDetailsSchema } from "../../validation/facilitySchema.js";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleFacilityFormFields } from "../../redux/slice/facilityCreateSlice.js";
import { bookingDetailsSchema } from "../../validation/bookingSchema.js";

export default function BookingDetail() {
    const dispatch = useDispatch();
    const bookingFormData = useSelector(state => state.booking);




    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 0;

    const [popupOpen, setPopupOpen] = useState(false);
    const [cancelDialog, setCancelDialog] = useState(false);

    const {
        control,
        setValue,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: bookingFormData,
        resolver: yupResolver(bookingDetailsSchema),
        mode: "onChange",
    });




    const blockOptions = [
        { label: "Block A" },
        { label: "Block B" },
        { label: "Block C" },
    ];
    const flatOptions = [
        { label: "Flat A" },
        { label: "Flat B" },
        { label: "Flat C" },
    ];
    const bookingForOptions = [
        { label: "Person A" },
        { label: "Person B" },
        { label: "Person C" },
    ];

    const noticeLevels = [
        {
            value: "personal",
            label: "Personal",
            description: "For personal use.",
            icon: <LuUsers />,
        },
        {
            value: "community",
            label: "Community",
            description: "For Community",
            icon: <LuBuilding />,
        }
    ];

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
        // dispatch(setMultipleFacilityFormFields(data));
        goToStep(stepIndex + 1)
    };


    useEffect(() => {
        console.log("Form Valid:", isValid);
    }, [isValid]);



    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">

            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <Box className="mb-4!">
                        <FormLabel required className="block pb-4!">
                            Booking Type                </FormLabel>
                        <Box className="flex gap-8">
                            {noticeLevels.map((option) => {
                                const isSelected = field.value === option.value;
                                return (
                                    <ButtonBase
                                        key={option.value}
                                        onClick={() => {
                                            field.onChange(option?.value);
                                        }}
                                        className={`min-h-[92px] flex-1! flex! flex-col! items-start! gap-4! border! rounded-xl! px-4! py-4! transition-all! ${isSelected
                                            ? "border-[#A66CFA]! bg-linear-to-b! from-[#884EA726] to-[#EDF8F700]"
                                            : "border-[#E0E0E0]! bg-linear-to-b! from-[#FBFBFB] to-white"
                                            } hover:shadow-sm!`}
                                        sx={{ alignItems: "flex-start", textAlign: "left" }}
                                    >
                                        <Box
                                            className={`${isSelected ? "text-[#884EA7]!" : ""
                                                } flex items-center gap-2`}
                                        >
                                            {option.icon}
                                            <Typography variant="body1" fontWeight={500}>
                                                {option.label}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" className="text-gray-500">
                                            {option.description}
                                        </Typography>
                                    </ButtonBase>
                                );
                            })}
                        </Box>
                        <FormHelperText className="mt-1 text-red-500">
                            {errors.type?.message}
                        </FormHelperText>
                    </Box>
                )}
            />

            <Controller
                name="block"
                control={control}
                render={({ field }) => (
                    <FormControl className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">Choose Block</FormLabel>
                        <Autocomplete
                            options={blockOptions}
                            value={field.value}
                            onChange={(_, v) => field.onChange(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Choose Block"
                                    error={!!errors.block}
                                    helperText={errors.block?.message}
                                />
                            )}
                        />
                    </FormControl>
                )}
            />

            <Controller
                name="flat"
                control={control}
                render={({ field }) => (
                    <FormControl className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">Choose Flat</FormLabel>
                        <Autocomplete
                            options={flatOptions}
                            value={field.value}
                            onChange={(_, v) => field.onChange(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Choose Flat"
                                    error={!!errors.flat}
                                    helperText={errors.flat?.message}
                                />
                            )}
                        />
                    </FormControl>
                )}
            />
            <Controller
                name="bookingFor"
                control={control}
                render={({ field }) => (
                    <FormControl className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">Booking For</FormLabel>
                        <Autocomplete
                            options={bookingForOptions}
                            value={field.value}
                            onChange={(_, v) => field.onChange(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Choose booking for"
                                    error={!!errors.bookingFor}
                                    helperText={errors.bookingFor?.message}
                                />
                            )}
                        />
                    </FormControl>
                )}
            />







            <Controller
                name="purpose"
                control={control}
                render={({ field }) => (
                    <Box className="flex flex-col gap-2 relative">
                        <FormLabel required className="formLabels">Purpose of Booking</FormLabel>
                        <TextField
                            {...field}
                            placeholder="Enter Booking Details"
                            error={!!errors.facilityName}
                            helperText={errors.facilityName?.message}
                            onChange={(e) => {
                                let value = e.target.value;

                                // allow normal typing of a single space
                                // but prevent: leading space, trailing space and 2+ consecutive spaces
                                value = value
                                    .replace(/^\s+/, "")        // remove leading space(s)
                                    .replace(/\s{2,}/g, " ");   // convert multiple spaces to one

                                field.onChange(value);
                            }}
                            onBlur={(e) => {
                                // On blur → remove trailing spaces if left at the end
                                let value = e.target.value.trim();
                                field.onChange(value);
                            }}
                        />
                        <span className={`absolute right-2 top-9 text-[14px] px-4 py-1 bg-[#FAFAFA] ${field.value?.length >= 3000 ? "text-[#AB0000]" : "text-[#ADADAD]"
                            }`}>
                            {field.value?.length || 0} / 3000
                        </span>
                    </Box>
                )}
            />



            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#EDEDED]">
                <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={!isValid}
                    onClick={handleSubmit(onSubmit)}
                >
                    Next
                </Button>
            </div>

            {/* Cancel Confirmation */}
            <ConfirmDialog
                open={cancelDialog}
                onClose={() => setCancelDialog(false)}
                onConfirm={() => navigate(`${basePath}/`)}
                title="Confirm Cancellation"
                description="Are you sure you want to cancel? Any changes made will be lost."
                cancelText="No, Keep It"
                confirmText="Yes, Cancel"
                confirmTextClassName="!bg-[#884EA7]"
                icon={<span className="py-2"><img src={crossIcon} className="w-28" /></span>}
            />
        </FormWrapper>
    );
}
