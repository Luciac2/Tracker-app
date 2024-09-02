import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export const Api = axios.create({
  baseURL,
  withCredentials: true,
});

//axios.get("url")
//Api.get("url")
//Api.post("/signup", {email: "email", password: "password"});
