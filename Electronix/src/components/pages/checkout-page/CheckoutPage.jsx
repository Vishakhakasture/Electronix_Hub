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

  const saveAddress = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("All fields are required!");
      return;
    }

    const updated = [...addresses, address];
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { addresses: updated },
      { merge: true }
    );

    setAddresses(updated);
    setSelectedIndex(updated.length - 1);
    setAddress(emptyAddress);
    setShowForm(false);
    toast.success("Address added successfully!");
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return setLoading(false);

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().addresses) {
        setAddresses(snap.data().addresses);
        setSelectedIndex(0);
      }
      setLoading(false);
    });
  }, []);

  const selectedAddress =
    selectedIndex !== null ? addresses[selectedIndex] : null;

  const subtotal = cartItems.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = cartItems.length ? 20 : 0;
  const total = subtotal + shipping;

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

      console.log("Placing order for UID:", user.uid);

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
        state: {
          orderId: orderRef.id,
          total,
        },
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
              <div className="col-lg-7 mb-4">
                <div className="address-section p-4 shadow-sm rounded bg-white">
                  <h3>Shipping Address</h3>

                  {addresses.map((addr, i) => (
                    <div
                      key={i}
                      className="saved-address mb-3"
                      onClick={() => setSelectedIndex(i)}
                      style={{
                        border:
                          selectedIndex === i
                            ? "2px solid #000"
                            : "1px solid #ddd",
                        cursor: "pointer",
                      }}
                    >
                      <strong>{addr.fullName}</strong>
                      <p className="mb-0">
                        {addr.addressLine}, {addr.city}, {addr.state}
                      </p>
                      <small>
                        {addr.phone} | {addr.email}
                      </small>
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-dark w-100 mt-3"
                    onClick={() => setShowForm(!showForm)}
                  >
                    + Add New Address
                  </button>

                  {showForm && (
                    <form onSubmit={saveAddress} className="mt-4">
                      <button type="submit" className="btn btn-dark w-100 mt-3">
                        Save Address
                      </button>
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
