import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckoutPage.css";
import Navbar from "../home-page/Navbar";

const countries = [
  { name: "India", states: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Other"] },
  { name: "United States", states: ["California", "Texas", "Florida", "New York", "Other"] },
  { name: "Canada", states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Other"] },
];

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
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        break;
      case "phone":
        if (!/^[0-9]{10}$/.test(value)) error = "Phone number must be 10 digits";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
        break;
      case "addressLine":
        if (!value.trim()) error = "Address is required";
        break;
      case "city":
        if (!value.trim()) error = "City is required";
        break;
      case "zip":
        if (!/^\d{5,6}$/.test(value)) error = "Enter a valid 5 or 6 digit ZIP code";
        break;
      case "country":
        if (!value) error = "Please select a country";
        break;
      case "state":
        if (!value) error = "Please select a state";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "country") {
      const countryData = countries.find((c) => c.name === value);
      setAvailableStates(countryData ? countryData.states : []);
      setAddress((prev) => ({ ...prev, state: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(address).forEach((field) => {
      const error = validateField(field, address[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setValidated(false);
      return;
    }

    setErrors({});
    setValidated(true);
    setEditMode(false);
  };

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().address) {
        setAddress(userSnap.data().address);
        setEditMode(false);
        const countryData = countries.find(
          (c) => c.name === userSnap.data().address.country
        );
        setAvailableStates(countryData ? countryData.states : []);
      }
    };
    fetchUserAddress();
  }, []);

  const handlePlaceOrder = () => {
  const newErrors = {};
  Object.keys(address).forEach((field) => {
    const error = validateField(field, address[field]);
    if (error) newErrors[field] = error;
  });

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    alert("Please correct the highlighted fields before continuing.");
    return;
  }

  navigate("/payment", {
    state: {
      cartItems,
      address,
      subtotal,
      shipping,
      total,
    },
  });
};

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span>{" "}
          <Link to="/cart">Cart</Link> <span>/</span> <span>Checkout</span>
        </div>

        <div className="checkout-container container">
          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="address-section p-4 shadow-sm rounded bg-white">
                <h3>Shipping Address</h3>
                {editMode ? (
                  <form noValidate onSubmit={handleSubmit}>
                    {[
                      { name: "fullName", label: "Full Name", type: "text" },
                      { name: "phone", label: "Phone Number", type: "tel" },
                      { name: "email", label: "Email", type: "email" },
                      { name: "addressLine", label: "Address", type: "text" },
                    ].map((field) => (
                      <div className="mb-3" key={field.name}>
                        <label className="form-label">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          className={`form-control ${
                            errors[field.name] ? "is-invalid" : ""
                          }`}
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          value={address[field.name]}
                          onChange={handleChange}
                          required
                        />
                        {errors[field.name] && (
                          <div className="invalid-feedback">
                            {errors[field.name]}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Country</label>
                        <select
                          name="country"
                          className={`form-select ${
                            errors.country ? "is-invalid" : ""
                          }`}
                          value={address.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        {errors.country && (
                          <div className="invalid-feedback">{errors.country}</div>
                        )}
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">State</label>
                        <select
                          name="state"
                          className={`form-select ${
                            errors.state ? "is-invalid" : ""
                          }`}
                          value={address.state}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select State</option>
                          {availableStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <div className="invalid-feedback">{errors.state}</div>
                        )}
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${
                            errors.city ? "is-invalid" : ""
                          }`}
                          placeholder="Enter city"
                          value={address.city}
                          onChange={handleChange}
                          required
                        />
                        {errors.city && (
                          <div className="invalid-feedback">{errors.city}</div>
                        )}
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">Zip</label>
                        <input
                          type="text"
                          name="zip"
                          className={`form-control ${
                            errors.zip ? "is-invalid" : ""
                          }`}
                          placeholder="Enter zip"
                          value={address.zip}
                          onChange={handleChange}
                          required
                        />
                        {errors.zip && (
                          <div className="invalid-feedback">{errors.zip}</div>
                        )}
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
                      {address.addressLine}, {address.city}, {address.state},{" "}
                      {address.country} - {address.zip}
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

            {/* Order Summary */}
            <div className="col-lg-5">
              <div className="order-summary p-4 shadow-sm rounded bg-white">
                <h3>Order Summary</h3>
                {cartItems.map((item) => (
                  <div
                    className="d-flex justify-content-between align-items-center mb-3"
                    key={item.id}
                  >
                    <div>
                      <p className="mb-0 fw-semibold">{item.title}</p>
                      <small>Qty: {item.quantity}</small>
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
