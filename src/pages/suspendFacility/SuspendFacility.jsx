import React from "react";
import { MetaTitle } from "../../components/metaTitle";
import { BreadCrumbCustom } from "../../components/ui/breadCrumb";
import { basePath } from "../../utils";
import { Box, CircleAlert } from "lucide-react";
import { Card, FormLabel, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormWrapper } from "../../components/ui/wrapper/form";

const SuspendFacility = () => {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(),
    mode: "onChange",
  });

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
          // bookingBreadcrumbLinks[from] && bookingBreadcrumbLinks[from],
        ]}
        backDisable={false}
      />
      <Card
        elevation={0}
        className="flex flex-col gap-6 p-6 bg-white border border-[#EBEBEB] rounded-lg"
      >
        <div className="flex items-start gap-3 bg-[#FFF7E6] border border-[#F5E6B3] rounded-xl p-4 w-full">
          <CircleAlert size={22} className="text-[#E6A700]" />

          <div>
            <p className="font-semibold text-gray-800">
              Active Bookings Detected
            </p>
            <p className="text-sm text-gray-600">
              This facility has 3 active bookings. Please choose how to proceed.
            </p>
          </div>
        </div>
        <FormWrapper className="flex flex-col gap-8 p-0! border-0! bg-transparent! shadow-none!">
          <Controller
            name="facilityName"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2 relative">
                <FormLabel required className="formLabels">
                  Name Of Facility
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
        </FormWrapper>
      </Card>
    </>
  );
};

export default SuspendFacility;
