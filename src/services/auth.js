import ls from "local-storage";
import axiosAgent from "./axiosAgent";
import axios from "./axiosAgent";

const SESSIONS_PATH = "/sessions";

const isBrowser = () => typeof window !== undefined;

export const getUser = () => {
  if (isBrowser) return ls.get("user");
  return {};
};

export const setTokens = (tokenObject) => {
  if (isBrowser) ls.set("tokens", tokenObject);
};

export const getAccessToken = () => {
  if (isBrowser) {
    const tokens = ls.get("tokens");
    return tokens?.access_token;
  }
  return null;
};

export const getRefreshToken = () => {
  if (isBrowser) {
    const tokens = ls.get("tokens");
    return tokens?.refresh_token;
  }
  return null;
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user?.id;
};

export const isAdmin = !!(getUser()?.role === "admin");

const setUser = (user) => {
  if (isBrowser) ls.set("user", user);
};

const fetchTokens = (credentials) => axios.post(SESSIONS_PATH, credentials);

const fetchUser = () => axios.get(SESSIONS_PATH);

export const handleLogin = async (form) => {
  const tokensRequest = await fetchTokens(form);
  setTokens(tokensRequest.data);
  const userRequest = await fetchUser();
  setUser(userRequest.data);
  return userRequest.data;
};

export const handleRegister = async (form) => {
  await axiosAgent.post("/users", form);
  const { username, password } = form;
  return handleLogin({ username, password });
};

export const fetchNewTokens = (refresh_token) =>
  axios.patch(SESSIONS_PATH, { refresh_token });

export const handleLogout = () => {
  setTokens({});
  setUser({});
};
