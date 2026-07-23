import axiosClient from "./axiosClient";

const leaderboardApi = {
    getGlobalHorseLeaderboard: () => {
        return axiosClient.get("/leaderboard/horses");
    }
};

export default leaderboardApi;
