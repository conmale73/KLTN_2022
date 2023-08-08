import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./song/songsSlice";
import listSongsSlice from "./listSong/listSongSlice";
//khoi tao store
export const store = configureStore({
    reducer: {
        songs: songsSlice,
        listSongs: listSongsSlice,
    },
});
