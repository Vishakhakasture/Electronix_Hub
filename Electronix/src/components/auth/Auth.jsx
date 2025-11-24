import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaArrowLeft } from "react-icons/fa";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");

        // ✅ Automatically redirect to homepage after registration
        navigate("/");

        // Clear inputs
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      if (isLogin) {
        setError("Invalid email or password");
      } else {
        if (err.code === "auth/email-already-in-use") {
          setError("Email already registered");
        } else if (err.code === "auth/weak-password") {
          setError("Password should be at least 6 characters");
        } else {
          setError("Registration failed. Try again.");
        }
      }
    }
  };

  const handleBack = () => {
    if (!isLogin) {
      setIsLogin(true);
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <button className="back-circle-btn" onClick={handleBack}>
            <FaArrowLeft className="back-icon" />
          </button>
          <h2>{isLogin ? "Login to Account" : "Create Account"}</h2>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)} className="auth-link">
                Register here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)} className="auth-link">
                Login here
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
