import React from "react";
import "./NavbarItems.css";
import { FaChevronDown } from "react-icons/fa";
import navData from "./navData"; 
import { useNavigate } from "react-router-dom"; 

const NavbarItems = () => {
  
  const navigate = useNavigate();

  const handleSubCategoryClick = (category, subCategory) => {
    // Navigate dynamically to route like /electronics/smartphones/android-phones
    const path = `/electronics/${category.toLowerCase()}/${subCategory
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
    navigate(path);
  };

  return (
    <nav className="nav-items-bar">
      <ul className="nav-items-list">
        {navData.map((item, index) => (
          <li key={index} className="nav-item">
            <span>{item.title}</span>
            <FaChevronDown className="nav-arrow" />
            <ul className="dropdown-menu">
              {item.subCategories.map((sub, i) => (
                <li
                  key={i}
                  onClick={() => handleSubCategoryClick(item.title, sub)}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarItems;
