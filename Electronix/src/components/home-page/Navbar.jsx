import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import productData from "../product-page/ProductData";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState(null); // 👤 Track current user

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);
  const auth = getAuth();

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // ✅ Listen for Firebase user changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleUserClick = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleLoginClick = () => {
    setShowDropdown(false);
    navigate("/auth");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  const handleOrders = () => {
    setShowDropdown(false);
    navigate("/orders");
  };

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = productData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setSuggestions([]);
    navigate(`/product/${product.id}`);
  };

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
                className={`suggestion-item ${index === activeIndex ? "active" : ""}`}
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
              {!user ? (
                <p onClick={handleLoginClick}>Login / Register</p>
              ) : (
                <>
                  <p onClick={handleProfile}>Profile</p>
                  <p onClick={handleOrders}>Orders</p>
                  <p onClick={handleLogout}>Logout</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
