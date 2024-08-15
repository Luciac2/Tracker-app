import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Font Awesome icons

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission
    console.log("Login form submitted", loginData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
              {/* Toggle Password Visibility Icon */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </span>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
