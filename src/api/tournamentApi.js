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

  update(id, data) {
    return axiosClient.put(`/tournaments/${id}`, data);
  },

  cancel: (id) => {
    return axiosClient.put(`/tournaments/${id}/cancel`);
  },
  toggleHide: (id) => {
    return axiosClient.put(`/tournaments/${id}/toggle-hide`);
  },

};

export default tournamentApi;