import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import productData from "../product-page/ProductData"; 
import { useCart } from "../../context/CartContext"; 

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Toggle user dropdown
  const handleUserClick = () => {
    setShowDropdown((prev) => !prev);
  };

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
      if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // Filter products by name or category
    const filtered = productData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // limit to 5 suggestions
  };

  // Handle suggestion click
  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setSuggestions([]);
    navigate(`/product/${product.id}`);
  };

  // Handle Enter key or arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        navigate(`/search?query=${searchTerm}`);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo-text" onClick={() => navigate("/")}>
          ElectroNix
        </h1>
      </div>

      <div className="nav-center" ref={suggestionRef}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for electronics..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li
                key={item.id}
                className={`suggestion-item ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleSuggestionClick(item)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="nav-right">
        <div className="icon-container cart-icon" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="nav-icon" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
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
