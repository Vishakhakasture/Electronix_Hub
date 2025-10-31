// src/components/cart-page/CartPage.jsx
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import "./CartPage.css";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const location = useLocation();

  // Generate breadcrumb dynamically
  const generateBreadcrumb = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const crumbs = [{ label: "Home", path: "/" }];

    if (pathnames.includes("products"))
      crumbs.push({ label: "Products", path: "/products" });
    if (pathnames.includes("product"))
      crumbs.push({ label: "Product Details", path: "#" });

    crumbs.push({ label: "Cart", path: "/cart" });
    return crumbs;
  };

  const breadcrumbs = generateBreadcrumb();

  return (
    <>
      <Navbar />
      <NavbarItems />

      <div className="cart-page">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && " / "}
              {index === breadcrumbs.length - 1 ? (
                <span>{crumb.label}</span>
              ) : (
                <Link to={crumb.path}>{crumb.label}</Link>
              )}
            </span>
          ))}
        </div>

        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>₹{item.price}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart-actions">
              <button className="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
