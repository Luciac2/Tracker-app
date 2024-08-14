import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import PageError from "./Pages/Pageerror";
import Layout from "./Layout";
import "./App.css";
import CreateAccountPage from "./Pages/CreateAccountPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<CreateAccountPage />} />
      <Route path="/Layout" element={<Layout />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
export default App;
