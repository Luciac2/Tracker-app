import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FaHome,
  FaSignInAlt,
  FaClipboardList,
  FaCheckCircle,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa"; //  icons

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with toggle button for small screens */}
      <header className="bg-orange-600 text-white p-4 flex justify-between items-center md:hidden shadow-md">
        <div className="text-2xl font-bold">
          <NavLink to="/">Attendance App</NavLink>
        </div>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block w-64 bg-orange-600 text-white p-4 flex-shrink-0 md:relative fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out shadow-lg`}
        >
          {/* sidebar only on large screens */}
          <div className="hidden md:block text-2xl font-bold mb-6">
            <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
              Attendance App
            </NavLink>
          </div>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                    : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaHome />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Checkin"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                    : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaCheckCircle />
                <span>Check-in</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Checkout"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                    : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaSignOutAlt />
                <span>Check-Out</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                    : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaFileAlt />
                <span>Report</span>
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/loginpage"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                      : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </NavLink>
              </li>
            )}
            {!token && (
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-white text-orange-600 font-semibold block p-2 rounded-lg shadow-md"
                      : "flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500 transition duration-200"
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <FaClipboardList />
                  <span>Sign Up</span>
                </NavLink>
              </li>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 bg-gray-100 transition-all ease-in-out duration-500 shadow-md rounded-md">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto shadow-md">
        <p>
          &copy; {new Date().getFullYear()} Attendance App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
