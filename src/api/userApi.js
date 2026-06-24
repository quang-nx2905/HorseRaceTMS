import api from "./axiosClient";

export const userApi = {
    getUsers: async (params) => {
        const response = await api.get("/api/users", { params });
        return response.data;
    }
};
