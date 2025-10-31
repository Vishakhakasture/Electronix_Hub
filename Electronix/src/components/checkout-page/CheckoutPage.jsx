import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../home-page/Navbar";
import NavbarItems from "../home-page/NavbarItems";
import "./CheckoutPage.css";
import { useCart } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    zip: "",
  });

  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setEditMode(false);
    }

    setValidated(true);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("Please fill out all required fields.");
      return;
    }
    clearCart();
    setOrderPlaced(true);
    setTimeout(() => navigate("/"), 3000);
  };

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <NavbarItems />
        <div className="order-success text-center mt-5">
          <h2>Your Order Placed Successfully!</h2>
          <p>Thank you for shopping with ElectroNix.</p>
          <p>Redirecting to home...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <NavbarItems />

      <div className="checkout-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <Link to="/cart">Cart</Link>{" "}
          <span>/</span> <span>Checkout</span>
        </div>

        <div className="checkout-container container">
          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="address-section p-4 shadow-sm rounded bg-white">
                <h3>Shipping Address</h3>
                {editMode ? (
                  <form
                    noValidate
                    validated={validated ? "true" : undefined}
                    onSubmit={handleSubmit}
                    className="needs-validation"
                  >
                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        placeholder="Enter full name"
                        value={address.fullName}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your full name.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        value={address.phone}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your phone number.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={address.email}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        name="addressLine"
                        className="form-control"
                        placeholder="Enter address"
                        value={address.addressLine}
                        onChange={handleChange}
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter your address.
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control"
                          placeholder="Enter city"
                          value={address.city}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your city.
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">State *</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          placeholder="Enter state"
                          value={address.state}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your state.
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Zip *</label>
                        <input
                          type="text"
                          name="zip"
                          className="form-control"
                          placeholder="Enter zip"
                          value={address.zip}
                          onChange={handleChange}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your zip code.
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 mt-3">
                      Save Address
                    </button>
                  </form>
                ) : (
                  <div className="saved-address">
                    <p>
                      <strong>{address.fullName}</strong>
                      <br />
                      {address.addressLine}, {address.city}, {address.state} -{" "}
                      {address.zip}
                      <br />
                      {address.phone} | {address.email}
                    </p>
                    <button
                      className="btn btn-outline-dark mt-2"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Address
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="order-summary p-4 shadow-sm rounded bg-white">
                <h3>Order Summary</h3>
                {cartItems.map((item) => (
                  <div className="d-flex justify-content-between align-items-center mb-3" key={item.id}>
                    <div className="d-flex align-items-center">
                      
                      <div>
                        <p className="mb-0 fw-semibold">{item.title}</p>
                        <small>Qty: {item.quantity}</small>
                      </div>
                    </div>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}

                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                <button
                  className="btn btn-dark w-100 mt-4"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
