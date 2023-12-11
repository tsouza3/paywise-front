import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./Global";

import RegistrationForm from "./auth/Register";
import Login from "./auth/Login";
import UserHome from "./pages/UserHome";
import Home from "./pages/Home";
import GastosFiltrados from "../src/pages/GastosFiltrados";

const App = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />

        {token ? (
          <Route path="/gastos" element={<GastosFiltrados token={token} />} />
        ) : (
          <Route path="/gastos" element={<Navigate to="/login" />} />
        )}

        {token ? (
          <Route path="/home" element={<UserHome token={token} />} />
        ) : (
          <Route path="/home" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
