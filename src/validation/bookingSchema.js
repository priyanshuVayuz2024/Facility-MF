import * as Yup from "yup";


export const bookingDetailsSchema = Yup.object().shape({
    type: Yup.string()
        .required("Booking type is required"),
    block: Yup
        .mixed()
        .when("type", {
            is: "personal",
            then: (schema) => schema.required("Block is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    flat: Yup
        .mixed()
        .when("type", {
            is: "personal",
            then: (schema) => schema.required("Flat is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
    bookingFor: Yup.array()
        .required("Booking for value is required")
        .min(1, "Please select at least one option"),
    purpose: Yup.string()
        .required("Purpose is required").max(100, "Maximum 100 characters allowed"),

});


// Helper: Convert "HH:MM" → minutes
const toMinutes = (v) => {
    if (!v) return null;
    const [h, m] = v.split(":").map(Number);
    return h * 60 + m;
};

export const bookingScheduleSchema = Yup.object().shape({

    bookingFrequency: Yup
        .array()
        .min(1)
        .required("Booking frequency is required"),

    // ---------------- FROM DATE ----------------
    fromDate: Yup.string()
        .nullable()
        .test("valid-date", "Please select a valid date", (value) => {
            if (!value) return true;
            const d = new Date(value);
            return !isNaN(d.getTime());
        })
        .test("before-toDate", "From date cannot be after end date", function (value) {
            const { toDate } = this.parent;
            if (!value || !toDate) return true;

            return new Date(value) <= new Date(toDate);
        }),

    // ---------------- TO DATE ----------------
    toDate: Yup.string()
        .nullable()
        .test("valid-date", "Please select a valid date", (value) => {
            if (!value) return true;
            const d = new Date(value);
            return !isNaN(d.getTime());
        })
        .test("after-start", "End date cannot be before start date", function (value) {
            const { fromDate } = this.parent;
            if (!value || !fromDate) return true;

            return new Date(value) >= new Date(fromDate);
        }),

    // ---------------- START TIME ----------------
    startTime: Yup.string()
        .nullable()
        .test("valid-start", "Start time must be between 05:00–23:00", (value) => {
            if (!value) return true;
            const mins = toMinutes(value);
            return mins >= 300 && mins <= 1380;
        })
        .test("before-endTime", "Start time cannot be after end time", function (value) {
            const { endTime } = this.parent;
            if (!value || !endTime) return true;
            return toMinutes(value) <= toMinutes(endTime);
        }),

    // ---------------- END TIME ----------------
    endTime: Yup.string()
        .nullable()
        .test("valid-end", "End time must be between 05:00–23:00", (value) => {
            if (!value) return true;
            const mins = toMinutes(value);
            return mins >= 300 && mins <= 1380;
        })
        .test("end-after-start", "End time must be after start time", function (value) {
            const { startTime } = this.parent;
            if (!startTime || !value) return true;
            return toMinutes(value) > toMinutes(startTime);
        }),

    // ---------------- CONSENTS ----------------
    consent1: Yup
        .boolean()
        .oneOf([true], "You must agree to proceed"),

    consent2: Yup
        .boolean()
        .oneOf([true], "You must accept the facility usage instructions"),
});