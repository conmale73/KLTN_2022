import { axiosClient } from "~/api";

export const hobbyService = {
    async getAllHobby(user_id) {
        const response = await axiosClient.get(`/api/hobby/${user_id}`);
        return response;
    },
    addHobby(data) {
        return axiosClient.post(`/api/hobby`, data);
    },
    async deleteHobby(id) {
        const response = await axiosClient.delete(`/api/hobby/${id}`);
        return response
    },
};
