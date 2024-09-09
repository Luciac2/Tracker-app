import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-orange-600 text-white p-4 flex-shrink-0">
          <div className="text-2xl font-bold mb-6">
            <Link to="/">Attendance App</Link>
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard"
                className="block p-2 hover:bg-orange-700 rounded"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/report"
                className="block p-2 hover:bg-orange-700 rounded"
              >
                Report
              </Link>
            </li>
            <li>
              <Link
                to="/loginpage"
                className="block p-2 hover:bg-orange-700 rounded"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block p-2 hover:bg-orange-700 rounded"
              >
                Sign Up
              </Link>
            </li>
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
