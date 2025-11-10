import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css"; 

const ProfileMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleUserClick = () => setShowDropdown(!showDropdown);

  const handleProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };
  const handleHelp = () => {
    setShowDropdown(false);
    navigate("/help");
  };

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
    <div className="profile-icon-container user-menu" ref={dropdownRef}>
      <FaUser className="nav-icon" onClick={handleUserClick} />
      {showDropdown && (
        <div className="user-dropdown">
          <p onClick={handleProfile}>Profile</p>
          <p onClick={handleHelp}>Help</p>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
