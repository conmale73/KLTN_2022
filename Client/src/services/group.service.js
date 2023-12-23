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
    getGroupSearchRecommendation(group_name) {
        return axiosClient.get(
            `/api/groups/searchRecommendation/${group_name}`
        );
    },
    searchGroupsByName(group_name) {
        return axiosClient.get(`/api/groups/search/${group_name}`);
    },
    searchMembersOfGroupByName(group_id, username) {
        return axiosClient.get(
            `/api/groups/${group_id}/search-members/${username}`
        );
    },
    inviteFriendToGroup(group_id, data) {
        return axiosClient.put(`/api/groups/invite-user/${group_id}/`, data);
    },
    acceptInvitationToGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/accept-invitation/${group_id}/`,
            data
        );
    },
    declineInvitationToGroup(group_id, data) {
        return axiosClient.put(
            `/api/groups/decline-invitation/${group_id}/`,
            data
        );
    },
    joinGroup(group_id, data) {
        return axiosClient.put(`/api/groups/join/${group_id}/`, data);
    },
    leaveGroup(group_id, data) {
        return axiosClient.patch(`/api/groups/leave/${group_id}/`, data);
    },
    getGroupByCreatorId(id) {
        return axiosClient.get(`/api/groups/?creator_id=${id}`);
    },
};
