import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility when user icon clicked
  const handleUserClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Navigate to auth page
  const handleLoginClick = () => {
    setShowDropdown(false);
    navigate("/auth");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo-text" onClick={() => navigate("/")}>
          ElectroNix
        </h1>
      </div>

      <div className="nav-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search for electronics, gifts, or more..."
        />
      </div>

      <div className="nav-right">
        <div className="icon-container">
          <FaShoppingCart className="nav-icon" />
        </div>

        <div className="icon-container user-menu" ref={dropdownRef}>
          <FaUser className="nav-icon" onClick={handleUserClick} />

          {showDropdown && (
            <div className="user-dropdown">
              <p onClick={handleLoginClick}>Login / Register</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
