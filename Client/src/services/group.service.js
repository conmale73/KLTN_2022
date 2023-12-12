import { axiosClient } from "~/api";

export const groupService = {
    createGroup(data) {
        return axiosClient.post(`/api/groups/`, data);
    },
    getAllPublicGroups() {
        return axiosClient.get(`/api/groups/public/`);
    },
    getGroupsByUserId(user_id, page, limit) {
        return axiosClient.get(
            `/api/groups/user/${user_id}?page=${page}&limit=${limit}`
        );
    },
    getGroupById(group_id, user_id) {
        return axiosClient.get(`/api/groups/${group_id}`, { user_id });
    },
    searchGroupsByName(group_name) {
        return axiosClient.get(`/api/groups/search/${group_name}`);
    },
    // searchGroupsByNameAndUserID(group_name, user_id) {
    //     return axiosClient.get(`/api/groups/search/${group_name}/${user_id}`);
    // },
    joinGroup(group_id, user_id) {
        return axiosClient.put(`/api/groups/join/${group_id}/`, { user_id });
    },
    leaveGroup(group_id, user_id) {
        return axiosClient.patch(`/api/groups/leave/${group_id}/`, { user_id });
    },
    getGroupByCreatorId(id) {
        return axiosClient.get(`/api/groups/?creator_id=${id}`);
    },
};
