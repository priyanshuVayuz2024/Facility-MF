import { useNavigate, useOutletContext } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
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

import {
  basePath,
  categoryOptions,
  communityOptions,
  stripHtml,
} from "../../utils/index.jsx";
import { LuBuilding } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityBasicDetailsSchema } from "../../validation/facilitySchema.js";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleFacilityFormFields } from "../../redux/slice/facilityCreateSlice.js";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup.jsx";
import { DropdownSelect } from "../../components/ui/DropdownSelect.jsx";
import ActionButtons from "../../components/ui/Button/ActionButtons.jsx";
import FilterPopup from "../../components/ui/filterPopup/FilterPopup.jsx";
export default function BasicDetails() {
  const dispatch = useDispatch();
  const facilityFormData = useSelector((state) => state.facility);

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    left: {},
    right: {},
  });

  const filterConfig = {
    layout: {
      singlePanel: true,
    },

    left: {
      heading: "Filter By",
      search: true,
      selectionType: "checkbox",  // if want multiselect, change to "checkbox" 
    },

    right: {
      heading: "Options",
    },

    parents: [
      {
        id: "communities",
        label: "Communities",

        right: {
          heading: "Select Communities",
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
          search: true,
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

  const navigate = useNavigate();
  const { setCompleted, goToStep } = useOutletContext();
  const stepIndex = 0;

  const [popupOpen, setPopupOpen] = useState(false);
  const [accessiblePopupOpen, setAccessiblePopupOpen] = useState(false);
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
  const accessibleTo = watch("accessibleTo");
  const selectedCommunities = watch("community");

  // Fake dropdown options

  const accessibleOptions = [
    { id: 1, name: "Members Only" },
    { id: 2, name: "Guests Allowed" },
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
    goToStep(stepIndex + 1);
  };

  return (
    <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">
      {/* Community Selection */}
      <DropdownSelect
        label="Choose Community"
        valueCount={0}
        placeholder="Choose Community"
        // onClick={() => setPopupOpen(true)}
        onClick={() => setOpen(true)}
        icon={<LuBuilding />}
      />

      {/* <SimpleSelectorPopup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                options={communityOptions}
                initialSelection={selectedCommunities}
                onSave={handleCommunitySave}
                headingText="Select Communities"
            /> */}

      <FilterPopup
        open={open}
        onClose={() => setOpen(false)}
        config={filterConfig}
        value={filters}
        onChange={setFilters}
      />

      {/* Facility Name */}
      <Controller
        name="facilityName"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2 relative">
            <FormLabel required className="formLabels">
              Name Of Facility
            </FormLabel>
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
                  .replace(/^\s+/, "") // remove leading space(s)
                  .replace(/\s{2,}/g, " "); // convert multiple spaces to one

                field.onChange(value);
              }}
              onBlur={(e) => {
                // On blur → remove trailing spaces if left at the end
                let value = e.target.value.trim();
                field.onChange(value);
              }}
            />
            <span
              className={`absolute right-2 top-9 text-[14px] px-4 py-1 bg-[#FAFAFA] ${
                field.value?.length >= 100 ? "text-[#AB0000]" : "text-[#ADADAD]"
              }`}
            >
              {field.value?.length || 0} / 100
            </span>
          </Box>
        )}
      />

      {/* Category */}

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl className="flex flex-col gap-2">
            <FormLabel required className="formLabels">
              Facility Category
            </FormLabel>
            <Autocomplete
              options={categoryOptions}
              value={field.value}
              onChange={(_, v) => field.onChange(v)}
              getOptionLabel={(option) => option?.name || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose Category"
                  error={!!errors.facilityCategory}
                  helperText={errors.facilityCategory?.message}
                />
              )}
            />
          </FormControl>
        )}
      />

      {/* Accessible To - Now Popup */}
      <DropdownSelect
        label="Accessible To"
        valueCount={accessibleTo?.length || 0}
        placeholder="Choose access level"
        onClick={() => setAccessiblePopupOpen(true)}
      />

      <SimpleSelectorPopup
        open={accessiblePopupOpen}
        onClose={() => setAccessiblePopupOpen(false)}
        options={accessibleOptions}
        initialSelection={accessibleTo || []}
        onSave={(value) => {
          setValue("accessibleTo", value);
          setAccessiblePopupOpen(false);
        }}
        showSelectAll={false}
        hideSearch={true}
        headingText="Accessible To"
      />

      {/* Intercom */}
      <Controller
        name="intercom"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel className="formLabels">Intercom Number</FormLabel>
            <TextField
              {...field}
              slotProps={{
                htmlInput: {
                  maxLength: 15,
                },
              }}
              onChange={(e) => {
                let value = e.target.value;

                // Block spaces completely
                value = value.replace(/\s+/g, "");

                // Allow only numbers and - + /
                value = value.replace(/[^0-9+\-/]/g, "");

                field.onChange(value);
              }}
              placeholder="Enter intercom number"
            />
          </Box>
        )}
      />

      {/* Instructions */}
      <Controller
        name="instructions"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel required className="formLabels">
              Instructions
            </FormLabel>
            <MyEditor
              value={field.value}
              setValue={field.onChange}
              className=" [&_.ql-container]:h-auto!
    [&_.ql-container]:min-h-0!
    [&_.ql-editor]:h-auto!
    [&_.ql-editor]:overflow-visible!

    [&_.ql-editor]:min-h-40!"
              placeholder="Enter instructions here"
            />
            <div className="text-right text-xs text-[#ADADAD]">
              {stripHtml(field.value)?.length || 0} / 3000
            </div>
          </Box>
        )}
      />

      {/* Buttons */}
      <ActionButtons
        cancelText="Cancel"
        nextText="Next"
        onCancel={() => setCancelDialog(true)}
        onNext={handleSubmit(onSubmit)}
        // nextProps={{ disabled: !isValid }}
      />

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
        icon={
          <span className="py-2">
            <img src={crossIcon} className="w-28" />
          </span>
        }
      />
    </FormWrapper>
  );
}
