import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Box,
    Button,
    FormHelperText,
    FormLabel,
    ButtonBase,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormWrapper } from "../../components/ui/wrapper/form";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";

import { basePath, bookingForOptions, facilityOptions } from "../../utils/index.jsx";
import { LuBuilding, LuUsers } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";

import { useDispatch, useSelector } from "react-redux";
import { bookingDetailsSchema } from "../../validation/bookingSchema.js";
import { setMultipleBookingFields } from "../../redux/slice/bookingCreateSlice.js";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup.jsx";
import { MyEditor } from "../../components/MyEditor.jsx";
import FilterPopup from "../../components/ui/filterPopup/FilterPopup.jsx";
import { SelectBox } from "../../components/ui/SelectBox.jsx";
import { DropdownSelect } from "../../components/ui/DropdownSelect.jsx";
import ActionButtons from "../../components/ui/Button/ActionButtons.jsx";
export default function BookingDetail() {
    const dispatch = useDispatch();
    const bookingFormData = useSelector(state => state.booking);

    const navigate = useNavigate();
    const { setCompleted, goToStep } = useOutletContext();
    const stepIndex = 0;

    const [cancelDialog, setCancelDialog] = useState(false);
    const [bookingPopupOpen, setBookingPopupOpen] = useState(false);
    const [facilityPopupOpen, setFacilityPopupOpen] = useState(false);

    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({
        left: {},
        right: {},
    });

    const filterConfig = {
        layout: {
            singlePanel: false, // 👈 auto or forced
        },

        left: {
            heading: "Filter By",
            search: true,
            selectionType: "radio",
        },

        right: {
            heading: "Options", // 👈 default heading
        },

        parents: [
            {
                id: "communities",
                label: "Communities",

                right: {
                    heading: "Select Communities", // 👈 override
                    search: true,
                    selectionType: "checkbox",
                },

                children: [
                    { id: "greenview", label: "Greenview Heights" },
                    { id: "lakewood", label: "Lakewood Residency" },
                ],
            },
            {
                id: "communities",
                label: "Communities",

                right: {
                    heading: "Select Communities", // 👈 override
                    search: true,
                    selectionType: "checkbox",
                },

                children: [
                    { id: "greenview", label: "Greenview Heights" },
                    { id: "lakewood", label: "Lakewood Residency" },
                ],
            },

            {
                id: "status",
                label: "Status",
                right: {
                    selectionType: "checkbox",
                },
                children: [
                    { id: "greenview", label: "Greenview Heights" },
                    { id: "lakewood", label: "Lakewood Residency" },
                    { id: "lakewood", label: "Lakewood Residency" },
                    { id: "lakewood", label: "Lakewood Residency" },
                ],
                // 👇 no children → single panel case
            },
        ],
    };

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
    const selectedFacility = watch("facility");
    const selectedType = watch("type");

    const bookingTypes = [
        {
            value: "personal",
            label: "Personal",
            description: "For personal use",
            icon: <LuUsers />,
        },
        {
            value: "community",
            label: "Community",
            description: "For Community use",
            icon: <LuBuilding />,
        },
    ];

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

    useEffect(() => {
        if (selectedType !== "personal") {
            setValue("unit", null);
        }
    }, [selectedType]);

    const onSubmit = (data) => {
        dispatch(setMultipleBookingFields(data));
        goToStep(stepIndex + 1);
    };

    const handleBookingForSave = (val) => {
        setValue("bookingFor", val);
        trigger("bookingFor");
        setBookingPopupOpen(false);
    };
    const handleFacilityForSave = (val) => {
        setValue("facility", val);
        trigger("facility");
        setFacilityPopupOpen(false);
    };




    return (
        <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">

            {/* -------------------- Booking Type -------------------- */}

            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <Box>
                        <FormLabel required className="block pb-4!">
                            Booking Type
                        </FormLabel>

                        <Box className="flex gap-8">
                            {bookingTypes.map(option => {
                                const isSelected = field.value === option.value;

                                return (
                                    <ButtonBase
                                        key={option.value}
                                        onClick={() => field.onChange(option.value)}
                                        className={`min-h-[92px] flex-1! flex! flex-col! items-start! gap-4! border! rounded-xl! px-4! py-4!
                                            ${isSelected
                                                ? "border-[#A66CFA]! bg-linear-to-b! from-[#884EA726] to-[#EDF8F700]"
                                                : "border-[#E0E0E0]! bg-linear-to-b! from-[#FBFBFB] to-white"
                                            }`}
                                    >
                                        <Box className={`flex items-center gap-2 ${isSelected && "text-[#884EA7]!"}`}>
                                            {option.icon}
                                            <Typography fontWeight={500}>
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

            {/* -------------------- Unit / Community -------------------- */}

            {selectedType === "personal" && (
                <SelectBox
                    label="Choose Unit"
                    placeholder="Choose Unit"
                    value={null}
                    icon={<LuBuilding />}
                    onClick={() => setOpen(true)}
                />
            )}

            {selectedType === "community" && (
                <SelectBox
                    label="Choose Community"
                    placeholder="Choose Community"
                    value={null}
                    icon={<LuBuilding />}
                    onClick={() => setOpen(true)}
                />
            )}


            <FilterPopup
                open={open}
                onClose={() => setOpen(false)}
                config={filterConfig}
                value={filters}
                onChange={setFilters}
            />


            {/* -------------------- Booking For -------------------- */}

            <DropdownSelect
                label="Facility"
                valueCount={selectedFacility?.length || 0}
                placeholder="Choose Facility"
                onClick={() => setFacilityPopupOpen(true)}
            />

            <DropdownSelect
                label="Booking For"
                valueCount={selectedFor?.length || 0}
                placeholder="Choose booking for"
                onClick={() => setBookingPopupOpen(true)}
            />

            <SimpleSelectorPopup
                open={facilityPopupOpen}
                onClose={() => setFacilityPopupOpen(false)}
                options={facilityOptions}
                initialSelection={selectedFacility || []}
                onSave={handleFacilityForSave}
                showSelectAll={false}
                hideSearch={true}
                headingText="Facility"
            />
            <SimpleSelectorPopup
                open={bookingPopupOpen}
                onClose={() => setBookingPopupOpen(false)}
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
                    <Box className="flex flex-col gap-2">
                        <FormLabel required className="formLabels">
                            Purpose
                        </FormLabel>
                        <MyEditor
                            value={field.value}
                            setValue={field.onChange}
                            className="h-40!"
                            placeholder="Enter purpose of booking"
                        />
                    </Box>
                )}
            />

            {/* -------------------- Buttons -------------------- */}
            <ActionButtons
                cancelText="Cancel"
                nextText="Next"
                onCancel={() => setCancelDialog(true)}
                onNext={handleSubmit(onSubmit)}
                cancelProps={{ disabled: false }}
            // nextProps={{ disabled: !isValid }}
            />

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
