import { useState } from 'react'
import * as areaServices from '../services/areas'
import * as planServices from '../services/plans'

const useApi = (initialData = null) => {

  const [response, setResponse] = useState({
    isLoading: false, isError: false, error: null, data: initialData
  })

  const setIsLoading = () => setResponse({ isLoading: true, isError: false, error: null, data: initialData })
  const setResponseError = (error) => setResponse({ isLoading: false, isError: true, error, data: initialData })
  const setResponseSuccess = (data) => setResponse({ isLoading: false, isError: false, error: null, data })

  const createArea = async (form) => {
    try {
      setIsLoading()
      const { data } = await areaServices.createArea(form)
      setResponseSuccess(data)
      console.log(data)
      return data
    } catch (e) {
      console.log(e)
      setResponseError(e)
      return Promise.reject(e)
    }
  }

  const getAreas = async () => {
    try {
      setIsLoading()
      const { data } = await areaServices.getAreas()
      setResponseSuccess(data)
    } catch (e) {
      console.log(e)
      setResponseError(e)
    }
  }

  const getPlans = async () => {
    try {
      setIsLoading()
      const { data } = await planServices.getPlans()
      setResponseSuccess(data)
    } catch (e) {
      console.log(e)
      setResponseError(e)
    }
  }

  const createPlan = async (form) => {
    try {
      setIsLoading()
      const { data } = await planServices.createPlan(form)
      setResponseSuccess(data)
    } catch (e) {
      console.log(e)
      setResponseError(e)
      return Promise.reject(e)
    }
  }

  return {
    isLoading: response.isLoading,
    isError: response.isError,
    error: response.error,
    data: response.data,
    getAreas,
    createArea,
    getPlans,
    createPlan
  }
}

export default useApi