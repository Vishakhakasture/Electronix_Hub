import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./ProfilePage.css";

const ProfilePage = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchCartItems = async () => {
      setLoadingCart(true);
      try {
        const cartRef = collection(db, "cart");
        const q = query(cartRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);

        const cartData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Combine same products & fallback names
        const grouped = cartData.reduce((acc, item) => {
          const key = item.productId || item.id;
          const existing = acc.find((p) => p.productId === key);
          if (existing) {
            existing.quantity += item.quantity || 1;
          } else {
            acc.push({
              ...item,
              productId: key,
              productName:
                item.productName ||
                item.name ||
                item.title ||
                "Unnamed Product",
              quantity: item.quantity || 1,
            });
          }
          return acc;
        }, []);

        setCartItems(grouped);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoadingCart(false);
      }
    };

    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Remove duplicates by ID
        const uniqueOrders = Array.from(
          new Map(ordersData.map((o) => [o.id, o])).values()
        );

        // ✅ Filter out invalid/empty orders (total 0 and no items)
        const validOrders = uniqueOrders.filter(
          (order) => order.items && order.items.length > 0
        );

        setOrders(validOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchCartItems();
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="profile-heading">Your Profile</h2>
      <p className="profile-email">
        <strong>Email:</strong> {user.email}
      </p>

      {/* 🛒 CART SECTION */}
      <div className="profile-section">
        <h3>Your Cart</h3>
        {loadingCart ? (
          <p>Loading cart data...</p>
        ) : cartItems.length === 0 ? (
          <p className="empty-message">You have no products in your cart.</p>
        ) : (
          <div className="card-grid">
            {cartItems.map((item) => (
              <div key={item.id} className="item-card">
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.productName}
                  className="item-img"
                />
                <h4>{item.productName}</h4>
                <p className="brand">{item.brand}</p>
                <p className="price">₹{item.price}</p>
                <p className="quantity">Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 📦 ORDERS SECTION */}
      <div className="profile-section">
        <h3>Your Orders</h3>
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="empty-message">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              {/* ✅ Single order summary */}
              <div className="order-info">
                <h4>Order Summary</h4>
                <p>
                  Status:{" "}
                  <span className="status">{order.status || "Pending"}</span>
                </p>
                <p>
                  Total: <strong>₹{order.total || 0}</strong>
                </p>
              </div>

              {/* ✅ Order products */}
              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div key={index} className="item-card small">
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.productName || "Product"}
                      className="item-img"
                    />
                    <h4>
                      {item.productName ||
                        item.name ||
                        item.title ||
                        "Unnamed Product"}
                    </h4>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="profile-section help-section">
        <h3>Need Help?</h3>
        <p>
          Contact us at <span>support@electronix.com</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
