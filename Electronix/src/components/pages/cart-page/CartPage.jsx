import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layout/Header/Navbar";
import "./CartPage.css";
import { useCart } from "../../../context/CartContext";
import Loader from "../../constants/Loader";
import ConfirmModal from "./ConfirmModal";
import { AiFillDelete } from "react-icons/ai";
import empty_cart from "../../../assets/empty_cart.png";
import Footer from "../../layout/Footer/Footer";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, loading } =
    useCart();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    removeFromCart(selectedItem.id);
    setShowConfirm(false);
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <Loader />
      ) : (
        <div className="cart-page">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Shopping Cart</span>
          </div>

          <div className="cart-container">
            <div className="cart-items-section">
              {cartItems.length > 0 && (
                <div className="cart-header">
                  <span className="col-product">Product</span>
                  <span className="col-name">Name</span>
                  <span className="col-qty">Quantity</span>
                  <span className="col-price">Price Each</span>
                  <span className="col-subtotal">Subtotal</span>
                  <span className="col-subtotal">Remove</span>
                  <span className="col-remove"></span>
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="empty-cart-wrapper">
                  <img
                    src={empty_cart}
                    alt="empty cart"
                    className="empty-cart-img"
                  />
                  <p className="empty-cart-text">Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    className="cart-row"
                    key={item.id}
                    onClick={(e) => {
                      if (
                        e.target.tagName !== "BUTTON" &&
                        !e.target.classList.contains("remove-btn")
                      ) {
                        navigate(`/product/${item.id}`);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-row-img"
                    />
                    <span className="cart-row-name">{item.title}</span>

                    <div className="cart-row-qty">
                      <button
                        className="qty-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.quantity - 1);
                        }}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="qty-count">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, item.quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <span className="cart-row-price">
                      ₹{item.price.toLocaleString()}
                    </span>

                    <span className="cart-row-subtotal">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>

                    <button
                      className="remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(item);
                      }}
                    >
                      <AiFillDelete size={22} />
                    </button>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <button className="clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
              )}
            </div>

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
                  <span>Total Amount</span>
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
      )}

      <ConfirmModal
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmRemove}
      />
      <Footer />
    </>
  );
};

export default CartPage;
