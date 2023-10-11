import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./song/songsSlice";
import listSongsSlice from "./listSong/listSongSlice";
import searchSlice from "./search/searchSlice";
import userSlice from "./user/userSlice";
//khoi tao store
export const store = configureStore({
    reducer: {
        songs: songsSlice,
        listSongs: listSongsSlice,
        search: searchSlice,
        user: userSlice,
    },
});
