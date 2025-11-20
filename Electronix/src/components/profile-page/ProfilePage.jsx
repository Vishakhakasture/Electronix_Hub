import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import "./ProfilePage.css";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const ProfilePage = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserAddress = async () => {
      setLoadingAddress(true);
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().address) {
          setUserAddress(userSnap.data().address);
        } else {
          setUserAddress(null);
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      } finally {
        setLoadingAddress(false);
      }
    };

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

        const grouped = cartData.reduce((acc, item) => {
          const key = item.productId || item.id;
          const existing = acc.find((p) => p.productId === key);
          if (existing) {
            existing.quantity += item.quantity || 1;
          } else {
            acc.push({
              ...item,
              productId: key,
              productName: item.productName || item.name || item.title || "Unnamed Product",
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

        const uniqueOrders = Array.from(new Map(ordersData.map((o) => [o.id, o])).values());
        const validOrders = uniqueOrders.filter((order) => order.items && order.items.length > 0);
        setOrders(validOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserAddress();
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
    <>
      <div className="profile-page">
        <div className="profile-wrapper">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="profile-content">
            <div className="profile-left">
              <div className="profile-section">
                <h3>Profile Details</h3>
                {loadingAddress ? (
                  <p>Loading address...</p>
                ) : userAddress ? (
                  <div className="address-card">
                    <p>
                      <strong>{userAddress.fullName}</strong>
                      <br />
                      {userAddress.addressLine}, {userAddress.city}, {userAddress.state},{" "}
                      {userAddress.country} - {userAddress.zip}
                      <br />
                      <FaPhoneAlt /> {userAddress.phone}
                      <br />
                      <IoMdMail /> {userAddress.email}
                    </p>
                  </div>
                ) : (
                  <p className="empty-message">
                    No address found. Please add your address during checkout.
                  </p>
                )}
              </div>

              <div className="profile-section help-section">
                <h3>Need Help?</h3>
                <p>
                  Contact us at <span>support@electronix.com</span>
                </p>
                <p>
                  <span>+91 9867878878</span>
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="profile-right">
              <div className="profile-section">
  <h3>Your Cart</h3>
  {loadingCart ? (
    <p>Loading cart data...</p>
  ) : cartItems.length === 0 ? (
    <p className="empty-message">You have no products in your cart.</p>
  ) : (
    <div className="cart-items">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="cart-item-row"
          onClick={() => navigate(`/product/${item.productId}`)}
        >
          <img
            src={item.image || item.images?.[0]}
            alt={item.productName}
            className="cart-item-img"
          />
          <div className="cart-item-info">
            <h4>{item.productName}</h4>
            <p className="brand">{item.brand}</p>
            <p className="price">₹{item.price}</p>
            <p className="quantity">Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


              <div className="profile-section">
  <h3>Your Orders</h3>
  {loadingOrders ? (
    <p>Loading orders...</p>
  ) : orders.length === 0 ? (
    <p className="empty-message">No orders found.</p>
  ) : (
    <div className="orders-list">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-info">
            <h4>Order Summary</h4>
            <p>
              Status: <span className="status">{order.status || "Pending"}</span>
            </p>
            <p>
              Total: <strong>₹{order.total || 0}</strong>
            </p>
          </div>

          <div className="order-items">
            {order.items?.map((item, index) => (
              <div
                key={index}
                className="cart-item-row"
                onClick={() => navigate(`/product/${item.productId}`)}
              >
                <img
                  src={item.image || item.images?.[0]}
                  alt={item.productName || item.name || "Product"}
                  className="cart-item-img"
                />
                <div className="cart-item-info">
                  <h4>{item.productName || item.name || item.title || "Unnamed Product"}</h4>
                  <p className="brand">{item.brand}</p>
                  <p className="price">₹{item.price}</p>
                  <p className="quantity">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
