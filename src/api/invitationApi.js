import api from "./axiosClient";

export const invitationApi = {
    /**
     * FR-INVT-001: HorseOwner sends an invitation to a Jockey.
     * POST /api/invitations
     * @param {{ jockeyId: number, horseId: number, tourId: number, message?: string }} data
     */
    sendInvitation: async (data) => {
        const response = await api.post("/invitations", data);
        return response.data;
    },

    /**
     * FR-INVT-002: HorseOwner views sent invitations with optional status filter.
     * GET /api/invitations/sent?status={status}
     * @param {string|null} status - Optional filter: Pending | Accepted | Rejected | Cancelled | AutoCancelled
     */
    getSentInvitations: async (status = null) => {
        const params = status ? { status } : {};
        const response = await api.get("/invitations/sent", { params });
        return response.data;
    },

    /**
     * FR-INVT-003: Jockey views all received invitations.
     * GET /api/invitations/my
     */
    getMyInvitations: async () => {
        const response = await api.get("/invitations/my");
        return response.data;
    },

    /**
     * FR-INVT-004: Jockey accepts or rejects an invitation.
     * PUT /api/invitations/{id}/respond
     * @param {number} id - InviteId
     * @param {{ accept: boolean }} data
     */
    respondToInvitation: async (id, data) => {
        const response = await api.put(`/invitations/${id}/respond`, data);
        return response.data;
    },

    /**
     * FR-INVT-006: HorseOwner cancels a pending invitation.
     * PUT /api/invitations/{id}/cancel
     * @param {number} id - InviteId
     */
    cancelInvitation: async (id) => {
        const response = await api.put(`/invitations/${id}/cancel`);
        return response.data;
    },
};
