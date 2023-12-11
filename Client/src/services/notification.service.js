import { axiosClient } from "~/api";

export const notificationService = {   
    
    async getListNotificationByUserId(id,page,limit) {
        return await axiosClient.get(`/api/notifications/${id}?page=${page}&limit=${limit}`);
    },

};
