import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../api/api.config";

const ForgotResetPasswordPage = () => {
  const { id, token } = useParams();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/forgotpassword", { email });
      console.log("Forgot Password API response:", response.data); // Log the API response data
      setMessage("Password reset link sent to your email address.");
    } catch (error) {
      console.error(
        "Error sending reset link",
        error.response?.data || error.message
      );
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const data = {
        newPassword,
        confirmPassword,
      };

      const response = await Api.put(`/resetpassword/${id}/${token}`, data);
      console.log("Reset Password API response:", response.data);
      setMessage("Password successfully updated.");
    } catch (error) {
      console.error(
        "Error updating password",
        error.response?.data || error.message
      ); // Log the error response or message
      setMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {id && token ? "Reset Password" : "Forgot Password"}
        </h2>

        {id && token ? (
          <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="newPassword"
              >
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
                placeholder="Enter your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Confirm your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Send Reset Link
            </button>
          </form>
        )}

        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotResetPasswordPage;
