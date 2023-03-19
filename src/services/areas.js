import axiosAgent from "./axiosAgent"


const AREAS_PATH = "/areas"

export const createArea = (form) => axiosAgent.post(AREAS_PATH, { area: form })
export const getAreas = () => axiosAgent.get(AREAS_PATH)