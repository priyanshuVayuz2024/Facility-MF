import { createSlice } from '@reduxjs/toolkit';

const randomSlice = createSlice({
    name: 'random',
    initialState: {
        value: 12,
        name: 'hello'
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { increment, decrement, setValue } = randomSlice.actions;
export default randomSlice.reducer;
