import { axiosClient } from "~/api";

export const groupChatService = {
    getGroupChatByID(id) {
        return axiosClient.get(`/api/groupChats/id/${id}`);
    },
    getGroupChatsByUserID(id) {
        return axiosClient.get(`/api/groupChats/user/${id}`);
    },
    getGroupChatOfTwoUsers(data) {
        return axiosClient.post(`/api/groupChats/two/`, data);
    },
};
