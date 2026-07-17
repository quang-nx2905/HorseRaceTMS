import axiosClient from "../api/axiosClient";

export const topupService = {
  createPaymentUrl: async (amount) => {
    const response = await axiosClient.post("/Topup/vnpay/create-url", { amount });
    return response.data;
  },
  processIpn: async (queryString) => {
    // This is optional if we call IPN from FE, but normally IPN is called by VNPay directly.
    // In our case we use the same endpoint or a return endpoint.
    const response = await axiosClient.get(`/Topup/vnpay/ipn${queryString}`);
    return response.data;
  },
};
