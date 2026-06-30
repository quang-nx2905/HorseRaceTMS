import api from "./axios";

/**
 * Redirect browser to backend to start Google OAuth flow.
 * Backend will redirect to Google, then Google redirects back to /auth/callback
 * with query param ?token=<accessToken>
 */
export const loginWithGoogle = () => {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "https://localhost:7179";
  window.location.href = `${apiBaseUrl}/api/auth/google-login`;
};

/**
 * Read token from URL query string after backend redirects back.
 * Returns accessToken if present, otherwise returns null.
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

export const changePasswordApi = async (data) => {
  const response = await api.post("/auth/change-password", data);
  return response.data;
};

export const forgotPasswordApi = async (data) => {
  const response = await api.post("/auth/forgot", data);
  return response.data;
};

export const resetPasswordApi = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await api.post("/auth/refresh-token", {}, {
    withCredentials: true
  });
  return response.data;
};
