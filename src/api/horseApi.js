import axiosClient from "./axiosClient";

export const getAllHorses = async () => {

    const response = await axiosClient.get(
        "/horses"
    );

    return response.data;
};

export const createHorse = async (data) => {

    const response = await axiosClient.post(
        "/horses",
        data
    );

    return response.data;
};