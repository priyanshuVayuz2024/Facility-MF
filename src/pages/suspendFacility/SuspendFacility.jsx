import React from "react";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { basePath, stripHtml } from "../../utils";
import { Box, CircleAlert } from "lucide-react";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormWrapper } from "../../components/ui/wrapper/form";
import { MyEditor } from "../../components/MyEditor";
import * as yup from "yup";

const suspendFacilitySchema = yup.object().shape({
  facilityName: yup
    .string()
    .required("Facility name is required")
    .trim()
    .min(2, "Facility name must be at least 2 characters")
    .max(100, "Facility name must not exceed 100 characters"),
  reason: yup
    .string()
    .required("Reason is required")
    .test("min-length", "", (value) => {
      const stripped = stripHtml(value || "");
      return stripped.length >= 10;
    })
    .test("max-length", "", (value) => {
      const stripped = stripHtml(value || "");
      return stripped.length <= 3000;
    }),
  actionType: yup
    .string()
    .required("Please select an action")
    .oneOf(["timeBased", "immediate"], "Invalid action type"),
});

const SuspendFacility = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(suspendFacilitySchema),
    mode: "onChange",
    defaultValues: {
      facilityName: "",
      reason: "",
      actionType: "timeBased",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);

      // Prepare payload
      const payload = {
        facilityName: data.facilityName.trim(),
        reason: stripHtml(data.reason),
        actionType: data.actionType,
        timestamp: new Date().toISOString(),
      };

      // API call example
      // const response = await api.post('/facilities/suspend', payload);

      // Show success message
      console.log("Facility suspended successfully:", payload);

      // You can add your success notification here
      // toast.success("Facility suspended successfully");

      // Redirect or close modal
      // navigate('/facilities');
    } catch (error) {
      console.error("Error suspending facility:", error);
      // toast.error("Failed to suspend facility");
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log("Cancel clicked");
    // navigate(-1) or close modal
  };

  return (
    <>
      <MetaTitle title="Suspend Facility" />
      <BreadCrumbCustom
        pageTitle={"Suspend Facility"}
        links={[
          {
            label: "Facilities",
            to: `${basePath}/facilities`,
          },
          {
            label: "Listing",
            to: `${basePath}/facilities`,
          },
        ]}
        backDisable={false}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          elevation={0}
          className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-lg"
        >
          {/* Warning Alert */}
          <div className="flex items-start gap-3 bg-[#FFF7E6] border border-[#F5E6B3] rounded-xl p-4 w-full">
            <CircleAlert
              size={22}
              className="text-[#E6A700] flex-shrink-0 mt-0.5"
            />
            <div>
              <p className="font-semibold text-[#1F2937] text-[15px] leading-[22px]">
                Active Bookings Detected
              </p>
              <p className="text-[14px] leading-[20px] text-[#6B7280] mt-0.5">
                This facility has 3 active bookings. Please choose how to
                proceed.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-6">
            {/* Facility Name */}
            <Controller
              name="facilityName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel
                    required
                    className="text-[14px] font-medium text-[#1F2937]"
                  >
                    Facility Name
                  </FormLabel>
                  <TextField
                    {...field}
                    placeholder="Facility Name"
                    error={!!errors.facilityName}
                    helperText={errors.facilityName?.message}
                    onChange={(e) => {
                      let value = e.target.value;
                      value = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");
                      field.onChange(value);
                    }}
                    onBlur={(e) => {
                      let value = e.target.value.trim();
                      field.onChange(value);
                    }}
                  />
                </div>
              )}
            />

            {/* Suspend Facility Reason */}
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FormLabel
                    required
                    className="text-[14px] font-medium text-[#1F2937]"
                  >
                    Suspend Facility Reason
                  </FormLabel>
                  <MyEditor value={field.value} setValue={field.onChange} />
                  {errors.reason && (
                    <p className="text-[12px] text-[#D32F2F] ml-[14px] mt-[3px]">
                      {errors.reason.message}
                    </p>
                  )}
                  <div className="text-right text-[12px] text-[#ADADAD]">
                    {stripHtml(field.value)?.length || 0} / 3000
                  </div>
                </div>
              )}
            />

            {/* Choose Action */}
            <FormLabel
              required
              className="text-[14px] font-medium text-[#1F2937]! "
            >
              Choose Action
            </FormLabel>
            <Controller
              name="actionType"
              control={control}
              render={({ field }) => (
                <Card
                  elevation={0}
                  className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-lg"
                >
                  <FormControl error={!!errors.actionType}>
                    <div className="">
                      <RadioGroup {...field}>
                        {/* Time-based Suspension */}
                        <FormControlLabel
                          value="timeBased"
                          control={
                            <Radio
                              sx={{
                                color: "#D1D5DB",
                                "&.Mui-checked": {
                                  color: "#3B82F6",
                                },
                                padding: "9px",
                              }}
                            />
                          }
                          label={
                            <div className="flex flex-col gap-1 ml-1">
                              <p className="font-medium text-[14px] text-[#1F2937] leading-5">
                                Time-based Suspension
                              </p>
                              <p className="text-[13px] text-[#6B7280] leading-[18px]">
                                Suspension becomes effective after the last
                                active booking ends
                              </p>
                              <p className="text-[13px] text-[#2563EB] font-medium leading-[18px] mt-0.5">
                                Effective from: 03/02/2026, 06:00 PM
                              </p>
                            </div>
                          }
                          className="items-start ml-0 mr-0 mb-3"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              width: "100%",
                            },
                          }}
                        />

                        {/* Divider */}
                        <div className="border-t border-[#E5E7EB] my-3"></div>

                        {/* Immediate Suspension */}
                        <FormControlLabel
                          value="immediate"
                          control={
                            <Radio
                              sx={{
                                color: "#D1D5DB",
                                "&.Mui-checked": {
                                  color: "#3B82F6",
                                },
                                padding: "9px",
                              }}
                            />
                          }
                          label={
                            <div className="flex flex-col gap-1 ml-1">
                              <p className="font-medium text-[14px] text-[#1F2937] leading-[20px]">
                                Immediate Suspension with Compensation
                              </p>
                              <p className="text-[13px] text-[#6B7280] leading-[18px]">
                                Suspend immediately, cancel all bookings, notify
                                members, and issue refunds
                              </p>
                              <p className="text-[13px] text-[#DC2626] font-medium leading-[18px] mt-0.5">
                                4 members will be notified, Total Refund: ₹
                                2,000.00
                              </p>
                            </div>
                          }
                          className="items-start ml-0 mr-0"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              width: "100%",
                            },
                          }}
                        />
                      </RadioGroup>
                    </div>

                    {errors.actionType && (
                      <FormHelperText>
                        {errors.actionType.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Card>
              )}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-2">
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={!isValid}>
              Suspend
            </Button>
          </div>
        </Card>
      </form>
    </>
  );
};

export default SuspendFacility;
