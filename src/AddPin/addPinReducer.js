import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pin: {title: "new title", description: "new description", category: "new category", image: "new image"},
};

const addPinSlice = createSlice({
    name: "addPin",
    initialState,
    reducers: {
        setPin: (state, action) => {
            state.pin = action.payload;
        },
    },
});

export const { setPin } = addPinSlice.actions;
export default addPinSlice.reducer;