import axios from "axios";
import {
  fetchNewTokens,
  getAccessToken,
  getRefreshToken,
  handleLogout,
  setTokens,
} from "./auth";

const SERVER_BASE_URL = "http://localhost:3000";

const axiosAgent = axios.create({
  baseURL: SERVER_BASE_URL,
});

axiosInstance.defaults.headers.common["Content-Type"] =
  "application/json; charset=utf-8";
axiosInstance.defaults.headers.common["Accept"] =
  "application/json; charset=utf-8";

// adding access token to requests if present
axiosInstance.interceptors.request.use((req) => {
  const access_token = getAccessToken();
  if (access_token) {
    req.headers["Authorization"] = `Bearer ${access_token}`;
  }
  return req;
});

// intercepting expired token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      getRefreshToken()
    ) {
      try {
        const { data: tokens } = await fetchNewTokens(getRefreshToken());
        setTokens(tokens);
        return axiosInstance.request(error.config);
      } catch (err) {
        handleLogout();
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosAgent;
