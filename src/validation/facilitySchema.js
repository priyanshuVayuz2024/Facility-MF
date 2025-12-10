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

    accessibleTo: Yup.object()
        .nullable()
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
