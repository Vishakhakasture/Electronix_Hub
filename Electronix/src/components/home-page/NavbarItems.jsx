import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import navData from "./navData";
import "./NavbarItems.css";

const NavbarItems = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubCategoryClick = (subCategory) => {
    navigate(`/products/${subCategory.toLowerCase().replace(/\s+/g, "-")}`);
    setMenuOpen(false); // close menu on click (for mobile)
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="nav-items-bar">
      <div className="nav-container">
        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Navigation List */}
        <ul className={`nav-items-list ${menuOpen ? "active" : ""}`}>
          {navData.map((navItem, index) => (
            <li
              key={index}
              className="nav-item"
              onMouseEnter={() =>
                window.innerWidth > 768 && setActiveCategory(navItem.title)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setActiveCategory(null)
              }
              onClick={() =>
                window.innerWidth <= 768 &&
                setActiveCategory(
                  activeCategory === navItem.title ? null : navItem.title
                )
              }
            >
              {navItem.title}
              <span className="nav-arrow">▾</span>

              {/* Dropdown */}
              <ul
                className={`dropdown-menu ${
                  activeCategory === navItem.title ? "show" : ""
                }`}
              >
                {navItem.subCategories.map((sub, subIndex) => (
                  <li key={subIndex} onClick={() => handleSubCategoryClick(sub)}>
                    {sub}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarItems;
