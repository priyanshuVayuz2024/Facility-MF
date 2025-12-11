import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: "",
    block: null,
    flat: null,
    bookingFor: null,
    purpose: "",

    bookingFrequency: null,
    fromDate: "",
    toDate: "",
    startTime: "",
    endTime: "",
    consent1: false,
    consent2: false,
    captcha: "",
};


export const bookingCreateSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setBookingField: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        },

        setMultipleBookingFields: (state, action) => {
            return { ...state, ...action.payload };
        },

        resetBookingForm: () => initialState,
    },
});

export const {
    setBookingField,
    setMultipleBookingFields,
    resetBookingForm
} = bookingCreateSlice.actions;

export default bookingCreateSlice.reducer;
