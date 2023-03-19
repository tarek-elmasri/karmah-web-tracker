import axiosAgent from "./axiosAgent"


const PLANS_PATH = "/plans"

export const getPlans = () => axiosAgent.get(PLANS_PATH)
export const createPlan = (form) => axiosAgent.post(PLANS_PATH, { plan: form })