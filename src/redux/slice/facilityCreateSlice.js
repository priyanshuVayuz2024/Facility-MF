import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Step-1
    facilityName: "",
    category: null,
    community: [],
    accessibleTo: null,
    intercom: "",
    instructions: "",

    // Step-2
    blockedDays: [],
    operatingHours: false,
    opensAt: "",
    closesAt: "",
    fixedSlot: false,
    slots: [],

    // Step-3
    adminApproval: false,
    chargeable: false,
    chargeTypeGroup: null,
    chargeCategory: null,
    dueDatePolicy: "",
    bookingQuota: "",
    maxBookingPerSlot: "",
    bookingTimeLimit: "",
    advanceBookingLimit: "",
};

const facilityFormSlice = createSlice({
    name: "facilityForm",
    initialState,
    reducers: {
        setFacilityFormField: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        setMultipleFacilityFormFields: (state, action) => {
            Object.entries(action.payload).forEach(([key, value]) => {
                state[key] = value;
            });
        },
        resetFacilityForm: () => initialState,
    }
});

export const {
    setFacilityFormField,
    setMultipleFacilityFormFields,
    resetFacilityForm
} = facilityFormSlice.actions;

export default facilityFormSlice.reducer;