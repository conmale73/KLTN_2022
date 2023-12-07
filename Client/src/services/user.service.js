import { axiosClient } from "~/api";

export const userService = {
    getAllUsers() {
        return axiosClient.get("/api/users/");
    },
    getUserById(id) {
        return axiosClient.get(`/api/users/${id}`);
    },
    getUserByEmail(email) {
        return axiosClient.get(`/api/users/email/${email}`);
    },
    searchUserByUsername(username, page, limit) {
        return axiosClient.get(
            `/api/users/search/${username}?page=${page}&limit=${limit}`
        );
    },
};
