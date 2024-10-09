import React, { useState, useEffect } from "react";
import { Api } from "../../api/api.config";

const ApproveRejectForm = ({ userId, token }) => {
  const [status, setStatus] = useState("");
  const [reasons, setReasons] = useState("");
  const [message, setMessage] = useState("");

  // Define the authorized email and manager role
  const authorizedEmail = "onyedikachilucia726@gmail.com";
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole"); // Assuming you store the user role in localStorage

  useEffect(() => {
    if (userEmail !== authorizedEmail) {
      setMessage(
        "Access Denied: You do not have permission to perform this action."
      );
    }
  }, [userEmail]);

  const validateForm = () => {
    if (status === "rejected" && !reasons) {
      setMessage("Reasons for rejection are required.");
      return false;
    }
    return true;
  };

  const sendEmailNotification = async (userEmail, status) => {
    try {
      const emailBody = {
        email: userEmail,
        status,
      };

      await Api.post("/send-email", emailBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userEmail !== authorizedEmail || userRole !== "manager") {
      return; // Deny access if not a manager
    }

    if (!validateForm()) return;

    const requestBody = {
      status,
      ...(status === "rejected" && { reasons }), // Add reasons only if status is rejected
    };

    try {
      const response = await Api.patch(`/approve/${userId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setMessage(`User account has been ${status}.`);
        await sendEmailNotification(userEmail, status); // Send email notification
      } else {
        setMessage("Failed to update account status.");
      }
    } catch (error) {
      setMessage("An error occurred while updating the account status.");
    }
  };

  // Render access denied message if the email does not match
  if (userEmail !== authorizedEmail) {
    return <p className="text-red-600 text-center mt-4">{message}</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Approve/Reject User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            >
              <option value="">Select Status</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {status === "rejected" && (
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="reasons"
              >
                Reasons for rejection
              </label>
              <textarea
                id="reasons"
                value={reasons}
                onChange={(e) => setReasons(e.target.value)}
                required={status === "rejected"}
                placeholder="Provide reasons for rejection"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Submit
          </button>

          {message && (
            <p className="text-center text-red-600 mt-4">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApproveRejectForm;
