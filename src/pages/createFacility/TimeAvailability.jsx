import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import SelectorPopup from "../../components/ui/selectorPopup";

import { basePath, weekDaysOptions } from "../../utils";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityTimeSchema } from "../../validation/facilitySchema";

const timeOptions = Array.from({ length: 24 }, (_, h) =>
    ["00", "15", "30", "45"].map((m) => `${String(h).padStart(2, "0")}:${m}`)
).flat();

const reverseTimeOptions = [...timeOptions].reverse();


export default function TimeAvailability() {
    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 1;

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
        defaultValues: {
            blockedDays: [],
            operatingHours: false,
            opensAt: "",
            closesAt: "",
            fixedSlot: false,
            slots: [],
        },
        resolver: yupResolver(facilityTimeSchema),
        mode: "onChange",
    });

    const {
        fields: slotFields,
        append: addSlot,
        remove: removeSlot,
    } = useFieldArray({
        control,
        name: "slots",
    });

    const blockedDays = watch("blockedDays");
    const fixedSlot = watch("fixedSlot");
    const operatingHours = watch("operatingHours");

    const handleBlockedDaysSave = (selected) => {
        setValue("blockedDays", selected, { shouldValidate: true });
        trigger("blockedDays");
        setPopupOpen(false);
    };

    const displayDaysText =
        blockedDays.length === 7
            ? "All 7 Days"
            : blockedDays.length > 0
                ? `${blockedDays.length} Selected`
                : "Choose Days";

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

    const onSubmit = () => goToStep(stepIndex + 1);
    return (
        <FormWrapper className="flex flex-col gap-8 border-0!">

            {/* Week Days */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Block Week Days</FormLabel>
                <Button variant="outlined" sx={{ justifyContent: "flex-start" }} onClick={() => setPopupOpen(true)}>
                    {displayDaysText}
                </Button>
                {errors.blockedDays && (
                    <FormHelperText error>{errors.blockedDays.message}</FormHelperText>
                )}
            </FormControl>

            <SelectorPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                options={weekDaysOptions}
                initialSelection={blockedDays}
                onSave={handleBlockedDaysSave}
                leftHeader="Select Week Days"
                hideSearch={true}
            />

            {/* Operating Hours */}
            <Controller
                name="operatingHours"
                control={control}
                render={({ field }) => (
                    <Box className="space-y-1">
                        <FormControlLabel
                            control={<Checkbox {...field} checked={!!field.value} />}
                            label="Operating Hours"
                        />
                        <p className="text-xs text-[#4D4D4F]">
                            Set the daily opening and closing time.
                        </p>
                    </Box>
                )}
            />

            {/* Open/Close Dropdowns */}
            {operatingHours && (
                <Box className="grid sm:grid-cols-2 gap-6">
                    {/* Open */}

                    <Controller
                        name="opensAt"
                        control={control}
                        render={({ field }) => {
                            if (!field.value) setTimeout(() => field.onChange(timeOptions[0]), 0); // Set default
                            return (
                                <FormControl fullWidth>
                                    <FormLabel required className="formLabels">Opens At</FormLabel>
                                    <Select {...field} size="small">
                                        {timeOptions.map((t) => (
                                            <MenuItem key={t} value={t}>{t} hrs</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>{errors.opensAt?.message}</FormHelperText>
                                </FormControl>
                            );
                        }}
                    />

                    {/* Close */}

                    <Controller
                        name="closesAt"
                        control={control}
                        render={({ field }) => {
                            if (!field.value) setTimeout(() => field.onChange(reverseTimeOptions[0]), 0); // Set last time by default
                            return (
                                <FormControl fullWidth>
                                    <FormLabel required className="formLabels">Closes At</FormLabel>
                                    <Select {...field} size="small">
                                        {reverseTimeOptions.map((t) => (
                                            <MenuItem key={t} value={t}>{t} hrs</MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText error>{errors.closesAt?.message}</FormHelperText>
                                </FormControl>
                            );
                        }}
                    />

                </Box>
            )}

            {/* Fixed Slot */}
            <Controller
                name="fixedSlot"
                control={control}
                render={({ field }) => (
                    <Box className="space-y-1 flex justify-between">
                        <Box>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...field}
                                        checked={!!field.value}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            field.onChange(checked);

                                            if (checked && slotFields.length === 0) {
                                                addSlot({ start: timeOptions[0], end: reverseTimeOptions[0] });
                                            }
                                        }}
                                    />
                                }
                                label="Fix Time Slot?"
                            />
                            <p className="text-xs text-[#4D4D4F]">
                                Check for booking at pre-defined hours.
                            </p>
                        </Box>

                        <Button
                            variant="text"
                            sx={{
                                textTransform: "none",
                                color: "#884EA7",
                                fontWeight: 600,
                                fontSize: "14px",
                            }}
                            onClick={() => {
                                field.onChange(true);
                                addSlot({ start: timeOptions[0], end: reverseTimeOptions[0] });
                                trigger("fixedSlot");
                            }}
                        >
                            Add Slot
                        </Button>
                    </Box>
                )}
            />
            {fixedSlot && (
                <Box className="space-y-6 pt-0">

                    {/* Slot Rows */}
                    <div className="space-y-8">
                        {slotFields.map((item, i) => (
                            <Box key={item.id}>
                                <FormLabel required className="formLabels pb-2 block">
                                    Slot {i + 1}
                                </FormLabel>
                                <Box className="flex gap-4 items-center">
                                    {/* Start */}
                                    <Controller
                                        name={`slots.${i}.start`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <Select {...field} size="small">
                                                    {timeOptions.map((t) => (
                                                        <MenuItem key={t} value={t}>{t} hrs</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText error>
                                                    {errors.slots?.[i]?.start?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        )}
                                    />


                                    {/* End */}
                                    <Controller
                                        name={`slots.${i}.end`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControl fullWidth>
                                                <Select {...field} size="small">
                                                    {reverseTimeOptions.map((t) => (
                                                        <MenuItem key={t} value={t}>{t} hrs</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText error>
                                                    {errors.slots?.[i]?.end?.message}
                                                </FormHelperText>
                                            </FormControl>
                                        )}
                                    />

                                    {/* Remove Button */}
                                    <Button
                                        onClick={() => {
                                            removeSlot(i);
                                            setTimeout(() => {
                                                if (slotFields.length === 1) {
                                                    setValue("fixedSlot", false, { shouldValidate: true });
                                                }
                                            }, 0);
                                        }} sx={{
                                            minWidth: 0,
                                            color: "#AB0000",
                                            fontSize: "18px",
                                            fontWeight: 700,
                                        }}
                                    >
                                        ✕
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </div>

                    {/* If no slots */}
                    {slotFields.length === 0 && (
                        <p className="text-xs text-[#ADADAD] text-center">
                            No slots added yet
                        </p>
                    )}
                </Box>
            )}

            {/* Buttons */}
            <div className="flex justify-between pt-4">
                <Button variant="outlined" onClick={() => setCancelDialog(true)}>
                    Cancel
                </Button>
                <div className="flex gap-2">
                    <Button variant="outlined" onClick={() => navigate("/create-facility/basic-details")}>
                        Back
                    </Button>
                    <Button variant="contained" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
                        Next
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
