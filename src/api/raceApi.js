import axiosClient from "./axiosClient";

const raceApi = {
  // Update race status (e.g. to "Completed")
  updateStatus: (id, status) => {
    return axiosClient.put(`/Races/${id}/status`, `"${status}"`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  // Submit race results (for Referee/Admin)
  submitResults: (id, payload) => {
    return axiosClient.post(`/Races/${id}/results`, payload);
  },

  // Get race results (Public)
  getResults: (id) => {
    return axiosClient.get(`/Races/${id}/results`);
  },
};

export default raceApi;
