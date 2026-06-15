import axios from "axios";

import { API_BASE_URL }
    from "../config/api";

const API_URL =
    "http://localhost:8080/api/horses";

export const getAllHorses =
    () => axios.get(API_URL);

export const createHorse =
    (data) =>
        axios.post(API_URL, data);

export const updateHorse =
    (id, data) =>
        axios.put(
            `${API_URL}/${id}`,
            data
        );

export const deleteHorse =
    (id) =>
        axios.delete(
            `${API_URL}/${id}`
        );