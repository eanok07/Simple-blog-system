import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import UserManagement from "./components/UserManagement";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
};

export default App;