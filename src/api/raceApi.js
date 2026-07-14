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

  getResults: (id) => {
    return axiosClient.get(`/Races/${id}/results`);
  },

  // Award prizes for a race (Admin/Referee)
  awardPrizes: (id) => {
    return axiosClient.post(`/Races/${id}/award`);
  },
};

export default raceApi;
