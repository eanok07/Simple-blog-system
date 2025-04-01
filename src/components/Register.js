import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import  "./Reegi.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/auth/register", formData);
      alert("User registered successfully!");
      navigate("/login"); 
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;