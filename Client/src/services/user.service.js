import { axiosClient } from "~/api";

export const userService = {
    getUserById(id) {
        return axiosClient.get(`/api/users/${id}`);
    },
    getUserByEmail(email) {
        return axiosClient.get(`/api/users/email/${email}`);
    },
};
