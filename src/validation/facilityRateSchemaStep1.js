import * as yup from "yup";

/**
 * Cancellation Rule Object Schema
 */
const cancellationRuleItemSchema = yup.object().shape({
  hoursBefore: yup
    .number()
    .typeError("Hours is required")
    .required("Hours before booking is required")
    .min(0, "Hours cannot be negative")
    .max(720, "Hours cannot exceed 720 (30 days)"),

  deductionPercentage: yup
    .number()
    .typeError("Deduction % is required")
    .required("Deduction percentage is required")
    .min(0, "Cannot be less than 0%")
    .max(100, "Cannot exceed 100%"),
});

/**
 * Main Form Schema
 */
export const SetRatefacilityBasicDetailsSchema = yup.object().shape({
  // Charge Type Group
  chargeTypeGroup: yup
    .number()
    .typeError("Please select charge type group")
    .required("Charge type group is required"),

  // Charge Facility Category
  chargeFacilityCategory: yup
    .number()
    .typeError("Please select facility category")
    .required("Facility category is required"),

  // Due Date Policy
  dueDatePolicy: yup
    .string()
    .required("Due date policy is required")
    .trim()
    .min(3, "Too short")
    .max(15, "Maximum 15 characters allowed"),

  // Cancellation Rules
  cancellationRules: yup
    .array()
    .of(cancellationRuleItemSchema)
    .min(1, "At least one cancellation rule is required")
    .required("Cancellation rule is required"),
});
