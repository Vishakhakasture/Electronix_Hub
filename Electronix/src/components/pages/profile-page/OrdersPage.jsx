import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../../layout/Header/Navbar";
import Footer from "../../layout/Footer/Footer";
import Loader from "../../constants/Loader";
import { generateInvoice } from "../../../utils/generateInvoice";
import "./OrdersPage.css";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }

      setUser(currentUser);

      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", currentUser.uid));
        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="orders-loader">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <div className="orders-container">
          <h2 className="orders-title">My Orders</h2>

          {orders.length === 0 ? (
            <p className="empty-message">You have not placed any orders yet.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-card">
                  <div className="order-top">
                    <div>
                      <p className="order-id">Order #{order.id.slice(0, 8)}</p>
                      <p className="order-date">
                        {order.createdAt?.toDate
                          ? order.createdAt.toDate().toDateString()
                          : "Date unavailable"}
                      </p>
                    </div>

                    <span
                      className={`order-badge ${
                        order.paymentStatus === "Success"
                          ? "success"
                          : "pending"
                      }`}
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </div>

                  <div className="order-products">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="order-product"
                        onClick={() => navigate(`/product/${item.productId}`)}
                      >
                        <img src={item.image} alt={item.productName} />
                        <div>
                          <h4>{item.productName}</h4>
                          <p>Qty: {item.quantity}</p>
                          <p className="price">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <p className="order-total">Total: ₹{order.total}</p>

                    <button
                      className="invoice-btn"
                      onClick={() => {
                        if (!order.items || order.items.length === 0) {
                          alert("No items found for this order");
                          return;
                        }
                        generateInvoice(order, user);
                      }}
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
