import api from "./axios";

/**
 * Redirect trình duyệt sang backend để bắt đầu Google OAuth flow.
 * Backend sẽ redirect tới Google, sau đó Google redirect về /auth/callback
 * kèm theo query param ?token=<accessToken>
 */
export const loginWithGoogle = () => {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  window.location.href = `${apiBaseUrl}/api/auth/google`;
};

/**
 * Đọc token từ URL query string sau khi backend redirect về.
 * Trả về accessToken nếu có, ngược lại trả null.
 */
export const getGoogleCallbackToken = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
};

export const loginApi = async (data) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const registerApi = async (data) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};
