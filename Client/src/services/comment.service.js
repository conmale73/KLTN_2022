import { axiosClient } from "~/api";

export const commentService = {   
    // comment
    getListCommentByPostId(id,page,limit) {
        return axiosClient.get(`/api/comment/post/${id}?page=${page}&limit=${limit}`);
    },

    createCommentByPostId(data) {
        return axiosClient.post(`/api/comment`, data);
    },

    getCountCommentByPostId(id) {
        return axiosClient.get(`/api/comment/count-comment-post/${id}`);
    },

    putCommentById(data) {
        return axiosClient.put(`/api/comment`, data);
    },

    deleteCommentById(data) {
        return axiosClient.delete(`/api/comment`, { data });
    },
};
