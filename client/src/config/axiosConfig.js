import axios from "axios";
import { baseUrl } from "./config";

axios.defaults.baseURL = baseUrl;

export const setupInterceptors = (showLoader, hideLoader) => {
  // clear old interceptors (important for React StrictMode)
  axios.interceptors.request.handlers = [];
  axios.interceptors.response.handlers = [];

  axios.interceptors.request.use(
    (config) => {
      showLoader();
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );
};

export default axios;
