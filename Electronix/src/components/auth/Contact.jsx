import React, { useState } from "react";
import "./Contact.css";
import Navbar from "../layout/Header/Navbar";
import Footer from "../layout/Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <div className="contact-wrapper">
        <h1 className="contact-main-title">Contact Us</h1>
        <p className="contact-subtext">
          Have questions? We'd love to hear from you.
        </p>

        <div className="contact-box">
          {/* Left section */}
          <div className="contact-left">
            <h2>Get in Touch</h2>
            <p className="left-text">
              Reach out to us for product inquiries, support, or feedback.
            </p>

            <div className="left-info">
              <p><strong>Email:</strong> support@electronix.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Address:</strong> Pune, India</p>
            </div>

            <div className="contact-socials">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-linkedin"></i>
            </div>
          </div>

          {/* Right section */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
            ></textarea>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
