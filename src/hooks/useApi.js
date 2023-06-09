import { useState } from "react";
import * as areaServices from "../services/areas";
import * as planServices from "../services/plans";
import * as accountServices from "../services/accounts";
import * as userServices from "../services/users";

const useApi = (initialData = null) => {
  const [response, setResponse] = useState({
    isLoading: false,
    isError: false,
    error: null,
    data: initialData,
  });

  const setIsLoading = () =>
    setResponse({
      isLoading: true,
      isError: false,
      error: null,
      data: initialData,
    });
  const setResponseError = (error) =>
    setResponse({ isLoading: false, isError: true, error, data: initialData });
  const setResponseSuccess = (data) =>
    setResponse({ isLoading: false, isError: false, error: null, data });

  const createArea = async (form) => {
    try {
      setIsLoading();
      const { data } = await areaServices.createArea(form);
      setResponseSuccess(data);
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      setResponseError(e);
      return Promise.reject(e);
    }
  };

  const getAreas = async (id = null) => {
    try {
      setIsLoading();
      const { data } = await areaServices.getAreas(id);
      setResponseSuccess(data);
    } catch (e) {
      console.log(e);
      setResponseError(e);
    }
  };

  const getPlans = async () => {
    try {
      setIsLoading();
      const { data } = await planServices.getPlans();
      setResponseSuccess(data);
    } catch (e) {
      console.log(e);
      setResponseError(e);
    }
  };

  const createPlan = async (form) => {
    try {
      setIsLoading();
      const { data } = await planServices.createPlan(form);
      setResponseSuccess(data);
      return data;
    } catch (e) {
      console.log(e);
      setResponseError(e);
      return Promise.reject(e);
    }
  };

  const createAccount = async (form) => {
    try {
      setIsLoading();
      const { data } = await accountServices.createAccount(form);
      setResponseSuccess(data);
      return data;
    } catch (e) {
      console.log(e);
      setResponseError(e);
      return Promise.reject(e);
    }
  };

  const getUsers = async () => {
    try {
      setIsLoading();
      const { data } = await userServices.getUsers();
      setResponseSuccess(data);
    } catch (e) {
      console.log(e);
      setResponseError(e);
    }
  };

  const createUser = async (form) => {
    try {
      setIsLoading();
      const { data } = await userServices.createUser(form);
      setResponseSuccess(data);
      return data;
    } catch (e) {
      console.log(e);
      setResponseError(e);
      return Promise.reject(e);
    }
  };

  const getUser = async (userId) => {
    try {
      setIsLoading();
      const { data } = await userServices.getUser(userId);
      setResponseSuccess(data);
    } catch (e) {
      console.log(e);
      setResponseError(e);
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
    createPlan,
    createAccount,
    getUsers,
    createUser,
    getUser
  };
};


export default useApi;
