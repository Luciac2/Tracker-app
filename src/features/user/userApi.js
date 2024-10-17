import axios from "axios";
import { Api } from "../../api/api.config";

export const fetchAllUsers = async (token) => {
  const option = {
    Authorization: `Bearer ${token}`,
    "Content-type": "Application/json",
  };
  const response = await Api.get("/allaccounts", option);
  return response.data;
};

export const signInUser = async (userDetails) => {
  try {
    const option = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await Api.post("/checkin", userDetails, option);
    return res.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
