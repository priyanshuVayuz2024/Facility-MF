import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    TextField,
    Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import { MyEditor } from "../../components/MyEditor.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";

import { basePath, categoryOptions, communityOptions, stripHtml } from "../../utils/index.jsx";
import { LuBuilding, LuChevronDown } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityBasicDetailsSchema } from "../../validation/facilitySchema.js";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleFacilityFormFields } from "../../redux/slice/facilityCreateSlice.js";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup.jsx";

export default function BasicDetails() {
    const dispatch = useDispatch();
    const facilityFormData = useSelector(state => state.facility);




    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 0;

    const [popupOpen, setPopupOpen] = useState(false);
    const [facilityPopupOpen, setFacilityPopupOpen] = useState(false);
    const [cancelDialog, setCancelDialog] = useState(false);

    const {
        control,
        setValue,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: facilityFormData,
        resolver: yupResolver(facilityBasicDetailsSchema),
        mode: "onChange",
    });

    // Watch fields
    const facilityName = watch("facilityName");
    const instructions = watch("instructions");
    const selectedCommunities = watch("community");
    const selectedCategory = watch("category");

    // Fake dropdown options

    const accessibleOptions = [
        { label: "Members Only" },
        { label: "Guests Allowed" },
    ];

    const handleCommunitySave = (selected) => {
        setValue("community", selected);
        trigger("community");
        setPopupOpen(false);
    };



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
        goToStep(stepIndex + 1)
    };


    const handleCategorySave = (val) => {
        setValue("category", val)
        trigger("category")
        setFacilityPopupOpen(false)
    }


    useEffect(() => {
        console.log("Form Valid:", isValid);
    }, [isValid]);



    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">

            {/* Facility Name */}
            <Controller
                name="facilityName"
                control={control}
                render={({ field }) => (
                    <Box className="flex flex-col gap-2 relative">
                        <FormLabel required className="formLabels">Name Of Facility</FormLabel>
                        <TextField
                            {...field}
                            placeholder="Enter facility name"
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
                        <span className={`absolute right-2 top-9 text-[14px] px-4 py-1 bg-[#FAFAFA] ${field.value?.length >= 100 ? "text-[#AB0000]" : "text-[#ADADAD]"
                            }`}>
                            {field.value?.length || 0} / 100
                        </span>
                    </Box>
                )}
            />

            {/* Category */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Facility Category</FormLabel>
                <Button
                    onClick={() => setFacilityPopupOpen(true)}
                    variant="outlined"
                    sx={{ textTransform: "none", justifyContent: "flex-start" }}
                >
                    {selectedCategory?.length > 0
                        ? `${selectedCategory.length} Selected`
                        : "Choose booking for"}
                    <span className="ml-auto"><LuChevronDown /></span>
                </Button>
                {errors?.category && (
                    <FormHelperText error>{errors.category?.message}</FormHelperText>
                )}
            </FormControl>

            <SimpleSelectorPopup
                open={facilityPopupOpen}
                onClose={() => setFacilityPopupOpen(false)}
                options={categoryOptions}
                initialSelection={selectedCategory || []}
                onSave={handleCategorySave}
                showSelectAll={false}
                hideSearch={true}
                headingText="Booking For"
            />







            {/* Community Selection */}
            <FormControl className="flex flex-col gap-2">
                <FormLabel required className="formLabels">Choose Community</FormLabel>
                <Button
                    onClick={() => setPopupOpen(true)}
                    variant="outlined"
                    sx={{ textTransform: "none", justifyContent: "flex-start" }}
                >
                    {selectedCommunities?.length > 0
                        ? `${selectedCommunities.length} Selected`
                        : "Choose Community"}
                    <span className="ml-auto"><LuBuilding /></span>
                </Button>
                {errors.community && (
                    <FormHelperText error>{errors.community.message}</FormHelperText>
                )}
            </FormControl>

            <SimpleSelectorPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                options={communityOptions}
                initialSelection={selectedCommunities}
                onSave={handleCommunitySave}
                headingText="Select Communities"
            />

            {/* Access Level */}
            <Controller
                name="accessibleTo"
                control={control}
                render={({ field }) => (
                    <FormControl className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">Accessible To</FormLabel>
                        <Autocomplete
                            options={accessibleOptions}
                            value={field.value}
                            onChange={(_, v) => field.onChange(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Choose access level"
                                    error={!!errors.accessibleTo}
                                    helperText={errors.accessibleTo?.message}
                                />
                            )}
                        />
                    </FormControl>
                )}
            />

            {/* Intercom */}
            <Controller
                name="intercom"
                control={control}
                render={({ field }) => (
                    <Box className="flex flex-col gap-2">
                        <FormLabel className="formLabels">Intercom Number</FormLabel>
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
                            placeholder="Enter intercom number" />
                    </Box>
                )}
            />

            {/* Instructions */}
            <Controller
                name="instructions"
                control={control}
                render={({ field }) => (
                    <Box className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">Instructions</FormLabel>
                        <MyEditor value={field.value} setValue={field.onChange} />
                        <div className="text-right text-xs text-[#ADADAD]">
                            {stripHtml(field.value)?.length || 0} / 3000
                        </div>
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
