import api from "./axiosClient";

export const userApi = {
    getUsers: async (params) => {
        const response = await api.get("/api/users", { params });
        return response.data;
    },
    toggleUserStatus: async (id) => {
        const response = await api.put(`/api/users/${id}/status`);
        return response.data;
    }
};
