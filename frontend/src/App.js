import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/user/Login";

function App() {
  return (
    <>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
