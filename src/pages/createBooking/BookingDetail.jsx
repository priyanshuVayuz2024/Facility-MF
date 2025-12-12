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
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";

import { basePath, bookingForOptions } from "../../utils/index.jsx";
import { LuBuilding, LuChevronDown, LuUsers } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { bookingDetailsSchema } from "../../validation/bookingSchema.js";
import { setMultipleBookingFields } from "../../redux/slice/bookingCreateSlice.js";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup.jsx";

export default function BookingDetail() {

    const dispatch = useDispatch();
    const bookingFormData = useSelector(state => state.booking);

    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 0;

    const [cancelDialog, setCancelDialog] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);

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




    const selectedFor = watch("bookingFor");



    /* -------------------- Options -------------------- */
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


    const bookingTypes = [
        {
            value: "personal",
            label: "Personal",
            description: "For personal use.",
            icon: <LuUsers />,
        },
        {
            value: "community",
            label: "Community",
            description: "For Community use.",
            icon: <LuBuilding />,
        }
    ];

    /* -------------------- Handle Step Activation -------------------- */
    useEffect(() => {
        goToStep(stepIndex);
    }, []);

    useEffect(() => {
        if (isValid) {
            setCompleted(prev => [...new Set([...prev, stepIndex])]);
        } else {
            setCompleted(prev => prev.filter(s => s !== stepIndex));
        }
    }, [isValid]);


    /* -------------------- Auto-clear Block & Flat when switching type -------------------- */
    const selectedType = watch("type");
    useEffect(() => {
        if (selectedType !== "personal") {
            setValue("block", null);
            setValue("flat", null);
        }
    }, [selectedType]);


    /* -------------------- Submit -------------------- */
    const onSubmit = (data) => {
        dispatch(setMultipleBookingFields(data));
        goToStep(stepIndex + 1);
    };



    const handleBookingForSave = (val) => {
        setValue("bookingFor", val)
        trigger("bookingFor")
        setPopupOpen(false)
    }


    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">

            {/* -------------------- Booking Type -------------------- */}
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <Box className="mb-4!">
                        <FormLabel required className="block pb-4!">
                            Booking Type
                        </FormLabel>

                        <Box className="flex gap-8">
                            {bookingTypes.map((option) => {
                                const isSelected = field.value === option.value;

                                return (
                                    <ButtonBase
                                        key={option.value}
                                        onClick={() => field.onChange(option.value)}
                                        className={`min-h-[92px] flex-1! flex! flex-col! items-start! gap-4! border! rounded-xl! px-4! py-4! transition-all! 
                                            ${isSelected
                                                ? "border-[#A66CFA]! bg-linear-to-b! from-[#884EA726] to-[#EDF8F700]"
                                                : "border-[#E0E0E0]! bg-linear-to-b! from-[#FBFBFB] to-white"
                                            } hover:shadow-sm!`}
                                        sx={{ alignItems: "flex-start", textAlign: "left" }}
                                    >
                                        <Box className={`flex items-center gap-2 ${isSelected ? "text-[#884EA7]!" : ""}`}>
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

                        <FormHelperText error>{errors.type?.message}</FormHelperText>
                    </Box>
                )}
            />

            {/* -------------------- Block & Flat (Personal Only) -------------------- */}
            {selectedType === "personal" && (
                <>
                    {/* Block */}
                    <Controller
                        name="block"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2">
                                <FormLabel required className="formLabels">Choose Block</FormLabel>
                                <Autocomplete
                                    options={blockOptions}
                                    value={field.value || null}
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

                    {/* Flat */}
                    <Controller
                        name="flat"
                        control={control}
                        render={({ field }) => (
                            <FormControl className="flex flex-col gap-2">
                                <FormLabel required className="formLabels">Choose Flat</FormLabel>
                                <Autocomplete
                                    options={flatOptions}
                                    value={field.value || null}
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
                </>
            )}

            {/* -------------------- Booking For -------------------- */}

            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Booking For</FormLabel>
                <Button
                    onClick={() => setPopupOpen(true)}
                    variant="outlined"
                    sx={{ textTransform: "none", justifyContent: "flex-start" }}
                >
                    {selectedFor?.length > 0
                        ? `${selectedFor.length} Selected`
                        : "Choose booking for"}
                    <span className="ml-auto"><LuChevronDown /></span>
                </Button>
                {errors?.bookingFor && (
                    <FormHelperText error>{errors.bookingFor?.message}</FormHelperText>
                )}
            </FormControl>

            <SimpleSelectorPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                options={bookingForOptions}
                initialSelection={selectedFor || []}
                onSave={handleBookingForSave}
                showSelectAll={false}
                hideSearch={true}
                headingText="Booking For"
            />


            {/* -------------------- Purpose -------------------- */}
            <Controller
                name="purpose"
                control={control}
                render={({ field }) => (
                    <Box className="flex flex-col gap-2 relative">
                        <FormLabel required className="formLabels">Purpose of Booking</FormLabel>

                        <TextField
                            {...field}
                            placeholder="Enter Booking Details"
                            error={!!errors.purpose}
                            helperText={errors.purpose?.message}
                            onChange={(e) => {
                                let value = e.target.value
                                    .replace(/^\s+/, "")
                                    .replace(/\s{2,}/g, " ");
                                field.onChange(value);
                            }}
                            onBlur={(e) => field.onChange(e.target.value.trim())}
                        />

                        <span className={`absolute right-2 top-9 text-[14px] px-4 py-1 bg-[#FAFAFA]
                            ${field.value?.length >= 3000 ? "text-[#AB0000]" : "text-[#ADADAD]"}`}>
                            {field.value?.length || 0} / 3000
                        </span>
                    </Box>
                )}
            />

            {/* -------------------- Buttons -------------------- */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#EDEDED]">
                <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                    Cancel
                </Button>

                <Button variant="contained" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                    Next
                </Button>
            </div>

            {/* -------------------- Cancel Confirmation -------------------- */}
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
