import api from "./axiosClient";

export const userApi = {
    getUsers: async (params) => {
        const response = await api.get("/users", { params });
        return response.data;
    },
    toggleUserStatus: async (id) => {
        const response = await api.put(`/users/${id}/status`);
        return response.data;
    },
    updateUser: async (id, data) => {
        const response = await api.put(`/users/${id}/update`, data);
        return response.data;
    },
    createUser: async (data) => {
        const response = await api.post("/users", data);
        return response.data;
    },
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    }
};
