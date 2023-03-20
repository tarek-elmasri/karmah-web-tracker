import axiosAgent from "./axiosAgent";

const ACCOUNTS_PATH = '/accounts'

export const createAccount = (form) => axiosAgent.post(ACCOUNTS_PATH, { account: form })