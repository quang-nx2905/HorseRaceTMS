import axiosClient from "./axiosClient";

const raceRegistrationApi = {
  registerHorse: (raceId, horseId) => axiosClient.post(`/races/${raceId}/registrations`, { horseId }),
  getAvailableHorses: raceId => axiosClient.get(`/races/${raceId}/available-horses`),
  getRegistrations: (raceId, status) => axiosClient.get(`/races/${raceId}/registrations`, { params: status ? { status } : {} }),
  getMyRegistrations: () => axiosClient.get("/races/registrations/my"),
  getSummary: raceId => axiosClient.get(`/races/${raceId}/registration-summary`),
  approve: (id, reason = "") => axiosClient.put(`/races/registrations/${id}/approve`, { reason }),
  reject: (id, reason = "") => axiosClient.put(`/races/registrations/${id}/reject`, { reason }),
  open: raceId => axiosClient.put(`/races/${raceId}/open-registration`),
  close: raceId => axiosClient.put(`/races/${raceId}/close-registration`),
  start: raceId => axiosClient.post(`/races/${raceId}/start`),
};

export default raceRegistrationApi;
