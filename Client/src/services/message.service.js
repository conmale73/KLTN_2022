import { axiosClient } from "~/api";

export const messageService = {
    getMessagesByChatID(chat_id, page, limit) {
        return axiosClient.get(
            `/api/messages/chat/${chat_id}?page=${page}&limit=${limit}`
        );
    },
    createMessage(chat_id, sender_id, content) {
        return axiosClient.post("/api/messages/", {
            chat_id,
            sender_id,
            content,
        });
    },
};
