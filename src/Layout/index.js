import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {

  const token = localStorage.getItem("token");

  return (
    <div className="flex flex-col min-h-screen pl-4">
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-orange-600 text-white p-4 flex-shrink-0">
          <div className="text-2xl font-bold mb-6">
            <NavLink to="/">Attendance App</NavLink>
          </div>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "underline block p-2 hover:bg-orange-700 rounded"
                    : "block p-2 hover:bg-orange-700 rounded"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Checkin"
                className={({ isActive }) =>
                  isActive
                    ? "underline block p-2 hover:bg-orange-700 rounded"
                    : "block p-2 hover:bg-orange-700 rounded"
                }
              >
                Check-in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  isActive
                    ? "underline block p-2 hover:bg-orange-700 rounded"
                    : "block p-2 hover:bg-orange-700 rounded"
                }
              >
                Report
              </NavLink>
            </li>
           { !token &&
            <li>
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive
                  ? "underline block p-2 hover:bg-orange-700 rounded"
                  : "block p-2 hover:bg-orange-700 rounded"
              }
            >
              Login
            </NavLink>
          </li>
          }
          { !token &&
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "underline block p-2 hover:bg-orange-700 rounded"
                  : "block p-2 hover:bg-orange-700 rounded"
              }
            >
              Sign Up
            </NavLink>
          </li>
          }
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>
          &copy; {new Date().getFullYear()} Attendance App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;