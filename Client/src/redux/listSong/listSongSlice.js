import { createSlice } from "@reduxjs/toolkit";
import { useSongContext } from "../../context/SongContext";

let items =
    localStorage.getItem("listSong") !== null
        ? JSON.parse(localStorage.getItem("listSong"))
        : [];

items = items.filter(function (item) {
    return item !== undefined && item !== null && item !== "" && item !== " ";
});

const initialState = {
    list: items,
    currentSong: items[0],
};

const listSongsSlice = createSlice({
    name: "listSong",
    initialState,
    reducers: {
        addSong(state, action) {
            const newSong = action.payload;
            const duplicate = state.list.filter(
                (e) => e.videoId === newSong.videoId
            );

            if (duplicate.length > 0) {
                state.list = state.list.filter(
                    (e) => e.videoId !== newSong.videoId
                );
                state.list = [
                    ...state.list,
                    {
                        videoId: duplicate[0].videoId,
                        title: newSong.title,
                        artists: newSong.artists,
                        thumbnails: newSong.thumbnails,
                        url: newSong.url,
                        category: newSong.category,
                    },
                ];
                localStorage.setItem("listSong", JSON.stringify(state.list));
            } else {
                state.list = [
                    ...state.list,
                    {
                        ...action.payload,
                    },
                ];
                localStorage.setItem("listSong", JSON.stringify(state.list));
            }
        },
        changeCurrentSong(state, action) {
            const song = action.payload;
            state.currentSong = song;
        },
        removeSong(state, action) {
            const songID = action.payload;
            state.list = state.list.filter((song) => song.videoId !== songID);
            localStorage.setItem("listSong", JSON.stringify(state.list));
        },
    },
});
export const { addSong, removeSong, changeCurrentSong } =
    listSongsSlice.actions;

export default listSongsSlice.reducer;
