// src/components/cart-page/CartPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import "./CartPage.css";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Navbar />
      <NavbarItems />

      <div className="cart-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <span>Shopping Cart</span>
        </div>

        <div className="cart-container">
          {/* Left side - cart items */}
          <div className="cart-items-section">
            {cartItems.length === 0 ? (
              <p className="empty-cart">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p className="item-price">₹{item.price.toLocaleString()}</p>

                    <div className="quantity-section">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="subtotal">
                      Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <button className="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
            )}
          </div>

          {/* Right side - Summary */}
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3>Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString()}</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
