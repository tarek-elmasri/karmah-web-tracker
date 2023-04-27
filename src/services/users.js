import axiosAgent from "./axiosAgent";

const USERS_PATH = "/users";

export const getUsers = () => axiosAgent.get(USERS_PATH);
