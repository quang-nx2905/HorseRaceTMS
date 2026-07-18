import axiosClient from "./axiosClient";

export const invitationApi = {
    sendInvitation: (data) => {
        return axiosClient.post("/invitations", data);
    },
    cancelInvitation: (id) => {
        return axiosClient.delete(`/invitations/${id}`);
    },
    getMyInvitations: (status) => {
        return axiosClient.get("/invitations/my", { params: status ? { status } : {} });
    },
    getSentInvitations: (status) => {
        return axiosClient.get("/invitations/sent", { params: status ? { status } : {} });
    },
    respondToInvitation: (id, isAccepted) => {
        return axiosClient.put(`/invitations/${id}/respond`, { isAccepted });
    },
    adminReview: (id, isAccepted) => axiosClient.put(`/invitations/${id}/admin-review`, { isAccepted })
};
