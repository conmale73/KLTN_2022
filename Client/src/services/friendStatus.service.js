import { axiosClient } from "~/api";

export const friendStatusService = {

    async getChechfriendStatus(id) {
        return await axiosClient.get(`/api/friendStatus/${id}`);
    },

    async cancelFriendWhenWaiting(data) {
        return await axiosClient.post(`/api/friendStatus/cancel-when-waiting`, data);
    },

    async cancelFriendWhenFriend(data) {
        return await axiosClient.post(`/api/friendStatus/cancel-when-friend`, data);
    },

};
