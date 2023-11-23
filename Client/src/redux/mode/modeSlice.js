import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: JSON.parse(localStorage.getItem("mode")) || "social",
};

const modeSlice = createSlice({
    name: "mode",
    initialState,
    reducers: {
        setMode(state, action) {
            const mode = action.payload;
            state.mode = mode;
            localStorage.setItem("mode", JSON.stringify(mode));
        },
    },
});
export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
