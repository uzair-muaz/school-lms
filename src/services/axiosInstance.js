// import { message } from 'antd';
import axios from "axios";

import store from "../redux/store";
import { message } from "antd";
import { clearSystem } from "../redux/systemSlice";
// import { clearSystem } from '../redux/systemSlice';

// Define the common base URL
// const BASE_URL =
//   "https://b36b-2401-ba80-a19b-185-5d4e-79e9-2a7-280a.ngrok-free.app/api";
const BASE_URL = "http://3.92.229.206:3000/api";

// Create axios instances
const privateRequest = axios.create({
  baseURL: BASE_URL,
});
const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor for privateRequest
privateRequest.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.system.token;

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor for privateRequest
// privateRequest.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       // Display message on token expiration
//       message.error("Session expired. Please log in again.");
//       // Clear session and token from Redux store
//       store.dispatch(clearSystem());
//       window.localStorage.removeItem("sessionActive"); // Set sessionActive to false
//       // Optional: Redirect to login or home page
//       window.location.href = "/"; // Adjust the path as per your routing setup
//     }

//     return Promise.reject(error);
//   },
// );

// Export both instances for use in your application
export { privateRequest, publicRequest };
