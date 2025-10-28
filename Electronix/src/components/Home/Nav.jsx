import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './nav.css'
import {FaGift, FaUser, FaShoppingCart} from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <FaGift className="logo-icon" />
        <h1 className="logo-text">GiftyFy</h1>
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
          <span>Cart</span>
        </div>
        <div className="icon-container">
          <FaUser className="nav-icon" />
          <span>Account</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
