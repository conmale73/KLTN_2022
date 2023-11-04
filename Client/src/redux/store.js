import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./song/songsSlice";
import listSongsSlice from "./listSong/listSongSlice";
import searchSlice from "./search/searchSlice";
import userSlice from "./user/userSlice";
import modeSlice from "./mode/modeSlice";
import imageStoreSlice from "./imageStore/imageStoreSlice";
import editingImage from "./editingImage/editingImageSlice";
//khoi tao store
export const store = configureStore({
    reducer: {
        songs: songsSlice,
        listSongs: listSongsSlice,
        search: searchSlice,
        user: userSlice,
        mode: modeSlice,
        image: imageStoreSlice,
        editingImage: editingImage,
    },
});
