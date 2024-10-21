import { Api } from "../../api/api.config";

// Function to set up headers
const getHeaders = (token = null, contentType = "application/json") => {
  const headers = {
    "Content-Type": contentType,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const fetchAllUsers = async (token) => {
  try {
    const headers = getHeaders(token);
    const response = await Api.get("/allaccounts", { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const signInUser = async (userDetails) => {
  try {
    const headers = getHeaders(null, "multipart/form-data");
    const res = await Api.post("/checkin", userDetails, { headers });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const signOutUser = async (userDetails) => {
  try {
    const headers = getHeaders(null, "multipart/form-data");
    const res = await Api.post("/checkOut", userDetails, { headers });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error signing out user:", error);
    throw error; // Re-throw the error for further handling
  }
};
