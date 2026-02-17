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

import {
  basePath,
  chargeFacilityCategoryOptions,
  chargeTypeGroupOptions,
  communityOptions,
  stripHtml,
} from "../../utils/index.jsx";
import { LuBuilding, LuChevronDown } from "react-icons/lu";
import crossIcon from "../../../public/icons/crossIcon.svg";
import { facilityBasicDetailsSchema } from "../../validation/facilitySchema.js";
import { useDispatch, useSelector } from "react-redux";
import { setMultipleFacilityFormFields } from "../../redux/slice/facilityCreateSlice.js";
import SimpleSelectorPopup from "../../components/ui/simpleSelectorPopup.jsx";
import SearchableDropdownField from "../../components/ui/SearchableDropdown.jsx";
import CancellationRules from "../../components/ui/CancellationRules.jsx";
import { ButtonType } from "../../components/ui/Button/ButtonType.jsx";
import { SetRatefacilityBasicDetailsSchema } from "../../validation/facilityRateSchemaStep1.js";

export default function SetFacilityRate() {
  const dispatch = useDispatch();
  const facilityFormData = useSelector((state) => state.facility);

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
    resolver: yupResolver(SetRatefacilityBasicDetailsSchema),
    mode: "onChange",
  });

  // Watch fields
  const facilityName = watch("facilityName");
  const instructions = watch("instructions");
  const selectedCommunities = watch("community");
  const selectedCategory = watch("category");
  const cancellationRules = watch("cancellationRules");

  const chargeTypeOptionsFormatted = chargeTypeGroupOptions.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const chargeFacilityCategory = chargeFacilityCategoryOptions.map((item) => ({
    label: item.name,
    value: item.id,
  }));

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
    goToStep(1); // Navigate to next step (step 1)
  };

  const handleCategorySave = (val) => {
    setValue("category", val);
    trigger("category");
    setFacilityPopupOpen(false);
  };

  return (
    <FormWrapper className="flex flex-col gap-8 overflow-auto! border-0!">
      {/* Charge Type Group */}
      <Controller
        name="chargeTypeGroup"
        control={control}
        render={({ field }) => (
          <SearchableDropdownField
            label="Charge Type Group"
            required
            options={chargeTypeOptionsFormatted}
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              trigger("chargeTypeGroup");
            }}
            error={errors.chargeTypeGroup}
            helperText={errors.chargeTypeGroup?.message}
            placeholder="Select charge type "
          />
        )}
      />

      {/* Charge Facility Category  */}
      <Controller
        name="chargeFacilityCategory"
        control={control}
        render={({ field }) => (
          <SearchableDropdownField
            label="Charge Facility Category"
            required
            options={chargeFacilityCategoryOptions.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              trigger("chargeFacilityCategory");
            }}
            error={errors.chargeFacilityCategory}
            helperText={errors.chargeFacilityCategory?.message}
            placeholder="Select category"
          />
        )}
      />

      {/* Due Date Policy */}
      <Controller
        name="dueDatePolicy"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel required className="formLabels">Due Date Policy</FormLabel>
            <TextField
              {...field}
              slotProps={{
                htmlInput: {
                  maxLength: 15,
                },
              }}
              onChange={(e) => {
                let value = e.target.value;

                value = value.replace(/^\s+/, "");

                value = value.replace(/\s{2,}/g, " ");

                field.onChange(value);
              }}
              placeholder="No. of days"
            />
            {errors.dueDatePolicy && (
              <FormHelperText error>
                {errors.dueDatePolicy.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />

      {/* Cancellation Rules */}
      <Controller
        name="cancellationRules"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel required className="formLabels">
              Cancellation Rule
            </FormLabel>
            <FormHelperText color="gray.500" mb={2}>
              If no cancellation rules are defined, or if the cancellation time
              does not match any defined rule, then the cancellation fee will be
              applied as 0%.
            </FormHelperText>

            <CancellationRules 
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                trigger("cancellationRules");
              }}
            />

            {errors.cancellationRules && (
              <FormHelperText error>
                {errors.cancellationRules.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />

      {/* Buttons */}
      <div className="flex  gap-3 ">
        <div className="flex justify-start w-fit ">
          <ButtonType
            type="button"
            variant="outline"
            onClick={() => setCancelDialog(true)}
          >
            Cancel
          </ButtonType>
        </div>

        <div className="flex flex-row w-full justify-end gap-3">
          <ButtonType
            type="button"
            variant="outline"
            onClick={() => navigate(`${basePath}/create-facility/booking-rules`)}
          >
            Back
          </ButtonType>

          <ButtonType
            type="submit"
            variant="outline"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            className="cursor-pointer:none"
          >
            Save & Preview
          </ButtonType>
        </div>
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
        icon={
          <span className="py-2">
            <img src={crossIcon} className="w-28" />
          </span>
        }
      />
    </FormWrapper>
  );
}