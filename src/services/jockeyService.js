import axios from "axios";

import {
    API_BASE_URL,
} from "../config/api";

const API_URL =
    `${API_BASE_URL}/jockeys`;
    
export const getAllJockeys =
    () => axios.get(API_URL);

export const createJockey =
    (data) =>
        axios.post(API_URL, data);

export const updateJockey =
    (id, data) =>
        axios.put(
            `${API_URL}/${id}`,
            data
        );

export const deleteJockey =
    (id) =>
        axios.delete(
            `${API_URL}/${id}`
        );