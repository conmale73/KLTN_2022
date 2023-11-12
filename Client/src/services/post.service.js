import { axiosClient } from "~/api";

export const postService = {
    getPostByUserId(id, page, limit) {
        return axiosClient.get(`/api/posts/${id}?page=${page}&limit=${limit}`);
    },
    getPublicPostByUserId(id, page, limit) {
        return axiosClient.get(
            `/api/posts/public/${id}?page=${page}&limit=${limit}`
        );
    },
    createNewPost(data) {
        return axiosClient.post(`/api/posts/`, data);
    },
};
