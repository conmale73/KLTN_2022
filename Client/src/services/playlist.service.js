import { axiosYoutube } from "~/api";

export const playlistService = {
    getYoutubePlaylist(id) {
        return axiosYoutube.get(`/playlists/?id=${id}`);
    },
};
