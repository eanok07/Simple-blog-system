import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", formData);
      localStorage.setItem("token", res.data.token); // Save token to localStorage
      setUser(res.data.user); // Update user state
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;