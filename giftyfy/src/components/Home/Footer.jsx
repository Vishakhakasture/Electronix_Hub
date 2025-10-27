import React from "react";
import { FaGift, FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="giftify-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <FaGift className="footer-icon" />
            <h2>Giftify</h2>
          </div>
          <p>
            Bringing smiles closer with curated gifts for every special moment.
          </p>
          <div className="footer-socials">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Categories</h4>
          <ul>
            <li><a href="#">Birthday</a></li>
            <li><a href="#">Anniversary</a></li>
            <li><a href="#">Flowers</a></li>
            <li><a href="#">Cakes</a></li>
            <li><a href="#">Personalised</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📍 Pune, Maharashtra, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ support@giftify.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Giftify | Designed with ❤️ by Team Giftify</p>
      </div>
    </footer>
  );
};

export default Footer;
