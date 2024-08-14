import Home from "./Pages/Home";
import PageError from "./Pages/Pageerror";
import Layout from "./Layout";
import "./App.css";
import CreateAccountPage from "./Pages/CreateAccountPage";

function App() {
  return (
    <div className="App">
      <div>
        <CreateAccountPage />
        {/* <Layout /> */}
      </div>
    </div>
  );
}
export default App;
