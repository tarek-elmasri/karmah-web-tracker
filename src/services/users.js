import axiosAgent from "./axiosAgent";

const USERS_PATH = "/users";

export const getUsers = () => axiosAgent.get(USERS_PATH);
export const createUser = (form) => axiosAgent.post(USERS_PATH, { user: form });
