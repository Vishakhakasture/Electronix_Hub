import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./CheckoutPage.css";
import ProfileMenu from "../profile-page/ProfileMenu";

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

  const [validated, setValidated] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    // Update available states if country changes
    if (name === "country") {
      const countryData = countries.find(c => c.name === value);
      setAvailableStates(countryData ? countryData.states : []);
      setAddress(prev => ({ ...prev, state: "" })); // reset state selection
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("Please fill out all required fields.");
      return;
    }
    setEditMode(false);
    setValidated(true);
  };

  useEffect(() => {
    const fetchUserAddress = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().address) {
        setAddress(userSnap.data().address);
        setEditMode(false);
        const countryData = countries.find(c => c.name === userSnap.data().address.country);
        setAvailableStates(countryData ? countryData.states : []);
      }
    };
    fetchUserAddress();
  }, []);

  const handlePlaceOrder = async () => {
    if (!auth.currentUser) {
      alert("Please login to place an order.");
      return;
    }

    const allFilled = Object.values(address).every((val) => val.trim() !== "");
    if (!allFilled) {
      alert("Please fill out all required fields before placing the order.");
      return;
    }

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, { address }, { merge: true });

      const order = {
        userId: auth.currentUser.uid,
        items: cartItems,
        address,
        subtotal,
        shipping,
        total,
        status: "Pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);

      clearCart();
      setOrderPlaced(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success text-center mt-5">
        <h2>Your Order Placed Successfully!</h2>
        <p>Thank you for shopping with ElectroNix.</p>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <Link to="/cart">Cart</Link> <span>/</span> <span>Checkout</span>
        <div>
            <ProfileMenu />
        </div>
      </div>

      <div className="checkout-container container">
        <div className="row">
          {/* Address Section */}
          <div className="col-lg-7 mb-4">
            <div className="address-section p-4 shadow-sm rounded bg-white">
              <h3>Shipping Address</h3>
              {editMode ? (
                <form noValidate validated={validated ? "true" : undefined} onSubmit={handleSubmit} className="needs-validation">
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="fullName" className="form-control" placeholder="Enter full name" value={address.fullName} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" className="form-control" placeholder="Enter phone number" value={address.phone} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={address.email} onChange={handleChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" name="addressLine" className="form-control" placeholder="Enter address" value={address.addressLine} onChange={handleChange} required />
                  </div>

                  <div className="row">
                    {/* Country Dropdown */}
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Country</label>
                      <select name="country" className="form-select" value={address.country} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map(c => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* State Dropdown */}
                    <div className="col-md-3 mb-3">
                      <label className="form-label">State</label>
                      <select name="state" className="form-select" value={address.state} onChange={handleChange} required>
                        <option value="">Select State</option>
                        {availableStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-3 mb-3">
                      <label className="form-label">City</label>
                      <input type="text" name="city" className="form-control" placeholder="Enter city" value={address.city} onChange={handleChange} required />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label className="form-label">Zip</label>
                      <input type="text" name="zip" className="form-control" placeholder="Enter zip" value={address.zip} onChange={handleChange} required />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-dark w-100 mt-3">Save Address</button>
                </form>
              ) : (
                <div className="saved-address">
                  <p>
                    <strong>{address.fullName}</strong>
                    <br />
                    {address.addressLine}, {address.city}, {address.state}, {address.country} - {address.zip}
                    <br />
                    {address.phone} | {address.email}
                  </p>
                  <button className="btn btn-outline-dark mt-2" onClick={() => setEditMode(true)}>Edit Address</button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
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

              <button className="btn btn-dark w-100 mt-4" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
