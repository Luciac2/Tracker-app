import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import PageError from "./Pages/Pageerror";
import Layout from "./Layout";
import "./App.css";
import CreateAccountPage from "./Pages/CreateAccountPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgetPasswordPage/";
import Dashboard from "./Pages/Dashboard";
// import CheckinPage from "./Pages/CheckinPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<CreateAccountPage />} />
      <Route path="/Loginpage" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* <Route path="/Checkin" element={<CheckinPage />} /> */}
      <Route path="/Layout" element={<Layout />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
export default App;
