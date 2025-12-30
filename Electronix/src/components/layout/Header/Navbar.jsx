import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { useCart } from "../../../context/CartContext";
import navData from "../../pages/home-page/navData";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsBagHeart } from "react-icons/bs";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const suggestionRef = useRef(null);
  const auth = getAuth();

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://691c087d3aaeed735c8f339c.mockapi.io/api/v1/product"
        );
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

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

  const handleInvoiceHistory = () => {
    setShowDropdown(false);
    navigate("/invoice-history");
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

    const filtered = allProducts.filter((item) =>
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
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        navigate(`/search?query=${searchTerm}`);
      }
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    navigate(`/products/${subCategory.toLowerCase().replace(/\s+/g, "-")}`);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="promo-bar">
        <marquee behavior="scroll" direction="left">
          🎉 Big Sale Today ! Flat 30% OFF on Smartphones | Extra 10% OFF on
          prepaid orders ! 🎉 Big Sale Today BLACK FRIDAY ! Flat 50% OFF on
          Laptops | Extra 10% OFF on prepaid orders !
        </marquee>
      </div>

      <nav className="navbar">
        <div className="nav-wrapper">
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
            <div
              className="icon-container cart-icon"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart className="nav-icon" />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>

            <div className="icon-container user-menu" ref={dropdownRef}>
              <FaUser className="nav-icon" onClick={handleUserClick} />

              {user && (
                <span className="username-text" onClick={handleUserClick}>
                  Hi,{" "}
                  {user.displayName
                    ? user.displayName.split(" ")[0]
                    : user.email.split("@")[0]}
                </span>
              )}

              {showDropdown && (
                <div className="user-dropdown">
                  {!user ? (
                    <div className="dropdown-item" onClick={handleLoginClick}>
                      Login / Register
                    </div>
                  ) : (
                    <>
                      <div className="dropdown-item" onClick={handleProfile}>
                        <span className="dropdown-icon">
                          <FaRegCircleUser />
                        </span>
                        <span className="dropdown-text">Profile</span>
                      </div>

                      <div className="dropdown-item" onClick={handleOrders}>
                        <span className="dropdown-icon">
                          <BsBagHeart />
                        </span>
                        <span className="dropdown-text">Orders</span>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={handleInvoiceHistory}
                      >
                        <span className="dropdown-icon">
                          <LiaFileInvoiceDollarSolid />
                        </span>
                        <span className="dropdown-text">Invoice History</span>
                      </div>

                      <hr className="dropdown-divider" />

                      <div
                        className="dropdown-item logout"
                        onClick={handleLogout}
                      >
                        <span className="dropdown-icon">
                          <IoMdLogOut />
                        </span>
                        <span className="dropdown-text">Logout</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <nav className="nav-items-bar">
        <div className="nav-container">
          <div className="hamburger" onClick={toggleMenu}>
            <span className={menuOpen ? "bar open" : "bar"}></span>
            <span className={menuOpen ? "bar open" : "bar"}></span>
            <span className={menuOpen ? "bar open" : "bar"}></span>
          </div>

          <ul className={`nav-items-list ${menuOpen ? "active" : ""}`}>
            {navData.map((navItem, index) => (
              <li
                key={index}
                className="nav-item"
                onMouseEnter={() =>
                  window.innerWidth > 768 && setActiveCategory(navItem.title)
                }
                onMouseLeave={() =>
                  window.innerWidth > 768 &&
                  setTimeout(() => {
                    setActiveCategory((prev) =>
                      prev === navItem.title ? null : prev
                    );
                  }, 120)
                }
              >
                {navItem.title}
                <span className="nav-arrow">▾</span>

                <ul
                  className={`dropdown-menu ${
                    activeCategory === navItem.title ? "show" : ""
                  }`}
                >
                  {navItem.subCategories.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      onClick={() => handleSubCategoryClick(sub)}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
