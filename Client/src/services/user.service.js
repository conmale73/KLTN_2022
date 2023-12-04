import { axiosClient } from "~/api";

export const userService = {
    getAllUsers() {
        return axiosClient.get("/api/users/");
    },
    async getUserById(id) {
        return await axiosClient.get(`/api/users/${id}`);
    },
    getUserByEmail(email) {
        return axiosClient.get(`/api/users/email/${email}`);
    },
    updateAvatar(data){
        return axiosClient.post(`/api/users/updateAvatar`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
    },
    updateCoverImage(data){
        return axiosClient.post(`/api/users/cover-image`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
    },
};
