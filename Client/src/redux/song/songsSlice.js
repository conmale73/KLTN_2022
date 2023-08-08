import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: "songs",
    initialState: {
        allSongs: {
            data: [],
        },
        oneSong: {
            data: {},
        },
    },
    reducers: {
        getAllSongs(state, action) {
            state.allSongs.data = action.payload;
        },
        getOneSong(state, action) {
            state.oneSong.data = action.payload;
        },
    },
});
export const { getAllSongs, getOneSong } = songsSlice.actions;

export default songsSlice.reducer;
