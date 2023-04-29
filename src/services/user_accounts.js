import axiosAgent from './axiosAgent'

const USER_ACCOUNTS_PATH = "/user_accounts"

export const getAccounts = (userId) => axiosAgent.get(`${USER_ACCOUNTS_PATH}/${userId}`) 