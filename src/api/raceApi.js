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

  // --- NEW REGISTRATION FLOW ENDPOINTS ---
  registerHorse: (raceId, horseId) => {
    return axiosClient.post(`/races/${raceId}/register`, { horseId });
  },

  getRegistrations: (raceId) => {
    return axiosClient.get(`/races/${raceId}/registrations`);
  },

  approveRegistration: (raceId, registrationId) => {
    return axiosClient.put(`/races/${raceId}/registrations/${registrationId}/approve`);
  },

  rejectRegistration: (raceId, registrationId, note) => {
    return axiosClient.put(`/races/${raceId}/registrations/${registrationId}/reject`, { note });
  },

  openRegistration: (raceId) => {
    return axiosClient.put(`/races/${raceId}/open-registration`);
  },

  closeRegistration: (raceId) => {
    return axiosClient.put(`/races/${raceId}/close-registration`);
  },

  getRaceStatus: (raceId) => {
    return axiosClient.get(`/races/${raceId}/status`);
  },

  getParticipants: (raceId) => {
    return axiosClient.get(`/races/${raceId}/participants`);
  },
  // Admin approves jockey after jockey accepted invitation
  approveJockey: (participantId) => {
    return axiosClient.put(`/races/participants/${participantId}/approve-jockey`);
  },
};

export default raceApi;

