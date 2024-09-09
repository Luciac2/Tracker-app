import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve the token from localStorage or other source
  const token = localStorage.getItem("token"); // Make sure the key matches how you stored it

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!token) {
          setError("Authorization token is missing. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "https://odlcontractattendance.onrender.com/api/v1/dashboard",
          {}, // No request body required
          {
            headers: {
              Authorization: `Bearer ${token}`, // Use the token
            },
          }
        );

        if (response.status === 200) {
          setDashboardData(response.data.data); // Extract data from the response
          setLoading(false);
        } else {
          setError("Unexpected response status: " + response.status);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        if (err.response) {
          // Handle known errors (e.g., server response errors)
          console.error("Response Data:", err.response.data);
          console.error("Response Status:", err.response.status);
          console.error("Response Headers:", err.response.headers);
          setError(
            err.response.data.message ||
              "Failed to load dashboard data. Please try again."
          );
        } else if (err.request) {
          // Handle cases where the request was made, but no response was received
          console.error("No response received:", err.request);
          setError(
            "No response from the server. Please check your network connection."
          );
        } else {
          // Handle other unexpected errors
          console.error("Error setting up the request:", err.message);
          setError("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]); // Add token as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {dashboardData && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img
              src={dashboardData.profilePicture.pictureUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">{dashboardData.fullName}</h2>
              <p className="text-gray-500">{dashboardData.email}</p>
              <p className="text-gray-500">{dashboardData.phoneNumber}</p>
            </div>
          </div>

          {/* Remaining Dashboard Details... */}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
