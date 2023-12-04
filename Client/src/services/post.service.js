import { axiosClient } from "~/api";

export const postService = {
    getPostByUserId(id, page, limit) {
        return axiosClient.get(`/api/posts/${id}?page=${page}&limit=${limit}`);
    },
    async getPublicPostByUserId(id, page, limit) {
        return await axiosClient.get(
            `/api/posts/public/${id}?page=${page}&limit=${limit}`
        );
    },
    createNewPost(data) {
        return axiosClient.post(`/api/posts/`, data);
    },

    getPostByPostId(id) {
        return axiosClient.get(`/api/posts/detail/${id}`);
    },

    postLikeAndUnlike(data) {
        return axiosClient.post(`/api/posts/like`, data);
    },

    putPostById(data) {
        return axiosClient.put(`/api/posts`, data);
    },

    deletePostById(data) {
        return axiosClient.delete(`/api/posts`, { data });
    },
};
