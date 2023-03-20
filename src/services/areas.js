import axiosAgent from "./axiosAgent"


const AREAS_PATH = "/areas"

export const createArea = (form) => axiosAgent.post(AREAS_PATH, { area: form })
export const getAreas = (id = null) => axiosAgent.get(id ? `${AREAS_PATH}/${id}` : AREAS_PATH)