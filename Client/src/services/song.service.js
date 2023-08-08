import { axiosClient } from "~/api";

export const songService = {
    getSongs() {
        return axiosClient.get("/api/songs");
    },
    getSong(id) {
        return axiosClient.get(`/api/songs/${id}`);
    },
    querySong(query) {
        return axiosClient.get(
            `/api/youtube-search/?maxResults=1&query=${query}`
        );
    },
};
