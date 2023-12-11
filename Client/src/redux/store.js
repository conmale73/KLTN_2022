import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./song/songsSlice";
import listSongsSlice from "./listSong/listSongSlice";
import searchSlice from "./search/searchSlice";
import userSlice from "./user/userSlice";
import modeSlice from "./mode/modeSlice";
import imageStoreSlice from "./imageStore/imageStoreSlice";
import editingImage from "./editingImage/editingImageSlice";
import onlineUsersSlice from "./onlineUsers/onlineUsersSlice";
import currentVoiceChannelSlice from "./currentVoiceChannel/currentVoiceChannelSlice";
import voiceChannelsSlice from "./voiceChannels/voiceChannelsSlice";
import showFooterSlice from "./showFooter/showFooterSlice";
import currentChatListSlice from "./currentChatList/currentChatListSlice";
import currentNotificationListSlice from "./notificationStore/notificationUserSlice"
//initializing store
export const store = configureStore({
    reducer: {
        // songs: songsSlice,
        currentChatList: currentChatListSlice,
        listSongs: listSongsSlice,
        search: searchSlice,
        user: userSlice,
        mode: modeSlice,
        onlineUsers: onlineUsersSlice,
        editingImage: editingImage,
        voiceChannels: voiceChannelsSlice,
        currentVoiceChannel: currentVoiceChannelSlice,
        showFooter: showFooterSlice,
        notificationSlice: currentNotificationListSlice
    },
});
