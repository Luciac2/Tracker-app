import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

console.log("API Base URL:", baseURL); // Add this line for debugging

export const Api = axios.create({
  baseURL,
  withCredentials: false,
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//axios.get("url")
//Api.get("url")
//Api.post("/signup", {email: "email", password: "password"});