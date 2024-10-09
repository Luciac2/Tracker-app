import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import PageError from "./Pages/Pageerror";
import Layout from "./Layout";
import "./App.css";
import CreateAccountPage from "./Pages/CreateAccountPage";
import Login from "./Pages/Login";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPassword from "./Pages/Resetpassword";
import CheckIn from "./Pages/CheckIn";
import CheckOut from "./Pages/CheckOut";
import Dashboard from "./Pages/Dashboard";
import DateRangeFilter from "./Pages/DateRangeFilter";
import Admin from "./Pages/Admin";
import Report from "./Pages/Report";
import LogOut from "./Pages/LogOut";
import PrivateRoute from "./Pages/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="/Signup" element={<CreateAccountPage />} />
        <Route path="/Loginpage" element={<Login />} />

        {/* Routes accessible only to users and admins */}
        <Route
          path="/CheckIn"
          element={
            <PrivateRoute element={<CheckIn />} roles={["user", "admin"]} />
          }
        />
        <Route
          path="/CheckOut"
          element={
            <PrivateRoute element={<CheckOut />} roles={["user", "admin"]} />
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute element={<Dashboard />} roles={["user", "admin"]} />
          }
        />

        {/* Route accessible only to admins */}
        <Route
          path="/Admin"
          element={<PrivateRoute element={<Admin />} roles={["admin"]} />}
        />
        <Route
          path="/report"
          element={<PrivateRoute element={<Report />} roles={["admin"]} />}
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/DateRangeFilter" element={<DateRangeFilter />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="*" element={<PageError />} />
        <Route path="/LogOut" element={<LogOut />} />
      </Route>
    </Routes>
  );
}

export default App;
