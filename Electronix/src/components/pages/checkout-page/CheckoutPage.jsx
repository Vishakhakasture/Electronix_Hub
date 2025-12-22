import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "../../constants/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkoutPage.css";
import Navbar from "../../layout/Header/Navbar";
import toast from "react-hot-toast";

// ✅ ICONS
import { TbHomeEdit } from "react-icons/tb";
import { RiDeleteBack2Line } from "react-icons/ri";

const countries = [
  {
    name: "India",
    states: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"],
  },
  { name: "United States", states: ["California", "Texas", "Florida"] },
  { name: "Canada", states: ["Ontario", "Quebec", "British Columbia"] },
];

const emptyAddress = {
  fullName: "",
  phone: "",
  email: "",
  addressLine: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(emptyAddress);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [availableStates, setAvailableStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const validate = () => Object.values(address).every((v) => v.trim() !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });

    if (name === "country") {
      const c = countries.find((x) => x.name === value);
      setAvailableStates(c ? c.states : []);
      setAddress((p) => ({ ...p, state: "" }));
    }
  };

  // 🔹 ADD / UPDATE ADDRESS
  const saveAddress = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("All address fields are required");
      return;
    }

    let updatedAddresses = [...addresses];

    if (editIndex !== null) {
      updatedAddresses[editIndex] = address;
    } else {
      updatedAddresses.push(address);
    }

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { addresses: updatedAddresses },
      { merge: true }
    );

    setAddresses(updatedAddresses);
    setSelectedIndex(editIndex ?? updatedAddresses.length - 1);
    setEditIndex(null);
    setAddress(emptyAddress);
    setShowForm(false);

    toast.success(editIndex !== null ? "Address updated" : "Address added");
  };

  // 🔹 REMOVE ADDRESS
  const removeAddress = async (index) => {
    const updated = addresses.filter((_, i) => i !== index);

    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { addresses: updated },
      { merge: true }
    );

    setAddresses(updated);
    setSelectedIndex(updated.length ? 0 : null);
    toast.success("Address removed");
  };

  // 🔹 LOAD ADDRESSES (VERCEL SAFE)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists() && snap.data().addresses) {
            setAddresses(snap.data().addresses);
            setSelectedIndex(0);
          }
        }
      } catch (err) {
        console.error("Address fetch failed:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const selectedAddress =
    selectedIndex !== null ? addresses[selectedIndex] : null;

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = cartItems.length ? 20 : 0;
  const total = subtotal + shipping;

  // 🔥 PLACE ORDER (PENDING → PAYMENT)
  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      navigate("/cart");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select an address!");
      return;
    }

    if (placingOrder) return;

    try {
      setPlacingOrder(true);
      const user = auth.currentUser;
      if (!user) return;

      const orderRef = await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems.map((item) => ({
          productId: item.productId || item.id,
          productName: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          brand: item.brand || "",
        })),
        address: selectedAddress,
        subtotal,
        shipping,
        total,
        status: "Pending",
        paymentMethod: null,
        paymentStatus: "Pending",
        createdAt: serverTimestamp(),
      });

      await clearCart();

      navigate("/payment", {
        state: { orderId: orderRef.id, total },
      });
    } catch (err) {
      console.error("Order placement failed:", err);
      toast.error("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="checkout-page">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/cart">Cart</Link> <span>/</span> Checkout
          </div>

          <div className="checkout-container container">
            <div className="row">
              {/* LEFT */}
              <div className="col-lg-7 mb-4">
                <div className="address-section p-4 shadow-sm rounded bg-white">
                  <h3>Shipping Address</h3>

                  {addresses.length === 0 && (
                    <p className="text-muted">
                      No saved address. Please add one.
                    </p>
                  )}

                  {addresses.map((addr, i) => (
                    <div
                      key={i}
                      className="saved-address mb-3 position-relative"
                      onClick={() => setSelectedIndex(i)}
                      style={{
                        border:
                          selectedIndex === i
                            ? "2px solid black"
                            : "1px solid #ddd",
                        cursor: "pointer",
                      }}
                    >
                      <TbHomeEdit
                        className="address-icon edit-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditIndex(i);
                          setAddress(addr);
                          setShowForm(true);
                        }}
                      />

                      <RiDeleteBack2Line
                        className="address-icon delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAddress(i);
                        }}
                      />

                      <strong>{addr.fullName}</strong>
                      <p className="mb-0">
                        {addr.addressLine}, {addr.city}, {addr.state},{" "}
                        {addr.country} - {addr.zip}
                      </p>
                      <small>
                        {addr.phone} | {addr.email}
                      </small>
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-dark w-100 mt-3"
                    onClick={() => {
                      setShowForm(true);
                      setEditIndex(null);
                      setAddress(emptyAddress);
                    }}
                  >
                    + Add New Address
                  </button>

                  {showForm && (
                    <form onSubmit={saveAddress} className="mt-4">
                      <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={address.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          value={address.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={address.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Address Line</label>
                        <input
                          type="text"
                          className="form-control"
                          name="addressLine"
                          value={address.addressLine}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Country</label>
                          <select
                            className="form-select"
                            name="country"
                            value={address.country}
                            onChange={handleChange}
                          >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">State</label>
                          <select
                            className="form-select"
                            name="state"
                            value={address.state}
                            onChange={handleChange}
                            disabled={!availableStates.length}
                          >
                            <option value="">Select State</option>
                            {availableStates.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label">ZIP</label>
                          <input
                            type="text"
                            className="form-control"
                            name="zip"
                            value={address.zip}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-dark w-100">
                          {editIndex !== null
                            ? "Update Address"
                            : "Save Address"}
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary w-100"
                          onClick={() => {
                            setShowForm(false);
                            setEditIndex(null);
                            setAddress(emptyAddress);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              <div className="col-lg-5">
                <div className="order-summary p-4 shadow-sm rounded bg-white">
                  <h3>Order Summary</h3>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <span>{item.title}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <hr />
                  <p>Subtotal: ₹{subtotal}</p>
                  <p>Shipping: ₹{shipping}</p>
                  <h5>Total: ₹{total}</h5>

                  <button
                    className="btn btn-dark w-100 mt-3"
                    onClick={placeOrder}
                    disabled={placingOrder}
                  >
                    {placingOrder ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
