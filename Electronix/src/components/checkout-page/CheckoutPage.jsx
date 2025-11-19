import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckoutPage.css";
import Navbar from "../home-page/Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const countries = [
  { name: "India", states: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Other"] },
  { name: "United States", states: ["California", "Texas", "Florida", "New York", "Other"] },
  { name: "Canada", states: ["Ontario", "Quebec", "British Columbia", "Alberta", "Other"] },
];

const CheckoutPage = () => {
  const { cartItems } = useCart();
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

  const [touched, setTouched] = useState({});
  const [editMode, setEditMode] = useState(true);
  const [availableStates, setAvailableStates] = useState([]);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim() !== "";
      case "phone":
        return /^[0-9]{10}$/.test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "addressLine":
      case "city":
        return value.trim() !== "";
      case "zip":
        return /^\d{5,6}$/.test(value);
      case "country":
      case "state":
        return value.trim() !== "";
      default:
        return true;
    }
  };

  const isFormValid = () => {
    return Object.keys(address).every((key) => validateField(key, address[key]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    if (name === "country") {
      const countryData = countries.find((c) => c.name === value);
      setAvailableStates(countryData ? countryData.states : []);
      setAddress((prev) => ({ ...prev, state: "" })); // reset state if country changes
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("All fields are required!");
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        addressLine: true,
        city: true,
        state: true,
        zip: true,
        country: true,
      });
      return;
    }

    setEditMode(false);
    toast.success("Address saved successfully!");
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
    if (!isFormValid()) {
      toast.error("All fields are required!");
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        addressLine: true,
        city: true,
        state: true,
        zip: true,
        country: true,
      });
      return;
    }

    navigate("/payment", {
      state: { cartItems, address, subtotal, shipping, total },
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

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
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        className={`form-control ${
                          touched.fullName && !validateField("fullName", address.fullName)
                            ? "is-invalid"
                            : ""
                        }`}
                        value={address.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="invalid-feedback">Please enter full name.</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        className={`form-control ${
                          touched.phone && !validateField("phone", address.phone)
                            ? "is-invalid"
                            : ""
                        }`}
                        value={address.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="invalid-feedback">
                        Enter valid 10-digit phone number.
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${
                          touched.email && !validateField("email", address.email)
                            ? "is-invalid"
                            : ""
                        }`}
                        value={address.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="invalid-feedback">Enter a valid email.</div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="addressLine"
                        className={`form-control ${
                          touched.addressLine &&
                          !validateField("addressLine", address.addressLine)
                            ? "is-invalid"
                            : ""
                        }`}
                        value={address.addressLine}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="invalid-feedback">Please enter address.</div>
                    </div>

                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Country</label>
                        <select
                          name="country"
                          className={`form-select ${
                            touched.country && !validateField("country", address.country)
                              ? "is-invalid"
                              : ""
                          }`}
                          value={address.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">Select a country.</div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">State</label>
                        <select
                          name="state"
                          className={`form-select ${
                            touched.state && !validateField("state", address.state)
                              ? "is-invalid"
                              : ""
                          }`}
                          value={address.state}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value="">Select State</option>
                          {availableStates.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <div className="invalid-feedback">Select a state.</div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${
                            touched.city && !validateField("city", address.city)
                              ? "is-invalid"
                              : ""
                          }`}
                          value={address.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">Enter city name.</div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">Zip</label>
                        <input
                          type="text"
                          name="zip"
                          className={`form-control ${
                            touched.zip && !validateField("zip", address.zip)
                              ? "is-invalid"
                              : ""
                          }`}
                          value={address.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="invalid-feedback">Enter valid zip code.</div>
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

            <div className="col-lg-5">
              <div className="order-summary p-4 shadow-sm rounded bg-white">
                <h3>Order Summary</h3>

                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between mb-3">
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

                <button className="btn btn-dark w-100 mt-4" onClick={handlePlaceOrder}>
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
