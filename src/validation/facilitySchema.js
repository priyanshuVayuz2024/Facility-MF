import * as Yup from "yup";
import { stripHtml } from "../utils";

export const facilityBasicDetailsSchema = Yup.object().shape({
    facilityName: Yup.string()
        .required("Facility name is required")
        .max(100, "Maximum 100 characters allowed")
        .min(2, "Name should be minimum 2 characters"),

    category: Yup.object()
        .nullable()
        .required("Facility category is required"),

    community: Yup.array()
        .min(1, "Select at least one community")
        .required("Community selection required"),

    accessibleTo: Yup.array()
        .min(1, "Select at least one access level")
        .required("Access level required"),

    intercom: Yup.string()
        .nullable()
        .matches(/^[0-9+\-/]*$/, "Only numbers and + - / are allowed")
        .max(15, "Maximum 15 characters allowed"),

    instructions: Yup.string()
        .test("min-content", "Instructions must be at least 10 characters", (val) =>
            stripHtml(val || "").trim().length >= 10
        )
        .required("Instructions are required"),
});

export const facilityTimeSchema = Yup.object().shape({
    blockedDays: Yup.array()
        .min(1, "Select at least one day")
        .required("Required"),

    operatingHours: Yup.boolean(),
    opensAt: Yup.string().nullable().when("operatingHours", {
        is: true,
        then: (schema) => schema.required("Required"),
    }),
    closesAt: Yup.string().nullable().when("operatingHours", {
        is: true,
        then: (schema) =>
            schema.required("Required").test(
                "after-open",
                "Closing time must be later",
                function (value) {
                    const { opensAt } = this.parent;
                    if (!opensAt || !value) return true;
                    return value > opensAt;
                }
            ),
    }),

    fixedSlot: Yup.boolean(),
    slots: Yup.array()
        .of(
            Yup.object().shape({
                start: Yup.string().required("Required"),
                end: Yup.string()
                    .required("Required")
                    .test(
                        "after-start",
                        "End time must be later",
                        function (value) {
                            const { start } = this.parent;
                            return !start || !value || value > start;
                        }
                    ),
            })
        )
        .when("fixedSlot", {
            is: true,
            then: (schema) => schema.min(1, "Add at least 1 slot"),
        }),
});



export const facilityBookingSchema = Yup.object().shape({
    adminApproval: Yup.boolean().required(),
    chargeable: Yup.boolean(),

    chargeTypeGroup: Yup
        .mixed()
        .nullable()
        .when("chargeable", {
            is: true,
            then: (schema) =>
                schema.required("Charge type group is required").nonNullable(),
        }),

    chargeCategory: Yup
        .mixed()
        .nullable()
        .when("chargeable", {
            is: true,
            then: (schema) =>
                schema.required("Charge category is required").nonNullable(),
        }),

    dueDatePolicy: Yup
        .string()
        .nullable()
        .when("chargeable", {
            is: true,
            then: (schema) =>
                schema
                    .matches(/^\d+$/, "Only numeric value allowed")
                    .required("Due date is required"),
        }),

    // Booking settings
    bookingQuota: Yup.number().nullable(),
    maxBookingPerSlot: Yup.number().nullable(),
    bookingTimeLimit: Yup.number().nullable(),
    advanceBookingLimit: Yup.number().nullable(),
});
