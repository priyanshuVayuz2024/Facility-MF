import * as Yup from "yup";


export const bookingDetailsSchema = Yup.object().shape({
    type: Yup.string()
        .required("Facility name is required"),
    block: Yup.object()
        .nullable()
        .required("Facility category is required"),
    flat: Yup.object()
        .nullable()
        .required("Facility category is required"),
    bookingFor: Yup.object()
        .nullable()
        .required("Facility category is required"),
    purpose: Yup.string()
        .required("Facility name is required").max(100, "Maximum 100 characters allowed"),

});
