import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useCart } from "../../context/CartContext";
import Navbar from "../home-page/Navbar";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  if (!state) {
    return <h2 className="text-center mt-5">Invalid Access</h2>;
  }

  const { cartItems, address, subtotal, shipping, total } = state;

  const handlePayment = async () => {
    if (processing) return;

    setProcessing(true);

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login to continue");
        navigate("/login");
        return;
      }

      // Save Address for next times
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        { address },
        { merge: true }
      );

      // Create Order
      const order = {
        userId: user.uid,
        items: cartItems,
        address,
        subtotal,
        shipping,
        total,
        paymentMethod,
        paymentStatus: "Paid",
        status: "Processing",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), order);

      clearCart();

      navigate("/order-success", { state: { total } });

    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="payment-page container mt-4">
        <h2 className="mb-4 text-center fw-bold">Choose Payment Method</h2>

        <div className="payment-container shadow rounded p-4 bg-white">
          <h4 className="mb-3">Order Total: ₹{total.toLocaleString()}</h4>

          <div className="payment-options">
            {["UPI", "Card", "Cash on Delivery"].map((method) => (
              <div
                key={method}
                className={`payment-option ${paymentMethod === method ? "active" : ""}`}
                onClick={() => setPaymentMethod(method)}
              >
                {method}
              </div>
            ))}
          </div>

          <button
            className="btn btn-dark w-100 mt-4"
            disabled={processing}
            onClick={handlePayment}
          >
            {processing ? "Processing Payment..." : "Pay Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
