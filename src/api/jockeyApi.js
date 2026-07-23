import api from "./axiosClient";

export const jockeyApi = {
    getJockeys: async () => {
        const response = await api.get("/jockeys");
        return response.data;
    },
    getAvailableJockeys: async (tourId) => {
        const response = await api.get(`/jockeys/available/${tourId}`);
        return response.data;
    },
    requestUpdateJockey: async (id, data) => {
        const response = await api.put(`/jockeys/${id}`, data);
        return response.data;
    },
    reviewJockeyRequest: async (id, data) => {
        const response = await api.put(`/jockeys/${id}/review`, data);
        return response.data;
    }
};
