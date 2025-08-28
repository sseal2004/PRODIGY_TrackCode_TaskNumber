import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log("Server Response:", result.data);
      alert(`Signed up successfully!\nName: ${formData.name}\nEmail: ${formData.email}`);
      navigate('/login');
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while signing up!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4A00E0, #8E2DE2, #FF4E50)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .card-custom {
            border-radius: 20px;
            border: none;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            background: #ffffff; /* White card */
            color: #0D47A1; /* Blue text accents */
            padding: 20px;
          }

          .btn-custom {
            background: linear-gradient(90deg, #1E90FF, #4A90E2);
            border: none;
            border-radius: 50px;
            padding: 10px 20px;
            font-weight: bold;
            letter-spacing: 1px;
            color: #fff;
            transition: all 0.3s ease;
          }

          .btn-custom:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }

          input.form-control {
            border-radius: 10px;
            border: 1px solid #1E90FF;
            padding: 12px;
            background: #f0f8ff; /* light blue input */
            color: #0D47A1;
          }

          input.form-control::placeholder {
            color: #6495ED; /* lighter blue placeholder */
          }

          a.text-decoration-none {
            color: #1E90FF;
            transition: all 0.3s;
          }

          a.text-decoration-none:hover {
            color: #4A90E2;
            text-decoration: underline;
          }
        `}
      </style>

      <div className="card shadow-lg card-custom" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
            Sign Up
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-custom w-100">Sign Up</button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
