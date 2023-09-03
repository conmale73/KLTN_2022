import { axiosClient } from "~/api";

export const songService = {
    getSongs() {
        return axiosClient.get("/api/songs");
    },
    getSong(id) {
        return axiosClient.get(`/api/songs/${id}`);
    },
    // querySong(query, maxResults) {
    //     return axiosClient.get(
    //         `/api/youtube-search/?maxResults=${maxResults}&query=${query}&part=snippet`
    //     );
    // },
    querySong(query) {
        return axiosClient.get(`/search/?q=${query}&f=songs&r=VN`);
    },
    getYoutubeSongMetadata(id) {
        return axiosClient.get(`/songs/metadata/?videoId=${id}`);
    },
    getSongRelated(id) {
        return axiosClient.get(`/songs/related/?videoId=${id}&r=VN`);
    },
};
