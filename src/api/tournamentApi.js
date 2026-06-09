import axiosClient from "./axiosClient";

const tournamentApi = {

  getAll() {

    return axiosClient.get(
      "/tournaments"
    );

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