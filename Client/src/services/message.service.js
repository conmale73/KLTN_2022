import { axiosClient } from "~/api";

export const messageService = {
    getMessagesByChatID(chat_id, page, limit) {
        return axiosClient.get(
            `/api/messages/chat/${chat_id}?page=${page}&limit=${limit}`
        );
    },
    createMessage(chat_id, sender_id, sender_name, content) {
        return axiosClient.post("/api/messages/", {
            chat_id,
            sender_id,
            sender_name,
            content,
        });
    },
    getLastMessage(chat_id) {
        return axiosClient.get(`/api/messages/last/${chat_id}`);
    },
};
