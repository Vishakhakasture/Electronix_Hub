import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import navData from "./navData";
import "./NavbarItems.css";

const NavbarItems = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const handleSubCategoryClick = (subCategory) => {
    navigate(`/products/${subCategory.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <nav className="nav-items-bar">
      <ul className="nav-items-list">
        {navData.map((navItem, index) => (
          <li
            key={index}
            className="nav-item"
            onMouseEnter={() => setActiveCategory(navItem.title)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            {navItem.title}
            <span className="nav-arrow">▾</span>

            {/* Dropdown menu */}
            {activeCategory === navItem.title && (
              <ul className="dropdown-menu">
                {navItem.subCategories.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    onClick={() => handleSubCategoryClick(sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarItems;
