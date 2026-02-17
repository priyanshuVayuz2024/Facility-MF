import { useNavigate, useOutletContext } from "react-router-dom";
import { Check } from "lucide-react";
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
import { HiCurrencyRupee } from "react-icons/hi";
import { FormWrapper } from "../../components/ui/wrapper/form";
import { MyEditor } from "../../components/MyEditor.jsx";
import ConfirmDialog from "../../components/ui/ConfirmDialog.jsx";

import {
  basePath,
  chargeFacilityCategoryOptions,
  chargeTypeGroupOptions,
  chargeTypeOptions,
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
import DatePicker from "../../components/ui/DatePicker.jsx";
import { SelectorDropdown } from "../../components/ui/SelectorDropdown.jsx";

export default function RateCardSetup() {
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

  const chargeTypeOptionsFormatted = chargeTypeOptions.map((item) => ({
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
      <Controller
        name="applicableDate"
        control={control}
        rules={{ required: "Applicable Date required" }}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel required>Applicable From</FormLabel>

            <DatePicker
              value={field.value || null}
              onChange={(date) => field.onChange(date)}
              onBlur={field.onBlur}
              inputRef={field.ref}
              minDate={new Date()}
              error={!!errors.applicableDate}
            />

            {errors.applicableDate && (
              <FormHelperText error>
                {errors.applicableDate.message}
              </FormHelperText>
            )}
          </Box>
        )}
      />

      {/* Charge Type  */}
      <Controller
        name="chargeType"
        control={control}
        render={({ field }) => (
          <Box className="flex flex-col gap-2">
            <FormLabel required>Charge Type</FormLabel>

            <SelectorDropdown
              value={field.value}
              onChange={field.onChange}
              placeholder={"Add charge type"}
              options={chargeTypeOptionsFormatted}
            />
          </Box>
        )}
      />

      <Controller
        name="rateFor"
        control={control}
        rules={{ required: "Please select rate option" }}
        render={({ field }) => (
          <Box className="flex flex-col gap-4">
            <FormLabel required>Rate For</FormLabel>

            <div className="space-y-3">
              {[
                {
                  id: "all",
                  label: "Same For All",
                  description:
                    "This facility is accessible by owner, guest of owner, tenants, guest of tenants, third-party vendors and trainer.",
                },
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    // Toggle: if already selected, clear it; otherwise select it
                    if (field.value === option.id) {
                      field.onChange(null);
                    } else {
                      field.onChange(option.id);
                    }
                  }}
                  className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {/* Custom Checkbox */}
                  <div
                    className={`flex-shrink-0 w-5 h-5 border-2 rounded flex items-center justify-center transition-all mt-0.5 ${
                      field.value === option.id
                        ? "bg-[#663a7e] border-[#663a7e]"
                        : "border-gray-300 hover:border-[#663a7e]"
                    }`}
                  >
                    {field.value === option.id && (
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-900 cursor-pointer block">
                      {option.label}
                    </label>
                    <p className="text-xs text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {errors.rateFor && (
              <FormHelperText error>{errors.rateFor.message}</FormHelperText>
            )}
          </Box>
        )}
      />

<Controller
  name="rate"
  control={control}
  render={({ field }) => (
    <Box className="flex flex-col gap-2">
      <FormLabel required className="formLabels">
        Rate
      </FormLabel>

      <Box className="relative">
        <TextField
          {...field}
          placeholder="00.00"
          inputMode="decimal"
          slotProps={{
            htmlInput: {
              maxLength: 10,
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              paddingLeft: "12px",
            },
            "& .MuiInputBase-input": {
              paddingLeft: "2.5rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <div className="flex items-center justify-center w-10 h-10 text-gray-500">
                <HiCurrencyRupee className="w-5 h-5" />
              </div>
            ),
          }}
          onKeyDown={(e) => {
            const allowedKeys = [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "Tab",
            ];

            if (allowedKeys.includes(e.key)) return;

            // allow numbers
            if (/^[0-9]$/.test(e.key)) return;

            // allow one decimal
            if (e.key === "." && !field.value?.includes(".")) return;

            // block everything else
            e.preventDefault();
          }}
          /* -------- Handle typing & paste -------- */
          onChange={(e) => {
            let value = e.target.value;

            // remove non-numeric except dot
            value = value.replace(/[^0-9.]/g, "");

            // allow only one dot
            const parts = value.split(".");
            if (parts.length > 2) {
              value = parts[0] + "." + parts[1];
            }

            field.onChange(value);
          }}
        />
      </Box>

      {errors.rate && (
        <FormHelperText error>{errors.rate.message}</FormHelperText>
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
            onClick={() =>
              navigate(`${basePath}/set-facility-rate/basic-details`)
            }
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
            Save
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
