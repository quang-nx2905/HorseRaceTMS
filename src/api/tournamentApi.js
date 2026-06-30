import axiosClient from "./axiosClient";

const tournamentApi = {

  getAll(params) {
    return axiosClient.get("/tournaments", { params });
  },

  getById(id) {

    return axiosClient.get(
      `/tournaments/${id}`
    );

  },

  create(data) {

    return axiosClient.post(
      "/tournaments",
      data
    );

  },

};

export default tournamentApi;