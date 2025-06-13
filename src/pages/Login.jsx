import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralSource: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login/signup logic
    if (isLogin) {
      navigate("/games");
    } else {
      // Handle signup
      setIsLogin(true);
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralSource: "",
      rememberMe: false,
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-header-div">
        <h1 className="auth-header-text">
          {isLogin ? "Welcome to Basketball Stats!" : "Create Your Account"}
        </h1>

        <p className="auth-text-switch">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button type="button" onClick={toggleView} className="auth-link">
                Create account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={toggleView} className="auth-link">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>

      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Full Name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              {isLogin ? "Password" : "Create Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                isLogin ? "Enter your password" : "Create a password"
              }
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="referralSource">
                  How did you hear about us?
                </label>
                <select
                  id="referralSource"
                  name="referralSource"
                  value={formData.referralSource}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="google-search">Google Search</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="x-twitter">X / Twitter</option>
                  <option value="email">Email</option>
                  <option value="friend">From a friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className="auth-button">
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
