import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h2 className="footer-logo">ElectroNix</h2>
          <p className="footer-tagline">
            Your one-stop shop for the latest electronics and gadgets.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>            
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products/laptops">Shop</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>          
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@electronix.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Pune, India</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaLinkedinIn className="social-icon" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ElectroNix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
