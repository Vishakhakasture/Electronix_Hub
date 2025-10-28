import React from "react";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo-text">ElectroNix</h1>
      </div>

      <div className="nav-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search for gifts, flowers, or more..."
        />
      </div>

      <div className="nav-right">
        <div className="icon-container">
          <FaShoppingCart className="nav-icon" />
          {/* <span>Cart</span> */}
        </div>
        <div className="icon-container">
          <FaUser className="nav-icon" />
          {/* <span>Account</span> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
