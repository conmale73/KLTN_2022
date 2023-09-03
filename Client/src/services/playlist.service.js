import { axiosClient } from "~/api";

export const playlistService = {
    getYoutubePlaylist(id) {
        return axiosClient.get(`/playlists/?id=${id}`);
    },
};
