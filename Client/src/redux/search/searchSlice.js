import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    input: JSON.parse(localStorage.getItem("searchInput")) || "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setInput(state, action) {
            const input = action.payload;
            state.input = input;
        },
    },
});
export const { setInput } = searchSlice.actions;

export default searchSlice.reducer;
