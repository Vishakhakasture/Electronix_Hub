import React from "react";
import "./navitems.css";
import { FaChevronDown } from "react-icons/fa";

const navItems = [
  "Birthday",
  "Occasions",
  "Anniversary",
  "Flowers",
  "Cakes",
  "Personalised",
  "Plants",
  "Chocolates",
  "Combos",
  "On Trend",
];

const NavItems = () => {
  return (
    <nav className="nav-items-bar">
      <ul className="nav-items-list">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <span>{item}</span>
            <FaChevronDown className="nav-arrow" />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavItems;
