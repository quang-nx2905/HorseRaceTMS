import api from "./axios";

export const getAllHorses = async () => {

    const response = await api.get(
        "/horses"
    );

    return response.data;
};

export const createHorse = async (data) => {

    const response = await api.post(
        "/horses",
        data
    );

    return response.data;
};