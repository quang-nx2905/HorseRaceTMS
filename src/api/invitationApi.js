import axiosClient from "./axiosClient";

export const invitationApi = {
    sendInvitation: (data) => {
        return axiosClient.post("/invitations", data);
    },
    cancelInvitation: (id) => {
        return axiosClient.delete(`/invitations/${id}`);
    },
    getMyInvitations: () => {
        return axiosClient.get("/invitations/my");
    },
    getSentInvitations: () => {
        return axiosClient.get("/invitations/sent");
    },
    respondToInvitation: (id, isAccepted) => {
        return axiosClient.put(`/invitations/${id}/respond`, { isAccepted });
    }
};
