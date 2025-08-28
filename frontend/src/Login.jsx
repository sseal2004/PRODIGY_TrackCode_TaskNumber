import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log("Server Response:", result.data);

      if (result.data.status === "Success") {
        navigate("/"); // go to main app page
      } else {
        alert(result.data.error || "Invalid email or password!");
      }

    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err);
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)", // gradient background
        backgroundSize: "cover",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "20px", background: "rgba(255,255,255,0.95)" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4" style={{ fontWeight: "700", color: "#333" }}>Login</h3>
          <form onSubmit={handleSubmit}>
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

            <button 
              type="submit" 
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#667eea", border: "none", fontWeight: "600" }}
            >
              Login
            </button>
          </form>

          <p className="text-center mt-3" style={{ color: "#555" }}>
            Don't have an account?{" "}
            <a href="/signup" className="text-decoration-none" style={{ color: "#764ba2", fontWeight: "600" }}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
