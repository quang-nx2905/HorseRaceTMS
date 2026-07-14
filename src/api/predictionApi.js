import axiosClient from "./axiosClient";

const predictionApi = {
    placeBet: (data) => {
        // data: { raceId, participantId, betPoints }
        return axiosClient.post("/prediction/bet", data);
    },
    cancelBet: (id) => {
        return axiosClient.post(`/prediction/${id}/cancel`);
    },
    getMyBets: () => {
        return axiosClient.get("/prediction/my-bets");
    }
};

export default predictionApi;
