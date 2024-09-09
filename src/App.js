import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import PageError from "./Pages/Pageerror";
import Layout from "./Layout";
import "./App.css";
import CreateAccountPage from "./Pages/CreateAccountPage";
import Login from "./Pages/Login";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPassword from "./Pages/Resetpassword"; //
import CheckIn from "./Pages/CheckIn";
import Dashboard from "./Pages/Dashboard";
import Report from "./Pages/Report";
// import CheckinPage from "./Pages/CheckinPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<CreateAccountPage />} />
      <Route path="/Loginpage" element={<Login />} />
      <Route path="/CheckIn" element={<CheckIn />} />
      <Route path="/report" element={<Report />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

      <Route path="/Layout" element={<Layout />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
export default App;
