import { axiosClient } from "~/api";

export const postService = {
    getPostById(id) {
        return axiosClient.get(`/api/posts/${id}`);
    },
    getPostByUserId(id, page, limit) {
        return axiosClient.get(`/api/posts/${id}?page=${page}&limit=${limit}`);
    },
    getPublicPostByUserId(id, page, limit) {
        return axiosClient.get(
            `/api/posts/public/${id}?page=${page}&limit=${limit}`
        );
    },
    getNewsFeed(id, page, limit) {
        return axiosClient.get(
            `/api/posts/newsfeed/${id}?page=${page}&limit=${limit}`
        );
    },
    createNewPost(data) {
        return axiosClient.post(`/api/posts/`, data);
    },
    likePost(post_id, user_id) {
        return axiosClient.post(`/api/posts/like/${post_id}`, { user_id });
    },
    unlikePost(post_id, user_id) {
        return axiosClient.patch(`/api/posts/unlike/${post_id}`, { user_id });
    },
    updatePost(data) {
        return axiosClient.put(`/api/posts/`, data);
    },
    deletePost(id) {
        return axiosClient.delete(`/api/posts/${id}`);
    },
};
